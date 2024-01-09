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
    this.main.updateEndeavors(initialData.endeavors);
    this.main.updateActivities(initialData.activities);
    this.main.updateActivitiesMode(initialData.activitiesMode);
    this.main.updateLogs(initialData.logs);

    this.main.updateNotes(initialData.notes);
    this.main.updateQuests(initialData.quests);
    this.main.updateTodos(initialData.todos);

    this.header.updateConfidencePoints(initialData.confidencePoints);
    this.header.updateTime(initialData.time);
    this.header.updateTimeMode(initialData.timeMode, initialData.manualTime);

    this.store.onReInit.add((date) => {
      this.main.updateNotes(date.notes);
      this.main.updateEndeavors(date.endeavors);
      this.main.updateActivities(date.activities, "reinit");
      this.main.updateActivitiesMode(date.activitiesMode);
      this.main.updateLogs(date.logs);
      this.main.updateQuests(date.quests);
      this.main.updateTodos(date.todos);
      this.header.updateConfidencePoints(date.confidencePoints);
      this.header.updateTime(date.time);
      this.header.updateInputConfidencePoints(date.inputConfidencePoints);
      this.header.updateButtonConfidencePoints(date.buttonConfidencePoints);
      this.header.updateOpenPointsCalculate(date.openPointsCalculate);
      this.header.updateTimeMode(date.timeMode, date.manualTime);

      if (this.calendarPopup) {
        this.calendarPopup.closePopup();
        this.calendarPopup = null;
        this.header.closeCalendar();
        this.store.onChangeCalendarSwipingSteps.remove(
          this.updateCalendarSwipingSteps
        );
      }
    });

    this.store.onChangeTimeMode.add(({ mode, manualTime }) =>
      this.header.updateTimeMode(mode, manualTime)
    );

    this.store.onChangeNotes.add((notes) => this.main.updateNotes(notes));
    this.store.onChangeEndeavors.add((endeavors) =>
      this.main.updateEndeavors(endeavors)
    );
    this.store.onChangeActivities.add((activities) =>
      this.main.updateActivities(activities)
    );
    this.store.onChangeActivitiesMode.add((activitiesMode) =>
      this.main.updateActivitiesMode(activitiesMode)
    );
    this.store.onChangeQuests.add((quests) => this.main.updateQuests(quests));
    this.store.onChangeTodos.add((todos) => this.main.updateTodos(todos));
    this.store.onChangeLogs.add((logs) => this.main.updateLogs(logs));
    this.store.onChangeConfidencePoints.add((confidencePoints) =>
      this.header.updateConfidencePoints(confidencePoints)
    );
    this.store.onChangeInputConfidencePoints.add((value) =>
      this.header.updateInputConfidencePoints(value)
    );
    this.store.onChangeButtonConfidencePoints.add((value) =>
      this.header.updateButtonConfidencePoints(value)
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
