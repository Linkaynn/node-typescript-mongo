import {data, dropAll, initDB} from "./util/util";
import * as chai from 'chai';
import 'mocha';
import {NodeServer} from "../src/nodeServer";
import chaiHttp = require("chai-http");
import {Log} from "../src/util/log";
import {get} from "./util/request-util";

chai.use(chaiHttp);

Log.silence();
NodeServer.init();

describe('Server', () => {

  before(async () => {
    await initDB();
    await dropAll();
  });

  after(async () => {
    await dropAll();
  });

  describe('health', () => {
    it('should return that everything is OK', async () => {
      const answer = await get('info/health');
      chai.expect(answer).to.have.status(200);
    });
  });

  describe('more info', () => {
    it('should return the version and the environment', async () => {
      const answer = await get('info');
      chai.expect(answer).to.have.status(200);
      chai.expect(data(answer).environment).to.be.equals("test")
    });
  });


});
