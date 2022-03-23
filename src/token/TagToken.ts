import { SarmaToken } from "./SarmaToken";

export class TagToken extends SarmaToken {
  public getType(): string {
    return "Tag";
  }

  public toString(): string {
    return `#${this.rawText}`;
  }
}
