type handleFirst<S extends string> = S extends `${infer F}${infer Next}` ? Next : S

type joining<U extends any[],delimiter extends string,Cache extends string= ''> =  U extends [infer F extends string ,...infer Rest] ? joining<Rest,delimiter,`${Cache}${delimiter}${F}`> : delimiter extends '' ? Cache: handleFirst<Cache>

declare function join<T extends string>(delimiter: T): <U extends string[]>(...parts: U) => joining<U,T>


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../../utils'

// Edge cases
const noCharsOutput = join('-')()
const oneCharOutput = join('-')('a')
const noDelimiterOutput = join('')('a', 'b', 'c')

// Regular cases
const hyphenOutput = join('-')('a', 'b', 'c')
const hashOutput = join('#')('a', 'b', 'c')
const twoCharOutput = join('-')('a', 'b')
const longOutput = join('-')('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h')

type cases = [
  Expect<Equal<typeof noCharsOutput, ''>>,
  Expect<Equal<typeof oneCharOutput, 'a'>>,
  Expect<Equal<typeof noDelimiterOutput, 'abc'>>,
  Expect<Equal<typeof twoCharOutput, 'a-b'>>,
  Expect<Equal<typeof hyphenOutput, 'a-b-c'>>,
  Expect<Equal<typeof hashOutput, 'a#b#c'>>,
  Expect<Equal<typeof longOutput, 'a-b-c-d-e-f-g-h'>>,
]

type Test1 =typeof hashOutput