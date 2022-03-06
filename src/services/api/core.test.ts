import {
  addQueryParams,
  addResourceId,
  buildHeaders,
  createResourcePath,
  replyIsOk,
} from './core'

describe('Services API Core test suite', () => {
  test('should detect reply type', () => {
    const resultOk = replyIsOk({ ok: true, data: {}, status: 200 })
    const resultNotOk = replyIsOk({ ok: false, message: 'hi', status: 200 })
    expect(resultOk).toBe(true)
    expect(resultNotOk).toBe(false)
  })

  test('should create resource path', () => {
    const simple = createResourcePath('http://localhost:9000', [])
    const intermediate = createResourcePath('http://localhost:9000', ['users'])
    const complex = createResourcePath('http://localhost:9000', [
      'resources',
      'users',
      'find',
    ])
    expect(simple).toBe(`http://localhost:9000/`)
    expect(intermediate).toBe(`http://localhost:9000/users`)
    expect(complex).toBe(`http://localhost:9000/resources/users/find`)
  })

  test('should add resource id', () => {
    const withId = addResourceId('http://localhost:9000/users', 'abc1234')
    expect(withId).toBe('http://localhost:9000/users/abc1234')
  })

  test('should add query parameters', () => {
    const simple = addQueryParams('http://localhost:9000/users', {})
    const complex = addQueryParams('http://localhost:9000/users', {
      foo: 'bar',
      baz: '1',
    })
    expect(simple).toBe('http://localhost:9000/users')
    expect(complex).toBe('http://localhost:9000/users?foo=bar&baz=1')
  })

  test('should build headers', () => {
    // No headers!
    const noHeaders = buildHeaders(undefined, undefined)
    expect(noHeaders).toBeUndefined()

    // Only getHeaders
    const onlyGetHeaders = buildHeaders(undefined, () => ({
      Authorization: 'Bearer 1234',
    }))
    expect(onlyGetHeaders).toStrictEqual({ Authorization: 'Bearer 1234' })

    // Only options headers
    const onlyOptionsHeaders = buildHeaders({
      headers: { 'Content-Type': 'application/json' },
    })
    expect(onlyOptionsHeaders).toStrictEqual({
      'Content-Type': 'application/json',
    })

    // Both but no conflicts
    const bothNoConflict = buildHeaders(
      { headers: { 'Content-Type': 'application/json' } },
      () => ({
        Authorization: 'Bearer 1234',
      })
    )
    expect(bothNoConflict).toStrictEqual({
      'Content-Type': 'application/json',
      Authorization: 'Bearer 1234',
    })

    // Both with conflicts
    const bothWithConflicts = buildHeaders(
      { headers: { 'Content-Type': 'application/csv' } },
      () => ({
        Authorization: 'Bearer 1234',
        'Content-Type': 'application/json',
      })
    )
    expect(bothWithConflicts).toStrictEqual({
      'Content-Type': 'application/csv',
      Authorization: 'Bearer 1234',
    })
  })
})
