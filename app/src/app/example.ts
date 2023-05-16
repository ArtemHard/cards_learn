type User<T, U> = {
  name: T
  age: U
}

const user: User<string, number> = {
  name: "Alex",
  age: 13,
}

type FirstType = {
  a: string
}

function someFunc<T extends FirstType>(params: T): number {
  return 1
}

type WithLengthType = {
  length: number
}

let t1 = "hi"
let t2 = [1, 2, 3]
let t3 = { length: 10 }

function withComment<U extends WithLengthType>(item: U): [U, string] {
  return [item, `What's = ${item.length}`]
}

let [item, comment] = withComment(t1)
console.log(item, comment)
item.indexOf("asdf")

type HipHop<T> = T extends "user" ? UserType : PhotoType

type UserType = {
  firstName: string
  lastName: string
  age: number
}

type PhotoType = {
  large: string
  small: string
}

// let a: HipHop<"user"> = {

// }
// let b: HipHop<"photo"> = {

// }

type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never

export const names = {
  a: { name: "Artem" },
  b: { age: 33 },
  c: { site: { title: "it-incuba" } },
}

// type SomeTypes = typeof names.a | typeof names.b | typeof names.c
// type SomeTypes<T> =  T extends {[key: string]: infer U} ?   U : never

// let hiphop2: SomeTypes<typeof names> = {name: '7987'}

// let hipHip: SomeTypes<typeof names> = {age: 13}
