export default class AppError extends Error {
  statuseCode;
  // status;
  msg;

  constructor(msg: string, statuseCode: number) {
    super(msg);

    this.msg = msg;
    this.statuseCode   = statuseCode;
  }
}