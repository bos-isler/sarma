import { SarmaParser } from "../parser/SarmaParser";
import { SarmaToken } from "../token/SarmaToken";

export interface StepProps {
  character: string;
  prevCharacter: string;
  nextCharacter: string;
  parser: SarmaParser;
}

export abstract class SarmaLexerMode {
  public abstract step(props: StepProps): void;
}
