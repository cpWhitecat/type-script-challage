export type GetOptional<T> ={
    [P in keyof T as T[P] extends Required<T>[P]?never :P]:T[P]
}
// 改变键的操作要想到键的重映射
/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../../utils'
import { GetRequired } from '../57-GetRequired/GetRequired';

type cases = [
  Expect<Equal<GetOptional<{ foo: number; bar?: string }>, { bar?: string }>>,
  Expect<Equal<GetOptional<{ foo: undefined; bar?: undefined }>, { bar?: undefined }>>,
]

type GetOptional1 = GetOptional<{ foo: number; bar?: string }>