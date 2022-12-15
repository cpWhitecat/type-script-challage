type AddCache<F extends number , T extends any[] , Added extends any[] = []> = 
T extends [infer TF extends number , ...infer Rest]
    ? NewGreaterThan<F,TF> extends true
        ? AddCache<F,Rest,[...Added,TF]>
        :[...Added,F,TF,...Rest]
    :[...Added,F]

type SortEnd<T extends any[] , need extends any[] = [] > = T extends [infer F extends number , ...infer Rest]
? SortEnd<Rest,AddCache<F,need>>
: need

type Sort<T extends any[] , U extends boolean = false , need extends any[] = [] ,> = U extends true ? Reverse<SortEnd<T,need>> : SortEnd<T,need>



type TestSort1 = Sort<[3, 2, 1, 2]>
type TestSort2 = Sort<[2, 4, 7, 6, 6, 6, 5, 8, 9]>
type TestSort3 = Sort<[1, 2, 3]>
type TestSort4 = Sort<[3, 2, 1]>
type testNewGreaterThan= NewGreaterThan<2,1> 


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../../utils'
import { Reverse } from '../3192-Reverse/Reverse'
import { NewGreaterThan } from '../476-Sum/Sum'

type cases = [
  Expect<Equal<Sort<[]>, []>>,
  Expect<Equal<Sort<[1]>, [1]>>,
  Expect<Equal<Sort<[2, 1]>, [1, 2]>>,
  Expect<Equal<Sort<[0, 0, 0]>, [0, 0, 0]>>,
  Expect<Equal<Sort<[1, 2, 3]>, [1, 2, 3]>>,
  Expect<Equal<Sort<[3, 2, 1]>, [1, 2, 3]>>,
  Expect<Equal<Sort<[3, 2, 1, 2]>, [1, 2, 2, 3]>>,
  Expect<Equal<Sort<[3, 2, 0, 1, 0, 0, 0]>, [0, 0, 0, 0, 1, 2, 3]>>,
  Expect<Equal<Sort<[2, 4, 7, 6, 6, 6, 5, 8, 9]>, [2, 4, 5, 6, 6, 6, 7, 8, 9]>>,
  Expect<Equal<Sort<[1, 1, 2, 1, 1, 1, 1, 1, 1]>, [1, 1, 1, 1, 1, 1, 1, 1, 2]>>,
  Expect<Equal<Sort<[], true>, []>>,
  Expect<Equal<Sort<[1], true>, [1]>>,
  Expect<Equal<Sort<[2, 1], true>, [2, 1]>>,
  Expect<Equal<Sort<[0, 0, 0], true>, [0, 0, 0]>>,
  Expect<Equal<Sort<[1, 2, 3], true>, [3, 2, 1]>>,
  Expect<Equal<Sort<[3, 2, 1], true>, [3, 2, 1]>>,
  Expect<Equal<Sort<[3, 2, 1, 2], true>, [3, 2, 2, 1]>>,
  Expect<Equal<Sort<[3, 2, 0, 1, 0, 0, 0], true>, [3, 2, 1, 0, 0, 0, 0]>>,
  Expect<Equal<Sort<[2, 4, 7, 6, 6, 6, 5, 8, 9], true>, [9, 8, 7, 6, 6, 6, 5, 4, 2]>>,
]

type TestTrue = Sort<[2, 4, 7, 6, 6, 6, 5, 8, 9], true>