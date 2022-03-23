import { SarmaToken } from "./SarmaToken";

export class EmoteToken extends SarmaToken {
  public getType(): string {
    return "Emote";
  }
  
  public toString(): string {
    return `:${this.rawText}:`;
  }
}
