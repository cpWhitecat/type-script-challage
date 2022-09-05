import { Equal } from "../../utils"



// 这个类型 感觉可以处理 实际浏览器的链接
type Objectadd<T extends object, K extends string, V> = K extends keyof T    // 后面一堆判断 就是为了严重是否包含已存在的value
?{[P in keyof T]:Equal<K,P> extends true ? (T[K] extends any[] ? (Includes<T[K],V> extends true ? T[K] : [...T[K],V]):(Equal<T[K],V> extends true ? V : [T[K],V])): T[P] }
:{[P in K | keyof T]:P extends keyof T ? T[P] : V}
// 题目没讲出现两次等于会发生什么 我也偷懒了 ，不做判断了

// 有一点想错了
type StringAdd<S extends string , F  extends string , is extends boolean> = is extends true ? `${S}${F}` : S

type Test1 = ParseQueryString<''>
type Test2 = ParseQueryString<'k1&k1'>
type Test3 = ParseQueryString<'k1=v1'>
type Test4 =ParseQueryString<'k1=v1&k1=v1'>

type ParseQueryString<
  S extends string , 
  KeyCache extends string = '' , 
  ValueCache extends string = '' , 
  ObjectCache extends object = {} , 
  isEqualed extends boolean = false
  >=
    S extends `${infer F}${infer Next}` 
    ? isEqualed extends true
      ? F extends '&'
        ? ParseQueryString<Next,'','',Objectadd<ObjectCache,KeyCache,ValueCache>>
        : ParseQueryString<Next,KeyCache,`${ValueCache}${F}`,ObjectCache,isEqualed>
      : F extends '&'
        ? ParseQueryString<Next,'','',Objectadd<ObjectCache,KeyCache,true>>
        : F extends '='
          ? ParseQueryString<Next,KeyCache,'',ObjectCache,true>
          : ParseQueryString<Next,`${KeyCache}${F}`,'',ObjectCache>
    :KeyCache extends '' ?
    ObjectCache 
    :    isEqualed extends true 
    ? Objectadd<ObjectCache,KeyCache,ValueCache>
    :Objectadd<ObjectCache,KeyCache,true>
  




    /* 
    F extends '&' 
      ? ParseQueryString<Next,'','',Objectadd<ObjectCache,KeyCache,isEqualed extends true ? ValueCache : true>>     //这边写不了！isEqualed 
      : F extends '=' 
        ? ParseQueryString<Next , KeyCache , '',ObjectCache , true> 
        : isEqualed extends true
          ? ParseQueryString<Next,KeyCache,`${ValueCache}${F}`,ObjectCache,true>
          : ParseQueryString<Next,`${KeyCache}${F}`,'',ObjectCache>
          
          */

// 如果等于后面的字符是前面之前出现过的Key会如何处理 ， 会变成一个object 还是 直接就把Key的字符放进去

// 要加判断 ， 什么时候字符是key , 什么时候字符是value
// 需要考虑情况l
/**
 * 一种是出现‘&’ ， 然后前面没有出现过 = , 所以直接执行
*/
/* _____________ Test Cases _____________ */
import type { Expect } from '../../utils'
import { Includes } from "../898-Includes/Includes"

type cases = [
  Expect<Equal<ParseQueryString<''>, {}>>,
  Expect<Equal<ParseQueryString<'k1'>, { k1: true }>>,
  Expect<Equal<ParseQueryString<'k1&k1'>, { k1: true }>>,
  Expect<Equal<ParseQueryString<'k1&k2'>, { k1: true; k2: true }>>,
  Expect<Equal<ParseQueryString<'k1=v1'>, { k1: 'v1' }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k1=v2'>, { k1: ['v1', 'v2'] }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k2=v2'>, { k1: 'v1'; k2: 'v2' }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k2=v2&k1=v2'>, { k1: ['v1', 'v2']; k2: 'v2' }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k2'>, { k1: 'v1'; k2: true }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k1=v1'>, { k1: 'v1' }>>,
]


type Tes2 = ParseQueryString<'k1=v1&k2=v2&k1=v2'>