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
    this.controller = controller;
    this.styles = styles;
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
      controller: this.calculatePoints,
      styles: styles.calculateButton,
      content,
    });
    this.calculateButton.setDisableStyle(this.styles.calculateButton.disabled);
    this.calculateInput.node.oninput = (event) => {
      controller.changeInputConfidencePoints(event.target.value);
    };
    this.calculateInput.node.onkeyup = (event) => {
      if (event.key === "Enter") {
        this.calculatePoints(event);
      }
    };
    Object.assign(this.node.style, this.styles.close);
  }

  updateInput = (value) => (this.calculateInput.node.value = value);

  updateButton = (state) => {
    if (state === "disable") {
      this.calculateButton.setDisableStyle(
        this.styles.calculateButton.disabled
      );
    }
    if (state === "wait") {
      this.calculateButton.setWaitingStyle(this.styles.calculateButton.waiting);
    }
    if (state === "") {
      this.calculateButton.setDefaultStyle();
    }
  };

  calculatePoints = (event) => {
    event.preventDefault();
    this.controller.calculatePoints(this.calculateInput.node.value);
  };
  open = () => {
    Object.assign(this.node.style, this.styles.open);
    this.calculateInput.node.focus();
  };
  close = () => {
    Object.assign(this.node.style, this.styles.close);
  };
}

export { PointsCalculate };
