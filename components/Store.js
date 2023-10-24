import { Signal } from "./Signal.js";

class Store {
  constructor() {
    this.$textareaText = "";
    this.$endeavorText = "";
    this.$actionText = "";
    this.$questText = "";
    this.$selfBeliefPoints = "0";
    this.$time = "";
    this.$openCalendar = false;
    this.$calendarSwipingSteps = 0;
  }

  init = (initialState, callback) => {
    this.$textareaText = initialState.textareaText;
    this.$endeavorText = initialState.endeavorText;
    this.$actionText = initialState.actionText;
    this.$questText = initialState.questText;
    this.$selfBeliefPoints = initialState.selfBeliefPoints;
    this.$time = initialState.time;
    this.$calendarSwipingSteps = initialState.calendarSwipingSteps;
    callback({...this.computeDataForLocalStorage(), time: this.$time });
  };

  get textareaText() {
    return this.$textareaText;
  }

  set textareaText(value) {
    this.$textareaText = value;
    this.onChangeTextareaText.emit(value);
    this.onChangeLocalStorageData.emit(this.computeDataForLocalStorage());
  }

  get endeavorText() {
    return this.$endeavorText;
  }

  set endeavorText(value) {
    this.$endeavorText = value;
    this.onChangeEndeavorText.emit(value);
    this.onChangeLocalStorageData.emit(this.computeDataForLocalStorage());
  }

  get actionText() {
    return this.$actionText;
  }

  set actionText(value) {
    this.$actionText = value;
    this.onChangeActionText.emit(value);
    this.onChangeLocalStorageData.emit(this.computeDataForLocalStorage());
  }

  get questText() {
    return this.$questText;
  }

  set questText(value) {
    this.$questText = value;
    this.onChangeQuestText.emit(value);
    this.onChangeLocalStorageData.emit(this.computeDataForLocalStorage());
  }

  get selfBeliefPoints() {
    return this.$selfBeliefPoints;
  }

  set selfBeliefPoints(value) {
    this.$selfBeliefPoints = value;
    this.onChangeSelfBeliefPoints.emit(value);
    this.onChangeLocalStorageData.emit(this.computeDataForLocalStorage());
  }

  get time() {
    return this.$time;
  }

  set time(value) {
    this.$time = value;
    this.onChangeTime.emit(value);
  }

  get openCalendar() {
    return this.$openCalendar;
  }

  set openCalendar(flag) {
    this.$openCalendar = flag;
    this.onChangeOpenCalendar.emit(flag);
    if (!flag) this.$calendarSwipingSteps = 0;
  }

  get calendarSwipingSteps() {
    return this.$calendarSwipingSteps;
  }

  set calendarSwipingSteps(steps) {
    this.$calendarSwipingSteps = steps;
    this.onChangeCalendarSwipingSteps.emit(steps);
  }

  onChangeTextareaText = new Signal();
  onChangeEndeavorText = new Signal();
  onChangeActionText = new Signal();
  onChangeQuestText = new Signal();
  onChangeSelfBeliefPoints = new Signal();
  onChangeTime = new Signal();
  onChangeOpenCalendar = new Signal();
  onChangeCalendarSwipingSteps = new Signal();

  onChangeLocalStorageData = new Signal();
  computeDataForLocalStorage = () => ({
    textareaText: this.$textareaText,
    endeavorText: this.$endeavorText,
    actionText: this.$actionText,
    questText: this.$questText,
    selfBeliefPoints: this.$selfBeliefPoints,
  });
}

export { Store };
