type rule = 'A' | 'F' | 'B' | 'C'

// 预处理一下
type Load<S> = S extends `${infer FF}${infer P}` ? `${Lowercase<FF>}${P}` : S

type KebabCase<S , U extends boolean = false> = U extends true ? S extends `${infer A}${infer B}` ? (A extends ('A' | 'F' | 'B' | 'C' ) ? `-${Lowercase<A>}${KebabCase<B,true>}` : `${A}${KebabCase<B,true>}`) : S : KebabCase<Load<S>,true>


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../../utils'

type cases = [
  Expect<Equal<KebabCase<'FooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'fooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'foo-bar'>, 'foo-bar'>>,
  Expect<Equal<KebabCase<'foo_bar'>, 'foo_bar'>>,
  Expect<Equal<KebabCase<'Foo-Bar'>, 'foo--bar'>>,
  Expect<Equal<KebabCase<'ABC'>, 'a-b-c'>>,
  Expect<Equal<KebabCase<'-'>, '-'>>,
  Expect<Equal<KebabCase<''>, ''>>,
  Expect<Equal<KebabCase<'😎'>, '😎'>>,
]

type C<S> = S extends `${infer A}${infer B}` ? `${Lowercase<A>}${C<B>}` : S
type A = KebabCase<'ABC'>