import type {Equal} from '../../utils'
import type {Push} from '../3057-push/push'
export type MyParameters<T extends (...args: any[]) => any> = T extends (...args:infer Args)=>any ? Args : []  //😭😭😭 没做出来 ， 不知道 infer 在函数签名里的写法


/* _____________ Test Cases _____________ */
import type {  Expect } from '../../utils'


const foo = (arg1: string, arg2: number): void => {}
const bar = (arg1: boolean, arg2: { a: 'A' }): void => {}
const baz = (): void => {}

type cases = [
  Expect<Equal<MyParameters<typeof foo>, [string, number]>>,
  Expect<Equal<MyParameters<typeof bar>, [boolean, { a: 'A' }]>>,
  Expect<Equal<MyParameters<typeof baz>, []>>,
]


//先递归遍历 用之前的Push例子 添加到数组 这个数组需要被持续添加 肯定要给个泛型  结束条件就是 Equal<args["length"],0>

// js

// function parameters(...args){
//     const arr = [];
//     for (let i = 0; i < args.length; i++) {
//         arr[i] = args[i]
        
//     }

//     return arr
// }



// type 