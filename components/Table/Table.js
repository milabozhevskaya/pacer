import { Element } from "../Element.js";
import { formatContentForTable } from "../../utils/formatContentForTable.js";
import { styles } from "./style.js";

class Table extends Element {
  constructor({ parent }) {
    super({ parent, tagName: "table", styles });
    this.content = formatContentForTable(3);
    this.row = [];
    this.content.forEach((row, i) => {
      this.row[i] = new TableRow(this.node, row);
    });
  }
  
  update = (text) => {
    this.content = formatContentForTable(3, text);
    this.content.forEach((row, i) => {
      if (this.row[i] === undefined) {
        this.row[i] = new TableRow(this.node, row);
      } else {
        this.row[i].update(row);
      }
    });
    if (this.content.length < this.row.length) {
      this.row.forEach((row, i) => {
        if (i >= this.content.length) row.destroy();
      });
      this.row = this.row.slice(0, this.content.length);
    }
  };
}

class TableRow extends Element {
  constructor(parent, content) {
    super({ parent, tagName: "tr", styles: styles.row });
    this.cell = {};
    content.forEach((cell, i) => {
      this.cell[i] = new TableCell(this.node, cell);
    });
  }
  
  update = (content) => {
    content.forEach((cell, i) => {
      this.cell[i].updateContent(cell);
    });
  };
}

class TableCell extends Element {
  constructor(parent, content) {
    super({ parent, tagName: "td", styles: styles.cell });
    this.node.innerHTML = content;
  }
}

export { Table };
