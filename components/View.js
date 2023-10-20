import { Element } from "./Element.js";
import { Main } from "./Main.js";
import { Header } from "./header/Header.js";

class View extends Element {
  constructor({ parent, controller, store, content }) {
    super({ parent, className: "pacer wrapper" });
    this.controller = controller;
    this.store = store;
    const { header, main } = content;

    this.header = new Header({
      parent: this.node,
      className: "pacer",
      controller,
      content: header,
    });
    this.main = new Main({
      parent: this.node,
      className: "pacer",
      controller,
      content: main,
    });
  }

  init = (initialData) => {
    this.main.updateTextareaText(initialData.textareaText);
    this.header.updateSelfBeliefPoints(initialData.selfBeliefPoints);
    this.header.updateTime(initialData.time);

    this.store.onChangeTextareaText.add((textareaText) =>
      this.main.updateTextareaText(textareaText)
    );
    this.store.onChangeSelfBeliefPoints.add((selfBeliefPoints) =>
      this.header.updateSelfBeliefPoints(selfBeliefPoints)
    );
  };
}

export { View };
