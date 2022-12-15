type isObject<T> = T extends object ? true :false

// type isDeep<T extends any[]> = false extends isObject<T[number]> ? T : boolean extends isObject<T[number]> ? 

type DeepHandleTuple<T extends any[]> = T extends [infer F , ...infer Rest] ? ( F extends object ? [CapitalizeNestObjectKeys<F>,...DeepHandleTuple<Rest>] : [F,...DeepHandleTuple<Rest>] ) : []

type CapitalizeNestObjectKeys<T> = {
    [P in keyof T as CapitalizeWords<P extends string ? P : ''>]: T[P] extends any[] ? DeepHandleTuple<T[P]> : T[P]
}


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../../utils'
import { ExpectFalse, NotEqual } from '../../utils'
import { CapitalizeWords } from '../112-CapitalizeWords/CapitalizeWords'

type foo = {
  foo: string
  bars: [{ foo: string }]
}

type Foo = {
  Foo: string
  Bars: [{
    Foo: string
  }]
}

type cases = [
  Expect<Equal<Foo, CapitalizeNestObjectKeys<foo>>>,
]

type test1 = CapitalizeNestObjectKeys<foo>