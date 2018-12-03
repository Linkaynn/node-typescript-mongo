import * as chai from 'chai';
import 'mocha';
import {dropAll, errorCode, expect} from "../util/util";
import {UserTestManager} from "../util/user-test-manager";
import {ModelFaker} from "../../src/helpers/modelFaker";
import chaiHttp = require("chai-http");

chai.use(chaiHttp);

describe('Login controller', () => {

  before(async () => {
    await dropAll();
  });

  after(async () => {
    await dropAll();
  });

  it('must allow login with right info', async () => {
    const user : UserTestManager = await new UserTestManager().build();

    const answer = await user.sendLoginRequest();
    expect(answer, true);
  });

  it('must denied login with wrong info', async () => {
    const user : UserTestManager = await new UserTestManager().build();

    let answer = await user.post('auth/login', {username: user.user.username, password: "wrongPassword"});
    expect(answer, false);
    chai.expect(errorCode(answer)).to.be.equals('auth/bad-authentication');

    answer = await user.post('auth/login', {username: "wrongUsername", password: ModelFaker.DEFAULT_USER_PASSWORD});
    expect(answer, false);
    chai.expect(errorCode(answer)).to.be.equals('auth/bad-authentication');
  });

});
