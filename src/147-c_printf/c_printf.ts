type ControlsMap = {
    c: 'char'
    s: 'string'
    d: 'dec'
    o: 'oct'
    h: 'hex'
    f: 'float'
    p: 'pointer'
  }
//   因为last 初始化时‘’，所以需要预处理防止第一个为 % 无法转义
  type ParsePrintFormat<T,last extends string = ''> = T extends `${infer F}${infer Rest}` 
    ? last extends '%' ? (F extends keyof ControlsMap ? [ControlsMap[F],...ParsePrintFormat<Rest>] : [...ParsePrintFormat<Rest>]) : [...ParsePrintFormat<Rest,F>]
    :[]
  
//   题目意思其实是以两个为标准的
  /* _____________ Test Cases _____________ */
  import type { Equal, Expect } from '../../utils'
  
  type cases = [
    Expect<Equal<ParsePrintFormat<''>, []>>,
    Expect<Equal<ParsePrintFormat<'Any string.'>, []>>,
    Expect<Equal<ParsePrintFormat<'The result is %d.'>, ['dec']>>,
    Expect<Equal<ParsePrintFormat<'The result is %%d.'>, []>>,
    Expect<Equal<ParsePrintFormat<'The result is %%%d.'>, ['dec']>>,
    Expect<Equal<ParsePrintFormat<'The result is %f.'>, ['float']>>,
    Expect<Equal<ParsePrintFormat<'The result is %h.'>, ['hex']>>,
    Expect<Equal<ParsePrintFormat<'The result is %q.'>, []>>,
    Expect<Equal<ParsePrintFormat<'Hello %s%%%s: score is %d.'>, ['string','string', 'dec']>>,
    Expect<Equal<ParsePrintFormat<'The result is %'>, []>>,
  ]

  type TestCPrintf = ParsePrintFormat<'Hello %s: score is %%d.'>