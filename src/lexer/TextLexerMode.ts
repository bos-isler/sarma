import { SarmaLexerMode, StepProps } from "./SarmaLexerMode";
import { EmoteLexerMode } from "./EmoteLexerMode";
import { WhitespaceToken } from "../token/WhitespaceToken";
import { WhitespaceLexerMode } from "./WhitespaceLexerMode";
import { MentionLexerMode } from "./MentionLexerMode";
import { TagLexerMode } from "./TagLexerMode";
import { BoldLexerMode } from "./BoldLexerMode";
import { ItalicLexerMode } from "./ItalicLexerMode";

export class TextLexerMode extends SarmaLexerMode {
  public step(props: StepProps): void {
    if (props.character === "\r" && props.nextCharacter === "\n") {
      props.parser.moveCursor(-1);
      props.parser.pushToken();
      props.parser.moveCursor(1);
      props.parser.pushCharacter("\r\n");
      return props.parser.pushToken();
    }

    if (props.character === "\n") {
      props.parser.moveCursor(-1);
      props.parser.pushToken();
      props.parser.moveCursor(1);
      props.parser.pushCharacter("\n");
      return props.parser.pushToken();
    }

    if (WhitespaceToken.isWhitespace(props.character)) {
      props.parser.moveCursor(-1);
      props.parser.pushToken();
      props.parser.moveCursor(1);
      props.parser.pushCharacter(props.character);
      return props.parser.changeMode(new WhitespaceLexerMode());
    }

    if (props.character === "#") {
      props.parser.moveCursor(-1);
      props.parser.pushToken();
      props.parser.moveCursor(1);
      props.parser.pushCharacter(props.character);
      return props.parser.changeMode(new TagLexerMode());
    }

    if (props.character === "@") {
      props.parser.moveCursor(-1);
      props.parser.pushToken();
      props.parser.moveCursor(1);
      props.parser.pushCharacter(props.character);
      return props.parser.changeMode(new MentionLexerMode());
    }

    if (props.character === ":" && props.nextCharacter !== "/") {
      props.parser.moveCursor(-1);
      props.parser.pushToken();
      props.parser.moveCursor(1);
      props.parser.pushCharacter(props.character);
      return props.parser.changeMode(new EmoteLexerMode());
    }

    if (props.parser.options.parseEmphasis) {
      if (props.character === "*") {
        const mode =
          props.nextCharacter === "*"
            ? new BoldLexerMode()
            : new ItalicLexerMode();
            
        if (props.prevCharacter === "\\") {
          mode.escaped();
        } else {
          props.parser.moveCursor(-1);
          props.parser.pushToken();
          props.parser.moveCursor(1);
        }
        props.parser.pushCharacter(props.character);
        return props.parser.changeMode(mode);
      }
    }

    props.parser.pushCharacter(props.character);
  }
}
