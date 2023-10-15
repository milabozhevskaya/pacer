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
      const { textareaText } = LocalStorageData.fromJson(
        JSON.parse(e.newValue || "")
      );
      this.store.textareaText = textareaText;
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
      });
    }
  };

  changeTextareaText = (text) => {
    this.store.textareaText = text;
  };
}

export { Controller };
