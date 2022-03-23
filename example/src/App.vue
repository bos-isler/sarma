<template>
  <h1>Sarma Testing Grounds</h1>
  <div class="container">
    <div class="col">
      <label for="textInput">Raw Text:</label>
      <textarea
        name="sarma"
        id="textInput"
        class="sarma-input"
        placeholder="Hello! Welcome to Sarma Testing Grounds! :waving_hand:"
        v-model="rawText"
      ></textarea>
    </div>
    <div class="col">
      <label for="textInput">Sarma Tokens:</label>
      <div>
        <vue-json-pretty
          :path="'sarma'"
          :showLength="true"
          :showLine="true"
          :data="sarmaTokens"
        ></vue-json-pretty>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import VueJsonPretty from "vue-json-pretty";
import { SarmaParser } from "sarma";
import "vue-json-pretty/lib/styles.css";

const rawText = ref<string>("");
const sarmaTokens = ref();

function shrink(text:string) {
  return text.substring(1, text.length - 1);
}

watch(
  () => rawText.value,
  () => {
    localStorage.setItem("sarmaText", rawText.value);
    const parser = new SarmaParser({
      text: rawText.value,
      parseInto: "chunks",
      parseWhitespaces: false
    });
    const tokens = parser.parse();
    console.log({ tokens });
    sarmaTokens.value = tokens.map(token => ({
      type: token.getType(),
      rawText: shrink(JSON.stringify(token.rawText)),
      location: token.location.join(", ")
    }));
  }
);

onMounted(() => {
  rawText.value = localStorage.getItem("sarmaText") || "Hey there!";
})
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");

* {
  box-sizing: border-box;
}

html,
body {
  padding: 0;
  margin: 0;
}

body {
  background: #1d1c25;
  color: #fff;
  font-size: 16px;
  font-family: "Poppins", sans-serif;
  #app {
    width: 100%;
    height: 100%;
  }
}

input,
textarea,
button {
  font-family: "Poppins", sans-serif;
}

span {
  white-space: break-spaces;
}

textarea {
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid hsla(0, 0%, 0%, 0.08);
  background-color: #262431;
  min-height: 300px;
  resize: vertical;
  color: #ececec;
  transition: all 250ms ease;
  &:hover {
    border: 1px solid hsla(0, 0%, 0%, 0.15);
  }
  &:focus,
  &:active {
    outline: none;
    border: 1px solid hsla(270, 41%, 53%, 1);
  }
  &::placeholder {
    color: hsla(0, 0%, 71%, 1);
  }
}

h1 {
  padding: 0;
  margin: 20px 0 20px 0;
  text-align: center;
}

.container {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  margin: 40px auto 20px;
  width: 60%;
  height: 100%;
  .col {
    flex: 1 0;
    display: flex;
    flex-direction: column;
  }
}

.vjs-tree__node.is-highlight, .vjs-tree__node:hover {
    background-color: rgba(#000, .4);
}
</style>
