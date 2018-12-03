import {Connection} from "../../src/config/connection";
import {UserCRUD} from "../../src/models/user";
import * as chai from "chai";

export function expect(answer: any, expectedValue: boolean) {
  if (isOk(answer) != expectedValue) {
    console.log(answer.body)
  }

  chai.expect(isOk(answer)).to.be.equals(expectedValue);
}

export function isOk(answer) {
  return answer.body.status == "ok";
}

export function isError(answer) {
  return answer.body.status == "error";
}

export function errorCode(answer) {
  return answer.body.errorCode;
}

export async function initDB() {
  await Connection.initAndConnect();
}

export async function dropUsers() {
  await UserCRUD.deleteMany({});
}

export async function dropAll() {
  await dropUsers();
}

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function data(answer) : any {
  return answer.body.data;
}
