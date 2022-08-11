type Str2Union<T extends string, R extends string[] = []> = T extends `${infer F}${infer Rest extends string}` ? Str2Union<Rest, [...R, F]> : R[number];

type ABCMap = Str2Union<'ABCDEFGHIJKLMNOPQRSTUVWXYZ'>;

// 这题的目的就是为了驼峰
// 题目规则 '_'后面的字符都大写首个 并且删掉
type lowCaseAll<S extends string> = Lowercase<S>

type testLowCaseAll = lowCaseAll<'foo_Bar_hello_world'>//OK


type CamelCase<S extends string,Cache extends string = '' , nextUpperCase extends boolean = false> = Lowercase<S> extends `${infer F}${infer Rest}`
  ? F extends '_' ? CamelCase<Rest,`${Cache}`,true> : (nextUpperCase extends true ? CamelCase<Rest,`${Cache}${Uppercase<F>}`>:CamelCase<Rest,`${Cache}${F}`>)
  :Cache


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../../utils'

type cases = [
  Expect<Equal<CamelCase<'foobar'>, 'foobar'>>,
  Expect<Equal<CamelCase<'FOOBAR'>, 'foobar'>>,
  Expect<Equal<CamelCase<'foo_bar'>, 'fooBar'>>,
  Expect<Equal<CamelCase<'foo_bar_hello_world'>, 'fooBarHelloWorld'>>,
  Expect<Equal<CamelCase<'HELLO_WORLD_WITH_TYPES'>, 'helloWorldWithTypes'>>,
  Expect<Equal<CamelCase<'-'>, '-'>>,
  Expect<Equal<CamelCase<''>, ''>>,
  Expect<Equal<CamelCase<'😎'>, '😎'>>,
]

type Test1 = CamelCase<'HELLO_WORLD_WITH_TYPES'>