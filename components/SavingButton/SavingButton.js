import { Element } from "../Element.js";
import { Button } from "../button/Button.js";
import { styles } from "./style.js";

class SavingButton extends Element {
  constructor({ parent, className, content, controller }) {
    super({
      parent,
      tagName: "div",
      className: `${className}__saving-button saving-button`,
      styles,
    });
    this.downloadButton = new Button({
      parent: this.node,
      className: "saving-button__download",
      content: content.download,
      controller: (event) => {
        event.stopPropagation();
        controller.downloadDateFile();
      },
    });
    this.uploadButton = new Button({
      parent: this.node,
      className: "saving-button__upload",
      content: content.upload,
      controller: (event) => {
        event.stopPropagation();
        controller.uploadDateFile();
      },
    });
  }
}

export { SavingButton };
