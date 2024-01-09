import { Signal } from "./Signal.js";

class Store {
  constructor() {
    this.$notes = "";
    this.$todos = "";
    this.$logs = "";
    this.$endeavors = "";
    this.$activities = "";
    this.$activitiesMode = "text";
    this.$quests = "";
    this.$confidencePoints = "0";
    this.$inputConfidencePoints = "";
    this.$buttonConfidencePoints = "";
    this.$openPointsCalculate = false;
    this.$time = "";
    this.$date = 0;
    this.$isOpenCalendar = false;
    this.$calendarContent = null;
    this.$calendarSwipingSteps = 0;
    this.$timeMode = "auto";
    this.$manualTime = "";
  }

  init = (initialState, callback) => {
    this.$notes = initialState.notes;
    this.$logs = initialState.logs;
    this.$todos = initialState.todos;
    this.$endeavors = initialState.endeavors;
    this.$activities = initialState.activities;
    this.$activitiesMode = initialState.activitiesMode;
    this.$quests = initialState.quests;
    this.$confidencePoints = initialState.confidencePoints;
    this.$inputConfidencePoints = initialState.inputConfidencePoints;
    this.$buttonConfidencePoints = initialState.buttonConfidencePoints;
    this.$openPointsCalculate = initialState.openPointsCalculate;
    this.$time = initialState.time;
    this.$date = initialState.date;
    this.$isOpenCalendar = initialState.isOpenCalendar;
    this.$calendarContent = initialState.calendarContent;
    this.$calendarSwipingSteps = initialState.calendarSwipingSteps;
    this.$timeMode = initialState.timeMode;
    this.$manualTime = initialState.manualTime;
    callback({ ...this.computeDataForLocalStorage(), time: this.$time });
  };

  restart = (reInitialDate) => {
    this.$notes = reInitialDate.notes;
    this.$logs = reInitialDate.logs;
    this.$todos = reInitialDate.todos;
    this.$endeavors = reInitialDate.endeavors;
    this.$activities = reInitialDate.activities;
    this.$activitiesMode = reInitialDate.activitiesMode;
    this.$quests = reInitialDate.quests;

    this.$confidencePoints = reInitialDate.confidencePoints;
    this.$inputConfidencePoints = reInitialDate.inputConfidencePoints;
    this.$buttonConfidencePoints = reInitialDate.buttonConfidencePoints;
    this.$openPointsCalculate = reInitialDate.openPointsCalculate;

    this.$time = reInitialDate.time;
    this.$date = reInitialDate.date;
    this.$isOpenCalendar = reInitialDate.isOpenCalendar;
    this.$calendarContent = reInitialDate.calendarContent;
    this.$calendarSwipingSteps = reInitialDate.calendarSwipingSteps;
    this.$timeMode = reInitialDate.timeMode;
    this.$manualTime = reInitialDate.manualTime;
    this.onReInit.emit(reInitialDate);
    this.onChangeLocalStorageData.emit(this.computeDataForLocalStorage());
  };

  get notes() {
    return this.$notes;
  }

  set notes(value) {
    this.$notes = value;
    this.onChangeNotes.emit(value);
    this.onChangeLocalStorageData.emit(this.computeDataForLocalStorage());
  }

  get logs() {
    return this.$logs;
  }

  set logs(value) {
    this.$logs = value;
    this.onChangeLogs.emit(value);
    this.onChangeLocalStorageData.emit(this.computeDataForLocalStorage());
  }

  get todos() {
    return this.$todos;
  }

  set todos(value) {
    this.$todos = value;
    this.onChangeTodos.emit(value);
    this.onChangeLocalStorageData.emit(this.computeDataForLocalStorage());
  }

  get endeavors() {
    return this.$endeavors;
  }

  set endeavors(value) {
    this.$endeavors = value;
    this.onChangeEndeavors.emit(value);
    this.onChangeLocalStorageData.emit(this.computeDataForLocalStorage());
  }

  get activities() {
    return this.$activities;
  }

  set activities(value) {
    this.$activities = value;
    this.onChangeActivities.emit(value);
    this.onChangeLocalStorageData.emit(this.computeDataForLocalStorage());
  }

  get activitiesMode() {
    return this.$activitiesMode;
  }

  set activitiesMode(mode) {
    this.$activitiesMode = mode;
    this.onChangeActivitiesMode.emit(mode);
    this.onChangeLocalStorageData.emit(this.computeDataForLocalStorage());
  }

  get quests() {
    return this.$quests;
  }

  set quests(value) {
    this.$quests = value;
    this.onChangeQuests.emit(value);
    this.onChangeLocalStorageData.emit(this.computeDataForLocalStorage());
  }

  get confidencePoints() {
    return this.$confidencePoints;
  }

  set confidencePoints(value) {
    this.$confidencePoints = value;
    this.onChangeConfidencePoints.emit(value);
    this.onChangeLocalStorageData.emit(this.computeDataForLocalStorage());
  }

  get inputConfidencePoints() {
    return this.$inputConfidencePoints;
  }

  set inputConfidencePoints(value) {
    this.$inputConfidencePoints = value;
    this.onChangeInputConfidencePoints.emit(value);
  }

  get buttonConfidencePoints() {
    return this.$buttonConfidencePoints;
  }

  set buttonConfidencePoints(state) {
    this.$buttonConfidencePoints = state;
    this.onChangeButtonConfidencePoints.emit(state);
  }

  get openPointsCalculate() {
    return this.$openPointsCalculate;
  }

  set openPointsCalculate(state) {
    this.$openPointsCalculate = state;
    this.onChangeOpenPointsCalculate.emit(state);
  }

  get time() {
    return this.$time;
  }

  set time(value) {
    this.$time = value;
    this.onChangeTime.emit(value);
  }

  get manualTime() {
    return this.$manualTime;
  }

  set manualTime(value) {
    this.$manualTime = value;
    this.onChangeLocalStorageData.emit(this.computeDataForLocalStorage());
  }

  get date() {
    return this.$date;
  }

  set date({ date, changedMonth }) {
    this.$date = date;
    if (this.$isOpenCalendar) this.onChangeDate.emit(changedMonth);
  }

  get isOpenCalendar() {
    return this.$isOpenCalendar;
  }

  set isOpenCalendar(flag) {
    this.$isOpenCalendar = flag;
    if (!flag) {
      this.$calendarSwipingSteps = 0;
      this.$calendarContent = null;
    }
    this.onChangeIsOpenCalendar.emit({ flag, month: this.$calendarContent });
  }

  get calendarContent() {
    return this.$calendarContent;
  }

  set calendarContent(month) {
    this.$calendarContent = month;
  }

  get calendarSwipingSteps() {
    return this.$calendarSwipingSteps;
  }

  set calendarSwipingSteps(steps) {
    const prevSteps = this.$calendarSwipingSteps;
    this.$calendarSwipingSteps = steps;
    if (prevSteps < steps) {
      this.onChangeCalendarSwipingSteps.emit({
        direction: "next",
        month: this.$calendarContent[2],
      });
    } else {
      this.onChangeCalendarSwipingSteps.emit({
        direction: "last",
        month: this.$calendarContent[0],
      });
    }
  }

  get timeMode() {
    return this.$timeMode;
  }

  set timeMode(mode) {
    this.$timeMode = mode;
    this.onChangeTimeMode.emit({ mode, manualTime: this.$manualTime });
    this.onChangeLocalStorageData.emit(this.computeDataForLocalStorage());
  }

  onReInit = new Signal();

  onChangeNotes = new Signal();
  onChangeLogs = new Signal();
  onChangeTodos = new Signal();
  onChangeEndeavors = new Signal();
  onChangeActivities = new Signal();
  onChangeActivitiesMode = new Signal();
  onChangeQuests = new Signal();
  onChangeConfidencePoints = new Signal();
  onChangeInputConfidencePoints = new Signal();
  onChangeButtonConfidencePoints = new Signal();
  onChangeOpenPointsCalculate = new Signal();
  onChangeTime = new Signal();
  onChangeDate = new Signal();
  onChangeIsOpenCalendar = new Signal();
  onChangeCalendarSwipingSteps = new Signal();
  onChangeTimeMode = new Signal();

  onChangeLocalStorageData = new Signal();
  computeDataForLocalStorage = () => ({
    notes: this.$notes,
    logs: this.$logs,
    todos: this.$todos,
    endeavors: this.$endeavors,
    activities: this.$activities,
    quests: this.$quests,
    confidencePoints: this.$confidencePoints,
    activitiesMode: this.$activitiesMode,
    timeMode: this.$timeMode,
    manualTime: this.$manualTime,
  });
}

export { Store };
