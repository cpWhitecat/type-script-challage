type simple<T> = {[P in keyof T]:T[P]}
type RequiredByKeys<T, K = unknown> = simple<

    {[P in Extract<keyof T , K>]-?:Exclude<T[P],undefined> } &
    Omit<T,Extract<keyof T, K>>
>
// 因为是从可选属性过来的 所以 T[P] 会有等于undefined的可能性 应该是所带的默认规则

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '../../utils'

interface User {
  name?: string
  age?: number
  address?: string
}

interface UserRequiredName {
  name: string
  age?: number
  address?: string
}

interface UserRequiredNameAndAge {
  name: string
  age: number
  address?: string
}

type cases = [
  Expect<Equal<RequiredByKeys<User, 'name'>, UserRequiredName>>,
  Expect<Equal<RequiredByKeys<User, 'name' | 'unknown'>, UserRequiredName>>,
  Expect<Equal<RequiredByKeys<User, 'name' | 'age'>, UserRequiredNameAndAge>>,
  Expect<Equal<RequiredByKeys<User>, Required<User>>>,
]
type C = RequiredByKeys<User, 'name' | 'age'>