import { WhitespaceToken } from "../token/WhitespaceToken";
import { SarmaLexerMode, StepProps } from "./SarmaLexerMode";
import { TextLexerMode } from "./TextLexerMode";

export class WhitespaceLexerMode extends SarmaLexerMode {
  public step(props: StepProps): void {
    if (!WhitespaceToken.isWhitespace(props.character)) {
      props.parser.moveCursor(-1);
      props.parser.pushToken();
      return props.parser.changeMode(new TextLexerMode());
    }

    props.parser.pushCharacter(props.character);
  }
}
