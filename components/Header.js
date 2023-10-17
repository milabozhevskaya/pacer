import { Element } from "./Element.js";

class Header extends Element {
  constructor({ parent, className, controller, content }) {
    super({
      parent,
      tagName: "header",
      className: `${className}__header header`,
    });
    this.controller = controller;
    this.container = new Element({
      parent: this.node,
      className: "header__container container",
    });
  }
}

export { Header };
