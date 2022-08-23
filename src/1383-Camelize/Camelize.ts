type firstUpperCase <S extends string> = S extends `${infer L}${infer R}` ? `${Uppercase<L>}${R}` : ''

type deyload<P> = P extends `${infer L}_${infer R}` ? `${L}${deyload<firstUpperCase<R>>}` : P

// type HandleArrayValueIsObject <A extends readonly any[]> = A extends readonly [infer F , ...infer Rest ] ? F extends object ? 

// 漏了一个错误 就是array 也是继承自object的 那看来要先判断是否为array了

type Camelize<T> =  T extends any[] ? (T extends [infer F , ...infer Rest] ? [Camelize<F>,...Camelize<Rest>] :T) : 

(T extends object ? {
    [P in keyof T as deyload<P>]:Camelize<T[P]>
} : T)
/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../../utils'

type cases = [
  Expect<Equal<
    Camelize<{
      some_prop: string
      prop: { another_prop: string }
      array: [
        { snake_case: string },
        { another_element: { yet_another_prop: string } },
        { yet_another_element: string },
      ]
    }>,
    {
      someProp: string
      prop: { anotherProp: string }
      array: [
        { snakeCase: string },
        { anotherElement: { yetAnotherProp: string } },
        { yetAnotherElement: string },
      ]
    }
  >>,
]



type EPUf =Camelize<{
  some_prop: string
  prop: { another_prop: string }
  array: [
    { snake_case: string },
    { another_element: { yet_another_prop: string } },
    { yet_another_element: string },
  ]
}>