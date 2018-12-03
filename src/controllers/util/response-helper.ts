export class ResponseHelper {
  public static keepOnly(data, fields: string[]) {
    let response = {};

    for (const field of fields) {
      response[field] = data[field];
    }

    return response;
  }
}
