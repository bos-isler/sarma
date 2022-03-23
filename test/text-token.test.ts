import { SarmaParser } from "../src";

test("", () => {
  const parser = new SarmaParser({
    text: `Hello! I am iGoodie   :KekW: but \r\n  :Not KekW:\nsomeCode::function()`,
    parseInto: "words",
    parseWhitespaces: true,
  });
  const tokens = parser.parse();
  console.log(tokens);
});
