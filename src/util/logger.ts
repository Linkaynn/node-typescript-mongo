import * as winston from "winston";
import {format, transports} from "winston";
import * as path from "path";
import * as fs from "fs";

const logDirectory = 'log';

const {printf} = format;

const transform = printf((info: any) => {
  if (info.type && info.type == 'error') {
    let message = info.message;

    if (info.message.stack) {
      message = info.message.message + "\n" + info.message.stack;
    }

    return new Date() + " - " + info.level.toUpperCase() + " - " + message.toString();
  } else {
    return new Date() + " - " + `${info.level.toUpperCase()} (${info.type})` + " - " + JSON.stringify(info.message.toString());
  }
});


// Create the directory if it does not exist
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

export const logger = winston.createLogger({
  format: transform,
  transports: [
    new transports.File({level: 'error', filename: path.join(logDirectory, '/mymedesp-error.log')}),
    new transports.File({level: 'info', filename: path.join(logDirectory, '/mymedesp.log')})
  ]
});

logger.add(new winston.transports.Console({
  format: transform
}));

