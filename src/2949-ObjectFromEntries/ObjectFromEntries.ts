type toKey<P> = P extends [infer F , ...infer Rest] ? F : never

type toValue<P> = P extends [...infer Rest , infer F] ? F : never

type ObjectFromEntries<T> = {
    [P in T as toKey<P extends any[] ? P :never>  ]:toValue<P>
}

// 题应该不需要考虑深度问题
/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../../utils'

interface Model {
  name: string
  age: number
  locations: string[] | null
}

type ModelEntries = ['name', string] | ['age', number] | ['locations', string[] | null]

type cases = [
  Expect<Equal<ObjectFromEntries<ModelEntries>, Model>>,
]


type DP = ObjectFromEntries<ModelEntries>