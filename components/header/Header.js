import { Element } from "../Element.js";
import { Calendar } from "../calendar/Calendar.js";
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
    this.calendar = new Calendar({
      parent: this.container.node,
      className: "header",
      controller: controller.openCalendar,
      content: content.calendar,
    })
  }

  updateSelfBeliefPoints = (points) => this.selfBeliefPoints.update(points);
  updateTime = (time) => this.calendar.updateTime(time);
}

export { Header };
