export type AccentWord = {
  text: string;
  accent: boolean;
  /** Whether whitespace preceded this word in the source string. */
  space: boolean;
};

/**
 * Splits copy into words, marking `*starred*` runs as accented.
 * Punctuation that touches an accented run ("*HirePlume*,") stays attached.
 */
export function parseAccent(text: string): AccentWord[] {
  const words: AccentWord[] = [];
  let pendingSpace = false;
  for (const part of text.split(/(\*[^*]+\*)/g)) {
    if (!part) continue;
    const accent = part.length > 2 && part.startsWith("*") && part.endsWith("*");
    const body = accent ? part.slice(1, -1) : part;
    for (const token of body.split(/(\s+)/)) {
      if (!token) continue;
      if (/^\s+$/.test(token)) {
        pendingSpace = true;
        continue;
      }
      words.push({ text: token, accent, space: words.length > 0 && pendingSpace });
      pendingSpace = false;
    }
  }
  return words;
}

export function plainText(text: string) {
  return text.replaceAll("*", "");
}
