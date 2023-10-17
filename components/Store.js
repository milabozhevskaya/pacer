import { Signal } from "./Signal.js";

class Store {
  constructor() {
    this.$textareaText = '';
  }
  
  init = (initialState, callback) => {
    this.$textareaText = initialState.textareaText;
    callback({ textareaText: this.$textareaText });
  }
  
    get textareaText() {
      return this.$textareaText;
    }
  
  set textareaText(value) {
    this.$textareaText = value;
    this.onChangeTextareaText.emit(value);
    this.onChangeLocalStorageData.emit({ textareaText: value });
  }

  onChangeTextareaText = new Signal();
  onChangeLocalStorageData = new Signal();
}

export { Store };
