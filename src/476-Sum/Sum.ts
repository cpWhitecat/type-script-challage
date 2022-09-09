import type { Equal, Expect } from '../../utils'
import { stringtoTuple } from '../112-CapitalizeWords/CapitalizeWords'
import { Last } from '../15-LastArray/LastArrayType'
import { Comparator, Comparison } from '../274-IntegersComparator/IntegersComparator'
import { Reverse } from '../3192-Reverse/Reverse'
import { Add } from '../4182-Fibonacci Sequence/Fibonacci_Sequence'
import { GreaterThan } from '../4425-GreaterThan/GreaterThan'



export type GetNumber<S extends string> = S extends `${infer All extends number}` ? All : 0

export type ReverseString<S extends string, StringCache extends string = ''> = S extends `${infer F}${infer Next}` ? ReverseString<Next, `${F}${StringCache}`> : StringCache

type GetSecStr<S> = S extends `${infer F}${infer Next}` ? Next : S
type HandleNine<T extends number> = (T extends 9 ? 8 : 9)


type isOne<AF extends string, BF extends string, otherNumber extends string> =
  GreaterThan<AddEnd<AF, BF, otherNumber>, HandleNine<AddEnd<AF, BF, otherNumber>>>

type AddEnd<AF extends string, BF extends string, otherNumber extends string> = Add<Add<GetNumber<AF>, GetNumber<BF>>, GetNumber<otherNumber>>


// 重构 GreaterThan
type numberLess = { //这个我肯定写过 ， 但找不到了。。。
  '1':'0',
  '2':'1' | '0'
  '3':'2' | '1' |'0'
  '4':'3' | '2' | '1' | '0'
  '5':'4' | '3' | '2' | '1' | '0'
  '6':'5' | '4' | '3' | '2' | '1' | '0'
  '7':'6' | '5' | '4' | '3' | '2' | '1' | '0'
  '8':'7' | '6' | '5' | '4' | '3' | '2' | '1' | '0'
  '9':'8' | '7' | '6' | '5' | '4' | '3' | '2' | '1' | '0'
}
type Length<S extends string, LengthCache extends any[] = []> = S extends `${infer F}${infer Next}` ? Length<Next, [...LengthCache, F]> : LengthCache['length']
type EveryString<T extends string, U extends string> = T extends `${infer TF extends keyof numberLess}${infer TNext}` ? U extends `${infer UF}${infer UNext}` ? Equal<TF,UF> extends true ? EveryString<TNext,UNext> : numberLess[TF] extends UF ? true : false : false : false
type NewGreaterThan<T extends number , U extends number> = Equal<Length<`${T}`>, Length<`${U}`>> extends true ? EveryString<`${T}`,`${U}`> : GreaterThan<Length<`${T}`>, Length<`${U}`>>
 


type isOneFunction<AF extends string, ANext extends string, BF extends string, BNext extends string, result extends string, otherNumber extends string> =
  isOne<AF, BF, otherNumber> extends false
  ? AddSum<ANext, BNext, `${result}${AddEnd<AF, BF, otherNumber>}`>
  : AddSum<ANext, BNext, `${result}${GetSecStr<`${AddEnd<AF, BF, otherNumber>}`>}`, '1'>



type TestVoid<T> = T extends `${infer F}${infer A}` ? true : false
type AJl = TestVoid<'1'>

// 这个类型还有小数问题需要解决 ，还有负号



type AddSum<A extends string, B extends string, result extends string = '', otherNumber extends string = '0'> =
  A extends `${infer AF}${infer ANext}`
  ? B extends `${infer BF}${infer BNext}`
  ? isOne<AF, BF, otherNumber> extends false
  ? AddSum<ANext, BNext, `${result}${AddEnd<AF, BF, otherNumber>}`>
  : AddSum<ANext, BNext, `${result}${GetSecStr<`${AddEnd<AF, BF, otherNumber>}`>}`, '1'>

  : isOne<AF, '0', otherNumber> extends false
  ? AddSum<ANext, '', `${result}${AddEnd<AF, '0', otherNumber>}`>
  : AddSum<ANext, '', `${result}${GetSecStr<`${AddEnd<AF, '0', otherNumber>}`>}`, '1'>


  : `${result}${otherNumber extends '1' ? otherNumber : ''}`
// 加法器

// 出问题的utils 找到了 ， 就是以前的没有考虑好情况以及偷懒了 ，greaterThan 应该先使用 字符长度比较 等长再逐一对于比较 ， 我那时也这么想的但是偷懒了
/* 
otherNumber extends '0' 
      ? AddSum<ANext,BNext,`${result}${Add<GetNumber<`${AF}`>,GetNumber<`${BF}`>>}`>
      : AddSum<ANext,BNext,`${result}${Add<GetNumber<`${AF}`>,Add<GetNumber<`${BF}`>,GetNumber<`${otherNumber}`>>>}`> */


/**
 GreaterThan<Add<Add<GetNumber<AF>,GetNumber<BF>>,GetNumber<otherNumber>>,HandleNine<`${Add<GetNumber<AF>,GetNumber<otherNumber>>}`,BF>> extends false 
        ? AddSum<ANext,BNext,`${result}${Add<GetNumber<AF>,GetNumber<BF>>}`>
        : AddSum<ANext,BNext,`${result}${Last<stringtoTuple<`${Add<GetNumber<AF>,GetNumber<BF>>}`>>}`,'1'>
    :  otherNumber extends '0' ? 
      AddSum<'','',`${result}${ANext}`>
      : AddSum<ANext,'1',`${result}${Add<GetNumber<AF>,GetNumber<otherNumber>>}`>
*/
type Sum<A extends string | number | bigint, B extends string | number | bigint> = NewGreaterThan<GetNumber<`${A}`>,GetNumber<`${B}`>> extends true ? ReverseString<AddSum<ReverseString<`${A}`>, ReverseString<`${B}`>>> : ReverseString<AddSum<ReverseString<`${B}`>, ReverseString<`${A}`>>>




/* _____________ Test Cases _____________ */

type cases = [
  Expect<Equal<Sum<2, 3>, '5'>>,
  Expect<Equal<Sum<'13', '21'>, '34'>>,
  Expect<Equal<Sum<'328', 7>, '335'>>,
  Expect<Equal<Sum<1_000_000_000_000n, '123'>, '1000000000123'>>,
  Expect<Equal<Sum<9999, 1>, '10000'>>,
  Expect<Equal<Sum<4325234, '39532'>, '4364766'>>,
  Expect<Equal<Sum<728, 0>, '728'>>,
  Expect<Equal<Sum<'0', 213>, '213'>>,
  Expect<Equal<Sum<0, '0'>, '0'>>,
]
type Test1 =Sum<9999, 1>
type Test2 =Sum<4325234, '39532'>
type Test3 =Sum<'328', 7>
type Test4 =Sum<1_000_000_000_000n, '123'>
type Test5 =Sum<'0', 213>
// 问题是多进了一位 一