class LocalStorageData {
  constructor({ textareaText, endeavorText, actionText, questText, selfBeliefPoints }) {
    this.textareaText = textareaText;
    this.endeavorText = endeavorText;
    this.actionText = actionText;
    this.questText = questText;
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

    if (this.instanceOfISourcesLStorage(data, "textareaText")) {
      initData.textareaText = data.textareaText;
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

    if (this.instanceOfISourcesLStorage(data, "questText")) {
      initData.questText = data.questText;
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
