import { Signal } from "./Signal.js";

class Store {
  constructor() {
    this.$textareaText = "";
    this.$selfBeliefPoints = "0";
  }

  init = (initialState, callback) => {
    this.$textareaText = initialState.textareaText;
    this.$selfBeliefPoints = initialState.selfBeliefPoints;
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

  onChangeTextareaText = new Signal();
  onChangeSelfBeliefPoints = new Signal();

  onChangeLocalStorageData = new Signal();
  computeDataForLocalStorage = () => ({
    textareaText: this.$textareaText,
    selfBeliefPoints: this.$selfBeliefPoints,
  });
}

export { Store };
