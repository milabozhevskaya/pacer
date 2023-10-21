import { Element } from "../Element.js";

class CalendarDays extends Element {
  constructor({ parent, tagName, className, styles, content }) {
    super({
      parent,
      tagName,
      className,
      styles,
    });

    content.forEach((day) => {
      new Element({
        parent: this.node,
        tagName: "li",
        className: "calendar__day",
        content: day,
        styles: styles.day,
      });
    });
  }
}

export { CalendarDays };
