type jude<T , K> = K extends keyof T ? T[K] : never

type Get<T, K> = K extends `${infer F}.${infer Rest}` ? Get<jude<T,F>,Rest>:jude<T,K>


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../../utils'

type cases = [
  Expect<Equal<Get<Data, 'hello'>, 'world'>>,
  Expect<Equal<Get<Data, 'foo.bar.count'>, 6>>,
  Expect<Equal<Get<Data, 'foo.bar'>, { value: 'foobar'; count: 6 }>>,

  Expect<Equal<Get<Data, 'no.existed'>, never>>,
]

type Data = {
  foo: {
    bar: {
      value: 'foobar'
      count: 6
    }
    included: true
  }
  hello: 'world'
}

type testFooBarGet = Get<Data, 'foo.bar.count'>