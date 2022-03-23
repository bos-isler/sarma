import { SarmaToken } from "./SarmaToken";

export class NewlineToken extends SarmaToken {
  public getType(): string {
    return "New Line";
  }

  public toString(): string {
    return this.rawText;
  }
}
