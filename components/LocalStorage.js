class LocalStorageData {
  constructor({
    noteText,
    endeavorText,
    actionText,
    actionMode,
    questText,
    todoText,
    logText,
    selfBeliefPoints,
  }) {
    this.noteText = noteText;
    this.endeavorText = endeavorText;
    this.actionText = actionText;
    this.actionMode = actionMode;
    this.questText = questText;
    this.todoText = todoText;
    this.logText = logText;
    this.selfBeliefPoints = selfBeliefPoints;
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

    if (this.instanceOfISourcesLStorage(data, "noteText")) {
      initData.noteText = data.noteText;
    } else {
      throw new Error("Not property in localstorage");
    }

    if (this.instanceOfISourcesLStorage(data, "endeavorText")) {
      initData.endeavorText = data.endeavorText;
    } else {
      throw new Error("Not property in localstorage");
    }

    if (this.instanceOfISourcesLStorage(data, "actionText")) {
      initData.actionText = data.actionText;
    } else {
      throw new Error("Not property in localstorage");
    }

    if (this.instanceOfISourcesLStorage(data, "actionMode")) {
      initData.actionMode = data.actionMode;
    } else {
      throw new Error("Not property in localstorage");
    }

    if (this.instanceOfISourcesLStorage(data, "questText")) {
      initData.questText = data.questText;
    } else {
      throw new Error("Not property in localstorage");
    }

    if (this.instanceOfISourcesLStorage(data, "logText")) {
      initData.logText = data.logText;
    } else {
      throw new Error("Not property in localstorage");
    }

    if (this.instanceOfISourcesLStorage(data, "todoText")) {
      initData.todoText = data.todoText;
    } else {
      throw new Error("Not property in localstorage");
    }

    if (this.instanceOfISourcesLStorage(data, "selfBeliefPoints")) {
      initData.textareaText = data.textareaText;
      initData.selfBeliefPoints = data.selfBeliefPoints;
    } else {
      throw new Error("Not property in localstorage");
    }

    return new LocalStorageData(initData);
  }
}

export { LocalStorageData };
