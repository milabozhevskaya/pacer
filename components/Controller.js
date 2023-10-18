import { LocalStorageData } from "./LocalStorage.js";

class Controller {
  constructor(store) {
    this.store = store;

    this.initialData = this.getLocalStorageData();

    this.store.onChangeLocalStorageData.add((data) =>
      this.toLocalStorageData(data)
    );

    onstorage = (e) => {
      if (e.key !== "pacer") return;
      const { textareaText, selfBeliefPoints } = LocalStorageData.fromJson(
        JSON.parse(e.newValue || "")
      );
      if (this.store.textareaText !== textareaText) this.store.textareaText = textareaText;
      if (this.store.selfBeliefPoints !== selfBeliefPoints) this.store.selfBeliefPoints = selfBeliefPoints;
    };
  }

  init = (callback) => this.store.init(this.initialData, callback);

  toLocalStorageData = (dataFromLocalStorage) => {
    localStorage.setItem(
      "pacer",
      LocalStorageData.toJson(dataFromLocalStorage)
    );
  };

  getLocalStorageData = () => {
    try {
      const data = LocalStorageData.fromJson(
        JSON.parse(localStorage.getItem("pacer") || "")
      );
      return data;
    } catch (e) {
      return new LocalStorageData({
        textareaText: "",
        selfBeliefPoints: "0",
      });
    }
  };

  changeTextareaText = (text) => {
    this.store.textareaText = text;
  };
  changeSelfBeliefPoints = (points) => {
    this.store.selfBeliefPoints = points;
  };
}

export { Controller };
