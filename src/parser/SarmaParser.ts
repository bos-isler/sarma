import { SarmaLexerMode } from "../lexer/SarmaLexerMode";
import { TextLexerMode } from "../lexer/TextLexerMode";
import { SarmaToken } from "../token/SarmaToken";
import { TextToken } from "../token/TextToken";
import { WhitespaceToken } from "../token/WhitespaceToken";
import { tokenize } from "./SarmaTokenizer";

export interface SarmaParserOptions {
  text: string;
  parseInto?: "words" | "chunks";
  parseWhitespaces?: boolean;
}

export class SarmaParser {
  private options: SarmaParserOptions;

  private currentIndex: number;

  private lexerMode: SarmaLexerMode;
  private parsedTokens: SarmaToken[];
  private tokenBuffer: string;
  private tokenIndex: number;

  constructor(options: SarmaParserOptions) {
    this.lexerMode = new TextLexerMode();
    this.parsedTokens = [];
    this.tokenBuffer = "";
    this.tokenIndex = 0;
    this.currentIndex = 0;
    this.options = {
      ...options,
      parseInto: options.parseInto || "chunks",
      parseWhitespaces: options.parseWhitespaces || false,
    };
  }

  public pushCharacter(character: string) {
    this.tokenBuffer += character;
    if (character.length > 1) {
      this.moveCursor(character.length - 1);
    }
  }

  public pushToken() {
    if (this.tokenBuffer === "") return;
    const token = tokenize(this.tokenBuffer, [
      this.tokenIndex,
      this.currentIndex,
    ]);
    this.parsedTokens.push(token);
    this.tokenBuffer = "";
    this.tokenIndex = this.currentIndex + 1;
  }

  public moveCursor(incr: number) {
    this.currentIndex += incr;
  }

  public changeMode(mode: SarmaLexerMode) {
    this.lexerMode = mode;
  }

  private getCharacter(index: number) {
    if (index < 0) return "";
    if (index >= this.options.text.length) return "";
    return this.options.text.charAt(index);
  }

  public parse(): SarmaToken[] {
    for (; this.currentIndex < this.options.text.length; this.moveCursor(1)) {
      const character = this.getCharacter(this.currentIndex);
      const prevCharacter = this.getCharacter(this.currentIndex - 1);
      const nextCharacter = this.getCharacter(this.currentIndex + 1);

      this.lexerMode.step({
        character,
        prevCharacter,
        nextCharacter,
        parser: this,
      });
    }

    this.currentIndex = this.options.text.length - 1; // Move cursor back to the last character
    this.pushToken(); // Push remaining

    const tokens =
      this.options.parseInto === "words"
        ? this.parsedTokens
        : this.compact(this.parsedTokens);

    return this.options.parseWhitespaces
      ? tokens
      : tokens.filter((t) => !(t instanceof WhitespaceToken));
  }

  private compact(tokens: SarmaToken[]): SarmaToken[] {
    return tokens.reduce((accumulated, cur) => {
      if (accumulated.length == 0) {
        accumulated.push(cur);
        return accumulated;
      }

      const lastIndex = accumulated.length - 1;
      const lastToken = accumulated[lastIndex];

      if (this.canMergeTokens(lastToken, cur)) {
        accumulated[lastIndex] = this.mergeTokens(lastToken, cur);
        return accumulated;
      }

      accumulated.push(cur);
      return accumulated;
    }, [] as SarmaToken[]);
  }

  private canMergeTokens(a: SarmaToken, b: SarmaToken) {
    if (!this.options.parseWhitespaces) {
      if (
        (a instanceof WhitespaceToken && b instanceof WhitespaceToken) ||
        (a instanceof WhitespaceToken && b instanceof TextToken) ||
        (a instanceof TextToken && b instanceof WhitespaceToken)
      ) {
        return true;
      }
    }
    return a instanceof TextToken && b instanceof TextToken;
  }

  private mergeTokens(a: SarmaToken, b: SarmaToken) {
    return tokenize(a.rawText + b.rawText, [a.location[0], b.location[1]]);
  }
}
