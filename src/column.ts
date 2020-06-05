import { Order, orders } from './order';

export type ColumnSelector<T> = (item: T) => any;

export interface ColumnParam<T> {
  order: Order;
  selector: ColumnSelector<T>;
}

export type Column<T> =
  | keyof T
  | ColumnSelector<T>
  | ColumnParam<T>;

const makeSelector = <T>(column: Column<T>): ColumnSelector<T> => {
  switch (typeof column) {
    case 'string'  : return (item: T) => item[column];
    case 'function': return column;
    case 'object'  : return column.selector;
    default        : throw new RangeError(`Unexpected column type "${typeof column}"`);
  }
};

const makeOrder = <T>(column: Column<T>): Order =>
  typeof column === 'object'
  ? column.order
  : orders.asc;

export const toColumnParam = <T>(column: Column<T>): ColumnParam<T> => ({
  order: makeOrder(column),
  selector: makeSelector(column),
});
