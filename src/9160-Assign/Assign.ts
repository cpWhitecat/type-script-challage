type traverseTuple<T extends any[]> = T 

// 一步到位 还是递归并重映射？？
// 实现键的重映射
// U[number] 应该返回的是union类型 是没有顺序的 ， 所以不能这样 不然是没有意义的 要换种方法遍历
export type Assign<T extends Record<string, unknown>, U extends any[]> = 
U extends {length:0} 
? never 
: {
    
} 



