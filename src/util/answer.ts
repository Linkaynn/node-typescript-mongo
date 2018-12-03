import {errors} from "./errors";
import {Log} from "./log";

export class Answer {
  /**
   * Could be "ok" or "error"
   */
  status: string = "ok";

  /**
   * Data of the response
   */
  data: {};

  /**
   * Only in case of error.
   * Identification of the error.
   */
  errorCode?: string;

  /**
   * Only in case of error.
   * Message associated to the error code.
   */
  message?: string;

  /**
   * Only in case of error.
   * Exception message.
   */
  exception?: {};

  constructor(data, status?) {
    this.data = data;
    this.status = status || "ok";
  }


  static ok(body: {}) {
    Log.response(`Responding ok (200)`, [body]);

    return new Answer(body);
  }

  static error(errorCode: string, data?, exception?) {
    const answer = new Answer(data, "error");

    answer.errorCode = exception && exception.errorCode ? exception.errorCode : errorCode;
    answer.message = this.decodeMessage(answer.errorCode);
    answer.exception = exception && exception.message ? exception.message : exception;

    Log.responseError(`Responding error (200) - ${answer.errorCode} -- ${answer.message}`, [JSON.stringify(data), JSON.stringify(exception)]);

    return answer;
  }

  private static decodeMessage(errorCode: string) {
    let message;
    message = errors[errorCode];

    if (!message && errorCode.includes("/")) {
      Log.warn(`${errorCode} do not have a message match`);
      console.warn(`${errorCode} do not have a message match`);
    }

    message = message ? message : "An unknown error occurred";
    return message;
  }
}
