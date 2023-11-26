import { expect, describe, it } from 'vitest'
import { splitExpensesToUsers } from '../utils/calculateExpenses'

describe('Split expense to users', () => {
  it('should split more amount with current user', () => {
    expect(splitExpensesToUsers([1, 2], 100, 3)).toStrictEqual([
      { userId: 1, amount: 33 },
      { userId: 2, amount: 33 },
      { userId: 3, amount: 34 },
    ])
  })
  it('should split more amount with current user', () => {
    expect(splitExpensesToUsers([1, 2, 3, 4, 5, 6], 1000, 7)).toStrictEqual([
      { userId: 1, amount: 142 },
      { userId: 2, amount: 142 },
      { userId: 3, amount: 142 },
      { userId: 4, amount: 142 },
      { userId: 5, amount: 142 },
      { userId: 6, amount: 142 },
      { userId: 7, amount: 148 },
    ])
  })
  it('should split equal amount to every user', () => {
    expect(splitExpensesToUsers([1, 2, 3], 200, 4)).toStrictEqual([
      { userId: 1, amount: 50 },
      { userId: 2, amount: 50 },
      { userId: 3, amount: 50 },
      { userId: 4, amount: 50 },
    ])
  })
})
