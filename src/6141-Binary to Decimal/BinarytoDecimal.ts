type BinaryToDecimal<S extends string> = S extends `${infer F}${infer next}` ? LengthOfString<next> : never


// 看来真的创建一个加法器类型

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../../utils'
import { LengthOfString } from '../298-String-length/StringLength'
import { Reverse } from '../3192-Reverse/Reverse'

type cases = [
  Expect<Equal<BinaryToDecimal<'10'>, 2>>,
  Expect<Equal<BinaryToDecimal<'0011'>, 3>>,
  Expect<Equal<BinaryToDecimal<'00000000'>, 0>>,
  Expect<Equal<BinaryToDecimal<'11111111'>, 255>>,
  Expect<Equal<BinaryToDecimal<'10101010'>, 170>>,
]