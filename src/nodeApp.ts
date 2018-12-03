import * as express from "express";
import * as cors from "cors";
import {Server} from "typescript-rest";
import controllers from "./controllers";
import {secrets} from "./config/secret";
import {Log} from "./util/log";
import * as fs from "fs";
import {Connection} from "./config/connection";
import {CrudHelper} from "./controllers/util/crud-helper";
import {UserCRUD} from "./models/user";
import {ModelFaker} from "./helpers/modelFaker";
import {ENVIRONMENT} from "./nodeServer";
import {currentEnv} from "./config/config";
import cookieParser = require("cookie-parser");
import cookieSession = require("cookie-session");

export class NodeApp {

  public app: express.Application = express();

  constructor() {
    this.initApp();
    this.initServer();
    this.initMongo();

    this.popularizeUser();
  }

  private initApp(): void {
    this.app.use(express.static("public"));
    this.app.use(cors());
    this.app.use(cookieParser());

    this.app.use(cookieSession({
      name: 'token',
      keys: [secrets.token],
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }));
  }

  private initServer() {
    Server.buildServices(this.app, ...controllers);

    try {
      const scheme = ENVIRONMENT == 'production' ? "https" : "http";
      Server.swagger(this.app, "./swagger/swagger.yaml", "/api-docs", `${currentEnv().host.name}:${currentEnv().host.port}`, [scheme]);
      Log.info("Swagger initialized");
    } catch (e) {
      Log.error("Swagger could not initialize");
    }


    // Create the directory if it does not exist
    const uploadPath = 'uploads';

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }

    Server.setFileDest(uploadPath);

    if (ENVIRONMENT != 'prodution') {
      Log.info(`All paths: ${Server.getPaths()}`);
    }
  }

  private initMongo(): void {
    Connection.init();
    Connection.connect();
  }


  private async popularizeUser() {
    const userHelper = new CrudHelper(UserCRUD);

    if (await userHelper.count() == 0) {
      ModelFaker.newUser('Kimox Studio', 'kimox', 'kimoxstudio@gmail.com');
    }
  }

}
