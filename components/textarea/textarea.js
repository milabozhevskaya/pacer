import { Element } from "../Element.js";
<<<<<<< HEAD
import { styles } from './style.js';

class Textarea extends Element {
  constructor(parent) {
    super({ parent, tagName: "textarea", styles });
    this.node.rows = '6';
  }
=======
import { styles } from "./style.js";

class Textarea extends Element {
  constructor(parent, callback) {
    super({ parent, tagName: "textarea", styles });
    this.node.rows = "6";
    this.node.oninput = (e) => callback(e.target.value);
  }

  update = (text) => (this.node.value = text);
>>>>>>> 88db4206c6fdd9fbd5d41865b82688d1ad5e666e
}

export { Textarea };
