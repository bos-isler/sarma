export abstract class SarmaToken {
  constructor(
    public rawText: string,
    public location: [number, number] /* Both Inclusive */
  ) {}

  public setLocation(begin: number, end: number) {
    this.location = [begin, end];
    return this;
  }

  public abstract getType(): string;
  public abstract toString(): string;
}
