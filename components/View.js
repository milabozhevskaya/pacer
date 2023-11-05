import { Element } from "./Element.js";
import { Main } from "./Main.js";
import { Header } from "./header/Header.js";
import { Popup } from "./popup/Popup.js";

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
    this.node.onclick = () => {
      this.controller.onClickView();
    };
  }

  init = (initialData) => {
    this.main.updateTextareaText(initialData.textareaText);
    this.main.updateEndeavorText(initialData.endeavorText);
    this.main.updateActionText(initialData.actionText);
    this.main.updateQuestText(initialData.questText);
    this.header.updateSelfBeliefPoints(initialData.selfBeliefPoints);
    this.header.updateTime(initialData.time);

    this.store.onChangeTextareaText.add((textareaText) =>
      this.main.updateTextareaText(textareaText)
    );
    this.store.onChangeEndeavorText.add((endeavorText) =>
      this.main.updateEndeavorText(endeavorText)
    );
    this.store.onChangeActionText.add((actionText) =>
      this.main.updateActionText(actionText)
    );
    this.store.onChangeQuestText.add((questText) =>
      this.main.updateQuestText(questText)
    );
    this.store.onChangeSelfBeliefPoints.add((selfBeliefPoints) =>
      this.header.updateSelfBeliefPoints(selfBeliefPoints)
    );
    this.store.onChangeInputSelfBeliefPoints.add((value) =>
      this.header.updateInputSelfBeliefPoints(value)
    );
    this.store.onChangeButtonSelfBeliefPoints.add((value) =>
      this.header.updateButtonSelfBeliefPoints(value)
    );
    this.store.onChangeOpenPointsCalculate.add((value) =>
      this.header.updateOpenPointsCalculate(value)
    );
    this.store.onChangeTime.add((time) => this.header.updateTime(time));
    this.store.onChangeOpenCalendar.add((flag) => {
      if (flag) {
        this.calendarPopup = new Popup({ className: "date-widget" });
        this.header.openCalendar(this.calendarPopup);
        this.store.onChangeCalendarSwipingSteps.add(
          this.updateCalendarSwipingSteps
        );
      } else {
        this.calendarPopup.closePopup();
        this.calendarPopup = null;
        this.header.closeCalendar();
        this.store.onChangeCalendarSwipingSteps.remove(
          this.updateCalendarSwipingSteps
        );
      }
    });
  };

  updateCalendarSwipingSteps = (steps) => {
    this.header.updateCalendarSwipingSteps(steps);
  };
}

export { View };
