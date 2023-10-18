import { Element } from "../Element.js";
import { SelfBeliefPoints } from "../self-belief-points/SelfBeliefPoints.js";
import { styles } from "./style.js";

class Header extends Element {
  constructor({ parent, className, controller, content }) {
    super({
      parent,
      tagName: "header",
      className: `${className}__header header`,
      styles,
    });
    this.container = new Element({
      parent: this.node,
      className: "header__container container",
    });
    this.selfBeliefPoints = new SelfBeliefPoints({
      parent: this.container.node,
      className: "header",
      controller: controller.changeSelfBeliefPoints,
    });
  }

  updateSelfBeliefPoints = (points) => this.selfBeliefPoints.update(points);
}

export { Header };
