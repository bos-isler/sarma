import { SarmaToken } from "./SarmaToken";

export class MentionToken extends SarmaToken {
  public getType(): string {
    return "Mention";
  }

  public toString(): string {
    return `@${this.rawText}`;
  }
}
