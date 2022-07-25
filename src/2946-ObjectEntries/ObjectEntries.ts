import type {PartialByKeys} from '../2757-PartialByKeys/PartialByKeys'
type ObjectEntries<T, U extends keyof T = keyof T> = U extends keyof T ? [U,T[U] extends infer P | undefined ? P extends never ? T[U] : P : T[U]]: never


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../../utils'

interface Model {

  name: string
  age: number
  locations: string[] | null
}

type ModelEntries = ['name', string] | ['age', number] | ['locations', string[] | null]

type cases = [
  Expect<Equal<ObjectEntries<Model>, ModelEntries>>,
  Expect<Equal<ObjectEntries<Partial<Model>>, ModelEntries>>,
  Expect<Equal<ObjectEntries<{ key?: undefined }>, ['key', undefined]>>,
  Expect<Equal<ObjectEntries<{ key: undefined }>, ['key', undefined]>>,
]

type B = ObjectEntries<Model>