import {GET, Path} from "typescript-rest";
import {Produces, Response} from "typescript-rest-swagger";
import {BaseController} from "./base-controller";
import {Answer} from "../util/answer";
import {Connection} from "../config/connection";
import {ENVIRONMENT} from "../nodeServer";

@Path("/v1/info")
@Produces("text/json")
export class InfoController extends BaseController {

  @Response<{ status: string, data: string }>(200, "Returns OK if everything is fine")
  @GET
  @Path("/health")
  async health(): Promise<Answer> {
    return InfoController.getHealthMessage();
  }

  @Response<{ status: string, data: string }>(200, "Returns interest data")
  @GET
  async info(): Promise<Answer> {
    return Answer.ok({version: process.env.npm_package_version, 'environment': ENVIRONMENT, health: (await InfoController.getHealthMessage()).data});
  }

  static async getHealthMessage() {
    const connected = await Connection.connected();
    if (connected) {
      return Answer.ok({'message': 'Relax, everything is OK :)', 'status': true});
    } else {
      return Answer.ok({'message': 'Relax, everything is OK :)', 'status': false});
    }
  }
}
