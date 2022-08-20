import type {Push} from '../3057-push/push'
import type {TupleToUnion} from '../10-tupleToUnion/tupleToUnion'
type MyExculde<T,U> = T extends U ? never : T 


// 去重
// 如果会 union to tuple 这题会看上去更加简单
// 判断的时候 每个都把数组变成union类型比较就可以了  ❌❌❌❌❌

// 实际遇到的问题就是 string number any unkown never怎么处理 ， 他们是肯定不继承自union类型
// 难不成只有四方法了 ？ 每次比较都遍历一遍数组， 

// 想想如何实现UnionToTuple
type UnionToTuple<T> = T extends infer U ? true : false
type ExtendsTest = [1] extends [1,2] ? true:false

type Unique<T,Cache extends any[]=[] ,union =TupleToUnion<Cache> > = T extends [infer F ,...infer Rest]
? ([F] extends [union] ? Unique<Rest,Cache> : Unique<Rest,[...Cache,F]>)
: union
/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../../utils'
// union to tuple
type cases = [
  Expect<Equal<Unique<[1, 1, 2, 2, 3, 3]>, [1, 2, 3]>>,
  Expect<Equal<Unique<[1, 2, 3, 4, 4, 5, 6, 7]>, [1, 2, 3, 4, 5, 6, 7]>>,
  Expect<Equal<Unique<[1, 'a', 2, 'b', 2, 'a']>, [1, 'a', 2, 'b']>>,
  Expect<Equal<Unique<[string, number, 1, 'a', 1, string, 2, 'b', 2, number]>, [string, number, 1, 'a', 2, 'b']>>,
  Expect<Equal<Unique<[unknown, unknown, any, any, never, never]>, [unknown, any, never]>>,
]
type B = [1,2,3]
type C = B['1']
type D = Unique<[1, 1, 2, 2, 3, 3]>

type F = 1 |2 | 3
type G = F extends 1 ? never : false
type Q =TupleToUnion<[unknown, unknown, any, any, never, never]>





type TupleToUnionReturnTuple<T> =T extends (string|symbol|number|boolean)[] | any[]  ? T[number] : T

type test2 = TupleToUnionReturnTuple<[1, 2, 3, 4, 4, 5, 6, 7]>

type UnionToFunction<T> = (K:T)=>any

type Unions<T> = T extends any ? UnionToFunction<T> : never

type resultFunction = Unions<1|2> extends UnionToFunction<infer P> ? P :never
// 类型时推导出来了 没错 ，但是ts没有提示.



type ArgsFunction<T> =[T]

