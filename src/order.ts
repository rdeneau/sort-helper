import { ComparisonResult } from './comparison';

const makeOrder = <K extends string>(key: K, adjust: (result: ComparisonResult) => ComparisonResult) =>
  ({ key, adjust });

const asc = makeOrder('asc', x => x);
const desc = makeOrder('desc', x => -x);

export const orders = { asc, desc } as const;

type Orders = typeof orders;
export type Order = Orders[keyof Orders];

export const reverseOrder = (order: Order) =>
  order !== asc ? asc : desc;
