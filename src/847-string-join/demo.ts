declare function join<T>(delimiter: T): (...parts: any[]) => true

const noCharsOutput = join('-')()
const oneCharOutput = join('-')('a')