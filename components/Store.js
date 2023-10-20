import { Signal } from "./Signal.js";

class Store {
  constructor() {
    this.$textareaText = "";
    this.$selfBeliefPoints = "0";
    this.$time = "";
  }

  init = (initialState, callback) => {
    this.$textareaText = initialState.textareaText;
    this.$selfBeliefPoints = initialState.selfBeliefPoints;
    this.$time = initialState.time;
    callback(this.computeDataForLocalStorage());
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

  get date() {
    return this.$time;
  }

  set date(value) {
    this.$time = value;
  }

  onChangeTextareaText = new Signal();
  onChangeSelfBeliefPoints = new Signal();

  onChangeLocalStorageData = new Signal();
  computeDataForLocalStorage = () => ({
    textareaText: this.$textareaText,
    selfBeliefPoints: this.$selfBeliefPoints,
    time: this.$time,
  });
}

export { Store };
