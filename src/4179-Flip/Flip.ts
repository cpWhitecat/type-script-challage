type Flip<T> = {
    [P in keyof T as T[P] extends (string|number|symbol|boolean) ? `${T[P]}` : never ]:P
}


/* _____________ Test Cases _____________ */
import type { Equal, Expect, NotEqual } from '../../utils'

type cases = [
  Expect<Equal<{ a: 'pi' }, Flip<{ pi: 'a' }>>>,
  Expect<NotEqual<{ b: 'pi' }, Flip<{ pi: 'a' }>>>,
  Expect<Equal<{ 3.14: 'pi'; true: 'bool' }, Flip<{ pi: 3.14; bool: true }>>>,
  Expect<Equal<{ val2: 'prop2'; val: 'prop' }, Flip<{ prop: 'val'; prop2: 'val2' }>>>,
]

type B = {true:'bool'}
type C = Flip<{ pi: 3.14; bool: true }>