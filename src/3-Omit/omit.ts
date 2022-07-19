import { Equal } from "../../utils"
// 排除
type MyExclude<C,P>= C extends P ? never : C;
type MyOmit<T, K extends keyof T> = {
  [P in MyExclude<keyof T,K>]:T[P]
}

// 理想P 是 {title:sting,completed:boolean} 为true
// P 肯定不继承 T['discription'] 返回 P 
// 为什么能用exclude😭😭😭,虽然体操没讲不能用，为什么我™不用啊


/* _____________ 测试用例 _____________ */
import type { Expect } from '../../utils'

type cases = [
  Expect<Equal<Expected1, MyOmit<Todo, 'description'>>>,
  Expect<Equal<Expected2, MyOmit<Todo, 'description' | 'completed'>>>,
]

// @ts-expect-error
type error = MyOmit<Todo, 'description' | 'invalid'>

interface Todo {
  title: string
  description: string
  completed: boolean
}

interface Expected1 {
  title: string
  completed: boolean
}

interface Expected2 {
  title: string
}
type ccc = Todo['description' | 'completed']

type cccp = 'description' extends 'description' | 'completed'  ? true : false;  // true
type cccd =   'description' | 'completed' extends 'descridtion'  ? true : false;  // false


// js

// function omit(obj,key){
  
// }