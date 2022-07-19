import type {MyAwaited} from '../189-awaited/awaited'

declare function PromiseAll<T extends any[] =any[]>(values: readonly [...T] ):Promise<{
    [P in keyof T]:  MyAwaited<T[P]> 
}>

// 一起做过的类型体操没运用起来 把awaited忘了，而且没有好好想，今天睡的是真少，怪睡的少，而且看到Promise有点怂


/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '../../utils'

const promiseAllTest1 = PromiseAll([1, 2, 3] as const)
const promiseAllTest2 = PromiseAll([1, 2, Promise.resolve(3)] as const)
const promiseAllTest3 = PromiseAll([1, 2, Promise.resolve(3)])

type cases = [
  Expect<Equal<typeof promiseAllTest1, Promise<[1, 2, 3]>>>,
  Expect<Equal<typeof promiseAllTest2, Promise<[1, 2, number]>>>,
  Expect<Equal<typeof promiseAllTest3, Promise<[number, number, number]>>>,
]



