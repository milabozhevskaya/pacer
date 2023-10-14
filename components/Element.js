class Element {
  constructor({
    parent = null,
    tagName = 'div',
    className = '',
    content = '',
    styles = {},
  }) {
    const element = document.createElement(tagName);
    element.classList = className;
    element.innerHTML = content;
    if (parent) parent.append(element);
    this.node = element;
    Object.assign(this.node.style, styles);
    return this;
  }
  

  destroy() {
    this.node.remove();
  }
}

export { Element };
