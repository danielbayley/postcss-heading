import parser from "postcss-selector-parser"
import { selectorSpecificity, compare } from "@csstools/selector-specificity"
export { compare }

export const specificity = css =>
  parser().ast(css).then(selectorSpecificity)

export const isNested = node =>
  node.type === "rule" && node.parent?.type === "rule"

export const squash = text => text.replace(/[\s\n]+/gm, "")
