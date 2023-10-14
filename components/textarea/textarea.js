import { Element } from "../Element.js";
import { styles } from './style.js';

class Textarea extends Element {
  constructor(parent) {
    super({ parent, tagName: "textarea", styles });
    this.node.rows = '6';
  }
}

export { Textarea };
