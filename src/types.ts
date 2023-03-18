export type XNode = XElement | string

export type XElement = {
  tag: string
  attributes: Record<string, string>
  children: Array<XNode>
}

export function isElement(node: XNode): node is XElement {
  return typeof node === "object"
}

export function matchElement(
  node: XNode,
  options: { tags: Array<string> },
): node is XElement {
  if (!isElement(node)) return false

  return options.tags.includes(node.tag)
}
