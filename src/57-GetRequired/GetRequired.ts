type toCreate<A,  union extends keyof A> = {
    [P in union]:A[P]
}
// 键映射 。。。没想到
type Same<A,B> = (((F:A)=>any) | ((F:B)=>any)) extends (F:infer I)=>any ? I :never

export type GetRequired<T> = {
  [P in keyof T as T[P] extends Required<T>[P] ? P :never]:T[P]
}

type To = GetRequired<{ foo: number; bar?: string }>

type TestUnion ={ foo: number; bar?: string } extends ({
  foo: number;
  bar?: string | undefined;
} &{
  foo:number;
  bar:string|undefined
})?true :false


/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '../../utils'

type cases = [
  Expect<Equal<GetRequired<{ foo: number; bar?: string }>, { foo: number }>>,
  Expect<Equal<GetRequired<{ foo: undefined; bar?: undefined }>, { foo: undefined }>>,
]


