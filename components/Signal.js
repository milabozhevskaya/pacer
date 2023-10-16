class Signal {
  constructor() {
    this._listeners = [];
  }

  add = (listener) => {
    this._listeners.push(listener);
  };

  remove = (listener) => {
    this._listeners = this._listeners.filter((elem) => elem !== listener);
  };

  emit = (params) => {
    this._listeners.forEach((listener) => listener(params));
  };
}

export { Signal };
