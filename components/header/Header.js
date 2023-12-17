import { Element } from "../Element.js";
import { DateWidget } from "../dateWidget/DateWidget.js";
import { SelfBeliefPoints } from "../confidence-points/ConfidencePoints.js";
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
      styles: styles.container,
    });
    this.confidencePoints = new SelfBeliefPoints({
      parent: this.container.node,
      className: "header",
      controller: controller,
      content: content.confidencePoints,
    });
    this.dateWidget = new DateWidget({
      parent: this.container.node,
      className: "header",
      controller: controller,
      content: content.dateWidget,
    });
  }

  updateConfidencePoints = (points) =>
    this.confidencePoints.updatePoints(points);
  updateInputConfidencePoints = (value) =>
    this.confidencePoints.updatePointsCalculateInput(value);
  updateButtonConfidencePoints = (value) =>
    this.confidencePoints.updatePointsCalculateButton(value);
  updateOpenPointsCalculate = (value) =>
    this.confidencePoints.openPointsCalculate(value);
  updateTime = (time) => this.dateWidget.updateTime(time);
  updateDate = (changedMonth) => this.dateWidget.updateDate(changedMonth);
  openCalendar = ({ popup, month }) =>
    this.dateWidget.openCalendar({ popup, month });
  closeCalendar = () => this.dateWidget.closeCalendar();
  updateCalendarSwipingSteps = ({ direction, month }) =>
    this.dateWidget.updateCalendarSwipingSteps({ direction, month });
  updateTimeMode = (timeMode) => this.dateWidget.updateTimeMode(timeMode);
}

export { Header };
