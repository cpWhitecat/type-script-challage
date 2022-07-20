import type {MyParameters} from '../3312-Parameters/Parameters'
type AppendArgument<Fn extends (...Args:any[])=> any, A> = Fn extends (...args:infer F)=> infer P ?  (...args:[...F,A]) => P : never

// 这题可以做出来的 555

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '../../utils'

type Case1 = AppendArgument<(a: number, b: string) => number, boolean>
type Result1 = (a: number, b: string, x: boolean) => number

type Case2 = AppendArgument<() => void, undefined>
type Result2 = (x: undefined) => void

type cases = [
  Expect<Equal<Case1, Result1>>,
  Expect<Equal<Case2, Result2>>,
]
