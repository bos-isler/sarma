import { SarmaLexerMode, StepProps } from "./SarmaLexerMode";
import { TextLexerMode } from "./TextLexerMode";

const TagCharRegex = /[\p{Letter}\p{Mark}0-9_-]/gu;

export class TagLexerMode extends SarmaLexerMode {
  public step(props: StepProps): void {
    if (!props.character.match(TagCharRegex)) {
      props.parser.moveCursor(-1);
      props.parser.pushToken();
      props.parser.moveCursor(1);
      props.parser.pushCharacter(props.character);
      return props.parser.changeMode(new TextLexerMode());
    }

    props.parser.pushCharacter(props.character);
  }
}
