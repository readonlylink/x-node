import { expect, test } from "vitest"
import { parse } from "./parse"

test("basic", () => {
  const nodes = parse(
    `
<question class="text-2xl" color="red"> Hello world </question>

note

<answer> hi </answer>
`,
  )

  expect(nodes).toEqual([
    {
      tag: "question",
      attributes: { class: "text-2xl", color: "red" },
      children: [" Hello world "],
    },
    "\n\nnote\n\n",
    { tag: "answer", attributes: {}, children: [" hi "] },
    "\n",
  ])
})

test("self-closing tag", () => {
  const nodes = parse(`<question theme:color="red" />`)

  expect(nodes).toEqual([
    {
      tag: "question",
      attributes: { "theme:color": "red" },
      children: [],
    },
  ])
})

test("self-closing tag -- newline pushed to children", () => {
  const nodes = parse(
    `
<question theme:color="red" />
`,
  )

  expect(nodes).toEqual([
    {
      tag: "question",
      attributes: { "theme:color": "red" },
      children: ["\n"],
    },
  ])
})

test("crazy tag name", () => {
  const nodes = parse(`
<q&a></q&a>
<q+a></q+a>
`)

  expect(nodes).toEqual([
    {
      tag: "q&a",
      attributes: {},
      children: [],
    },
    "\n",
    {
      tag: "q+a",
      attributes: {},
      children: [],
    },
    "\n",
  ])
})

test("namespace prefix", () => {
  const nodes = parse(
    `
<question theme:color="red">
  Q
</question>
`,
  )

  expect(nodes).toEqual([
    {
      tag: "question",
      attributes: { "theme:color": "red" },
      children: ["\n  Q\n"],
    },
    "\n",
  ])
})
