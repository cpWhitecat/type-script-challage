import type { Equal, Expect } from '../../utils'

// S extends `${infer L}${infer R}` ? (
//     L extends SEP ? [Cache,...Split<`${R}`,SEP>] : [...Split<`${R}`,SEP,`${Cache}${L}`>]
// ) : [Cache]
// type stringToTuple<S> = S extends `${infer }`

// 取出末尾['']
type DelLast<T,SEP extends string> = SEP extends '' ? (T extends [...infer Rest , infer Last] ? Last extends '' ? [...Rest] : T :T ) : T

type result<S extends string, SEP extends string> = S extends `${infer L}${SEP}${infer R}` ? [L,...Split<`${R}`,SEP>] : [S]

type Split<S extends string, SEP extends string> = Equal<S,string> extends true ? S[] : DelLast<result<S,SEP>,SEP>

// 东拼西凑算是解决了 ， 而且也算做了个优化

/* _____________ Test Cases _____________ */


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

type Test4 = Split<'', 'z'>