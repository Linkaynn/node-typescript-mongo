import {User} from "../../src/models/user";
import {ModelFaker} from "../../src/helpers/modelFaker";
import * as request from "superagent";
import * as faker from "faker";
import {currentEnv} from "../../src/config/config";

export class UserTestManager {
  user: User;
  cookie: string;

  async build(name?, username?, email?) {
    name = name || "Kimox Studio Test";
    username = username || 'kimoxStudioTest';
    email = email || 'kimoxstudio@gmail.com';

    this.user = await ModelFaker.newUser(name, username, email);

    return this;
  }

  buildRandomly(name?, username?, email?) {
    return this.build(name || faker.name.firstName(), username || faker.internet.userName(), email || faker.internet.email())
  }

  async login() {
    this.cookie = (await this.sendLoginRequest()).header['set-cookie'];
  }

  async logout() {
    await this.get('auth/logout');
    this.cookie = undefined;
  }

  sendLoginRequest() {
    return this.post('auth/login', {username: this.user.username, password: ModelFaker.DEFAULT_USER_PASSWORD});
  }

  get(endpoint, queryParams?) {
    const get = this.setCookieIfExist(request.get(`http://${currentEnv().host.name}:${currentEnv().host.port}/v1/` + endpoint));

    if (queryParams) {
      get.query(queryParams)
    }

    return get;
  }

  post(endpoint, body) {
    return this.setCookieIfExist(request.post(`http://${currentEnv().host.name}:${currentEnv().host.port}/v1/` + endpoint)).send(body);
  }

  _delete(endpoint) {
    return this.setCookieIfExist(request.delete(`http://${currentEnv().host.name}:${currentEnv().host.port}/v1/` + endpoint));
  }

  put(endpoint, body) {
    return this.setCookieIfExist(request.put(`http://${currentEnv().host.name}:${currentEnv().host.port}/v1/` + endpoint)).send(body);
  }

  private setCookieIfExist(request: request.SuperAgentRequest) {
    if (this.cookie) {
      request.set('Cookie', this.cookie);
    }

    return request;
  }
}
