import { Element } from "../Element.js";

class CalendarTop extends Element {
  constructor({ parent, tagName, className, styles, month, year }) {
    super({
      parent,
      tagName,
      className,
      styles,
    });
    this.month = new Element({
      parent: this.node,
      tagName: "span",
      className: "calendar__month",
      content: month,
    });
    this.year = new Element({
      parent: this.node,
      tagName: "span",
      className: "calendar__year",
      content: year,
      styles: styles.year,
    });
  }

  updateContent = (month, year) => {
    this.month.updateContent(month);
    this.year.updateContent(year);
  };
}

export { CalendarTop };
