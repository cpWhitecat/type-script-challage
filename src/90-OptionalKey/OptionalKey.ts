type OptionalKeys<T> =keyof GetOptional<T>


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../../utils'
import { GetOptional } from '../59-GetOption/GetOption';

type cases = [
  Expect<Equal<OptionalKeys<{ a: number; b?: string }>, 'b'>>,
  Expect<Equal<OptionalKeys<{ a: undefined; b?: undefined }>, 'b'>>,
  Expect<Equal<OptionalKeys<{ a: undefined; b?: undefined; c?: string; d?: null }>, 'b' | 'c' | 'd'>>,
  Expect<Equal<OptionalKeys<{}>, never>>,
]