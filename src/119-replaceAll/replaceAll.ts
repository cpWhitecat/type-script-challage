type Replaced<S extends string , B extends string> = B extends '' ? S : never;
                                                                                                                                            // S  extends `${infer Before}` ? Before : 

type ReplaceAll<S extends string, From extends string, To extends string> = From extends '' ? S : S  extends `${infer A}${From}${infer B}` ? `${A}${To}${ReplaceAll<B,From,To>}`  : S


/* _____________ Test Cases _____________ */
// 哪里都可以用type 思想别局限

import type { Equal, Expect } from '../../utils'

type cases = [
  Expect<Equal<ReplaceAll<'foobar', 'bar', 'foo'>, 'foofoo'>>,
  Expect<Equal<ReplaceAll<'foobar', 'bag', 'foo'>, 'foobar'>>,
  Expect<Equal<ReplaceAll<'foobarbar', 'bar', 'foo'>, 'foofoofoo'>>,
  Expect<Equal<ReplaceAll<'t y p e s', ' ', ''>, 'types'>>,
  Expect<Equal<ReplaceAll<'foobarbar', '', 'foo'>, 'foobarbar'>>,
  Expect<Equal<ReplaceAll<'barfoo', 'bar', 'foo'>, 'foofoo'>>,
  Expect<Equal<ReplaceAll<'foobarfoobar', 'ob', 'b'>, 'fobarfobar'>>,
  Expect<Equal<ReplaceAll<'foboorfoboar', 'bo', 'b'>, 'foborfobar'>>,
  Expect<Equal<ReplaceAll<'', '', ''>, ''>>,
]





type A = ReplaceAll<'foobarfoobar', 'ob', 'b'>