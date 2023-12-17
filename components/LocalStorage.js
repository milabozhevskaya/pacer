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
  }) {
    this.endeavors = endeavors;
    this.notes = notes;
    this.activities = activities;
    this.activitiesMode = activitiesMode;
    this.quests = quests;
    this.todos = todos;
    this.logs = logs;
    this.confidencePoints = confidencePoints;
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
      throw new Error("Not property in localstorage");
    }

    if (this.instanceOfISourcesLStorage(data, "endeavors")) {
      initData.endeavors = data.endeavors;
    } else {
      throw new Error("Not property in localstorage");
    }

    if (this.instanceOfISourcesLStorage(data, "activities")) {
      initData.activities = data.activities;
    } else {
      throw new Error("Not property in localstorage");
    }

    if (this.instanceOfISourcesLStorage(data, "activitiesMode")) {
      initData.activitiesMode = data.activitiesMode;
    } else {
      throw new Error("Not property in localstorage");
    }

    if (this.instanceOfISourcesLStorage(data, "quests")) {
      initData.quests = data.quests;
    } else {
      throw new Error("Not property in localstorage");
    }

    if (this.instanceOfISourcesLStorage(data, "logs")) {
      initData.logs = data.logs;
    } else {
      throw new Error("Not property in localstorage");
    }

    if (this.instanceOfISourcesLStorage(data, "todos")) {
      initData.todos = data.todos;
    } else {
      throw new Error("Not property in localstorage");
    }

    if (this.instanceOfISourcesLStorage(data, "confidencePoints")) {
      initData.textareaText = data.textareaText;
      initData.confidencePoints = data.confidencePoints;
    } else {
      throw new Error("Not property in localstorage");
    }

    return new LocalStorageData(initData);
  }
}

export { LocalStorageData };
