import { TupleToUnion } from "../10-tupleToUnion/tupleToUnion"

// 先预处理一下 或者再搞个泛型 
type First<T> = T extends [infer F ,...infer Rest] ? TupleToUnion<F> : T

type handle<T , Same = First<T>> = T extends [infer F ,...infer Rest] ? handle<Rest,Extract<Same,TupleToUnion<F>>> : Same

type Intersection<T> =handle<T,First<T>>


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../../utils'

type cases = [
  Expect<Equal<Intersection<[[1, 2], [2, 3], [2, 2]]>, 2>>,
  Expect<Equal<Intersection<[[1, 2, 3], [2, 3, 4], [2, 2, 3]]>, 2 | 3>>,
  Expect<Equal<Intersection<[[1, 2], [3, 4], [5, 6]]>, never>>,
  Expect<Equal<Intersection<[[1, 2, 3], [2, 3, 4], 3]>, 3>>,
  Expect<Equal<Intersection<[[1, 2, 3], 2 | 3 | 4, 2 | 3]>, 2 | 3>>,
  Expect<Equal<Intersection<[[1, 2, 3], 2, 3]>, never>>,
]