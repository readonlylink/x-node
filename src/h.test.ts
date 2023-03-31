import { expect, test } from "vitest"
import { h } from "./h"

test("h", () => {
  expect(h("question", { color: "red" }, ["Why?"])).toEqual({
    tag: "question",
    attributes: { color: "red" },
    children: ["Why?"],
  })

  expect(h("question", ["Why?"])).toEqual({
    tag: "question",
    attributes: {},
    children: ["Why?"],
  })

  expect(h("question", { color: "red" })).toEqual({
    tag: "question",
    attributes: { color: "red" },
    children: [],
  })

  expect(h("question", { color: "red" }, "Why?")).toEqual({
    tag: "question",
    attributes: { color: "red" },
    children: ["Why?"],
  })
})
