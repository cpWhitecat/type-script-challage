type toCreate<A,  union extends keyof A> = {
    [P in union]:A[P]
}
type GetRequired<T> = keyof T extends keyof ( Partial<infer PB> ) ? PB  :false
type To = GetRequired<{ foo: number; bar?: string }>


/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '../../utils'

type cases = [
  Expect<Equal<GetRequired<{ foo: number; bar?: string }>, { foo: number }>>,
  Expect<Equal<GetRequired<{ foo: undefined; bar?: undefined }>, { foo: undefined }>>,
]


