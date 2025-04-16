type Element = Node | null | undefined
/*
 * If value is undefined then opposite(not.toHaveAttribute) check is performed
 */
export const testAttribute = (el: Element, name: string, value?: string) => {
  if (value !== undefined) {
    expect(el).toHaveAttribute(name, value)
  } else {
    expect(el).not.toHaveAttribute(name)
  }
}

export const testContent = (el: Element, value?: string) => {
  if (value) {
    expect(el).toHaveTextContent(value)
  }
}

export const testClass = (el: Element, value?: string) => {
  if (value) {
    expect(el).toHaveClass(value)
  }
}
