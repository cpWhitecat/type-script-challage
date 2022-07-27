// 主要逻辑就是通过之前的转换成字符   再通过string length 来做比较 还有写个对象 表示各个数比它本身小的union类型

type numberLess = {
    1:0,
    2:1|0,
    3:2|1|0,
    4:3|2|1|0,
    5:4|3|2|1|0,
    6:5|4|3|2|1|0,
    7:6|5|4|3|2|1|0,
    8:7|6|5|4|3|2|1|0,
    9:8|7|6|5|4|3|2|1|0,
}
import type {LengthOfString} from '../298-String-length/StringLength'

type GreaterThan<T extends number, U extends number> = 


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../../utils'

type cases = [
  Expect<Equal<GreaterThan<1, 0>, true>>,
  Expect<Equal<GreaterThan<5, 4>, true>>,
  Expect<Equal<GreaterThan<4, 5>, false>>,
  Expect<Equal<GreaterThan<0, 0>, false>>,
  Expect<Equal<GreaterThan<20, 20>, false>>,
  Expect<Equal<GreaterThan<10, 100>, false>>,
  Expect<Equal<GreaterThan<111, 11>, true>>,
]