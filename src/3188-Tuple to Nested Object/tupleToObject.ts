type TupleToNestedObject<T, U> = T extends [infer A , ...infer rest] ? {[K in A as K extends string | number | symbol? K : never]:TupleToNestedObject<rest,U>} : U


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../../utils'

type cases = [
  Expect<Equal<TupleToNestedObject<['a'], string>, { a: string }>>,
  Expect<Equal<TupleToNestedObject<['a', 'b'], number>, { a: { b: number } }>>,
  Expect<Equal<TupleToNestedObject<['a', 'b', 'c'], boolean>, { a: { b: { c: boolean } } }>>,
  Expect<Equal<TupleToNestedObject<[], boolean>, boolean>>,
]

type sdjfl = TupleToNestedObject<['a', 'b', 'c'], boolean>