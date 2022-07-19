type Pop<T extends any[]> = T extends [...infer A, infer B] ? A : never


/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '../../utils'

type cases = [
  Expect<Equal<Pop<[3, 2, 1]>, [3, 2]>>,
  Expect<Equal<Pop<['a', 'b', 'c', 'd']>, ['a', 'b', 'c']>>,
]