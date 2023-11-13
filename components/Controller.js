import { LocalStorageData } from "./LocalStorage.js";
import { getTime } from "../utils/getTime.js";
import { CustomError } from "./CustomError.js";
import { formatContentFromTable } from "../utils/tableFormatContent.js";
import { buildMonth } from "../utils/calendar.js";

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
      const {
        endeavorText,
        actionText,
        actionMode,
        logText,
        noteText,
        questText,
        todoText,
        selfBeliefPoints,
      } = LocalStorageData.fromJson(JSON.parse(e.newValue || ""));

      if (this.store.noteText !== noteText) this.store.noteText = noteText;

      if (this.store.logText !== logText) this.store.logText = logText;

      if (this.store.todoText !== todoText) this.store.todoText = todoText;

      if (this.store.endeavorText !== endeavorText)
        this.store.endeavorText = endeavorText;

      if (this.store.actionText !== actionText)
        this.store.actionText = actionText;

      if (this.store.actionMode !== actionMode)
        this.store.actionMode = actionMode;

      if (this.store.questText !== questText) this.store.questText = questText;
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
        noteText: "",
        endeavorText: "",
        actionText: "",
        questText: "",
        todoText: "",
        logText: "",
        selfBeliefPoints: "0",
        actionMode: "text",
      });
    }
  };

  prepareDateForStore = () => {
    const initialDate = this.getLocalStorageData();
    const time = getTime();
    const date = new Date(time).getDate();
    return {
      ...initialDate,
      time,
      date,
      isOpenCalendar: false,
      calendarContent: null,
      calendarSwipingSteps: 0,
      inputSelfBeliefPoints: "",
      buttonSelfBeliefPoints: "",
      openPointsCalculate: false,
    };
  };

  runClock = () => {
    setInterval(() => {
      const time = getTime();
      const newDate = new Date(time);
      if (newDate.getDate() !== new Date(this.store.time).getDate()) {
        const changedMonth = [];

        if (this.store.isOpenCalendar) {
          for (let i = 0; i < this.store.calendarContent.length; i++) {
            const month = this.store.calendarContent[i];

            const prevDayIndex = month.days.findIndex(
              (day) =>
                day.date.getDate() === new Date(this.store.time).getDate() &&
                day.date.getMonth() === new Date(this.store.time).getMonth() &&
                day.date.getFullYear() ===
                  new Date(this.store.time).getFullYear()
            );
            if (prevDayIndex > -1) {
              const day = month.days[prevDayIndex];
              day.options = { ...day.options, isCurrentDay: false };
              changedMonth.push({
                monthIndex: i,
                dayIndex: prevDayIndex,
                options: day.options,
              });
            }

            const dayIndex = month.days.findIndex(
              (day) =>
                day.date.getDate() === newDate.getDate() &&
                day.date.getMonth() === newDate.getMonth() &&
                day.date.getFullYear() === newDate.getFullYear()
            );
            if (dayIndex > -1) {
              const day = month.days[dayIndex];
              day.options = { ...day.options, isCurrentDay: true };
              changedMonth.push({
                monthIndex: i,
                dayIndex,
                options: day.options,
              });
            }
          }
        }
        this.store.date = { date: newDate, changedMonth };
      }
      if (this.store.time !== time) this.store.time = time;
    }, intervalTime);
  };

  changeActionMode = (mode) => {
    if (this.store.actionMode === mode) return;
    this.store.actionMode = mode;
  };

  changeText = {
    note: (text) => {
      this.store.noteText = text;
    },
    endeavor: (text) => {
      this.store.endeavorText = text;
    },
    action: (text) => {
      this.store.actionText =
        this.store.actionMode === "text" ? text : formatContentFromTable(text);
    },
    quest: (text) => {
      this.store.questText = text;
    },
    todo: (text) => {
      this.store.todoText = text;
    },
    log: (text) => {
      this.store.logText = text;
    },
  };

  changeTextareaText = (key, text) => {
    this.changeText[key](text);
  };
  changeSelfBeliefPoints = (points) => {
    this.store.selfBeliefPoints = points;
  };
  openPointsCalculate = () => {
    const state = !this.store.openPointsCalculate;
    this.store.openPointsCalculate = state;
    if (!state) {
      this.store.inputSelfBeliefPoints = "";
      this.store.buttonSelfBeliefPoints = "disable";
    }
  };
  calculatePoints = (value) => {
    this.store.buttonSelfBeliefPoints = "wait";
    try {
      const text = this.store.selfBeliefPoints + " " + value;
      const expression = eval(text);
      const points = parseFloat(expression);
      if (Number.isNaN(points) || !Number.isInteger(points) || points < 0)
        throw new CustomError("Incorrect calculation input");
      this.store.selfBeliefPoints = points;
      this.changeInputSelfBeliefPoints("");
      this.store.buttonSelfBeliefPoints = "disable";
    } catch (error) {
      if (error instanceof CustomError) {
        this.store.errorSelfBeliefPoints = error.message;
      } else {
        this.store.errorSelfBeliefPoints = "Something went wrong";
      }
      this.store.buttonSelfBeliefPoints = "";
    }
  };
  changeInputSelfBeliefPoints = (value) => {
    this.store.inputSelfBeliefPoints = value;
    if (value !== "") this.store.buttonSelfBeliefPoints = "";
  };
  openCalendar = () => {
    if (this.store.isOpenCalendar) {
      this.store.isOpenCalendar = false;
      return;
    }
    const nowMonth = new Date();
    const nowMonthContent = {
      month: nowMonth.getMonth(),
      year: nowMonth.getFullYear(),
      days: buildMonth(nowMonth),
    };

    const nextMonth = new Date(new Date().setMonth(new Date().getMonth() + 1));
    const nextMonthContent = {
      month: nextMonth.getMonth(),
      year: nextMonth.getFullYear(),
      days: buildMonth(nextMonth),
    };

    const lastMonth = new Date(new Date().setMonth(new Date().getMonth() - 1));
    const lastMonthContent = {
      month: lastMonth.getMonth(),
      year: lastMonth.getFullYear(),
      days: buildMonth(lastMonth),
    };

    this.store.calendarContent = [
      lastMonthContent,
      nowMonthContent,
      nextMonthContent,
    ];
    this.store.isOpenCalendar = true;
  };

  setCalendarSwipingSteps = (steps) => {
    const newSteps = this.store.calendarSwipingSteps + steps;
    let [lastMonthContent, nowMonthContent, nextMonthContent] =
      this.store.calendarContent;
    if (steps > 0) {
      [lastMonthContent, nowMonthContent] = [nowMonthContent, nextMonthContent];

      const nextMonth = new Date(
        new Date().setMonth(new Date().getMonth() + newSteps + 1)
      );
      nextMonthContent = {
        month: nextMonth.getMonth(),
        year: nextMonth.getFullYear(),
        days: buildMonth(nextMonth),
      };
    } else {
      [nowMonthContent, nextMonthContent] = [lastMonthContent, nowMonthContent];

      const lastMonth = new Date(
        new Date().setMonth(new Date().getMonth() + newSteps - 1)
      );
      lastMonthContent = {
        month: lastMonth.getMonth(),
        year: lastMonth.getFullYear(),
        days: buildMonth(lastMonth),
      };
    }

    this.store.calendarContent = [
      lastMonthContent,
      nowMonthContent,
      nextMonthContent,
    ];
    this.store.calendarSwipingSteps = newSteps;
  };

  onClickView = () => {
    if (this.store.isOpenCalendar) this.store.isOpenCalendar = false;
  };

  downloadDateFile = () => {
    const a = document.createElement("a");
    const date = this.getLocalStorageData();
    const file = new Blob([JSON.stringify(date, null, 2)], {
      type: "application/json;charset=" + document.characterSet,
    });
    a.href = URL.createObjectURL(file);
    a.download = "pacer.json";
    a.click();
  };

  uploadDateFile = () => {
    console.log("hr");
  };
}

export { Controller };
