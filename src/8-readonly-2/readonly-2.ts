type MyPick<T, K extends keyof T> = {
   readonly [ P in K ]:T[P]
   }
type MyReadonly2<T, K extends keyof T = keyof T> ={
    readonly [ P in K ]:T[P]
    } & {[P in  Exclude<keyof T,K>]:T[P]}
type ccc = MyReadonly2<Todo2, 'title' | 'description'>
type bbb = MyReadonly2<Todo1>


// 先

type testc = 'description' | 'completed' extends 'description' | 'completed' ? true : false
/* _____________ 测试用例 _____________ */
import type { Alike, Expect } from '../../utils'

type cases = [
  Expect<Alike<MyReadonly2<Todo1>, Readonly<Todo1>>>,
  Expect<Alike<MyReadonly2<Todo1, 'title' | 'description'>, Expected>>,
  Expect<Alike<MyReadonly2<Todo2, 'title' | 'description'>, Expected>>,
]

interface Todo1 {
  title: string
  description?: string
  completed: boolean
}

interface Todo2 {
  readonly title: string
  description?: string
  completed: boolean
}

interface Expected {
  readonly title: string
  readonly description?: string
  completed: boolean
}

