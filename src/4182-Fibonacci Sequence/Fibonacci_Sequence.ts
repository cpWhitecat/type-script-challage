// 感觉要用到MinusOne了
type LastArrayValue<T extends any[]> = T extends [...infer Before , infer Last] ? Last : never


// 进位操作如何解决？？
// 或许不用考虑 做加法的数组溢出的问题 ，不然例子数字也不会很小

// 加法
export type Length<T extends any[]> = 
    T extends { length: infer L } ? L : 0;

type BuildTuple<L extends number, T extends any[] = []> = 
    T extends { length: L } ? T : BuildTuple<L, [...T, any]>;

export type Add<A extends number, B extends number> = 
    Length<[...BuildTuple<A>, ...BuildTuple<B>]>;



type Fibonacci<T extends number,U extends any[] = [0,1,1]> = T extends 1|2 
? 1 
: MinusOne<U['length']> extends T ? LastArrayValue<U> : U extends [...infer L, infer two extends number , infer one extends number] ? Fibonacci<T,[...U,Add<two,one>]> :never

// 这题不知道3 是按照什么规则到 2 我感觉是从leetcode里面的题过来的
// 已经读懂了
// 处理加法 感觉只能用数组length实现了 但始终觉得这样的代码不够健壮 那种很大很大的斐波那契数列 我感觉用不到，所以不需要考虑数组堆栈溢出，

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '../../utils'
import { MinusOne } from '../2257-MinusOne/MinusOne'

type cases = [
  Expect<Equal<Fibonacci<3>, 2>>,
  Expect<Equal<Fibonacci<8>, 21>>,
]

// 这是种新的获取数组长度的方法 至于为什么我想不懂

// 我想我知道为什么了 ， 因为万物都是对象，
// 所以 再数组最后键入个length 其实就是在对象后面键入length这个字段
type B<T extends any[]> =any[] extends {}? true :false
type C = B<[]>