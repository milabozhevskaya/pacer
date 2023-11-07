import { Element } from "../Element.js";
import { CalendarMonth } from "./CalendarMonth.js";

class CalendarList extends Element {
  constructor({ parent, className, content, styles, month }) {
    super({
      parent,
      tagName: "ul",
      className: `${className}__list`,
      styles: styles.list,
    });
    this.month = [];

    month.forEach((item, i) => {
      this.month.push(
        new CalendarMonth({
          parent: this.node,
          className,
          styles: {
            ...styles,
            month: { ...styles.month, transform: `translateX(${i * 100}%)` },
          },
          content,
          monthContent: item,
        })
      );
    });
  }

  swipeToRight = (nextMonth, callback) => {
    for (let i = 0; i < this.month.length; i++) {
      const slide = this.month[i];
      slide.node.style.transition = `.6s`;
      slide.node.style.transform = `translateX(${(i - 1) * 100}%)`;
      slide.node.ontransitionend = () => {
        slide.node.ontransitionend = null;
        slide.node.style.transition = `0s`;

        if (i === 0) {
          slide.updateMonth(nextMonth);
          slide.node.style.transform = `translateX(200%)`;
        }
        callback();
      };
    }
    this.month.push(this.month.shift());
  };
  swipeToLeft = (prevMonth, callback) => {
    for (let i = 0; i < this.month.length; i++) {
      const slide = this.month[i];
      slide.node.style.transition = `.6s`;
      slide.node.style.transform = `translateX(${(i + 1) * 100}%)`;
      slide.node.ontransitionend = () => {
        slide.node.ontransitionend = null;
        slide.node.style.transition = `0s`;

        if (i === this.month.length - 1) {
          slide.updateMonth(prevMonth);
          slide.node.style.transform = `translateX(0%)`;
        }
        callback();
      };
    }
    this.month.unshift(this.month.pop());
  };
}

export { CalendarList };
