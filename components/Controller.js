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

    this.timeInterval = this.runClock();

    this.store.onChangeLocalStorageData.add((data) =>
      this.toLocalStorageData(data)
    );

    onstorage = (e) => {
      if (e.key !== "pacer") return;
      const {
        endeavors: endeavors,
        activities: activities,
        activitiesMode: activitiesMode,
        logs: logs,
        notes: notes,
        quests: quests,
        todos: todos,
        confidencePoints: confidencePoints,
      } = LocalStorageData.fromJson(JSON.parse(e.newValue || ""));

      if (this.store.notes !== notes) this.store.notes = notes;

      if (this.store.logs !== logs) this.store.logs = logs;

      if (this.store.todos !== todos) this.store.todos = todos;

      if (this.store.endeavors !== endeavors) this.store.endeavors = endeavors;

      if (this.store.activities !== activities)
        this.store.activities = activities;

      if (this.store.activitiesMode !== activitiesMode)
        this.store.activitiesMode = activitiesMode;

      if (this.store.quests !== quests) this.store.quests = quests;
      if (this.store.confidencePoints !== confidencePoints)
        this.store.confidencePoints = (
          parseInt(confidencePoints) || "0"
        ).toString();
    };
  }

  init = (callback) => this.store.init(this.initialData, callback);

  restart = (data) => {
    clearInterval(this.timeInterval);
    const time = getTime();
    const date = new Date(time).getDate();
    const reInitialDate = {
      ...data,
      time,
      date,
      isOpenCalendar: false,
      calendarContent: null,
      calendarSwipingSteps: 0,
      inputConfidencePoints: "",
      buttonConfidencePoints: "disable",
      openPointsCalculate: false,
      timeMode: "auto",
      manualTime: "",
    };

    this.store.restart(reInitialDate);
    this.timeInterval = this.runClock();
  };

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
        endeavors: "",
        activities: "",
        quests: "",
        confidencePoints: "0",
        notes: "",
        todos: "",
        logs: "",
        activitiesMode: "text",
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
      inputConfidencePoints: "",
      buttonConfidencePoints: "",
      openPointsCalculate: false,
      timeMode: "auto",
      manualTime: "",
    };
  };

  runClock = () => {
    const id = setInterval(() => {
      const time = getTime();
      const newDate = new Date(time);
      if (
        newDate.getDate() !== new Date(this.store.time).getDate() &&
        this.store.timeMode === "auto"
      ) {
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
    return id;
  };

  changeActivitiesMode = (mode) => {
    if (this.store.activitiesMode === mode) return;
    this.store.activitiesMode = mode;
  };

  changeText = {
    note: (text) => {
      this.store.noteText = text;
    },
    endeavor: (text) => {
      this.store.endeavors = text;
    },
    activity: (text) => {
      this.store.activities =
        this.store.activitiesMode === "text"
          ? text
          : formatContentFromTable(text);
    },
    quest: (text) => {
      this.store.quests = text;
    },
    todo: (text) => {
      this.store.todos = text;
    },
    log: (text) => {
      this.store.logs = text;
    },
  };

  changeTextareaText = (key, text) => {
    this.changeText[key](text);
  };

  changeConfidencePoints = (points) => {
    this.store.confidencePoints = points;
  };

  openPointsCalculate = () => {
    const state = !this.store.openPointsCalculate;
    this.store.openPointsCalculate = state;
    if (!state) {
      this.store.inputConfidencePoints = "";
      this.store.buttonConfidence = "disable";
    }
  };

  calculatePoints = (value) => {
    this.store.buttonConfidence = "wait";
    try {
      const text = this.store.confidencePoints + " " + value;
      const expression = eval(text);
      const points = parseFloat(expression);
      if (Number.isNaN(points) || !Number.isInteger(points) || points < 0)
        throw new CustomError("Incorrect calculation input");
      this.store.confidencePoints = points;
      this.changeInputConfidencePoints("");
      this.store.buttonConfidencePoints = "disable";
    } catch (error) {
      if (error instanceof CustomError) {
        this.store.errorConfidencePoints = error.message;
      } else {
        this.store.errorConfidencePoints = "Something went wrong";
      }
      this.store.buttonConfidencePoints = "";
    }
  };
  changeInputConfidencePoints = (value) => {
    this.store.inputConfidencePoints = value;
    if (value !== "") this.store.buttonConfidencePoints = "";
    if (value === "") {
      this.store.buttonConfidencePoints = "disable";
    }
  };
  openCalendar = () => {
    if (this.store.isOpenCalendar) {
      this.store.isOpenCalendar = false;
      return;
    }
    const today =
      this.store.timeMode === "auto"
        ? new Date()
        : Object.assign(this.store.manualTime);
    const nowMonth = new Date(today.getFullYear(), today.getMonth(), 5);
    const nowMonthContent = {
      today: nowMonth,
      month: nowMonth.getMonth(),
      year: nowMonth.getFullYear(),
      days: buildMonth(nowMonth, today),
    };

    const nextMonth = new Date(
      new Date(nowMonth).setMonth(nowMonth.getMonth() + 1)
    );
    const nextMonthContent = {
      today: nextMonth,
      month: nextMonth.getMonth(),
      year: nextMonth.getFullYear(),
      days: buildMonth(nextMonth, today),
    };

    const lastMonth = new Date(
      new Date(nowMonth).setMonth(nowMonth.getMonth() - 1)
    );
    const lastMonthContent = {
      today: lastMonth,
      month: lastMonth.getMonth(),
      year: lastMonth.getFullYear(),
      days: buildMonth(lastMonth, today),
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
    const today =
      this.store.timeMode === "auto" ? new Date() : this.store.manualTime;
    if (steps > 0) {
      [lastMonthContent, nowMonthContent] = [nowMonthContent, nextMonthContent];

      const nextMonth = new Date(
        new Date(today.getFullYear(), today.getMonth(), 5).setMonth(
          today.getMonth() + newSteps + 1
        )
      );
      nextMonthContent = {
        today: nextMonth,
        month: nextMonth.getMonth(),
        year: nextMonth.getFullYear(),
        days: buildMonth(nextMonth, today),
      };
    } else {
      [nowMonthContent, nextMonthContent] = [lastMonthContent, nowMonthContent];

      const lastMonth = new Date(
        new Date(today.getFullYear(), today.getMonth(), 5).setMonth(
          today.getMonth() + newSteps - 1
        )
      );
      lastMonthContent = {
        today: lastMonth,
        month: lastMonth.getMonth(),
        year: lastMonth.getFullYear(),
        days: buildMonth(lastMonth, today),
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
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.click();
    input.onchange = () => {
      const file = input.files[0];
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        try {
          const data = LocalStorageData.fromJson(JSON.parse(reader.result));

          this.restart(data);
        } catch (e) {
          console.log(e.message);
        }
      };
      reader.onerror = () => {
        console.log("Uploading file is wrong");
      };
    };
  };

  changeTimeMode = () => {
    if (this.store.timeMode === "auto") {
      this.store.timeMode = "manual";
      this.store.manualTime = new Date(this.store.time);
      return;
    }
    this.store.timeMode = "auto";
  };

  changeManualTime = (time) => {
    this.store.manualTime = new Date(time);
  };

  setManualTime = () => {};
}

export { Controller };
