// 跟sum是相同的思想 但是一位数乘以一位数有什么更好的实现 ，虽然 乘法就是加法

import { ExpectExtends } from "../../utils"
import { numberMap } from "../14118-Run-lengthEncoding/RunLengthEncoding"
import { MinusOne } from "../2257-MinusOne/MinusOne"
import { GetNumber, NewGreaterThan, ReverseString, Sum } from "../476-Sum/Sum"

// 思路
/**
 * 照样是先比较哪个数大，大的在前 ， 依旧反转
 * 
 */

/**
 * 如何处理0是一个问题 ， 如果是出现在中间 ， 那就
 */

type One_Multiply_One<A extends number , B extends number , Cache extends number = 0> = 0  extends A | B  ? `${Cache}` : One_Multiply_One<A,MinusOne<B>, GetNumber<Sum<Cache,A>>> 
type Test_One_Multiply_One = One_Multiply_One<7,9>

type HaveTenDigit<T extends number | string | bigint> = ReverseString<`${T}`> extends `${infer F}${infer next}` ? F : T
type GetTenDigit<T extends number | string | bigint> = `${T}` extends `${infer F}${infer Rest}` ? Rest : T
type TestHaveTenDigit = HaveTenDigit<89>

type One_Multiply_Every<long extends string , E extends string , Cache extends string = '' , TenDigit extends string = '0'> = 
long extends `${infer First extends number}${infer Rest}`
? 
    `${Cache}${HaveTenDigit<Sum<One_Multiply_One<GetNumber<E>,First>,TenDigit>>}`
: TenDigit

type Test_One_Multiply_Every = One_Multiply_Every<'76','3'>


type MultiplyEnd<short extends string , long extends string , result extends string = ''> = 
short extends `${infer F}${infer Next}`
? MultiplyEnd<Next,long,`${result}`>
: result


type Multiply<A extends string | number | bigint, B extends string | number | bigint> = 
'0' extends `${A}` | `${B}` 
? '0' 

: NewGreaterThan<GetNumber<`${A}`>,GetNumber<`${B}`>> extends false
  ? true :false


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../../utils'

type cases = [
  Expect<Equal<Multiply<2, 3>, '6'>>,
  Expect<Equal<Multiply<3, '5'>, '15'>>,
  Expect<Equal<Multiply<'4', 10>, '40'>>,
  Expect<Equal<Multiply<0, 16>, '0'>>,
  Expect<Equal<Multiply<'13', '21'>, '273'>>,
  Expect<Equal<Multiply<'43423', 321543n>, '13962361689'>>,
  Expect<Equal<Multiply<9999, 1>, '9999'>>,
  Expect<Equal<Multiply<4325234, '39532'>, '170985150488'>>,
  Expect<Equal<Multiply<100_000n, '1'>, '100000'>>,
  Expect<Equal<Multiply<259, 9125385>, '2363474715'>>,
  Expect<Equal<Multiply<9, 99>, '891'>>,
  Expect<Equal<Multiply<315, '100'>, '31500'>>,
  Expect<Equal<Multiply<11n, 13n>, '143'>>,
  Expect<Equal<Multiply<728, 0>, '0'>>,
  Expect<Equal<Multiply<'0', 213>, '0'>>,
  Expect<Equal<Multiply<0, '0'>, '0'>>,
]