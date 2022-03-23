import { SarmaToken } from "./SarmaToken";

export class BoldTextToken extends SarmaToken {
  public getType(): string {
    return "Bold Text";
  }

  public toString(): string {
    return this.rawText;
  }
}
