export class StringValidator {

  static isValid(text: string) : boolean {
    return text && text.trim().length > 0
  }
}
