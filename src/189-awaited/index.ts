type MyAwaited<T extends Promise<unknown>> = T extends Promise<(infer P)> ? P extends Promise<unknown> ? MyAwaited<P>  : P : T 
// 限制输入 一定是promise 
/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '../../utils'

type X = Promise<string>
type Y = Promise<{ field: number }>
type Z = Promise<Promise<string | number>>
type Z1 = Promise<Promise<Promise<string | boolean>>>

type cases = [
  Expect<Equal<MyAwaited<X>, string>>,
  Expect<Equal<MyAwaited<Y>, { field: number }>>,
  Expect<Equal<MyAwaited<Z>, string | number>>,
  Expect<Equal<MyAwaited<Z1>, string | boolean>>,
]

// @ts-expect-error
type error = MyAwaited<number>  // 这边没有想到解决方法

type testPromiseAwaited<C> = C extends Promise<(infer P)> ? P : symbol;
let te : testPromiseAwaited<number> = ()=>{}
