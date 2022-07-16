type MyReadonly<T> = {
    readonly [P in keyof T] : T[P]
}
//题目不要看错了 之前以为要实现readonly这个关键字的实现

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '../../utils'

type cases = [
  Expect<Equal<MyReadonly<Todo1>, Readonly<Todo1>>>,
]

interface Todo1 {
  title: string
  description: string
  completed: boolean
  meta: {
    author: string
  }
}


// js

function MyReadonly(Todo,keys){
    const obj  = {};

    keys.forEach((key)=>{
        if(key in Todo){
            obj[key] = Todo[key]
        }
        
    })

    return obj
}