import { Element } from "../Element.js";
import { Button } from "../button/Button.js";

class NewListRow extends Element {
  constructor({ parent, buttons, styles, addNewRow, deleteNewRow }) {
    super({ parent, tagName: "div", className: "row", styles: styles.newRow });
    this.buttonsContent = buttons;
    this.addNewRow = addNewRow;
    this.deleteNewRow = deleteNewRow;
    this.styles = styles;
    this.wrapper = new Element({
      parent: this.node,
      tagName: "div",
      className: "row__wrapper",
      styles: styles.newRow.wrapper,
    });
    this.input = new Element({
      parent: this.wrapper.node,
      tagName: "input",
      styles: styles.newRow.input,
    });
    this.input.node.type = "text";
    this.input.node.onkeydown = (event) => {
      if (event.key === "Enter" && this.input.node.value.length)
        this.saveNewRow();
    };

    this.buttons = new Element({
      parent: this.node,
      className: "buttons",
      tagName: "div",
      styles: styles.newRow.buttons,
    });

    this.saveButton = new Button({
      parent: this.buttons.node,
      content: buttons.save.icon,
      controller: this.saveNewRow,
      styles: styles.button,
    });

    this.cancelButton = new Button({
      parent: this.buttons.node,
      content: buttons.cancel.icon,
      controller: this.deleteNewRow,
      styles: styles.button,
    });
  }

  saveNewRow = () => {
    if (this.input.node.value === "") return;
    this.addNewRow(this.input.node.value);
  };

  showNewRow = () => {
    Object.assign(this.node.style, this.styles.newRow.show);
    this.input.node.focus();
  };

  cancelNewRow = () => {
    this.input.node.value = "";
    Object.assign(this.node.style, this.styles.newRow);
  };

  clearNewRow = () => {
    this.input.node.value = "";
  };
}

export { NewListRow };
