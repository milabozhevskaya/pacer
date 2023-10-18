import { Element } from "../Element.js";
import { styles } from "./style.js";

class SelfBeliefPoints extends Element {
  constructor({ parent, className, controller }) {
    super({
      parent,
      tagName: "div",
      className: `${className}__self-belief-points self-belief-points`,
      styles,
    });
    this.label = new Element({
      parent: this.node,
      tagName: "label",
      className: "self-belief-points__label",
      styles: styles.label,
    });
    this.span = new Element({
      parent: this.label.node,
      tagName: "span",
      className: "self-belief-points__span",
      styles: styles.span,
      content: "0",
    });
    this.input = new Element({
      parent: this.label.node,
      tagName: "input",
      className: "self-belief-points__input",
      styles: { ...styles.input },
    });
    this.node.onfocus = () => {};
    this.node.onblur = () => {};
    this.input.node.onfocus = () => {
      Object.assign(this.input.node.style, styles.input.onfocus);
      Object.assign(this.node.style, styles.onfocus);
    };
    this.input.node.onblur = () => {
      Object.assign(this.input.node.style, styles.input);
      Object.assign(this.node.style, styles);
    };
    this.input.node.type = "number";
    this.input.node.min = "0";
    this.input.node.step = "1";
    this.input.node.value = "0";
    this.input.node.onkeydown = (event) => {
      if (["+", "-", "e", ",", "."].includes(event.key)) {
        this.flag = true;
        event.preventDefault();
        return;
      }
      if (event.key === "Enter" || event.key === "Escape") {
        this.input.node.blur();
        return;
      }
    };
    this.input.node.oninput = (event) => {
      if (!this.flag) {
        this.span.node.innerHTML = this.input.node.value;
      }
    };
    this.input.node.onchange = () => {
      const value = (parseInt(this.input.node.value) || '0').toString();
      this.input.node.value = value;
      this.span.node.innerHTML = value;
      controller(value);
    };
    this.input.node.onkeyup = () => {
      this.flag = false;
    };
  }

  update = (points) => {
    if (this.input.node.value === points) return;
    this.span.node.innerText = points;
    this.input.node.value = points;
  };
}

export { SelfBeliefPoints };
