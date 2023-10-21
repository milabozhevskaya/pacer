import { Element } from "../Element.js";
import { styles } from "./style.js";

class Popup extends Element {
  constructor({ parent, className }) {
    super({
      parent,
      tagName: "div",
      className: `${className}__popup popup`,
      styles,
    });
    this.after = new Element({
      parent: this.node,
      tagName: "style",
      content: styles.after,
    });
    this.popupWrapper = new Element({
      parent: this.node,
      tagName: "div",
      className: "popup__wrapper",
      styles: styles.wrapper,
    });
    this.node.onclick = (event) => {
      event.stopPropagation();
    };
  }

  setContent = (child) => {
    this.content = child;
    this.popupWrapper.node.append(this.content.node);
  };

  closePopup = () => {
    this.content.destroy();
    this.destroy();
  };

  addStyles = (styles) => {
    Object.assign(this.node.style, styles);
  };

  append = (parent) => parent.append(this.node);
}

export { Popup };
