type FlattenDepth<T, D = 1 > = T extends [infer F , ...infer rest] ? F extends any[] ? [...FlattenDepth<F,D>,...FlattenDepth<rest,D>] : [F,...FlattenDepth<rest,D>] : T

// 要是完成了之前那个类型里面减一的题 ， 这道题就很简单了   MinusOne
/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../../utils'

type cases = [
  Expect<Equal<FlattenDepth<[]>, []>>,
  Expect<Equal<FlattenDepth<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<FlattenDepth<[1, [2]]>, [1, 2]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, [[5]]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 3>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 19260817>, [1, 2, 3, 4, 5]>>,
]