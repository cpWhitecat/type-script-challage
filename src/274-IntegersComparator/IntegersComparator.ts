import { Equal } from "../../utils"
import { GreaterThan } from "../4425-GreaterThan/GreaterThan"   //以前这个utils 没有考虑 复数问题 ，其实还需要考虑小数问题 ， 但我想摆了

enum Comparison {
    Greater,
    Equal,
    Lower,
  }
  

type Than<A extends number,B extends number> = Equal<A,B> extends true ? Comparison.Equal : (GreaterThan<A,B> extends true ? Comparison.Greater : Comparison.Lower )


  type Comparator<A extends number, B extends number> =
   `${A}` extends `-${infer All_A extends number}` 
    ? `${B}` extends `-${infer All_B extends number}` ?  Than<All_B,All_A> : Comparison.Lower
    : `${B}` extends `-${infer All_B extends number}` ?  Comparison.Greater : Than<A,B>
  
  
  /* _____________ Test Cases _____________ */
  import type { Expect } from '../../utils'
  
  type cases = [
    Expect<Equal<Comparator<5, 5>, Comparison.Equal>>,
    Expect<Equal<Comparator<5, 6>, Comparison.Lower>>,
    Expect<Equal<Comparator<5, 8>, Comparison.Lower>>,
    Expect<Equal<Comparator<5, 0>, Comparison.Greater>>,
    Expect<Equal<Comparator<-5, 0>, Comparison.Lower>>,
    Expect<Equal<Comparator<0, 0>, Comparison.Equal>>,
    Expect<Equal<Comparator<0, -5>, Comparison.Greater>>,
    Expect<Equal<Comparator<5, -3>, Comparison.Greater>>,
    Expect<Equal<Comparator<5, -7>, Comparison.Greater>>,
    Expect<Equal<Comparator<-5, -7>, Comparison.Greater>>,
    Expect<Equal<Comparator<-5, -3>, Comparison.Lower>>,
    Expect<Equal<Comparator<-25, -30>, Comparison.Greater>>,
    Expect<Equal<Comparator<15, -23>, Comparison.Greater>>,
    Expect<Equal<Comparator<40, 37>, Comparison.Greater>>,
    Expect<Equal<Comparator<-36, 36>, Comparison.Lower>>,
    Expect<Equal<Comparator<27, 27>, Comparison.Equal>>,
    Expect<Equal<Comparator<-38, -38>, Comparison.Equal>>,
  ]