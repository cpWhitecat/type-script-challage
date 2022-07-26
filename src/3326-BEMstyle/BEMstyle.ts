type KB<T extends string[]> =T[number] extends infer P ? P: never
type BEM<B extends string, E extends string[], M extends string[]> = 
    B extends `${infer All}` 
    ?  E extends [] 
        ?  M extends [] ? B : `${B}--${M[number]}`
        :  M extends [] ? `${B}__${E[number]}` : `${B}__${E[number]}--${M[number]}`
    :B

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../../utils'

type cases = [
  Expect<Equal<BEM<'btn', ['price'], []>, 'btn__price'>>,
  Expect<Equal<BEM<'btn', ['price'], ['warning', 'success']>, 'btn__price--warning' | 'btn__price--success' >>,
  Expect<Equal<BEM<'btn', [], ['small', 'medium', 'large']>, 'btn--small' | 'btn--medium' | 'btn--large' >>,
]

type B<T extends string[]> =T[number] extends infer P ? P: never
type C = BEM<'btn', [], ['small', 'medium', 'large']>
type D= BEM<'btn', ['price'], []>
type E = BEM<'btn', [], ['small', 'medium', 'large']>
type P =  [1] extends [] ? true : false