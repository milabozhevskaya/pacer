import { Element } from "../Element.js";
import {
  formatContentForList,
  formatContentFromList,
} from "../../utils/listFormatContent.js";
import { styles } from "./style.js";

class List extends Element {
  constructor({ parent, controller }) {
    super({ parent, tagName: "div", styles });
    this.controller = controller;
    this.content = formatContentForList();
    this.rows = [];
    this.content.forEach((row, i) => {
      this.rows[i] = new ListRow(this.node, row, (row, i) =>
        this.changeList(row, i)
      );
    });
  }

  update = (text) => {
    this.content = formatContentForList(text);
    if (this.content.length < this.rows.length) {
      this.rows.forEach((row, i) => {
        if (i >= this.content.length) row.destroy();
      });
      this.rows = this.rows.slice(0, this.content.length);
    }
    this.content.forEach((row, i) => {
      if (i >= this.rows.length)
        this.rows[i] = new ListRow(this.node, row, (row, i) =>
          this.changeList(row, i)
        );
      else this.rows[i].update(row);
    });
  };
  getContent = () => formatContentFromList(this.content);
  changeList = (row, rowNumber) => {
    this.content[rowNumber] = row.trim();
    this.controller(this.content);
  };
}

class ListRow extends Element {
  constructor(parent, content, changeRow) {
    super({ parent, tagName: "div", styles: styles.row });
    this.span = new Element({ parent: this.node, tagName: "span", content });
    this.input = new Element({ parent: this.node, tagName: "input" });
    Object.assign(this.input.node.style, styles.row.input);
    this.input.node.type = "text";
    this.input.node.value = content;
    this.input.node.oninput = (event) => {};
  }

  update = (content) => {};
}

export { List };
