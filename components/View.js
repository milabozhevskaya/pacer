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
    this.main.updateEndeavorText(initialData.endeavorText);
    this.main.updateActionText(initialData.actionText);
    this.main.updateActionMode(initialData.actionMode);
    this.main.updateLogText(initialData.logText);

    this.main.updateNoteText(initialData.noteText);
    this.main.updateQuestText(initialData.questText);
    this.main.updateTodoText(initialData.todoText);

    this.header.updateSelfBeliefPoints(initialData.selfBeliefPoints);
    this.header.updateTime(initialData.time);

    this.store.onReInit.add((date) => {
      this.main.updateNoteText(date.noteText);
      this.main.updateEndeavorText(date.endeavorText);
      this.main.updateActionText(date.actionText, "reinit");
      this.main.updateActionMode(date.actionMode);
      this.main.updateLogText(date.logText);
      this.main.updateQuestText(date.questText);
      this.main.updateTodoText(date.todoText);
      this.header.updateSelfBeliefPoints(date.selfBeliefPoints);
      this.header.updateTime(date.time);
      this.header.updateInputSelfBeliefPoints(date.inputSelfBeliefPoints);
      this.header.updateButtonSelfBeliefPoints(date.buttonSelfBeliefPoints);
      this.header.updateOpenPointsCalculate(date.openPointsCalculate);
      if (this.calendarPopup) {
        this.calendarPopup.closePopup();
        this.calendarPopup = null;
        this.header.closeCalendar();
        this.store.onChangeCalendarSwipingSteps.remove(
          this.updateCalendarSwipingSteps
        );
      }
    });

    this.store.onChangeNoteText.add((noteText) =>
      this.main.updateNoteText(noteText)
    );
    this.store.onChangeEndeavorText.add((endeavorText) =>
      this.main.updateEndeavorText(endeavorText)
    );
    this.store.onChangeActionText.add((actionText) =>
      this.main.updateActionText(actionText)
    );
    this.store.onChangeActionMode.add((actionMode) =>
      this.main.updateActionMode(actionMode)
    );
    this.store.onChangeQuestText.add((questText) =>
      this.main.updateQuestText(questText)
    );
    this.store.onChangeTodoText.add((todoText) =>
      this.main.updateTodoText(todoText)
    );
    this.store.onChangeLogText.add((logText) =>
      this.main.updateLogText(logText)
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
    this.store.onChangeDate.add((changedMonth) =>
      this.header.updateDate(changedMonth)
    );
    this.store.onChangeIsOpenCalendar.add(({ flag, month }) => {
      if (flag) {
        this.calendarPopup = new Popup({ className: "date-widget" });
        this.header.openCalendar({ popup: this.calendarPopup, month });
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

  updateCalendarSwipingSteps = ({ direction, month }) => {
    this.header.updateCalendarSwipingSteps({ direction, month });
  };
}

export { View };
