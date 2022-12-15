import {First} from '../14-firstArray/firstArray'
// type getFirstKey

// 如何把数组第一个数完完整整的取出来

// 感觉要使用tuple to object

type newFirst<T> = T extends [infer F , ...infer rest] ? F :never

type test1 = newFirst<[a: string, b: number, c: boolean]>
// type currying<T extends (...args:any[])=>any , result= ReturnType<T>> = 
export type currying<T> = T extends ( ...args:infer P)=> infer result
  ? P extends [infer F,...infer rest] 
      ? (a:F)=> currying<(...args:rest)=>result> 
      :result :never

// 为什么类型推断有问题

// 我有点无语，理解错题意了

// P extends any[] ? { 
//   [K in keyof P]:K extends keyof P ? P[K] : never
// } :never:never


// 其他逻辑

declare function Currying<T>(fn: T ): currying<T>


// 这道题其实酸做出来了 在Currying<T> 对这个T 搞了个extends (...args:any[])=>any  
// 最后result 的类型是 boolean 这边感觉是形变的思想 ，就是类型扩展了 从ture 扩展成 boolean 我没彻底了解它的类型推导机制 ， 导致我没发现这个错误
// 而且对于 传入的值的名字是没有讲究的 在函数中 只是对值的类型数量是否可选做规范 

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '../../utils'
import { TupleToObject } from '../18-tuple_to_object/TupleToObject'

const curried1 = Currying((a: string, b: number, c: boolean) => true)
const curried2 = Currying((a: string, b: number, c: boolean, d: boolean, e: boolean, f: string, g: boolean) => true)

type cases = [
  Expect<Equal<
    typeof curried1, (a: string) => (b: number) => (c: boolean) => true
  >>,
  Expect<Equal<
    typeof curried2, (a: string) => (b: number) => (c: boolean) => (d: boolean) => (e: boolean) => (f: string) => (g: boolean) => true
  >>,
]

type test<T> = T extends (...args:infer P)=> any ? A : never
type D =typeof curried1


const result1 =  Currying((a: string) => true)
const result2 =  Currying((a: string, b: number) => '1')
const result3 =  Currying((a: string, b: number, c: boolean) => true)

type A = typeof result1
type B = typeof result2
type C = typeof result3

type DH = true extends infer A ? A :false


let A = true 
var B = true 
const C = true