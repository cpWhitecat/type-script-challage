import type { Equal, Expect } from '../../utils'
// 约束union的办法 R extends T    T extends R
type MapTypes<T, R extends {mapFrom:any,mapTo:any}> = {
    [K in keyof T]:{mapFrom:T[K],mapTo:any} extends R ? (R extends {mapFrom:T[K],mapTo:any} ? (R['mapTo']) : never) : T[K]
}

// how to solution union type 
type Test<T,R extends {mapFrom:any,mapTo:any}> = {
    [K in keyof T]:{mapFrom:T[K],mapTo:any} extends R ? (R extends {mapFrom:T[K],mapTo:any} ? (R['mapTo']) : never) : T[K]

}
/* _____________ Test Cases _____________ */


type cases = [
  Expect<Equal<MapTypes<{ stringToArray: string }, { mapFrom: string; mapTo: [] }>, { stringToArray: [] }>>,
  Expect<Equal<MapTypes<{ stringToNumber: string }, { mapFrom: string; mapTo: number }>, { stringToNumber: number }>>,
  Expect<Equal<MapTypes<{ stringToNumber: string; skipParsingMe: boolean }, { mapFrom: string; mapTo: number }>, { stringToNumber: number; skipParsingMe: boolean }>>,
  Expect<Equal<MapTypes<{ date: string }, { mapFrom: string; mapTo: Date } | { mapFrom: string; mapTo: null }>, { date: null | Date }>>,
  Expect<Equal<MapTypes<{ date: string }, { mapFrom: string; mapTo: Date | null }>, { date: null | Date }>>,
  Expect<Equal<MapTypes<{ fields: Record<string, boolean> }, { mapFrom: Record<string, boolean>; mapTo: string[] }>, { fields: string[] }>>,
  Expect<Equal<MapTypes<{ name: string }, { mapFrom: boolean; mapTo: never }>, { name: string }>>,
  Expect<Equal<MapTypes<{ name: string; date: Date }, { mapFrom: string; mapTo: boolean } | { mapFrom: Date; mapTo: string }>, { name: boolean; date: string }>>,
]

type B =Test<{ name: string; date: Date }, { mapFrom: string; mapTo: boolean } | { mapFrom: Date; mapTo: string }>

type C = { mapFrom: string; mapTo: boolean } | { mapFrom: Date; mapTo: string } extends {mapFrom:any,mapTo:any} ? true :false

type D = 1|2 extends 1 ? true :false