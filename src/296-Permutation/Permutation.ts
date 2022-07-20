
// type Permutation<T,U=T> = T extends infer P ? [P,...Permutation<>] : never
// 上面想法是没错的，但今天状态实在太差

type Permutation<T,U=T> = 
    [U] extends [never] 
    ? [] 
    : T extends U 
        ? [T,...Permutation<Exclude<U,T>>]
        :never 
// 官方文档中，介绍了一种操作，叫 Distributive conditional types
// 简单来说，传入给T extends U中的T如果是一个联合类型A | B | C，则这个表达式会被展开成
// (A extends U ? X : Y) | (B extends U ? X : Y) | (C extends U ? X : Y)
// [U] extends [never] 而不是 U extends never 因为  U是联合类型 条件类型会走分配得到的是一个联合类型  不符合期望

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../../utils'

type cases = [
  Expect<Equal<Permutation<'A'>, ['A']>>,
  Expect<Equal<Permutation<'A' | 'B' | 'C'>, ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']>>,
  Expect<Equal<Permutation<'B' | 'A' | 'C'>, ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']>>,
  Expect<Equal<Permutation<boolean>, [false, true] | [true, false]>>,
  Expect<Equal<Permutation<never>, []>>,
]

type A = ['A' , 'B' , 'C'];
type B = ['A', 'C', 'B']

type c = Permutation<'A' | 'B' | 'C'>
type T = 'A' | 'B' | 'C'
type P = 'A'
type ab = Exclude<T,P>