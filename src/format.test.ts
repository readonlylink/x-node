import { expect, test } from "vitest"
import { format } from "./format.js"
import { parse } from "./parse.js"

test("format", () => {
  const text = `
hi

<x> hi </x>

hi

<x a="1"> hi </x>
`
  const nodes = parse(text)

  expect(format(nodes)).toEqual(text)
})
