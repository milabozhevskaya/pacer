import { Element } from "../Element.js";
import { Button } from "../button/Button.js";

class PointsCalculate extends Element {
  constructor({ parent, className, controller, styles, content }) {
    super({
      parent,
      tagName: "div",
      className: `${className}__points-calculate points-calculate`,
      styles,
    });
    this.calculateWrapper = new Element({
      parent: this.node,
      tagName: "div",
      className: "points-calculate__wrapper",
      styles: styles.calculateWrapper,
    });
    this.calculateInput = new Element({
      parent: this.calculateWrapper.node,
      tagName: "input",
      className: "points-calculate__input",
      styles: styles.calculateInput,
    });
    this.calculateButton = new Button({
      parent: this.calculateWrapper.node,
      className: "points-calculate__calculate-button",
      controller: controller.calculatePoints,
      styles: styles.calculateButton,
      content,
    });
  }
}

export { PointsCalculate };
