interface TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
  }
  type InorderTraversal<T extends TreeNode | null,LastVal = never> = 
  // T extends TreeNode 
  //   ? T['left'] extends null 
  //     ? T['right'] extends TreeNode ? [T['val'],...InorderTraversal<T['right']>]
  //     : [T['val']]

  




  T extends TreeNode 
  ?  T['left'] extends TreeNode 
    ? InorderTraversal<T['left'],T['val']>
    : T['right'] extends TreeNode 
        ? [T['val'],...InorderTraversal<T['right']>]
        : [LastVal] extends [never] ? [T['val']] : [T['val'],LastVal]
  :[]
  
  /* _____________ Test Cases _____________ */
  import type { Equal, Expect } from '../../utils'
  
  const tree1 = {
    val: 1,
    left: null,
    right: {
      val: 2,
      left: {
        val: 3,
        left: null,
        right: null,
      },
      right: null,
    },
  } as const
  
  type tree1Type = typeof tree1
  type B = InorderTraversal<typeof tree4>

  const tree2 = {
    val: 1,
    left: null,
    right: null,
  } as const
  
  const tree3 = {
    val: 1,
    left: {
      val: 2,
      left: null,
      right: null,
    },
    right: null,
  } as const
  
  const tree4 = {
    val: 1,
    left: null,
    right: {
      val: 2,
      left: null,
      right: null,
    },
  } as const
  
  type cases = [
    Expect<Equal<InorderTraversal<null>, []>>,
    Expect<Equal<InorderTraversal<typeof tree1>, [1, 3, 2]>>,
    Expect<Equal<InorderTraversal<typeof tree2>, [1]>>,
    Expect<Equal<InorderTraversal<typeof tree3>, [2, 1]>>,
    Expect<Equal<InorderTraversal<typeof tree4>, [1, 2]>>,
  ]

  