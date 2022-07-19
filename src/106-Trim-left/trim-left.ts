type MyEscape<S extends string> = S extends `${infer A}${infer B}` ? TrimLeft<B> : never
type TrimLeft<S extends string> = S extends '' ?
    S:

    S extends `${infer A}${infer B}` ?

        A extends ' ' ? 
            TrimLeft<B>
            : A extends '\n' | '\t' ? MyEscape<B> : `${A}${B}`

:never

// ts中对于转义符的处理是 把整个转义符取出来的
/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../../utils'

type cases = [
  Expect<Equal<TrimLeft<'str'>, 'str'>>,
  Expect<Equal<TrimLeft<' str'>, 'str'>>,
  Expect<Equal<TrimLeft<'     str'>, 'str'>>,
  Expect<Equal<TrimLeft<'     str     '>, 'str     '>>,
  Expect<Equal<TrimLeft<'   \n\t foo bar '>, 'foo bar '>>,
  Expect<Equal<TrimLeft<''>, ''>>,
  Expect<Equal<TrimLeft<' \n\t'>, ''>>,
]


type a = TrimLeft<'   \n\t foo bar '>
type b = TrimLeft<' \n\t'>
 "    str"
"     str"