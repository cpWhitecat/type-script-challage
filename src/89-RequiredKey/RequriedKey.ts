type RequiredKeys<T> = keyof GetRequired<T>


/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '../../utils'
import { GetRequired } from '../57-GetRequired/GetRequired';

type cases = [
  Expect<Equal<RequiredKeys<{ a: number; b?: string }>, 'a'>>,
  Expect<Equal<RequiredKeys<{ a: undefined; b?: undefined }>, 'a'>>,
  Expect<Equal<RequiredKeys<{ a: undefined; b?: undefined; c: string; d: null }>, 'a' | 'c' | 'd'>>,
  Expect<Equal<RequiredKeys<{}>, never>>,
]