export class InternalServerError extends Error {
  constructor({ cause }) {
    super("internal server error not expected", { cause });
    (this.name = "InternalServerError"),
      (this.action = "Call support"),
      (this.status_code = 500);
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.status_code,
    };
  }
}
