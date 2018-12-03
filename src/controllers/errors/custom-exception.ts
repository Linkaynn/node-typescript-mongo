export class CustomException {
  errorCode: string;
  error: any;


  constructor(errorCode: string, error?) {
    this.errorCode = errorCode;
    this.error = error;
  }
}
