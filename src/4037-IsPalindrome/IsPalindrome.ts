import { Equal } from '../../utils'
import {Reverse} from '../3192-Reverse/Reverse'

// type toFind<T,F> = T extends `${infer L}${infer LeftEqual}${infer center}${Reverse<LeftEqual>}`

type IsPalindrome<T extends string | number , StringCache extends string = ''> = 
`${T}` extends `${infer F}${infer Next}` 
? (Equal<Next,StringCache> extends true ? true : IsPalindrome<Next,`${F}${StringCache}`> )
: false

// ...忘记水仙花数怎么做了

// 这题目例子是否还有更加严格的例子 ， 比如说 第一个字符或数字 根本不包括在水仙花数中 ， 或者不止一个水仙花数
// 好吧 ，是我理解错题意了 是判断是否为回文 ，而不是判断里面是否有回文

/* _____________ Test Cases _____________ */
import type { Expect } from '../../utils'

type cases = [
  Expect<Equal<IsPalindrome<'abc'>, false>>,
  Expect<Equal<IsPalindrome<'b'>, true>>,
  Expect<Equal<IsPalindrome<'abca'>, false>>,
  Expect<Equal<IsPalindrome<'abcba'>, true>>,
  Expect<Equal<IsPalindrome<121>, true>>,
  Expect<Equal<IsPalindrome<19260817>, false>>,
]


type testb = IsPalindrome<'abcba'>