type MyEscape<S extends string> = S extends `${infer A}${infer B}` ? TrimLeft<B> : never
type stringExclude = ' ' | '\n' | '\t' 
export type TrimLeft<S extends string> = S extends `${stringExclude}${infer rest}` ?  TrimLeft<rest> : S


// 这是自己的 有点拉。。
type TrimLeft2<S extends string> = S extends '' ?
    S:

    S extends `${infer A}${infer B}` ?

        A extends ' ' ? 
            TrimLeft2<B>
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