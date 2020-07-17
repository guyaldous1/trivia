
const goalValues = {
    a: {first: 6, other: 3},
    b: {first: 7, other: 3},
    c: {first: 7, other: 4},
    d: {first: 8, other: 3},
    e: {first: 8, other: 4},
    f: {first: 9, other: 5},
    g: {first: 10, other: 5},
    h: {first: 10, other: 6},
    i: {first: 11, other: 6},
    j: {first: 12, other: 7},
    k: {first: 13, other: 7},
  }
  
  const n1 = [
    { goal: "all houses on top row", ...(goalValues.a), adv: true },
    { goal: "two estates with 6 length", ...(goalValues.h) },
    { goal: "two estates with 5 length", ...(goalValues.e) },
    { goal: "four estates with 2 length", ...(goalValues.e) },
    { goal: "all houses on bottom row", ...(goalValues.e), adv: true },
    { goal: "5 bis actions", ...(goalValues.d), adv: true },
    { goal: "two estates with 4 length", ...(goalValues.a) },
    { goal: "three estates with 3 length", ...(goalValues.e) },
    { goal: "7 construction actions", ...(goalValues.a), adv: true },
    { goal: "six estates with 1 length", ...(goalValues.e) },
    { goal: "first and last houses on every row", ...(goalValues.c), adv: true },
  ]
  
  const n2 = [
    { goal: "all pools and parks on middle row", ...(goalValues.d), adv: true },
    { goal: "all pools and parks on bottom row", ...(goalValues.g), adv: true },
    { goal: "1 roundabout and all pools and parks on one row", ...(goalValues.g), adv: true },
    { goal: "all parks on two rows", ...(goalValues.c), adv: true },
    { goal: "all pools on two rows", ...(goalValues.c), adv: true },
    { goal: "estate of 5 and two estates of 2", ...(goalValues.h) },
    { goal: "estate of 5 and one estate of 4", ...(goalValues.f) },
    { goal: "estate of 4 and three estates of 1", ...(goalValues.f) },
    { goal: "estate of 3 and one estate of 6", ...(goalValues.e) },
    { goal: "estate of 6 and three estates of 1", ...(goalValues.i) },
    { goal: "estate of 4 and two estates of 3", ...(goalValues.j) },
  ]
  
  const n3 = [
    { goal: "estate of 6, estate of 2, estate of 1", ...(goalValues.j) },
    { goal: "estate of 3, two estates of 2, estate of 1", ...(goalValues.i) },
    { goal: "estate of 2, estate of 5", ...(goalValues.b) },
    { goal: "estate of 3, estate of 4", ...(goalValues.b) },
    { goal: "estate of 2, estate of 3, estate of 5", ...(goalValues.k) },
    { goal: "estate of 1, estate of 4, estate of 5", ...(goalValues.k) },
  ]

  module.exports = {
      n1, n2, n3
  }