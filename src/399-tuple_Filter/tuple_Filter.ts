import { TupleToUnion } from "../10-tupleToUnion/tupleToUnion"

type FilterOut<T extends any[], F, CacheArray extends any[] = []> = 
T extends [infer First ,...infer Rest] 
    ? ([First] extends [TupleToUnion<F>] ? FilterOut<Rest,F,[...CacheArray]> : FilterOut<Rest,F,[...CacheArray,First]>)
    :CacheArray


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../../utils'

type cases = [
  Expect<Equal<FilterOut<[], never>, []>>,
  Expect<Equal<FilterOut<[never], never>, []>>,
  Expect<Equal<FilterOut<['a', never], never>, ['a']>>,
  Expect<Equal<FilterOut<[1, never, 'a'], never>, [1, 'a']>>,
  Expect<Equal<FilterOut<[never, 1, 'a', undefined, false, null], never | null | undefined>, [1, 'a', false]>>,
  Expect<Equal<FilterOut<[number | null | undefined, never], never | null | undefined>, [number | null | undefined]>>,
]


type TestFilter = FilterOut<[never, 1, 'a', undefined, false, null], never | null | undefined>