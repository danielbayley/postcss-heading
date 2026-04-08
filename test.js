import assert, { describe, it } from "#test"
import { isNested, specificity, compare, squash } from "#utils"
import postcss from "postcss"
import plugin, { heading } from "postcss-heading"

async function test(css) {
  const from = import.meta.filename
  const { root } = await postcss(plugin).process(css, { from })
  const [{ nodes: [node], selector }] = root.nodes
  return node && isNested(node) ? node.selector : selector
}

const selector = ":heading"
const length = 6
const range = `[1-${length}]`
const tags = Array.from({ length }, (_, i) => `h${++i}`)
const is = ":is"
const rule = `${is}(${tags.join(", ")})`

describe("`heading`", () => {
  it("is the `default` `export`", assert.equal(plugin, heading))

  it(`replaces \`${selector}\` pseudo-class selector with \`${rule}\``,
    assert.async.equal(test(`${selector} {}`), rule))

  it(`replaces functional \`${selector}()\` pseudo-class selector with \`${rule}\``,
    assert.async.equal(test(`${selector}() {}`), rule))

  it(`replaces functional \`${selector}(n)\` pseudo-class selector with equivalent \`h${range}\` tag`, () => {
    const n = 2
    const css = `${selector}(${n}) {}`
    assert.async.equal(test(css), `${is}(h${n})`)
  })

  it(`replaces functional \`${selector}(n, n...)\` pseudo-class selector with equivalent \`h${range}\` tags`, () => {
    const levels = [3, 5]
    const css = `${selector}(${levels}) {}`
    const h = levels.map(n => `h${n}`)
    assert.async.equal(test(css), `${is}(${h})`)
  })

  it(`\`throw\`s an \`error\` for invalid \`${selector}\` levels`, () => {
    const n = "7"
    assert.rejects(test(`${selector}(${n}) {}`), n)
  })

  it("including multiple selectors", () => {
    const g = pattern => RegExp(pattern, "g")
    const css = `
      ${selector}(1, 3),
      ${selector}(2, 4) {}`

    const post = css
      .replace(g(selector), is)
      .replace(g(`(${range})`), "h$1")

    assert.async.includes(post, test(css))
  })

  it("works with nested selectors",
    assert.async.equal(test(`* { ${selector} {} }`), rule))

  it("minifies rule with `NODE_ENV` in `production`", context => {
    const env = process.env
    context.beforeEach(() => process.env = {...env })
    context.after(() => process.env = env)

    process.env.NODE_ENV = "production"
    assert.async.equal(test(`${selector} {}`), squash(rule))
  })

  it("else preserves spacing", assert.async.equal(test(`${selector} {}`), rule))

  it("preserves the specificity", async () => {
    const css = `${selector} {}`
    const post = await test(css)
    const [tag] = tags

    const a = await specificity(tag)
    const b = await specificity(post)
    const c = await specificity(`:where(${tag})`)

    assert.equal(compare(a, b), 0)
    assert.notEqual(compare(b, c), 0)
  })
})
