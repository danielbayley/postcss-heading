import parser from "postcss-selector-parser"
import metadata from "./package.json" with { type: "json" }

const pseudo = ":heading"
const length = 6

export const heading = () => ({
  postcssPlugin: metadata.name,
  async Rule(rule) {
    if (!rule.selector.includes(pseudo)) return

    const transform = selectors =>
      selectors.walkPseudos(heading => {
        if (heading.value !== pseudo) return

        let tags = 0
        const is = heading.clone(heading)
        is.value = ":is"
        is.walkTags(tag => {
          const n = parseInt(tag.value)
          if (n > length) throw rule.error(`Invalid ${pseudo} level ${n}`)

          const h = tag.clone(tag)
          h.value = `h${n}`
          tag.replaceWith(h)
          tags++
        })

        if (tags === 0) is.nodes = Array.from({ length }, (_, i) => {
          const spaces = process.env.NODE_ENV !== "production" && i > 0 ? { before: " " } : null
          return parser.tag({ value: `h${++i}`, spaces })
        })
        heading.replaceWith(is)
      })
    rule.selector = await parser(transform).process(rule.selector)
  }
})

heading.postcss = true
export default heading
