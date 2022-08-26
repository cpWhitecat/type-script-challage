type noReadonly<T> = {
    -readonly [ P in keyof T]:T[P]
}

type Get<T> = T extends Readonly<infer L> & infer R ? R | L : never

type Same<A,B> = (((F:A)=>any) | ((F:B)=>any)) extends (F:infer I)=>any ? I :never

type MutableKeys<T> ={
    [P in keyof T as ({a:number} extends {[K:string]:any} ? 1 :P)]:T[P]
}

// 如何知道是个readonly key
/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../../utils'

type cases = [
  Expect<Equal<MutableKeys<{ a: number; readonly b: string }>, 'a'>>,
  Expect<Equal<MutableKeys<{ a: undefined; readonly b: undefined }>, 'a'>>,
  Expect<Equal<MutableKeys<{ a: undefined; readonly b?: undefined; c: string; d: null }>, 'a' | 'c' | 'd'>>,
  Expect<Equal<MutableKeys<{}>, never>>,
]


type Test1= MutableKeys<{ a: number; readonly b?: undefined; c: string; d: null }>

type Test2 = Get<{ a: undefined; readonly b?: undefined; c: string; d: null }>

type Test3 = Same<{
    a: undefined;
    readonly b?: undefined;
    c: string;
    d: null;
} , {
    a: undefined;
    b?: undefined;
    c: string;
    d:null}>