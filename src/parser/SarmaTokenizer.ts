import { EmoteToken } from "../token/EmoteToken";
import { LinkToken } from "../token/LinkToken";
import { MentionToken } from "../token/MentionToken";
import { NewlineToken } from "../token/NewlineToken";
import { SarmaToken } from "../token/SarmaToken";
import { TagToken } from "../token/TagToken";
import { TextToken } from "../token/TextToken";
import { WhitespaceToken } from "../token/WhitespaceToken";

const EmoteRegex = /^:[\p{Letter}\p{Mark}0-9_-]+:$/gu;
const TagRegex = /^#[\p{Letter}\p{Mark}0-9]+$/gu;
const UrlRegex =
  /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;

export function tokenize(
  buffer: string,
  location: typeof SarmaToken.prototype.location
): SarmaToken {
  if (buffer === "\r\n" || buffer === "\n") {
    return new NewlineToken(buffer, location);
  }

  if (everyCharacter(buffer, WhitespaceToken.isWhitespace)) {
    return new WhitespaceToken(buffer, location);
  }

  if (buffer.match(EmoteRegex)) {
    return new EmoteToken(buffer, location);
  }

  if (buffer.match(UrlRegex)) {
    return new LinkToken(buffer, location);
  }

  if (buffer.match(TagRegex)) {
    return new TagToken(buffer, location);
  }

  if (buffer.startsWith("@")) {
    return new MentionToken(buffer, location);
  }

  return new TextToken(buffer, location);
}

function everyCharacter(text: string, predicate: Predicate<string>) {
  for (let i = 0; i < text.length; i++) {
    const character = text.charAt(i);
    if (!predicate(character)) return false;
  }
  return true;
}
