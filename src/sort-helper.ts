import { Column, ColumnParam, toColumnParam }      from './column';
import { compare, ComparisonFn, ComparisonResult } from './comparison';
import { reverseOrder }                            from './order';

export const by = <T>(column: Column<T>, ...otherColumns: Column<T>[]): ComparisonFn<T> =>
  (x, y) =>
    [column, ...otherColumns].reduce<ComparisonResult>(
      (result, current) => {
        if (result !== ComparisonResult.equal) {
          return result;
        }

        const { selector, order } = toColumnParam(current);
        return order.adjust(compare(selector(x), selector(y)));
      },
      ComparisonResult.equal);

export const desc = <T>(column: Column<T>): ColumnParam<T> => {
  const { selector, order } = toColumnParam(column);
  return { selector, order: reverseOrder(order) };
};

export const ignoreCase = <T>(column: Column<T>): ColumnParam<T> => {
  const { selector, order } = toColumnParam(column);
  return {
    selector: item => {
      const value = selector(item);
      return typeof value === 'string'
             ? value.toLocaleUpperCase()
             : value;
    },
    order
  };
};
