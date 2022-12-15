// type load<S extends string , nextNeed = false> = S extends `${infer F}${infer L}` ? Uppercase<F> extends F ? `${F}${load<`${L}`, true>}`
import {LengthOfString} from '../298-String-length/StringLength'

type Str2Union<T extends string, R extends string[] = []> = T extends `${infer F}${infer Rest extends string}` ? Str2Union<Rest, [...R, F]> : R[number];

type Map = Str2Union<'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'>;

export type CapitalizeWords<S extends string , Cache  extends string= '',nextUpper extends boolean = true > = 

    S extends `${infer F}${infer L}` ?
    
         F  extends  Uppercase<F> | '\\u' 
         ? CapitalizeWords<L,`${Cache}${F}`,true>
         :CapitalizeWords<L,`${Cache}${nextUpper extends true ? Uppercase<F> : F  }`,false>
         
    :Cache

// 应该是ts的策略
// 像我那样的在结果里面递归是有深度限制的的 除非是递归一个类型
// 所以需要一个泛型去存储



  export  type stringtoTuple<S>  = S extends `${infer F}${infer P}` ? [`${F}`,...stringtoTuple<`${P}`>] : []
    // type teststringtotuple = stringtoTuple<'aa!bb@cc#dd$ee%ff^gg&hh*ii(jj)kk_ll+mm{nn}oo|pp🤣qq'>
// emmm how to handle unionCode

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../../utils'

type cases = [
  Expect<Equal<CapitalizeWords<'foobar'>, 'Foobar'>>,
  Expect<Equal<CapitalizeWords<'FOOBAR'>, 'FOOBAR'>>,
  Expect<Equal<CapitalizeWords<'foo bar'>, 'Foo Bar'>>,
  Expect<Equal<CapitalizeWords<'foo bar hello world'>, 'Foo Bar Hello World'>>,
  Expect<Equal<CapitalizeWords<'foo bar.hello,world'>, 'Foo Bar.Hello,World'>>,
  Expect<Equal<CapitalizeWords<'aa!bb@cc#dd$ee%ff^gg&hh*ii(jj)kk_ll+mm{nn}oo|pp🤣qq'>, 'Aa!Bb@Cc#Dd$Ee%Ff^Gg&Hh*Ii(Jj)Kk_Ll+Mm{Nn}Oo|Pp🤣Qq'>>,
  Expect<Equal<CapitalizeWords<''>, ''>>,
]

type UppercaseTestOther = CapitalizeWords<'aa!bb@cc#dd$ee%ff^gg&hh*ii(jj)kk_ll+mm{nn}oo|pp🤣qq'>
type UpperCaseother= CapitalizeWords<'foo bar.hello,world'>
type UnionCodeUpperCase<S> = S extends `${infer F}${infer L}` ? F extends '\uD83E' ? true :false : ''
type testUnionCodeUpperCase = UnionCodeUpperCase<'🤣Qq'>
type testUnionCodeHappyEmoji = Uppercase<'\uD83E'>
// type testNullString<S> = S extends `${infer F}${infer L}` ? `true${testNullString<`${L}$`>}` : ''
// type testNull  = testNullString<''>

// ts的递归深度限制
// 或许还有更好的方法
type length =LengthOfString<'Aa!Bb@Cc#Dd$Ee%Ff^Gg&Hh*Ii(Jj)Kk_Ll+Mm{Nn}Oo|Pp'>