import { Element } from "../Element.js";
import { DateWidget } from "../dateWidget/DateWidget.js";
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
      styles: styles.container,
    });
    this.selfBeliefPoints = new SelfBeliefPoints({
      parent: this.container.node,
      className: "header",
      controller: controller.changeSelfBeliefPoints,
    });
    this.dateWidget = new DateWidget({
      parent: this.container.node,
      className: "header",
      controller: controller.openCalendar,
      content: content.dateWidget,
    })
  }

  updateSelfBeliefPoints = (points) => this.selfBeliefPoints.update(points);
  updateTime = (time) => this.dateWidget.updateTime(time);
  openCalendar = (popup) => this.dateWidget.openCalendar(popup);
  closeCalendar = () => this.dateWidget.closeCalendar();
  updateCalendarSwipingSteps = (steps) => this.dateWidget.updateCalendarSwipingSteps(steps);
}

export { Header };
