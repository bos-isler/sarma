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
import { SarmaParser } from "sarma";

const text =
  "Hey there @CoconutOrange, me and @Diaval will be checking some movie under #movie-night! Will you be joining?";

const parser = new SarmaParser({ text });

const tokens = parser.parse();

/*
Returns:
[
 TextToken({ rawText: "Hey there ", location: [0, 9] }),
 MentionToken({ rawText: "@CoconutOrange", location: [10, 23] }),
 TextToken({ rawText: "! Me and ", location: [24, 32] }),
 MentionToken({ rawText: "@Diaval", location: [33, 39] }),
 TextToken({ rawText: " will be checking some movie under", location: [40, 74] }),
 TagToken({ rawText: "#movie-night", location: [75, 86] }),
 TextToken({ rawText: "! Will you be joining?", location: [87, 108] })
]
*/
```

# Available Options

Sarma comes with a few handy options to alter parsing result:

| Option Name      |              Type              | Default Value |                                                            Description |
| ---------------- | :----------------------------: | ------------- | ---------------------------------------------------------------------: |
| text             |       string - required        |               |                                          Text to be parsed into tokens |
| parseInto        | "words" or "chunks" - optional | "chunks"      | Should it parse into words, or merge into bigger chunks where possible |
| parseWhitespaces |       boolean - optional       | false         |                           Should it parse whitespaces as tokens or not |
