type Flatten<T>= T extends [infer L , ...infer R] ? L extends any[] ? [...Flatten<L>,...Flatten<R>] : [L,...Flatten<R>] : T

// 想法错误，因为第二个true 段值负责把深度数组给递归出来 ， 但没交代剩余值如何处理 ， 我那时候的想法是以为还是那个 R 还有下次循环兜底 ， 所以没关系的，但结果不一样了 ，偏偏少了需要深度的数组 ， 那时候应该把深度数组往前提，这样就能找到是那个地方的值没处理正确 所以后面的值没有柯里化



// 感觉用key更好 但对象就不好处理了

/*     T extends [infer First , ...infer rest] 
    ? First extends [infer A, ...infer B] 
        ? [A,...Flatten<[B,...rest]>]
        :[First,...Flatten<rest>]
    :  T */
/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '../../utils'

type cases = [
  Expect<Equal<Flatten<[]>, []>>,
  Expect<Equal<Flatten<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<Flatten<[1, [2]]>, [1, 2]>>,
  Expect<Equal<Flatten<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, 5]>>,
  Expect<Equal<Flatten<[{ foo: 'bar'; 2: 10 }, 'foobar']>, [{ foo: 'bar'; 2: 10 }, 'foobar']>>,
]

type A<T> = T extends  [infer L , ...infer R] ? L : T;
type c = A<[5]>
type CC = Flatten<[[[5]]]>
type B =Flatten<[1, 2, [3, 4], [[[5]]]]>
type D = Flatten<[1, [2]]>