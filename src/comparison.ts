export enum ComparisonResult {
  lessThan = -1,
  equal = 0,
  greaterThan = 1
}

export type ComparisonFn<T> = (a: T, b: T) => ComparisonResult;

const compareUsingOperators = <T>(a: T, b: T) =>
  a < b
    ? ComparisonResult.lessThan :
  a > b
    ? ComparisonResult.greaterThan
    : ComparisonResult.equal;

export const compare = <T>(a: T, b: T): ComparisonResult => {
  switch (typeof a) {
    case 'bigint':
    case 'boolean':
    case 'number':
      return compareUsingOperators(a, b);

    case 'string':
      return a.localeCompare(b as any) as ComparisonResult;

    default:
      if (a instanceof Date) {
        return compareUsingOperators(a, b);
      } else {
        return ComparisonResult.equal;
      }
  }
};
