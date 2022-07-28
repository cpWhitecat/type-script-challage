type Reverse<S extends string> = S extends `${infer A}${infer B}` ?  `${Reverse<B>}${A}` : S
type TrimRight<S extends string,Reversed = false> = Reversed extends false? TrimRight<Reverse<S>,true> : Reverse<TrimLeft<S>>
// 反转一下再使用TrimLeft

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../../utils'
import { TrimLeft } from '../106-Trim-left/trim-left'

type cases = [
  Expect<Equal<TrimRight<'str'>, 'str'>>,
  Expect<Equal<TrimRight<'str '>, 'str'>>,
  Expect<Equal<TrimRight<'str     '>, 'str'>>,
  Expect<Equal<TrimRight<'     str     '>, '     str'>>,
  Expect<Equal<TrimRight<'   foo bar  \n\t '>, '   foo bar'>>,
  Expect<Equal<TrimRight<''>, ''>>,
  Expect<Equal<TrimRight<'\n\t '>, ''>>,
]

type B = TrimRight<'   foo bar  \n\t '>