import {GET, Path, POST, PUT} from "typescript-rest";
import {Answer} from "../util/answer";
import {Produces, Response} from "typescript-rest-swagger";
import {User} from "../models/user";
import {CrudHelper} from "./util/crud-helper";
import {SignUpData} from "./datas/user/sign-up-data";
import {compareSync, hashSync} from "bcrypt-nodejs";
import {LoginData} from "./datas/user/login-data";
import {Log} from "../util/log";
import {BaseController} from "./base-controller";
import {SimpleUser} from "./datas/user/simple-user";

const UserCRUD = new User().getModelForClass(User);

@Path("/v1/auth")
@Produces("text/json")
export class AuthController extends BaseController {

  @PUT
  @Response<{ status: string, data: User }>(200, "User created")
  @Path("/register")
  async newUser(_userData: SignUpData): Promise<Answer> {
    if (_userData.password !== _userData.repeatPassword) return Answer.error("auth/password-not-coincide", _userData, "Passwords do not coincide");

    try {
      const helper = new CrudHelper(UserCRUD);

      delete _userData.repeatPassword;

      _userData.password = hashSync(_userData.password);

      const user = await helper.insertOrUpdate(_userData);

      return Answer.ok(user);
    } catch (e) {
      return Answer.error("db/database-error", _userData, e);
    }
  }

  @POST
  @Response<{ status: string, data: SimpleUser }>(200, "Login success")
  @Path("/login")
  async login(_loginData: LoginData): Promise<Answer> {
    Log.info(`Trying to login with username: ${_loginData.username}`);

    const error = (e?) => {
      return Answer.error("auth/bad-authentication", _loginData, e);
    };

    try {
      return await UserCRUD.findOne({username: _loginData.username}).then((user: User) => {
        if (user) {
          if (compareSync(_loginData.password, user.password)) {
            this.context.request.session.user = User.getSimpleModel(user);

            return Answer.ok(User.getSimpleModel(user));
          } else {
            return error();
          }
        } else {
          return error();
        }
      });
    } catch (e) {
      return error(e);
    }
  }

  @GET
  @Response<{ status: string, data: string }>(200, "Logout success")
  @Path("/logout")
  async logout(): Promise<Answer> {
    try {
      this.context.request.session.user = null;
      return Answer.ok("Logout OK");
    } catch (e) {
      return Answer.error(e);
    }
  }
}
