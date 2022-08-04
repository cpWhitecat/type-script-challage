type normal<T extends any[]> = T extends [infer L ,...infer Rest] ? [L] | normal<Rest> : []
type Subsequence<T extends any[]> = T extends [infer A, ...infer B] ? B | normal<T> : []


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../../utils'

type cases = [
  Expect<Equal<Subsequence<[1, 2]>, [] | [1] | [2] | [1, 2]>>,
  Expect<Equal<Subsequence<[1, 2, 3]>, [] | [1] | [2] | [1, 2] | [3] | [1, 3] | [2, 3] | [1, 2, 3] >>,
]

type D =Subsequence<[1, 2, 3]>