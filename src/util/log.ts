import {logger} from "./logger";

export class Log {
  private static quiet : boolean = false;

  static response(message, extraInfo: any[]) {
    if (Log.quiet) return;

    logger.log({level: 'info', type: 'response', message: message});

    for (const info of extraInfo) {
      if (info) {
        logger.log({level: 'info', type: 'response-data', message: JSON.stringify(info, null, " ")});
      }
    }
  }

  static responseError(message, extraInfo: any[]) {
    if (Log.quiet) return;

    logger.log({level: 'error', type: 'response', message: message});

    for (const info of extraInfo) {
      if (info) {
        logger.log({level: 'error', type: 'response-data', message: JSON.stringify(info, null, " ")});
      }
    }
  }

  static error(e, message?) {
    if (message) {
      logger.log({level: 'error', type: 'error', message: message});
    }

    logger.log({level: 'error', type: 'error', message: JSON.stringify(e, null, " ")});
  }

  static info(message) {
    if (Log.quiet) return;

    logger.log({level: 'info', type: 'information', message: message});
  }

  static warn(message) {
    if (Log.quiet) return;

    logger.log({level: 'info', type: 'warning', message: message});
  }

  static silence() {
    Log.quiet = true;
  }

  static silenced() {
    return Log.quiet;
  }
}
