import { Element } from "../Element.js";
import {
  formatContentForList,
  formatContentFromList,
} from "../../utils/listFormatContent.js";
import { styles } from "./style.js";
import { Button } from "../button/Button.js";

class List extends Element {
  constructor({ parent, changeText, buttons }) {
    super({ parent, tagName: "div", styles });
    this.controller = changeText;
    this.buttons = buttons;
    this.content = formatContentForList();
    this.rows = [];
    this.content.forEach((row, i) => {
      this.rows[i] = new ListRow({
        parent: this.node,
        content: row,
        buttons: this.buttons,
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
}

class ListRow extends Element {
  constructor({ parent, content, buttons, changeRow, deleteRow, id }) {
    super({ parent, tagName: "div", className: "row", styles: styles.row });
    this.id = id;
    this.content = content;
    this.buttonsContent = buttons;
    this.changeRow = changeRow;
    this.deleteRow = deleteRow;
    this.state = "view";
    this.wrapper = new Element({
      parent: this.node,
      tagName: "div",
      className: "row__wrapper",
      styles: styles.row.wrapper,
    });
    this.span = new Element({
      parent: this.wrapper.node,
      tagName: "span",
      content,
      styles: styles.row.span,
    });
    this.input = new Element({
      parent: this.wrapper.node,
      tagName: "input",
      styles: styles.row.input,
    });
    this.input.node.type = "text";
    this.input.node.value = content;
    this.input.node.oninput = (event) => {};

    this.buttons = new Element({
      parent: this.node,
      className: "buttons",
      tagName: "div",
      styles: styles.row.buttons,
    });

    this.buttonsEdit = new Element({
      parent: this.buttons.node,
      tagName: "div",
      styles: { ...styles.row.buttons.wrapper, ...styles.row.buttons.edit },
    });

    this.buttonsView = new Element({
      parent: this.buttons.node,
      tagName: "div",
      styles: { ...styles.row.buttons.wrapper, ...styles.row.buttons.view },
    });

    this.editButton = new Button({
      parent: this.buttonsView.node,
      content: buttons.edit.icon,
      controller: this.editListRow,
      styles: styles.row.button,
    });

    this.deleteButton = new Button({
      parent: this.buttonsView.node,
      content: buttons.delete.icon,
      controller: this.deleteListRow,
      styles: styles.row.button,
    });

    this.saveButton = new Button({
      parent: this.buttonsEdit.node,
      content: buttons.save.icon,
      controller: this.saveListRow,
      styles: styles.row.button,
    });

    this.cancelButton = new Button({
      parent: this.buttonsEdit.node,
      content: buttons.cancel.icon,
      controller: this.cancelListRow,
      styles: styles.row.button,
    });
  }

  update = (content, id) => {
    this.content = content;
    this.id = id;
    this.span.node.textContent = content;
    this.input.node.value = content;
    this.input.node.selectionStart = this.content.length;
  };

  editListRow = () => {
    if (this.state === "edit") return;
    this.state = "edit";
    Object.assign(this.input.node.style, styles.row.input.edit);
    Object.assign(this.span.node.style, styles.row.span.edit);
    this.input.node.selectionStart = this.content.length;
    this.input.node.focus();
    Object.assign(this.buttonsView.node.style, styles.row.buttons.view.edit);
    Object.assign(this.buttonsEdit.node.style, styles.row.buttons.edit.view);
  };

  cancelListRow = () => {
    if (this.state === "view") return;
    this.state = "view";
    Object.assign(this.input.node.style, styles.row.input);
    Object.assign(this.span.node.style, styles.row.span);
    this.input.node.value = this.content;
    Object.assign(this.buttonsView.node.style, styles.row.buttons.view);
    Object.assign(this.buttonsEdit.node.style, styles.row.buttons.edit);
  };

  saveListRow = () => {
    if (this.state === "view") return;
    this.state = "view";
    this.span.node.textContent = this.input.node.value;
    Object.assign(this.input.node.style, styles.row.input);
    Object.assign(this.span.node.style, styles.row.span);
    this.content = this.input.node.value;
    Object.assign(this.buttonsView.node.style, styles.row.buttons.view);
    Object.assign(this.buttonsEdit.node.style, styles.row.buttons.edit);
    this.changeRow(this.content, this.id);
  };

  deleteListRow = () => {
    this.deleteRow(this.id);
  };

  removeEditMode = () => {
    if (this.state === "edit") this.cancelListRow();
  };
}

export { List };
