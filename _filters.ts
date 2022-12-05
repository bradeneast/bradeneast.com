export function splitting(text: string) {

  let lines = text.split(/\n|\r/);
  let charCount = 0;

  function charTemplate(char: string, i: number) {
    charCount++;
    return `<span class="char" style="--char-index:${charCount}">${char}</span>`;
  }

  function wordTemplate(word: string, i: number) {
    return `<span class="word" style="--word-index:${i}">${word.split("").map(charTemplate).join("")}</span>`;
  }

  function lineTemplate(line: string, i: number) {
    return line.split(" ").map(wordTemplate).join(`<span class="whitespace"> </span>`);
  }

  return lines.map(lineTemplate).join("\n");
}

export function getRelatedPosts(postsList, tags) {
  return postsList.filter(post => {
    for (let tag of tags)
      if (post.data.tags.includes(tag)) return post;
  })
}