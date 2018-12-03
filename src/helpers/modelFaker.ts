import * as faker from 'faker/locale/es';
import {CrudHelper} from "../controllers/util/crud-helper";
import {User, UserCRUD} from "../models/user";
import {hashSync} from "bcrypt-nodejs";
import {Log} from "../util/log";

export class ModelFaker {
  static readonly DEFAULT_USER_PASSWORD = "12345678";

  static async newUser(name? : string, username?: string, email?: string) {

    const userHelper = new CrudHelper(UserCRUD);

    const user = new User();
    user.name = name || faker.name.firstName();
    user.username = username || faker.internet.userName();
    user.email = email || faker.internet.email();
    user.password = hashSync(this.DEFAULT_USER_PASSWORD);

    try {
      await userHelper.insert(user);
      return await userHelper.findOne({username: user.username})
    } catch (e) {
      if (!(e.error && e.error.code && e.error.code == 11000)) {
        Log.error(e);
      } else {
        return await userHelper.findOne({username: user.username})
      }
    }
  }

  private static randomInt(max: number, min: number) {
    return Math.floor((Math.random() * max) + min);
  }
}
