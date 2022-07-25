type PartialAll<T> = {[P in keyof T]:T[P]}
type PartialByKeys<T,K = unknown> = PartialAll<Omit<T,Extract<keyof T , K>>&{
    [P in Extract<keyof T , K> ]?:T[P]
}>
// {} & {} 这样的方式并不能等于 同样key 和 value 的 {} 所以需要再外套一个遍历这里的key

// type PartialByKeys<T, K = unknown> = Omit<keyof T, K> &{  //这里的K 会报错 就是因为里面的K可能不属于T的key ,这时候使用Extract 把 相同的键取出来 变成一个union类型 这个union 肯定包含于 keyof T , 所以当key 不属于T 时 依旧能排除
//     [P in  Exclude<keyof T,K> ]:T[P]
// }


// 待自己的想法实现
// type Myinclude<T,K> = K extends keyof T ? K : never;
// type PartialByKeys<T, K = keyof T> = {
//     [P in Myinclude<T,K>  ] + ?: P extends keyof T ? T[P] : never
// } &{
//     [P in  Exclude<keyof T,K> ]:T[P]
// }


/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '../../utils'

interface User {
  name: string
  age: number
  address: string
}

interface UserPartialName {
  name?: string
  age: number
  address: string
}

interface UserPartialNameAndAge {
  name?: string
  age?: number
  address: string
}

type cases = [
  Expect<Equal<PartialByKeys<User, 'name'>, UserPartialName>>,
  Expect<Equal<PartialByKeys<User, 'name' | 'unknown'>, UserPartialName>>,
  Expect<Equal<PartialByKeys<User, 'name' | 'age'>, UserPartialNameAndAge>>,
  Expect<Equal<PartialByKeys<User>, Partial<User>>>,
]

type B =PartialByKeys<User, 'name' | 'age'>
type C = PartialByKeys<User>

interface A {
    name: string
    age: number
    address: string
  }

type K<T,K> = K extends keyof T ? K :never

type D  = K<A,'name' | 'unknown'>
type F = Equal<{
    name?: string 
    age?: number 
} & {
    address: string;
},UserPartialName>

