import { SarmaToken } from "./SarmaToken";

export class TextToken extends SarmaToken {
  public getType(): string {
    return "Text";
  }

  public toString(): string {
    return this.rawText;
  }
}
