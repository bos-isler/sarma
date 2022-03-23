import { SarmaLexerMode, StepProps } from "./SarmaLexerMode";
import { TextLexerMode } from "./TextLexerMode";

export class EmoteLexerMode extends SarmaLexerMode {
  public step(props: StepProps): void {
    // if (props.character == " ") {
    //   props.pushCharacter(props.character);
    //   return props.changeMode(new TextLexerMode());
    // }

    if (props.character === ":") {
      props.parser.pushCharacter(props.character);
      props.parser.pushToken();
      return props.parser.changeMode(new TextLexerMode());
    }

    props.parser.pushCharacter(props.character);
  }
}
