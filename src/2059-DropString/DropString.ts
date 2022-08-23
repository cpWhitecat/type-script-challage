// 偷懒了 不想再添个数组存string了 虽然这样的代码很健壮

import { Equal } from "../../utils"

type StringToUnion<S> = S extends `${infer F}${infer R}` ? `${F}` | StringToUnion<`${R}`> : never

type DropString<S, R extends string, Cache extends string = '' , Unions = StringToUnion<R>> = S extends `${infer L}${infer Right}` ? (L extends Unions ? DropString<Right,R,Cache> : DropString<Right,R,`${Cache}${L}`>) :Cache


/* _____________ Test Cases _____________ */
import type { Expect } from '../../utils'

type cases = [
  Expect<Equal<DropString<'butter fly!', ''>, 'butter fly!'>>,
  Expect<Equal<DropString<'butter fly!', ' '>, 'butterfly!'>>,
  Expect<Equal<DropString<'butter fly!', 'but'>, 'er fly!'>>,
  Expect<Equal<DropString<' b u t t e r f l y ! ', 'but'>, '     e r f l y ! '>>,
  Expect<Equal<DropString<'    butter fly!        ', ' '>, 'butterfly!'>>,
  Expect<Equal<DropString<' b u t t e r f l y ! ', ' '>, 'butterfly!'>>,
  Expect<Equal<DropString<' b u t t e r f l y ! ', 'but'>, '     e r f l y ! '>>,
  Expect<Equal<DropString<' b u t t e r f l y ! ', 'tub'>, '     e r f l y ! '>>,
  Expect<Equal<DropString<' b u t t e r f l y ! ', 'b'>, '  u t t e r f l y ! '>>,
  Expect<Equal<DropString<' b u t t e r f l y ! ', 't'>, ' b u   e r f l y ! '>>,
]
