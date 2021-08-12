export function splitting(text) {

  let lines = text.split(/\n|\r/);
  let charCount = 0;

  function charTemplate(char, i) {
    charCount++;
    return `<span class="char" style="--char-index:${charCount}">${char}</span>`;
  }

  function wordTemplate(word, i) {
    return `<span class="word" style="--word-index:${i}">${word.split("").map(charTemplate).join("")}</span>`;
  }

  function lineTemplate(line, i) {
    return line.split(" ").map(wordTemplate).join(`<span class="whitespace"> </span>`);
  }

  return lines.map(lineTemplate).join("\n");
}