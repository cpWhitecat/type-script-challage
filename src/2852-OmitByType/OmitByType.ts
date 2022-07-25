type OmitByType<T, U> = {
    [P in keyof T as (T[P] extends U ? never : P)]:T[P]
}


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../../utils'

interface Model {
  name: string
  count: number
  isReadonly: boolean
  isEnable: boolean
}


type cases = [
  Expect<Equal<OmitByType<Model, boolean>, { name: string; count: number }>>,
  Expect<Equal<OmitByType<Model, string>, { count: number; isReadonly: boolean; isEnable: boolean }>>,
  Expect<Equal<OmitByType<Model, number>, { name: string; isReadonly: boolean; isEnable: boolean }>>,
]

type B =  Model