type computedType = {
    fullname :(this:intry['date']|intry['methods']|intry['computed'])=>any
}
// 在那本vue的设计与实现书中 ，这种有名的函数 是通过一个特殊的函数渲染出来的
type methodsType= {

}

type intry = {
   
    computed:computedType,
    methods:methodsType,
    date(this:intry['methods']|intry['computed']|intry['date']):any
}

declare function SimpleVue(options: intry): any


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
