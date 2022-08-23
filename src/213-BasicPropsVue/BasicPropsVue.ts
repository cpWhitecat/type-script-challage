type computedType<T> = {  //这边是遍历 function
    [P in keyof T]:T[P] extends ()=>infer V ? V :never
  }

type handleProps<P,K extends keyof P = keyof P> = P extends object ? (P[K] extends { type:infer A} ? A : P[K][keyof P[K]] ): P


type TestObject<T , K extends keyof T = keyof T> = T extends object ? T[K] extends {type:infer P} ? T[K] : 1  : 2  
type Test2 = TestObject<{

  propB: { type: String },

}>

type VueBasicProps<P,D,C,M> = {
    props:P,
    data:(this:handleProps<P>)=>D,
    computed:ThisType<D&computedType<C>&M> & C,
    methods:ThisType<D&computedType<C>&M> & M
}



declare function VueBasicProps<P,D,C,M>(options: VueBasicProps<P,D,C,M>): any


/* _____________ Test Cases _____________ */
import type { Debug, Equal, Expect, IsAny } from '../../utils'
import { TupleToUnion } from '../10-tupleToUnion/tupleToUnion'

class ClassA {}

VueBasicProps({
  props: {
    propA: {},
    propB: { type: String },
    propC: { type: Boolean },
    propD: { type: ClassA },
    propE: { type: [String, Number] },
    propF: RegExp,
  },
  data(this) {
    type PropsType = Debug<typeof this>
    type cases = [
      Expect<IsAny<PropsType['propA']>>,
      Expect<Equal<PropsType['propB'], string>>,
      Expect<Equal<PropsType['propC'], boolean>>,
      Expect<Equal<PropsType['propD'], ClassA>>,
      Expect<Equal<PropsType['propE'], string | number>>,
      Expect<Equal<PropsType['propF'], RegExp>>,
    ]


    type ProB = PropsType['propB']
    type Test1 = handleProps<{
        propA: {},
        propB: { type: String },
        propC: { type: Boolean },
        propD: { type: ClassA },
        propE: { type: [String, Number] },
        propF: RegExp,
      }>
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
      alert(this.fullname.toLowerCase())
      alert(this.getRandom())
    },
    test() {
      const fullname = this.fullname
      const propE = this.propE
      type cases = [
        Expect<Equal<typeof fullname, string>>,
        Expect<Equal<typeof propE, string | number>>,
      ]
    },
  },
})