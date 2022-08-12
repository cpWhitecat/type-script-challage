type TupleToUnion<T extends readonly string[]> = T[number]

type IndexOfReadlony<T extends readonly any[],K ,Cache extends readonly any[] = []> = T extends readonly [infer F ,...infer Rest] 
? (Equal<F,K> extends true ? Cache['length'] :IndexOfReadlony<Rest,K,[...Cache,F]>  )
:'fa'

type UpperCaseFirstString<T> = T extends `${infer F}${infer Rest}` ? `${Uppercase<F>}${Rest}` :T

type OperateTupleValue <T extends readonly string[]> = {
    readonly [P in TupleToUnion<T> as UpperCaseFirstString<P> ]:P
}

type OperateTupleKey<T extends readonly string[]> = {
    readonly [P in TupleToUnion<T> as UpperCaseFirstString<P> ]:IndexOfReadlony<T,P>
}
type Enum<T extends readonly string[], N extends boolean = false> = 
N extends true 
    ?OperateTupleKey<T>
    :OperateTupleValue<T>

type TestEnum = Equal<
TestEnum2,
{
  readonly MacOS: 'macOS'
  readonly Windows: 'Windows'
  readonly Linux: 'Linux'
}>


type TestEnum2 =    Enum<typeof OperatingSystem, true>
type teste3 = typeof OperatingSystem[]
// 隐藏需求， 需要每个Key首字母大写

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../../utils'
import { IndexOf } from '../5153-Indexof/indexof'
// import { TupleToUnion } from '../10-tupleToUnion/tupleToUnion'

const OperatingSystem = ['macOS', 'Windows', 'Linux'] as const
const Command = ['echo', 'grep', 'sed', 'awk', 'cut', 'uniq', 'head', 'tail', 'xargs', 'shift'] as const

type TestOS= keyof (typeof OperatingSystem)

type cases = [
  Expect<Equal<Enum<[]>, {}>>,
  Expect<Equal<
  Enum<typeof OperatingSystem>,
  {
    readonly MacOS: 'macOS'
    readonly Windows: 'Windows'
    readonly Linux: 'Linux'
  }
  >>,
  Expect<Equal<
  Enum<typeof OperatingSystem, true>,
  {
    readonly MacOS: 0
    readonly Windows: 1
    readonly Linux: 2
  }
  >>,
  Expect<Equal<
  Enum<typeof Command>,
  {
    readonly Echo: 'echo'
    readonly Grep: 'grep'
    readonly Sed: 'sed'
    readonly Awk: 'awk'
    readonly Cut: 'cut'
    readonly Uniq: 'uniq'
    readonly Head: 'head'
    readonly Tail: 'tail'
    readonly Xargs: 'xargs'
    readonly Shift: 'shift'
  }
  >>,
  Expect<Equal<
  Enum<typeof Command, true>,
  {
    readonly Echo: 0
    readonly Grep: 1
    readonly Sed: 2
    readonly Awk: 3
    readonly Cut: 4
    readonly Uniq: 5
    readonly Head: 6
    readonly Tail: 7
    readonly Xargs: 8
    readonly Shift: 9
  }
  >>,
]