import type {Push} from '../3057-push/push'
import type {TupleToUnion} from '../10-tupleToUnion/tupleToUnion'
type MyExculde<T,U> = T extends U ? never : T 

type UnionToTuple<T> = T extends infer U ? true : false
type Unique<T,union = never> = T extends any[] 
  ? TupleToUnion<T> extends infer P ? [P extends ,...Unique<any,MyExculde<TupleToUnion<T>,P>>]:[]
  : union extends infer B ? [B,...Unique<any,MyExculde<TupleToUnion<T>,B>>]:[]

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../../utils'
// union to tuple
type cases = [
  Expect<Equal<Unique<[1, 1, 2, 2, 3, 3]>, [1, 2, 3]>>,
  Expect<Equal<Unique<[1, 2, 3, 4, 4, 5, 6, 7]>, [1, 2, 3, 4, 5, 6, 7]>>,
  Expect<Equal<Unique<[1, 'a', 2, 'b', 2, 'a']>, [1, 'a', 2, 'b']>>,
  Expect<Equal<Unique<[string, number, 1, 'a', 1, string, 2, 'b', 2, number]>, [string, number, 1, 'a', 2, 'b']>>,
  Expect<Equal<Unique<[unknown, unknown, any, any, never, never]>, [unknown, any, never]>>,
]
type B = [1,2,3]
type C = B['1']
type D = Unique<[1, 1, 2, 2, 3, 3]>

type F = 1 |2 | 3
type G = F extends 1 ? never : false