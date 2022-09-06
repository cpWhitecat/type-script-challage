type forEach<T extends any[],N> = T[number] extends (infer K) ? [N] :never

// 估计要做减法



type Fill<
  T extends unknown[],
  N,
  Start extends number = 0,
  End extends number = T['length'],
  Cache extends any[] =[],
  Replacing extends boolean = false
> = T extends [infer F ,...infer Rest]
?  (Cache['length'] extends End 
      ? Fill<Rest,N,Start,End,[...Cache,F],false>
      :(Cache['length'] extends Start 
        ? Fill<Rest,N,Start,End,[...Cache,N],true> 
        :Replacing extends true 
          ? Fill<Rest,N,Start,End,[...Cache,N],Replacing> 
          : Fill<Rest,N,Start,End,[...Cache,F],false>) 
    )
:Cache

/**
 * Cache['length'] extends Start
  ? Fill<Rest,N,Start,End,[...Cache,N],true>
  : Replacing extends true
    ? Fill<Rest,N,Start,End,[...Cache,N],Replacing>
    : Cache['length'] extends End
      ? Fill<Rest,N,Start,End,[...Cache,F],false>
      :Fill<Rest,N,Start,End,[...Cache,F],Replacing>
*/
/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../../utils'

type cases = [
  Expect<Equal<Fill<[], 0>, []>>,
  Expect<Equal<Fill<[], 0, 0, 3>, []>>,
  Expect<Equal<Fill<[1, 2, 3], 0, 0, 0>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], 0, 2, 2>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], 0>, [0, 0, 0]>>,
  Expect<Equal<Fill<[1, 2, 3], true>, [true, true, true]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 0, 1>, [true, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 1, 3>, [1, true, true]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 10, 0>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 0, 10>, [true, true, true]>>,
]


type B = Fill<[1, 2, 3], true, 0, 1>
type C = Fill<[1, 2, 3], 0, 2, 2>
// type C = ['jfle','wijf'][0]