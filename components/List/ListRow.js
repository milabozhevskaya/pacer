import { Element } from "../Element.js";
import { Button } from "../button/Button.js";

class ListRow extends Element {
  constructor({ parent, content, buttons, styles, changeRow, deleteRow, id }) {
    super({ parent, tagName: "div", className: "row", styles: styles.row });
    this.id = id;
    this.content = content;
    this.buttonsContent = buttons;
    this.changeRow = changeRow;
    this.deleteRow = deleteRow;
    this.styles = styles;
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
    this.input.node.onkeydown = (event) => {
      if (event.key === "Enter" && this.input.node.value.length) {
        this.saveListRow();
      }
    };

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
      styles: styles.button,
    });

    this.deleteButton = new Button({
      parent: this.buttonsView.node,
      content: buttons.delete.icon,
      controller: this.deleteListRow,
      styles: styles.button,
    });

    this.saveButton = new Button({
      parent: this.buttonsEdit.node,
      content: buttons.save.icon,
      controller: this.saveListRow,
      styles: styles.button,
    });

    this.cancelButton = new Button({
      parent: this.buttonsEdit.node,
      content: buttons.cancel.icon,
      controller: this.cancelListRow,
      styles: styles.button,
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
    Object.assign(this.input.node.style, this.styles.row.input.edit);
    Object.assign(this.span.node.style, this.styles.row.span.edit);
    this.input.node.selectionStart = this.content.length;
    this.input.node.focus();
    Object.assign(
      this.buttonsView.node.style,
      this.styles.row.buttons.view.edit
    );
    Object.assign(
      this.buttonsEdit.node.style,
      this.styles.row.buttons.edit.view
    );
  };

  cancelListRow = () => {
    if (this.state === "view") return;
    this.state = "view";
    Object.assign(this.input.node.style, this.styles.row.input);
    Object.assign(this.span.node.style, this.styles.row.span);
    this.input.node.value = this.content;
    Object.assign(this.buttonsView.node.style, this.styles.row.buttons.view);
    Object.assign(this.buttonsEdit.node.style, this.styles.row.buttons.edit);
  };

  saveListRow = () => {
    if (this.state === "view") return;
    this.state = "view";
    this.span.node.textContent = this.input.node.value;
    Object.assign(this.input.node.style, this.styles.row.input);
    Object.assign(this.span.node.style, this.styles.row.span);
    this.content = this.input.node.value;
    Object.assign(this.buttonsView.node.style, this.styles.row.buttons.view);
    Object.assign(this.buttonsEdit.node.style, this.styles.row.buttons.edit);
    this.changeRow(this.content, this.id);
  };

  deleteListRow = () => {
    this.deleteRow(this.id);
  };

  removeEditMode = () => {
    if (this.state === "edit") this.cancelListRow();
  };
}

export { ListRow };
