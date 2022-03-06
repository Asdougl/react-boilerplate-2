import { isEven } from './maths'

describe('Maths util function test suite', () => {
  test('should determine odd and even numbers', () => {
    const oddNum = 2785341,
      evenNum = 198262934
    const oddResult = isEven(oddNum)
    const evenResult = isEven(evenNum)
    expect(oddResult).toBe(false)
    expect(evenResult).toBe(true)
  })
})
