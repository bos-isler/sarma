<p align="center">
  <a href="https://jitpack.io/#TheSpawnProject/TheSpawnLanguage">
    <img src="https://raw.githubusercontent.com/bos-isler/sarma/master/.github/assets/logo.svg" height="150" alt="Sarma Logo" aria-label="Sarma Logo" />
  </a>
</p>

<p align="center">
  A lightweight parser to parse chat message tokens written in pure Typescript
</p>

# How To Use?

Just pass in a text from a user input, and it will parse a token array for you :)

```ts
import { SarmaParser, SarmaParserOptions } from "sarma";

const text = "Hey there @CoconutOrange, me and @Diaval will be **checking** a movie #movie-night! Will you be joining? :eyes:";

const options: SarmaParserOptions = {
  text,
  parseEmphasis: true,
};

const parser = new SarmaParser(options);

const tokens = parser.parse();
```

Which returns an array like:

```json
tokens = [
  TextToken({
    "rawText": "Hey there ",
    "location": [0, 9]
  }),
  MentionToken({
    "rawText": "@CoconutOrange",
    "location": [10, 23]
  }),
  TextToken({
    "rawText": ", me and ",
    "location": [24, 32]
  }),
  MentionToken({
    "rawText": "@Diaval",
    "location": [33, 39]
  }),
  TextToken({
    "rawText":" will be ",
    "location":[40, 48]
  }),
  BoldTextToken({
    "rawText":"**checking**",
    "location":[49, 60]
  }),
  TextToken({
    "rawText":" a movie ",
    "location":[61, 69]
  }),
  TagToken({
    "rawText":"#movie-night",
    "location":[70, 81]
  }),
  TextToken({
    "rawText":"! Will you be joining? ",
    "location":[82, 104]
  }),
  EmoteToken({
    "rawText":":eyes:",
    "location":[105, 110]
  })
]
```

# Available Options

Sarma comes with a few handy options to alter parsing result:

| Option Name      |              Type              | Default Value |                                                            Description |
| ---------------- | :----------------------------: | ------------- | ---------------------------------------------------------------------: |
| text             |       string - required        |               |                                          Text to be parsed into tokens |
| parseInto        | "words" or "chunks" - optional | "chunks"      | Should it parse into words, or merge into bigger chunks where possible |
| parseWhitespaces |       boolean - optional       | false         |                           Should it parse whitespaces as tokens or not |
| parseEmphasis    |       boolean - optional       | false         |     Should it parse emphasis tokens such as bold (\*\*) or italic (\*) |
