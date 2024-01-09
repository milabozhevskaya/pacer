import { getTime } from "../utils/getTime.js";

class LocalStorageData {
  constructor({
    endeavors,
    notes,
    activities,
    activitiesMode,
    quests,
    todos,
    logs,
    confidencePoints,
    timeMode,
    manualTime,
  }) {
    this.endeavors = endeavors;
    this.notes = notes;
    this.activities = activities;
    this.activitiesMode = activitiesMode;
    this.quests = quests;
    this.todos = todos;
    this.logs = logs;
    this.confidencePoints = confidencePoints;
    this.timeMode = timeMode;
    this.manualTime = manualTime;
  }

  static toJson(data) {
    return JSON.stringify(data);
  }

  static instanceOfISourcesLStorage(object, key) {
    return key in object;
  }

  static fromJson(data) {
    const initData = {};
    if (data === null || typeof data !== "object") {
      throw new Error("Not object in localstorage");
    }

    if (this.instanceOfISourcesLStorage(data, "notes")) {
      initData.notes = data.notes;
    } else {
      initData.notes = "";
      // throw new Error("Not property in localstorage");
    }

    if (this.instanceOfISourcesLStorage(data, "endeavors")) {
      initData.endeavors = data.endeavors;
    } else {
      initData.endeavors = "";
      // throw new Error("Not property in localstorage");
    }

    if (this.instanceOfISourcesLStorage(data, "activities")) {
      initData.activities = data.activities;
    } else {
      initData.activities = "";
      // throw new Error("Not property in localstorage");
    }

    if (this.instanceOfISourcesLStorage(data, "activitiesMode")) {
      initData.activitiesMode = data.activitiesMode;
    } else {
      initData.activitiesMode = "text";
      // throw new Error("Not property in localstorage");
    }

    if (this.instanceOfISourcesLStorage(data, "quests")) {
      initData.quests = data.quests;
    } else {
      initData.quests = "";
      // throw new Error("Not property in localstorage");
    }

    if (this.instanceOfISourcesLStorage(data, "logs")) {
      initData.logs = data.logs;
    } else {
      initData.logs = "";
      // throw new Error("Not property in localstorage");
    }

    if (this.instanceOfISourcesLStorage(data, "todos")) {
      initData.todos = data.todos;
    } else {
      initData.todos = "";
      // throw new Error("Not property in localstorage");
    }

    if (this.instanceOfISourcesLStorage(data, "confidencePoints")) {
      initData.confidencePoints = data.confidencePoints;
    } else {
      initData.confidencePoints = 0;
      // throw new Error("Not property in localstorage");
    }

    if (this.instanceOfISourcesLStorage(data, "timeMode")) {
      initData.timeMode = data.timeMode;
    } else {
      initData.timeMode = "auto";
      // throw new Error("Not property in localstorage");
    }

    if (this.instanceOfISourcesLStorage(data, "manualTime")) {
      initData.manualTime = data.manualTime;
    } else {
      initData.manualTime = getTime();
      // throw new Error("Not property in localstorage");
    }

    return new LocalStorageData(initData);
  }
}

export { LocalStorageData };
