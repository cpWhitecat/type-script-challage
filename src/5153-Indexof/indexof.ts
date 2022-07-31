import type { Equal, Expect } from '../../utils'

// 传入一个空数组可以自动达到减一效果,但要实现返回-1,所以用了第三个泛型
type IndexOf<T extends any[], U,arr extends any[] = []> = T['length'] extends 0 ? -1 :T extends [infer A ,...infer rest] ? Equal<A,U> extends true ? arr['length']  :IndexOf<rest,U,[...arr,A]> : [];



/* _____________ Test Cases _____________ */

type cases = [
  Expect<Equal<IndexOf<[1, 2, 3], 2>, 1>>,
  Expect<Equal<IndexOf<[2, 6, 3, 8, 4, 1, 7, 3, 9], 3>, 2>>,
  Expect<Equal<IndexOf<[0, 0, 0], 2>, -1>>,
  Expect<Equal<IndexOf<[string, 1, number, 'a'], number>, 2>>,
  Expect<Equal<IndexOf<[string, 1, number, 'a', any], any>, 4>>,
]

type B =IndexOf<[1, 2, 3], 2>
type C<T extends any[]> =T[number] extends infer P ? P :never 
type D = IndexOf<[0, 0, 0], 2>
type F = IndexOf<[2, 6, 3, 8, 4, 1, 7, 3, 9], 3>