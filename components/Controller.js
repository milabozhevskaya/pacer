import { LocalStorageData } from "./LocalStorage.js";
import { getDate } from "../utils/getDate.js";
const intervalTime = 999;
class Controller {
  constructor(store) {
    this.store = store;

    this.initialData = this.prepareDateForStore();

    this.runClock();

    this.store.onChangeLocalStorageData.add((data) =>
      this.toLocalStorageData(data)
    );

    onstorage = (e) => {
      if (e.key !== "pacer") return;
      const { textareaText, endeavorText, actionText, questText, selfBeliefPoints } = LocalStorageData.fromJson(
        JSON.parse(e.newValue || "")
      );

      if (this.store.textareaText !== textareaText)
        this.store.textareaText = textareaText;

      if (this.store.endeavorText !== endeavorText)
        this.store.endeavorText = endeavorText;

      if (this.store.actionText !== actionText)
        this.store.actionText = actionText;

      if (this.store.questText !== questText)
        this.store.questText = questText;
      if (this.store.selfBeliefPoints !== selfBeliefPoints)
        this.store.selfBeliefPoints = (
          parseInt(selfBeliefPoints) || "0"
        ).toString();
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
        endeavorText: "",
        actionText: "",
        questText: "",
        selfBeliefPoints: "0",
      });
    }
  };

  prepareDateForStore = () => {
    const initialDate = this.getLocalStorageData();
    const time = getDate();
    return { ...initialDate, time, onChangeCalendarSwipingSteps: 0 };
  };

  runClock = () => {
    setInterval(() => {
      const time = getDate();
      if (this.store.time !== time) this.store.time = time;
    }, intervalTime);
  };
  
  changeText = {
    textarea: (text) => {
      this.store.textareaText = text;
    },
    endeavor: (text) => {
      this.store.endeavorText = text;
    },
    action: (text) => {
      this.store.actionText = text;
    },
    quest: (text) => {
      this.store.questText = text;
    },
  }

  changeTextareaText = (key, text) => {
    this.changeText[key](text);
  };
  changeSelfBeliefPoints = (points) => {
    this.store.selfBeliefPoints = points;
  };
  openCalendar = () => {
    if (this.store.openCalendar) this.store.openCalendar = false;
    else this.store.openCalendar = true;
  };
  setCalendarSwipingSteps = (steps) => {
    if (this.store.calendarSwipingSteps !== steps) this.store.calendarSwipingSteps = steps;
  }
  onClickView = () => {
    if (this.store.openCalendar) this.store.openCalendar = false;
  };
}

export { Controller };
