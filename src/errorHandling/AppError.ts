
/**
 * Custom error
 * INSTANCE OF Error
 * provides message, statusCode
 */
export default class AppError extends Error {
  statusCode;
  message;

  constructor(message: string, statusCode: number) {
    super(message);

    this.message = message;
    this.statusCode = statusCode;
  }
}