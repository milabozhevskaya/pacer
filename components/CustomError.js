class CustomError extends Error {
  __proto__ = Error;

  constructor(message) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
    this.name = "CustomError";
    this.status = 500;
    this.message = message;
  }
}

export { CustomError };
