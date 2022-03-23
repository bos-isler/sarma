import { SarmaToken } from "./SarmaToken";

export class ItalicTextToken extends SarmaToken {
  public getType(): string {
    return "Italic Text";
  }

  public toString(): string {
    return this.rawText;
  }
}
