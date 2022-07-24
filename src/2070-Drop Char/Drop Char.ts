type DropChar<S, C> = S extends `${infer A}${infer B}` ? A extends C ? `${DropChar<B,C>}` : `${A}${DropChar<B,C>}` : ''


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../../utils'

type cases = [
  // @ts-expect-error
  Expect<Equal<DropChar<'butter fly!', ''>, 'butterfly!'>>,
  Expect<Equal<DropChar<'butter fly!', ' '>, 'butterfly!'>>,
  Expect<Equal<DropChar<'butter fly!', '!'>, 'butter fly'>>,
  Expect<Equal<DropChar<'    butter fly!        ', ' '>, 'butterfly!'>>,
  Expect<Equal<DropChar<' b u t t e r f l y ! ', ' '>, 'butterfly!'>>,
  Expect<Equal<DropChar<' b u t t e r f l y ! ', 'b'>, '  u t t e r f l y ! '>>,
  Expect<Equal<DropChar<' b u t t e r f l y ! ', 't'>, ' b u   e r f l y ! '>>,
]

type C<S>  = S extends `${infer A}${infer B}` ? A : B
type b = C<' b'>