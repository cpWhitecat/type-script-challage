type Flatten<T>=

 



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

type A = Flatten<[1, [2]]>
type B =Flatten<[1, 2, [3, 4], [[[5]]]]>