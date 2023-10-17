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
    this.container = new Element({
      parent: this.node,
      className: "self-belief-points__container container",
    });
    this.label = new Element({
      parent: this.container.node,
      tagName: "label",
      className: "self-belief-points__label",
    });
    this.input = new Element({
      parent: this.label.node,
      tagName: "input",
      className: "self-belief-points__input",
    });
    this.input.node.type = "number";
    this.input.node.min = "0";
    this.input.node.step = "1";
    this.input.node.onkeydown = (event) => {
      if ( ['+', '-', 'e', ',', '.'].includes(event.key)) event.preventDefault();
    //   if (event.key === "Enter") {
    //     controller.updateSelfBeliefPoints(this.input.node.value);
      
    // }
    };
  }

  update = (points) => (this.input.node.value = points);
}

export { SelfBeliefPoints };
