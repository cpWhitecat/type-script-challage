type Functions<T> = {
    [P in keyof T]:T[P] extends ()=>infer A ? A :never
}

type Del<T , K extends keyof T = keyof T> = T[K]
// 最后要实现的就是把所有的方法属性共享同一个this

type Store<S,G,A> = {
    id:string,
    state:()=>S,
    getters?:G  & ThisType<Functions<A>&Functions<G>&S>,
    actions?:A  & ThisType<A&Functions<G>&S&G>
}

declare function defineStore<S,G,A>(store: Store<S,G,A>):Store<S,G,A>
// 做这个之前或许应该把Pinia doc看一遍

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../../utils'

const store = defineStore({
  id: '',
  state: () => ({
    num: 0,
    str: '',
  }),
  getters: {
    stringifiedNum() {
      // @ts-expect-error
      this.num += 1   //这边的this指向是没问题的 有什么错误我没发现？？  (原来是只读问题)

      return this.num.toString()
    },
    parsedNum() {
      return parseInt(this.stringifiedNum)
    },
  },
  actions: {
    init() {
      this.reset()
      this.increment()
    },
    increment(step = 1) {
      this.num += step
    },
    reset() {
      this.num = 0

      // @ts-expect-error
      this.parsedNum = 0

      return true
    },
    setNum(value: number) {
      this.num = value
    },
  },
})

// @ts-expect-error
store.nopeStateProp
// @ts-expect-error
store.nopeGetter
// @ts-expect-error
store.stringifiedNum()
store.init()
// @ts-expect-error
store.init(0)
store.increment()
store.increment(2)
// @ts-expect-error
store.setNum()
// @ts-expect-error
store.setNum('3')
store.setNum(3)
const r = store.reset()

type _tests = [
  Expect<Equal<typeof store.num, number>>,
  Expect<Equal<typeof store.str, string>>,
  Expect<Equal<typeof store.stringifiedNum, string>>,
  Expect<Equal<typeof store.parsedNum, number>>,
  Expect<Equal<typeof r, true>>,
]

type Test1 =typeof store.state.num

