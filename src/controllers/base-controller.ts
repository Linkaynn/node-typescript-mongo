import {Context, ServiceContext} from "typescript-rest";
import {UserCRUD} from "../models/user";
import {CustomException} from "./errors/custom-exception";
import {SimpleUser} from "./datas/user/simple-user";

export class BaseController {

  @Context
  context: ServiceContext;

  currentUser(): SimpleUser {
    return this.context && this.context.request.session.user;
  }

  currentUserDocument() {
    return UserCRUD.findOne({_id: this.currentUser()._id});
  }

  logged() {
    return this.context && !!this.context.request.session.user;
  }

  checkLogin() {
    if (!this.logged()) {
      throw new CustomException('user/user-not-logged-in');
    }
  }

}
