export abstract class SarmaToken {
  constructor(
    public rawText: string,
    public location: [number, number] /* Both Inclusive */
  ) {}

  public setLocation(begin: number, end: number) {
    this.location = [begin, end];
    return this;
  }

  public trimEscapers() {
    let trimmed = this.rawText;
    trimmed = this.rawText.replaceAll(/\\\*/g, "*"); // Remove Bold and Italic escapers
    return trimmed;
  }

  public abstract getType(): string;
  public abstract toString(): string;
}
