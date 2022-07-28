import type { TupleToUnion } from "../10-tupleToUnion/tupleToUnion"

type Without<T, U> = T extends [infer A , ...infer B]  ? A extends TupleToUnion<U> ? [...Without<B,U>] : [A,...Without<B,U>] : []
// tuple to union

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '../../utils'

type cases = [
  Expect<Equal<Without<[1, 2], 1>, [2]>>,
  Expect<Equal<Without<[1, 2, 4, 1, 5], [1, 2]>, [4, 5]>>,
  Expect<Equal<Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]>, []>>,
]

type B =Without<[1, 2, 4, 1, 5], [1, 2]>
type C = 1 extends 1|2? true :false  // 对于union类型还有之前有误解

