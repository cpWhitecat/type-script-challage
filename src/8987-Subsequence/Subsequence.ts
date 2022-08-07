type normal<T extends any[]> = T extends [infer L ,...infer Rest] ? [L] | normal<Rest> : []

// type TupleExclude<T extends any[] , V extends any[]= []> = V extends infer P ? (T extends [...infer L , ...P[] , ...infer R] ? [...L,...R] : never) : never


// Fill 估计也是同样的问题 为什么没有推导出预期类型 还是说ts不支持这样的写法
type TupleExclude<T extends any[] , V extends any[]= []> = V extends infer P ? [V,P] : never

type Subsequence<T extends any[]> = | TupleExclude<T,normal<T>>


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../../utils'

type cases = [
  Expect<Equal<Subsequence<[1, 2]>, [] | [1] | [2] | [1, 2]>>,
  Expect<Equal<Subsequence<[1, 2, 3]>, [] | [1] | [2] | [1, 2] | [3] | [1, 3] | [2, 3] | [1, 2, 3] >>,
]

type D =normal<[1, 2, 3]>

type P = TupleExclude<[1, 2, 3],normal<[1,2,3]>>
type F = Subsequence<[1,2]>

type B = [1,3,5] extends [1,...infer A] ? A : never