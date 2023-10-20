import { LocalStorageData } from "./LocalStorage.js";
import { getDate } from "../utils/getDate.js";

class Controller {
  constructor(store) {
    this.store = store;

    this.initialData = this.prepareDateForStore();

    this.store.onChangeLocalStorageData.add((data) =>
      this.toLocalStorageData(data)
    );

    onstorage = (e) => {
      if (e.key !== "pacer") return;
      const { textareaText, selfBeliefPoints } = LocalStorageData.fromJson(
        JSON.parse(e.newValue || "")
      );
      
      if (this.store.textareaText !== textareaText) this.store.textareaText = textareaText;
      if (this.store.selfBeliefPoints !== selfBeliefPoints) this.store.selfBeliefPoints = (parseInt(selfBeliefPoints) || '0').toString();
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

  prepareDateForStore = () => {
    const initialDate = this.getLocalStorageData();
    const date = getDate();
    return { ...initialDate, ...date };
  }
  
  runClock = () => {
    setInterval(() => {
      const date = getDate();
      this.store.date = date;
    }, intervalTime);
  };
  
  changeTextareaText = (text) => {
    this.store.textareaText = text;
  };
  changeSelfBeliefPoints = (points) => {
    this.store.selfBeliefPoints = points;
  };
  openCalendar = () => {};
}

export { Controller };
