export type TupleToObject<T extends  readonly  (string|number|symbol)[]> = {
    [P in T[number]] :  P
}
//首先是要遍历元组 ， 

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '../../utils'

const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const
const tupleNumber = [1, 2, 3, 4] as const
const tupleMix = [1, '2', 3, '4'] as const
const cc =  tuple;
type cases = [
  Expect<Equal<TupleToObject<typeof tuple>, { tesla: 'tesla'; 'model 3': 'model 3'; 'model X': 'model X'; 'model Y': 'model Y' }>>,
  Expect<Equal<TupleToObject<typeof tupleNumber>, { 1: 1; 2: 2; 3: 3; 4: 4 }>>,
  Expect<Equal<TupleToObject<typeof tupleMix>, { 1: 1; '2': '2'; 3: 3; '4': '4' }>>,
]

// @ts-expect-error
type error = TupleToObject<[[1, 2], {}]>


// in js
// const tuple1 = [1,2,3]
// function TupleToObject(tuple1:any[]){
//     const obj = {};

//     tuple1.forEach(val => {
//         obj[val] = val
        
//     });

// }

