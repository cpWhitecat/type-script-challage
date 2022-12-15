// type ifEqual<T , U> = (<P>()=>P extends T ? true : false ) extends (<P>()=>P extends U ? true : false ) ? true :false

// type GetFirstChar<S> = S extends `${infer F}${infer Next}` ? F : S
// namespace RLE {
//     export type Encode<S extends string , LastChar extends string = GetFirstChar<S>  , [...CharCache,F] extends any[] = [] , end extends string= ''> =  
//         S extends `${infer F}${infer Next}` ? ifEqual<F,LastChar> extends true ? Encode<Next,F,[...CharCache,F],end> :  Encode<S,F,[],`${end}${CharCache['length'] extends 1 ? '' : CharCache['length']}${LastChar}`> : end
//     export type Decode<S extends string> = any
//   }
  

/**
 * 上面做的 或许不应该跟上一个比较 ，而是跟它本身后面一个字符比较是否相等
*/

// 应该没有可抽离的逻辑了

// All type utils
export type numberMap = '0'| '1' | '2' | '3'| '4'| '5' | '6' | '7' | '8'|'9'

// Encode utils
type GetNextChar<S> = S extends `${infer F}${infer Next}` ? Next extends `${infer nextChar}${infer NextNextChar}` ?  nextChar : Next : S


// Decode utils
type GetLength<S, endChar extends string = ''> = S extends `${infer F }${infer Next }` ? F extends numberMap ? GetLength<Next,`${endChar}${F}`> : endChar extends `${infer All extends number}` ? All : endChar : S
type CreateTuple<S extends number , Char extends string  , Tuple extends any[] = []> = Tuple extends {length:S} ? Tuple : CreateTuple<S,Char,[...Tuple,Char]>
type TupleToString<T extends any[],Cache extends string = ''> = T extends [infer F extends string , ...infer Rest extends string[]] ? TupleToString<Rest,`${Cache}${F}`> : Cache


namespace RLE {
    export type Encode<S extends string  , CharCache extends any[] = [] , end extends string = '' ,nextChar  extends string = GetNextChar<S> > = 
      S extends `${infer F}${infer Next}` 
      ? Equal<F,nextChar> extends true ? Encode<Next,[...CharCache,F],end> : Encode<Next,[],`${end}${[...CharCache,F]['length'] extends 1 ? '' : Push<CharCache,F>['length'] extends number ? Push<CharCache,F>['length'] : ''}${F}`>  
      : end

    export type Decode<S extends string , endChar extends string = ''> = 
    S extends `${GetLength<S>}${infer U}${infer Next}` ? 
    GetLength<S> extends ''? Decode<Next,`${endChar}${U}`> : Decode<Next,`${endChar}${TupleToString<CreateTuple<GetLength<S> extends number ? GetLength<S> : 1 ,U>>}`>
    :endChar
}



  /* _____________ Test Cases _____________ */
  import type { Equal, Expect } from '../../utils'
import { Push } from '../3057-push/push'
//   这个case 没有说明如何处理重复出现的字符 会记入前一个还是重新创建一个？

//  还有隐式需要考虑的东西 就是如何处理多位数的数字 ？ solution ： 加个判断
  type cases = [
    // Raw string -> encoded string
    Expect<Equal<RLE.Encode<'AAABCCXXXXXXY'>, '3AB2C6XY'>>,
  
    // Encoded string -> decoded string
    Expect<Equal<RLE.Decode<'3AB2C6XY'>, 'AAABCCXXXXXXY'>>,
  ]

  type Test1 =RLE.Encode<'AAABCCXXXXXXYY'>