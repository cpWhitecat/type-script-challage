type Join<T, U extends number | string > = T extends [infer F extends string, ...infer rest] ? T['length'] extends 1 ? `${F}` :`${F}${U}${Join<rest,U>}` :''


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../../utils'

type cases = [
  Expect<Equal<Join<['a', 'p', 'p', 'l', 'e'], '-'>, 'a-p-p-l-e'>>,
  Expect<Equal<Join<['Hello', 'World'], ' '>, 'Hello World'>>,
  Expect<Equal<Join<['2', '2', '2'], 1>, '21212'>>,
  Expect<Equal<Join<['o'], 'u'>, 'o'>>,
]

type B= Join<['2', '2', '2'], 1>
type C =Join<['a', 'p', 'p', 'l', 'e'], '-'>