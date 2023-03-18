import { parseXml, XmlNode, XmlElement, XmlText } from '@rgrove/parse-xml'
import { h, XElement, XNode } from './index'

interface ParsingErrorOptions {
  column: number
  excerpt: string
  line: number
  pos: number
}

export interface ParsingError extends ParsingErrorOptions {}
export class ParsingError extends Error {
  constructor(public message: string, options: ParsingErrorOptions) {
    super()
    Object.assign(this, options)
  }
}

export function parseNodes(input: string): Array<XNode> {
  try {
    const root = parseXml(`<root>${input}</root>`, {})
    return fromNodes((root.children[0] as any).children)
  } catch (error) {
    if (!(error instanceof Error)) throw error
    if (
      error.hasOwnProperty('column') &&
      error.hasOwnProperty('excerpt') &&
      error.hasOwnProperty('line') &&
      error.hasOwnProperty('pos')
    ) {
      throw new ParsingError(error.message, error as any)
    } else {
      throw error
    }
  }
}

function fromNodes(childNodes: Array<XmlNode>): Array<XNode> {
  const nodes = []
  for (const node of childNodes) {
    if (node.type === 'element') nodes.push(fromElement(node as XmlElement))
    if (node.type === 'text') nodes.push(fromText(node as XmlText))
  }

  return nodes
}

function fromText(node: XmlText): string {
  return node.text
}

function fromElement(node: XmlElement): XElement {
  return h(node.name, node.attributes, fromNodes(node.children))
}
