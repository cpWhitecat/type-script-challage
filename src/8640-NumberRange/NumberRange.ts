// 使用同一个数组 ， 每次输出这个数组的length 然后再push和回调

// 先提供符合length要求的数组
// 


// type defaultArray<T extends number , U extends any[] = []> = U extends {length:T} ? U : defaultArray<T,[...U,any]>
// type NumberRange<L extends number, H extends number, T extends any[] = defaultArray<L> > = T['length'] extends H ? T['length'] :  | T['length'] | NumberRange<L,H,[...T,any]>

// 超出特定范围会有个any 编译器的判断 我肯定不能改 是否有更好的方法
// 我减法来试试看

// 刚刚好又到47 就不动了 ， 是ts 对于递归深度的限制嘛 所以搞成数组 对于字符串有递归限制

// 那就tuple to union 吧
type NumberRangeTuple<L extends number, H extends number , T extends any[] = [H]> = H extends L ? [...T,H] : NumberRangeTuple<L,MinusOne<H>,[...T,MinusOne<H>]>
export type NumberRange<L extends number, H extends number> = TupleToUnion<NumberRangeTuple<L,H>>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../../utils'
import { TupleToUnion } from '../10-tupleToUnion/tupleToUnion'
import { MinusOne } from '../2257-MinusOne/MinusOne'

type Result1 = | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
type Result2 = | 0 | 1 | 2
type Result3 =
  | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20
  | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30
  | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40
  | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50
  | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 | 60
  | 61 | 62 | 63 | 64 | 65 | 66 | 67 | 68 | 69 | 70
  | 71 | 72 | 73 | 74 | 75 | 76 | 77 | 78 | 79 | 80
  | 81 | 82 | 83 | 84 | 85 | 86 | 87 | 88 | 89 | 90
  | 91 | 92 | 93 | 94 | 95 | 96 | 97 | 98 | 99 | 100
  | 101 | 102 | 103 | 104 | 105 | 106 | 107 | 108 | 109 | 110
  | 111 | 112 | 113 | 114 | 115 | 116 | 117 | 118 | 119 | 120
  | 121 | 122 | 123 | 124 | 125 | 126 | 127 | 128 | 129 | 130
  | 131 | 132 | 133 | 134 | 135 | 136 | 137 | 138 | 139 | 140
type cases = [
  Expect<Equal<NumberRange<2, 9>, Result1>>,
  Expect<Equal<NumberRange<0, 2>, Result2>>,
  Expect<Equal<NumberRange<0, 140>, Result3>>,
]

type D = NumberRange<0, 47>