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
    this.content = content;
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
    this.openButton = new Button({
      parent: this.node,
      className: "points-calculate__change-button",
      controller: controller.openPointsCalculate,
      styles: styles.openButton,
      content: content.openButton.open,
    });
  }

  updatePoints = (points) => {
    this.points.update(points);
  };
  updatePointsCalculateInput = (value) =>
    this.pointsCalculate.updateInput(value);
  updatePointsCalculateButton = (value) =>
    this.pointsCalculate.updateButton(value);
  openPointsCalculate = (value) => {
    if (value) {
      this.openButton.updateText(this.content.openButton.close);
      this.pointsCalculate.open();
    } else {
      this.openButton.updateText(this.content.openButton.open);
      this.pointsCalculate.close();
    }
  };
}

export { SelfBeliefPoints };
