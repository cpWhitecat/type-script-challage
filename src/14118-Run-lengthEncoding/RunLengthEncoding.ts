// type ifEqual<T , U> = (<P>()=>P extends T ? true : false ) extends (<P>()=>P extends U ? true : false ) ? true :false

// type GetFirstChar<S> = S extends `${infer F}${infer Next}` ? F : S
// namespace RLE {
//     export type Encode<S extends string , LastChar extends string = GetFirstChar<S>  , CharCache extends any[] = [] , end extends string= ''> =  
//         S extends `${infer F}${infer Next}` ? ifEqual<F,LastChar> extends true ? Encode<Next,F,[...CharCache,F],end> :  Encode<S,F,[],`${end}${CharCache['length'] extends 1 ? '' : CharCache['length']}${LastChar}`> : end
//     export type Decode<S extends string> = any
//   }
  

/**
 * 上面做的 或许不应该跟上一个比较 ，而是跟它本身后面一个字符比较是否相等
*/
  
namespace RLE {
    export type Encode<S extends string , > = 
    export type Decode<S extends string> = any
}



  /* _____________ Test Cases _____________ */
  import type { Equal, Expect } from '../../utils'
//   这个case 没有说明如何处理重复出现的字符 会记入前一个还是重新创建一个？

//  还有隐式需要考虑的东西 就是如何处理多位数的数字 ？ solution ： 加个判断
  type cases = [
    // Raw string -> encoded string
    Expect<Equal<RLE.Encode<'AAABCCXXXXXXY'>, '3AB2C6XY'>>,
  
    // Encoded string -> decoded string
    Expect<Equal<RLE.Decode<'3AB2C6XY'>, 'AAABCCXXXXXXY'>>,
  ]

  type Test1 =RLE.Encode<'AAABCCXXXXXXYY'>