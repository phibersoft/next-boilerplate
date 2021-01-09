export default class PhiberError extends Error {
  hint: string;
  original: any;
  code: number | string;
  constructor(
    message: string,
    code?: number | string,
    hint?: string,
    original?: any
  ) {
    super(message);
    this.hint = hint;
    this.original = original;
    this.code = code;
  }

  static converter(err: any) {
    var msg = err.message;
    if (err.code) {
      switch (err.code) {
        default:
          msg = err.message;
          break;
      }
    } else {
      switch (err.message) {
        case "invalid signature":
          msg = `İmza geçersiz. Oturumu yenile.`;
          break;

        default:
          msg = err.message;
          break;
      }
    }

    return {
      message: msg,
      hint: msg,
    };
  }
}
