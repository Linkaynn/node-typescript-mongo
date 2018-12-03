import {prop, Typegoose} from "typegoose";
import {ObjectID} from "bson";
import {SimpleUser} from "../controllers/datas/user/simple-user";

export class User extends Typegoose {
  _id?: string | ObjectID;

  @prop({required: true, unique: true, match: /\S+@\S+\.\S+/})
  email: string;

  @prop({required: true, unique: true})
  username: string;

  @prop({required: true})
  name: string;

  @prop()
  password?: string;

  @prop({default: Date.now})
  createdDate: Date;

  @prop({default: Date.now})
  updatedDate: Date;

  public static getSimpleModel(user: User) : SimpleUser {
    return {
      "_id": user._id.toString(),
      email: user.email,
      name: user.name,
      username: user.username
    } as SimpleUser;
  }

}

export const UserCRUD = new User().getModelForClass(User);
