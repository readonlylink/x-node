import { h } from "./h"
import { XElement, XNode, isElement } from "./x-node"

export function parse(input: string): Array<XNode> {
  const domParser = new DOMParser()
  const nodes = []
  const dom = domParser.parseFromString(input, "text/html")

  const root = dom.childNodes[0]
  const [_head, body] = fromNodes(root.childNodes)
  if (isElement(body)) {
    return body.children
  } else {
    throw new Error(`[parse] body is not element`)
  }
}

function fromNodes(childNodes: NodeListOf<ChildNode>): Array<XNode> {
  const nodes = []
  for (const node of Array.from(childNodes)) {
    if (node.nodeType === 1) nodes.push(fromElement(node as Element))
    if (node.nodeType === 3) nodes.push(fromText(node as Text))
  }

  return nodes
}

function fromText(node: Text): string {
  return node.wholeText
}

function fromElement(node: Element): XElement {
  const attributes: Record<string, string> = {}
  for (const attribute of Array.from(node.attributes)) {
    attributes[attribute.name] = attribute.value
  }

  return h(node.tagName.toLowerCase(), attributes, fromNodes(node.childNodes))
}
