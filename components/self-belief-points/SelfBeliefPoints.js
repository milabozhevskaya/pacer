import { Element } from "../Element.js";
import { Points } from "./Points.js";
import { PointsCalculate } from "./PointsCalculate.js";
import { Button } from "../button/Button.js";
import { styles } from "./style.js";

class SelfBeliefPoints extends Element {
  constructor({ parent, className, controller, content }) {
    super({
      parent,
      tagName: "div",
      className: `${className}__self-belief-points self-belief-points`,
      styles,
    });
    this.points = new Points({
      parent: this.node,
      className: "self-belief-points",
      controller: controller.changeSelfBeliefPoints,
      styles: styles.points,
    });
    this.pointsCalculate = new PointsCalculate({
      parent: this.node,
      className: "self-belief-points",
      controller: controller,
      styles: styles.pointsCalculate,
      content: content.calculateButton,
    });
    this.changeButton = new Button({
      parent: this.node,
      className: "points-calculate__change-button",
      controller: controller.changePoints,
      styles: styles.changeButton,
      content: content.changeButton,
    });
  }
  
  updatePoints = (points) => this.points.update(points);
  updateCalculateInput = (value) => this.pointsCalculate.updateInput(value);
}

export { SelfBeliefPoints };
