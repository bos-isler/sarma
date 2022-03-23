import { SarmaLexerMode, StepProps } from "./SarmaLexerMode";
import { TextLexerMode } from "./TextLexerMode";

const MentionCharRegex = /[\p{Letter}\p{Mark}0-9_]/gu;

export class MentionLexerMode extends SarmaLexerMode {
  public step(props: StepProps): void {
    if (!props.character.match(MentionCharRegex)) {
      props.parser.moveCursor(-1);
      props.parser.pushToken();
      props.parser.moveCursor(1);
      props.parser.pushCharacter(props.character);
      return props.parser.changeMode(new TextLexerMode());
    }

    props.parser.pushCharacter(props.character);
  }
}
