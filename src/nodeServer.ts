import * as https from "https";
import {Server as HTTPSServer} from "https";
import * as fs from "fs";
import * as http from "http";
import {Server as HTTPServer} from "http";
import {currentEnv} from "./config/config";
import {secrets} from "./config/secret";
import {NodeApp} from "./nodeApp";
import {Log} from "./util/log";

export const ENVIRONMENT = process.env.NODE_ENV || 'development';
const PORT = currentEnv().host.port || 8080;
const HTTP_OPTIONS = {
  key: fs.readFileSync(currentEnv().credentials_path.key || "./credentials/key.pem"),
  cert: fs.readFileSync(currentEnv().credentials_path.cert || "./credentials/cert.pem")
};

export class NodeServer {
  private static instance : HTTPServer | HTTPSServer = null;

  /**
   * Checks that everything is fine
   */
  private static checkConfiguration() {
    return secrets.token;
  }

  static init() {
    if (this.checkConfiguration()) {
      const init = () => {
        Log.info(`Server listening on ${currentEnv().host.name}:${currentEnv().host.port}`);

        if (ENVIRONMENT == 'production') {
          Log.info('HTTPS Server activated')
        }
      };

      const app = new NodeApp().app;

      // Only in production we use https, otherwise we work in http
      if (ENVIRONMENT == 'production') {
        NodeServer.instance = https.createServer(HTTP_OPTIONS, app).listen(PORT, init);
      } else {
        NodeServer.instance = http.createServer(app).listen(PORT, init);
      }
    } else {
      Log.error("CAUTION!");
      Log.error("./src/config/server-config-secret.ts not found.");
    }
  }
}

if (ENVIRONMENT != "test") {
  NodeServer.init();
}
