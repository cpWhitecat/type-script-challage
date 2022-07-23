type rule = 'A' | 'F' | 'B' | 'C'
type KebabCase<S> = S extends `${infer A}${infer B}` ? 'A' | 'F' | 'B' | 'C' extends A ? `-${Lowercase<A>}${KebabCase<B>}` : `${A}${KebabCase<B>}` : S


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

type C<S> = S extends `${infer A}${infer B}` ? `${'P'}${C<B>}` : false
type A = C<'fooBarBaz'>