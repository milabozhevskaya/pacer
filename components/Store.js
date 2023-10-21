import { Signal } from "./Signal.js";

class Store {
  constructor() {
    this.$textareaText = "";
    this.$selfBeliefPoints = "0";
    this.$time = "";
    this.$openCalendar = false;
  }

  init = (initialState, callback) => {
    this.$textareaText = initialState.textareaText;
    this.$selfBeliefPoints = initialState.selfBeliefPoints;
    this.$time = initialState.time;
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
  }

  onChangeTextareaText = new Signal();
  onChangeSelfBeliefPoints = new Signal();
  onChangeTime = new Signal();
  onChangeOpenCalendar = new Signal();

  onChangeLocalStorageData = new Signal();
  computeDataForLocalStorage = () => ({
    textareaText: this.$textareaText,
    selfBeliefPoints: this.$selfBeliefPoints,
  });
}

export { Store };
