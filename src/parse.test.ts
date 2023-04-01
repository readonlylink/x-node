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
    "\n",
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

test("Chinese tag name", () => {
  const nodes = parse(
    `
<问 class="text-2xl" color="red"> Hello world </问>

note

<答> hi </答>
`,
  )

  expect(nodes).toEqual([
    "\n",
    {
      tag: "问",
      attributes: { class: "text-2xl", color: "red" },
      children: [" Hello world "],
    },
    "\n\nnote\n\n",
    { tag: "答", attributes: {}, children: [" hi "] },
    "\n",
  ])
})

test("Self closing tag", () => {
  const nodes = parse(
    `
<主题 颜色="青" />
`,
  )

  expect(nodes).toEqual([
    "\n",
    {
      tag: "主题",
      attributes: { 颜色: "青" },
      children: [],
    },
    "\n",
  ])
})

test("error on disallowed character in tag name", () => {
  expect(() => {
    const nodes = parse(`<q&a></q&a>`)
  }).toThrow()

  expect(() => {
    const nodes = parse(`<q+a></q+a>`)
  }).toThrow()
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
    "\n",
    {
      tag: "question",
      attributes: { "theme:color": "red" },
      children: ["\n  Q\n"],
    },
    "\n",
  ])
})
