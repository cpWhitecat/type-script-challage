type ControlsMap = {
    s: string
    d: number
  }
type ParsePrintFormat<T,last extends string = ''> = T extends `${infer F}${infer Rest}` 
  ? last extends '%' ? (F extends keyof ControlsMap ? [ControlsMap[F],...ParsePrintFormat<Rest>] : [...ParsePrintFormat<Rest>]) : [...ParsePrintFormat<Rest,F>]
  :[]


type Format<T,last extends string = ''> = T extends `${infer F}${infer Rest}` 
? last extends '%' ? (F extends keyof ControlsMap ? (K:ControlsMap[F])=>Format<Rest> : Format<Rest>) : Format<Rest,F>
:string


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../../utils'

// 函数参数的key 可以做讲究 毕竟只是把百分号后面的拎出来
type cases = [
  Expect<Equal<Format<'abc'>, string>>,
  Expect<Equal<Format<'a%sbc'>, (s1: string) => string>>,
  Expect<Equal<Format<'a%dbc'>, (d1: number) => string>>,
  Expect<Equal<Format<'a%%dbc'>, string>>,
  Expect<Equal<Format<'a%%%dbc'>, (d1: number) => string>>,
  Expect<Equal<Format<'a%dbc%s'>, (d1: number) => (s1: string) => string>>,
]


type TestFormat = Format<'a%dbc'>