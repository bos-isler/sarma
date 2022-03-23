import { SarmaToken } from "./SarmaToken";

export class WhitespaceToken extends SarmaToken {
  public static isWhitespace(character: string) {
    return (
      character === " " ||
      character === "\t" ||
      character === "\f" ||
      character === "\v" ||
      character === "\u00a0" ||
      character === "\u1680" ||
      character === "\u2000" ||
      character === "\u200a" ||
      character === "\u2028" ||
      character === "\u2029" ||
      character === "\u202f" ||
      character === "\u205f" ||
      character === "\u3000" ||
      character === "\ufeff"
    );
  }

  public getType(): string {
    return "Whitespace";
  }

  public toString(): string {
    return this.rawText;
  }
}
