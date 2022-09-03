type stringToTuple<T extends string , TupleCache extends string[] = []> = T extends `${infer F}${infer next}` ? stringToTuple<`${next}`,[...TupleCache,`${F}`]> : TupleCache

type MyInclude<T , U> = T extends U ? true :false
type monthsMap = {
  '01':31,
  '02':28,
  '03':31,
  '04':30,
  '05':31,
  '06':30,
  '07':31,
  '08':31,
  '09':30,
  '10':31,
  '11':30,
  '12':31,
}

type ToNumber<T extends string> = T extends `${infer All extends number}` ? All : T

type handleZero<T> = T extends `${infer F extends number}${infer next extends number}` ? F extends 0 ? next : ToNumber<T> : T

type handle<T extends string> = 
T extends `${infer A}${infer B}${infer C}` ? 
  `${A}${B}` extends keyof monthsMap ?
  MyInclude<handleZero<`${C}`>,NumberRange<1,monthsMap[`${A}${B}`]>>
  : false
: true

// 对于'02' 像这种带0的数 使用4.8 特性 会类型推导成number 而不是具体数值 那只能做特殊处理了
type test1<T> = T extends `${infer A extends number}${infer B extends number}${infer C}` ? C : false

type Test2 = test1<'0102'>
// type Second<T extends string , meta extends>

type ValidDate<T extends string> = stringToTuple<T>['length'] extends 4 ? handle<T> : false

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../../utils'
import { Push } from '../3057-push/push'
import { GreaterThan } from '../4425-GreaterThan/GreaterThan'
import { NumberRange } from '../8640-NumberRange/NumberRange'

type cases = [
  Expect<Equal<ValidDate<'0102'>, true>>,
  Expect<Equal<ValidDate<'0131'>, true>>,
  Expect<Equal<ValidDate<'1231'>, true>>,
  Expect<Equal<ValidDate<'0229'>, false>>,
  Expect<Equal<ValidDate<'0100'>, false>>,
  Expect<Equal<ValidDate<'0132'>, false>>,
  Expect<Equal<ValidDate<'1301'>, false>>,
  Expect<Equal<ValidDate<'0123'>, true>>,
  Expect<Equal<ValidDate<'01234'>, false>>,
  Expect<Equal<ValidDate<''>, false>>,
]