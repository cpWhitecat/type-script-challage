// type ObjectReadonly<T,B extends keyof T =  keyof T> =  {
//     readonly [P in keyof T[B]] : T[B][P] extends object ?  ObjectReadonly<T[B][P]> : T[B][P]
// }

// type ArrayReadonly<T extends any[]> =  T[number] extends object ? ObjectReadonly<T,number> : T[number] //有问题返回union


// type DeepReadonly<T> = T extends object ? {readonly [P in keyof T]:T[P] extends object ? T[P] extends Function? T[P] : ObjectReadonly<T,P> : T[P]} : T extends unknown[] ? ArrayReadonly<T> : T
// type ObjectReadonly<T,C extends keyof T = keyof T> = {
//     readonly [P in keyof T] : T[P] extends infer C ? C :T[P] extends object ? ObjectReadonly<T[P]> : T[P]
// }

type DeepReadonly<T,P extends keyof T = keyof T> = {
    readonly [C in keyof T] : keyof T[C] extends never ? T[C] : DeepReadonly<T[C]>
}
/**
 * 首先接收一个对象 ,进行预处理
 * 然后开始遍历对象
 * 如果结果继承自object 那么把这个结果递归
*/

// 问题找到了 必须要用键入的方式递归里面的Key 直接. 的引用才可以访问到相应的键

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '../../utils'


type CP = {
    a: () => 22
    b: string
     c: {
      d: boolean
      e: {
        g: {
          h: {
            i: true
            j: 'string'
          }
          k: 'hello'
        }
        l: [
          'hi',
          {
            m: ['hey']
          },
        ]
      }
    }
  }
  type CCCA = DeepReadonly<CP['c']>
  type CD = CP['c']['d'] extends object ? true : false
  type CCCB = ArrayReadonly<CP['c']['e']['l']>
  type CCA = DeepReadonly<CP>

type cases = [
  Expect<Equal<DeepReadonly<X>, Expected>>,
]

type X = {
  a: () => 22
  b: string
  c: {
    d: boolean
    e: {
      g: {
        h: {
          i: true
          j: 'string'
        }
        k: 'hello'
      }
      l: [
        'hi',
        {
          m: ['hey']
        },
      ]
    }
  }
}




type Expected = {
  readonly a: () => 22
  readonly b: string
  readonly c: {
    readonly d: boolean
    readonly e: {
      readonly g: {
        readonly h: {
          readonly i: true
          readonly j: 'string'
        }
        readonly k: 'hello'
      }
      readonly l: readonly [
        'hi',
        {
          readonly m: readonly ['hey']
        },
      ]
    }
  }
}


interface ccccc{
    readonly name:{
        first:string,
        last:string
    }
}


let testN : ccccc = {
   readonly name:{
        first:'b',
        last:'b'
    }
}

testN.name['first'] = 'a'
testN.name = {}

type keys = keyof ccccc['name']

type ccccccccc<T> = {
    readonly 
} 