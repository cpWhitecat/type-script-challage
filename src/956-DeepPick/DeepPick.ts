type result<T extends object, K> = K extends `${infer L}.${infer R}` ? {
    [P in keyof T as (P extends L ? L : never)]:T[P] extends object ? result<T[P],R> : T[P]
}

: K extends keyof T ? Record<K,T[K]> : unknown

// 逆变

type DeepPick <T extends object, K> = (K extends K ?((k:result<T,K>)=>any) : never) extends ((k:infer P)=>any) ? P :never


// how to include key
// 为什么union类型不会分配了

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../../utils'

type Obj = {
  a: number
  b: string
  c: boolean
  obj: {
    d: number
    e: string
    f: boolean
    obj2: {
      g: number
      h: string
      i: boolean
    }
  }
  obj3: {
    j: number
    k: string
    l: boolean
  }
}


// 这个题目有问题啊 如果那个
type cases = [
  Expect<Equal<DeepPick<Obj, ''>, unknown>>,
  Expect<Equal<DeepPick<Obj, 'a'>, { a: number }>>,
  Expect<Equal<DeepPick<Obj, 'a' | ''>, { a: number } & unknown>>,
  Expect<Equal<DeepPick<Obj, 'a' | 'obj.e'>, { a: number } & { obj: { e: string } }>>,
  Expect<Equal<DeepPick<Obj, 'a' | 'obj.e' | 'obj.obj2.i'>, { a: number } & { obj: { e: string } } & { obj: { obj2: { i: boolean } } }>>,
]

type Test1 =DeepPick<Obj, 'a' | 'obj.e' | 'obj.obj2.i'>

type Test2  =DeepPick<Obj, 'a'> | DeepPick<Obj,''>