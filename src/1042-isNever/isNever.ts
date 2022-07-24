type IsNever<T> =   [T]  extends [never]  ? true : false

// [T] extends [never] 这样的写法我肯定用过 ，好吧 是在isUnion中使用的
// so remember 当有时需要用到union时 可以使用[] 去约束union
/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../../utils'

type cases = [
  Expect<Equal<IsNever<never>, true>>,
  Expect<Equal<IsNever<never | string>, false>>,
  Expect<Equal<IsNever<''>, false>>,
  Expect<Equal<IsNever<undefined>, false>>,
  Expect<Equal<IsNever<null>, false>>,
  Expect<Equal<IsNever<[]>, false>>,
  Expect<Equal<IsNever<{}>, false>>,
]

type B<P = never> = P extends never ? true :false
type C = B