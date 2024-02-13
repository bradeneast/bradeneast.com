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
      if (post.tags.includes(tag)) return post;
  })
}

export function truncate(str = "", count) {
  return str.substring(0, count);
}

export function round(num) {
  return Math.round(parseInt(num));
}

export function idify(text: string) {
  return text.replace(/[0-9]+/g, "").replace(/\s|[^A-z0-9]/g, "_");
}