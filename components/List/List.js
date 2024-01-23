import { Element } from "../Element.js";
import {
  formatContentForList,
  formatContentFromList,
} from "../../utils/listFormatContent.js";
import { styles } from "./style.js";
import { ListRow } from "./ListRow.js";
import { NewListRow } from "./NewListRow.js";

class List extends Element {
  constructor({ parent, changeText, buttons }) {
    super({ parent, tagName: "div", styles });
    this.controller = changeText;
    this.buttons = buttons;
    this.content = formatContentForList();
    this.addNewItemMode = false;
    this.rows = [];
    this.newRow = new NewListRow({
      parent: this.node,
      buttons: this.buttons,
      styles: styles,
      addNewRow: this.addNewRow,
      deleteNewRow: this.removeNewRowMode,
    });
    this.content.forEach((row, i) => {
      this.rows[i] = new ListRow({
        parent: this.node,
        content: row,
        buttons: this.buttons,
        styles: styles,
        changeRow: this.changeList,
        deleteRow: this.deleteRow,
        id: i,
      });
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
        this.rows[i] = new ListRow({
          parent: this.node,
          content: row,
          buttons: this.buttons,
          styles: styles,
          changeRow: this.changeList,
          deleteRow: this.deleteRow,
          id: i,
        });
      else this.rows[i].update(row, i);
    });
  };

  getContent = () => formatContentFromList(this.content);

  changeList = (row, rowNumber) => {
    this.content[rowNumber] = row.trim();
    this.controller(this.getContent());
  };

  deleteRow = (rowNumber) => {
    this.content = this.content.filter((row, i) => i !== rowNumber);
    this.controller(this.getContent());
  };

  removeEditMode = () => {
    this.rows.forEach((row) => row.removeEditMode());
  };

  addNewRowMode = () => {
    if (this.addNewItemMode) return;
    this.addNewItemMode = true;
    this.newRow.showNewRow();
  };

  addNewRow = (row) => {
    this.content.unshift(row.trim());
    this.controller(this.getContent());
    this.removeNewRowMode();
  };

  removeNewRowMode = () => {
    if (!this.addNewItemMode) return;
    this.addNewItemMode = false;
    this.newRow.cancelNewRow();
  };
}

export { List };
