type IsRequiredKey<T, K extends keyof T , U = keyof GetRequired<T>> =
boolean extends (K extends U ? true :false) 
? false 
: (K extends U ? true :false) 


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../../utils'
import { GetRequired } from '../57-GetRequired/GetRequired';

type cases = [
  Expect<Equal<IsRequiredKey<{ a: number; b?: string }, 'a'>, true>>,
  Expect<Equal<IsRequiredKey<{ a: number; b?: string }, 'b'>, false>>,
  Expect<Equal<IsRequiredKey<{ a: number; b?: string }, 'b' | 'a'>, false>>,
]


type test1 = IsRequiredKey<{ a: number; b?: string },  'a'>