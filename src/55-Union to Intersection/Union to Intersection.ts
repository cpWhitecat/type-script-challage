type UnionToIntersection<T> = 
(T extends T ?((k:T)=>any) : never) extends ((k:infer P)=>any) ? P :never

// T extends infer head | infer next ? [head,...UnionToIntersection<Exclude<head,next>>] : [T]  error 的想法
// 这题需要借助数组推断类型


/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '../../utils'
import { TupleToUnion } from '../10-tupleToUnion/tupleToUnion'

type cases = [
  Expect<Equal<UnionToIntersection<'foo' | 42 | true>, 'foo' & 42 & true>>,
  Expect<Equal<UnionToIntersection<(() => 'foo') | ((i: 42) => true)>, (() => 'foo') & ((i: 42) => true)>>,
]

// hard 需要对类型推导更加了解 才能很好的做出来
// 如下次 还有不懂 可看例子 https://github.com/type-challenges/type-challenges/issues/11283
// https://github.com/type-challenges/type-challenges/issues/10984
type UnionToIntersectiontest = ((a:1|2)=>any) extends ((a:1&2)=>any) ? true :false


type toFunctionarg<U> = (arg:U)=> any

type A = toFunctionarg<1|2>      // (arg:1|2)=>any  



type expandFunction<U> = U extends U ? (arg:U)=>any :never

type B  =expandFunction<1|2>   // return (arg:1)=>any | (arg:2)=>any

type testB = ((arg:1)=>any | ((arg:2)=>any) ) extends (arg:1&2) => any ? true :never
// type testBp= Expect<Equal<testB, 1 & 2>>

type toIntersectionFunction<U> = expandFunction<U> extends toFunctionarg<infer P> ? P :never
type C  = toIntersectionFunction<1|2>
type DDD =Expect<Equal<toIntersectionFunction<1 | 2>, 1 & 2>>





type ToFunctionArg1<U> = (_: U) => any
type _2a = Expect<Equal<ToFunctionArg1<1 | 2>, (_: 1 | 2) => any>>

type ExpandFunctionArg1<U> = U extends any ? ToFunctionArg1<U> : never
type _2b = ExpandFunctionArg1<1 | 2>
type IntersectFunctionArg1<U> = ExpandFunctionArg1<U> extends ToFunctionArg1<infer I> ? I : never
type _2c = Expect<Equal<IntersectFunctionArg1<1 | 2>, 1 & 2>>