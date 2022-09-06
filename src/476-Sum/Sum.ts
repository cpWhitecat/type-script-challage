import type { Equal, Expect } from '../../utils'
import { stringtoTuple } from '../112-CapitalizeWords/CapitalizeWords'
import { Last } from '../15-LastArray/LastArrayType'
import { Comparator ,Comparison } from '../274-IntegersComparator/IntegersComparator'
import { Reverse } from '../3192-Reverse/Reverse'
import { Add } from '../4182-Fibonacci Sequence/Fibonacci_Sequence'
import { GreaterThan } from '../4425-GreaterThan/GreaterThan'



export type GetNumber<S extends string> = S extends `${infer All extends number}` ? All : 0 

export type ReverseString<S extends string , StringCache extends string = ''> = S extends `${infer F}${infer Next}` ? ReverseString<Next,`${StringCache}${F}`> : StringCache




// 这个类型还有小数问题需要解决 ，还有负号

type TupleFirst<T> = T extends [infer F , ...infer Rest] ? F : T
type HandleNine<T extends string , U extends string> = (Add<GetNumber<T>,GetNumber<U>> extends 9 ? 8 : 9)


type AddSum<A extends string , B extends string , result extends string = '' ,otherNumber extends string = '0'> = 
A extends `${infer AF}${infer ANext}` 
? B extends `${infer BF}${infer BNext}` 
    ? GreaterThan<Add<Add<GetNumber<AF>,GetNumber<BF>>,GetNumber<otherNumber>>,HandleNine<`${Add<GetNumber<AF>,GetNumber<otherNumber>>}`,BF>> extends false 
        ? AddSum<ANext,BNext,`${result}${TupleFirst<Add<GetNumber<AF>,GetNumber<BF>>>}`>
        : AddSum<ANext,BNext,`${result}${Last<stringtoTuple<`${Add<GetNumber<AF>,GetNumber<BF>>}`>>}`,'1'>
    :  AddSum<ANext,otherNumber,`${result}${Add<GetNumber<AF>,GetNumber<otherNumber>>}`>
:result
// 加法器

type Sum<A extends string | number | bigint, B extends string | number | bigint> = ReverseString<`${Comparator<GetNumber<`${A}`>,GetNumber<`${B}`>> extends Comparison.Greater 
? AddSum<ReverseString<`${A}`>,ReverseString<`${B}`>>
: AddSum<ReverseString<`${B}`>,ReverseString<`${A}`>>}`>



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
// 问题是多进了一位 一