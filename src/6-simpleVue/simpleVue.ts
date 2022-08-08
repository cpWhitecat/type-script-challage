type computedType<T> = {  //这边是遍历 function
  [P in keyof T]:T[P] extends ()=>infer V ? V :never
}

// ThisType 这个类型 虽然没有直接看到对函数的this注明类型 ，其实已经隐式的完成了

type Options<D,C,M> ={
   data:(this:{})=>D,
   computed:ThisType<D&computedType<C>&M> & C,
   methods:ThisType<D&computedType<C>&M> & M
}





declare function SimpleVue<D,C,M>(options: Options<D,C,M>): any


/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '../../utils'

SimpleVue({
  data() {
    // @ts-expect-error
    this.firstname
    // @ts-expect-error
    this.getRandom()
    // @ts-expect-error
    this.data()

    return {
      firstname: 'Type',
      lastname: 'Challenges',
      amount: 10,
    }
  },
  computed: {
    fullname() {
      return `${this.firstname} ${this.lastname}`
    },
  },
  methods: {
    getRandom() {
      return Math.random()
    },
    hi() {
      alert(this.amount)
      alert(this.fullname.toLowerCase())
      alert(this.getRandom())
    },
    test() {
      const fullname = this.fullname
      const cases: [Expect<Equal<typeof fullname, string>>] = [] as any
    },
  },
})
