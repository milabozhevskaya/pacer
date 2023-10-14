class Signal {
  constructor() {
    this._listener = [];
  }

  add = (listener) => {
    this._listener.push(listener);
  };

  remove = (listener) => {
    this._listener = this._listener.filter((elem) => elem !== listener);
  };

  emit = (params) => {
    this._listener.forEach((listener) => listener(params));
  };
}

export { Signal };
