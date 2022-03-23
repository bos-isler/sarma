import { SarmaToken } from "./SarmaToken";

export class LinkToken extends SarmaToken {
  public getType(): string {
    return "Link";
  }

  public toString(): string {
    return this.rawText;
  }
}
