import { Element } from "../Element.js";
import { styles } from "./style.js";

class Textarea extends Element {
  constructor(parent, callback) {
    super({ parent, tagName: "textarea", styles });
    this.node.rows = "6";
    this.node.oninput = (e) => callback(e.target.value);
  }

  update = (text) => this.node.value = text;
}

export { Textarea };
