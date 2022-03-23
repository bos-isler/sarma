import { SarmaLexerMode, StepProps } from "./SarmaLexerMode";
import { TextLexerMode } from "./TextLexerMode";

export class BoldLexerMode extends SarmaLexerMode {
  private _escaped: boolean = false;

  public escaped() {
    this._escaped = true;
    return this;
  }

  public step(props: StepProps): void {
    if (props.character === "*" && props.nextCharacter === "*") {
      props.parser.pushCharacter("**");
      if (!this._escaped) props.parser.pushToken();
      return props.parser.changeMode(new TextLexerMode());
    }

    props.parser.pushCharacter(props.character);
  }
}
