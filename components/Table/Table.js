import { Element } from "../Element.js";
import {
  formatContentForTable,
  formatContentFromTable,
} from "../../utils/tableFormatContent.js";
import { styles } from "./style.js";

class Table extends Element {
  constructor({ parent, controller }) {
    super({ parent, tagName: "table", styles });
    this.controller = controller;
    this.content = formatContentForTable(3);
    this.row = [];
    this.content.forEach((row, i) => {
      this.row[i] = new TableRow(this.node, row, (cell, cellNumber) =>
        this.changeTable(cell, cellNumber, i)
      );
    });
  }

  update = (text) => {
    this.content = formatContentForTable(3, text);
    this.content.forEach((row, i) => {
      if (this.row[i] === undefined) {
        this.row[i] = new TableRow(this.node, row, (cell, cellNumber) =>
          this.changeTable(cell, cellNumber, i)
        );
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
  getContent = () => formatContentFromTable(this.content);
  changeTable = (cell, cellNumber, rowNumber) => {
    this.content[rowNumber][cellNumber] = cell.trim();
    if (rowNumber === this.content.length - 2 && cell === "") {
      const isEmptyRow = this.content[rowNumber].filter(
        (cell) => cell !== ""
      ).length;
      if (!isEmptyRow) {
        this.content.pop();
        this.row[this.row.length - 1].destroy();
        this.row.pop();
      }
    } else if (rowNumber === this.content.length - 1) {
      this.content = [...this.content, ["", "", ""]];
      this.row.push(new TableRow(
        this.node,
        ["", "", ""],
        (cell, cellNumber) =>
          this.changeTable(cell, cellNumber, rowNumber + 1)
      ));
    }
    this.controller(this.content);
  };
}

class TableRow extends Element {
  constructor(parent, content, changeRow) {
    super({ parent, tagName: "tr", styles: styles.row });
    this.cell = {};
    content.forEach((cell, i) => {
      this.cell[i] = new TableCell(this.node, cell, (cell) =>
        changeRow(cell, i)
      );
    });
  }

  update = (content) => {
    content.forEach((cell, i) => {
      this.cell[i].updateContent(cell);
    });
  };
}

class TableCell extends Element {
  constructor(parent, content, changeCell) {
    super({ parent, tagName: "td", styles: styles.cell });
    this.node.innerHTML = content;
    this.node.setAttribute("contenteditable", true);
    this.node.oninput = (event) => {
      changeCell(event.target.innerText);
    };
  }
}

export { Table };
