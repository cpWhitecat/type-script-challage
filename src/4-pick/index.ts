type MyPick<T, K extends keyof T> = {
 [ P in K ]:T[P]
}//具体思路就是有个泛型P继承自泛型K 然后再用P in T


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../../utils'

type cases = [
  Expect<Equal<Expected1, MyPick<Todo, 'title'>>>,
  Expect<Equal<Expected2, MyPick<Todo, 'title' | 'completed'>>>,
  // @ts-expect-error
  MyPick<Todo, 'title' | 'completed' | 'invalid'>,
]

interface Todo {
  title: string
  description: string
  completed: boolean
}

interface Expected1 {
  title: string
}

interface Expected2 {
  title: string
  completed: boolean
}

type testA = string | number;
type testB<T extends testA> = T


let a : testB<string> = 'st'