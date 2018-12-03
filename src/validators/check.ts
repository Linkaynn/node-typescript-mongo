import {Answer} from "../util/answer";

export class Check {
  valid: boolean = false;
  answer: Answer;

  setAnswer(answer: Answer) {
    this.answer = answer;
    return this;
  }

  setValidity(validity: boolean) {
    this.valid = validity;
    return this;
  }
}
