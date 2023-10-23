import { Element } from "../Element.js";
import { styles } from "./style.js";

class Textarea extends Element {
  constructor(parent, controller) {
    super({ parent, tagName: "textarea", styles });
    this.node.rows = "6";
    this.scrollbar = new Element({
      parent: this.node,
      tagName: "style",
      content: styles.scrollbar,
    });

    this.node.oninput = (e) => controller(e.target.value);
  }

  update = (text) => (this.node.value = text);
}

export { Textarea };
