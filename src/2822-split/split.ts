type Split<S extends string, SEP extends string , Cache extends string = ''> = S extends `${infer L}${infer R}` ? (
    L extends SEP ? [Cache,...Split<`${R}`,SEP>] : [...Split<`${R}`,SEP,`${Cache}${L}`>]
) : [Cache]


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../../utils'

type cases = [
  Expect<Equal<Split<'Hi! How are you?', 'z'>, ['Hi! How are you?']>>,
  Expect<Equal<Split<'Hi! How are you?', ' '>, ['Hi!', 'How', 'are', 'you?']>>,
  Expect<Equal<Split<'Hi! How are you?', ''>, ['H', 'i', '!', ' ', 'H', 'o', 'w', ' ', 'a', 'r', 'e', ' ', 'y', 'o', 'u', '?']>>,
  Expect<Equal<Split<'', ''>, []>>,
  Expect<Equal<Split<'', 'z'>, ['']>>,
  Expect<Equal<Split<string, 'whatever'>, string[]>>,
]


type Test1 =Split<'Hi! How are you?', 'z'>

type Test2 = Split<'Hi! How are you?', ''>

type Test3 = Split<string, 'whatever'>