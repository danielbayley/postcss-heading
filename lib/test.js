import {strict} from "node:assert"
export * from "node:test"

export const assert = {...strict }
export default assert

assert.includes = (text, string) => strict.equal(text.includes(string), true)

assert.async = {}
Object.keys(assert).forEach(method =>
  assert.async[method] = async (...units) =>
    assert[method](...await Array.fromAsync(units)))
