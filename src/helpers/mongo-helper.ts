export class MongoHelper {
  static startWith(needle: string) {
    return {$regex: new RegExp("^" + needle), $options: "i"};
  }

  static contains(needle: string) {
    return {$regex: needle, $options: "i"};
  }
}
