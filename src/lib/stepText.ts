/**
 * Splits instruction text into blocks: paragraphs, and fenced code blocks that stay in one piece (even when
 * the code has blank lines in it). A fenced block is returned whole, starting with ``` and ending with ```.
 */
export function toBlocks(markdown: string): string[] {
  const blocks: string[] = [];
  let paragraph: string[] = [];
  let fence: string[] | null = null;

  const flushParagraph = () => {
    const text = paragraph.join(" ").replace(/\s+/g, " ").trim();
    if (text) blocks.push(text);
    paragraph = [];
  };

  for (const line of markdown.replace(/\r\n/g, "\n").split("\n")) {
    if (fence) {
      fence.push(line);
      if (/^\s*```\s*$/.test(line)) {
        blocks.push(fence.join("\n"));
        fence = null;
      }
    } else if (/^\s*```/.test(line)) {
      flushParagraph();
      fence = [line.trim()];
    } else if (line.trim() === "") {
      flushParagraph();
    } else {
      paragraph.push(line.trim());
    }
  }
  flushParagraph();
  if (fence) blocks.push([...fence, "```"].join("\n")); // an unclosed fence still renders
  return blocks;
}

/** A block that was written as a fenced code block. */
export const isCodeBlock = (block: string) => block.startsWith("```");

/** Reads a fenced block back into its language and code. The last blank line before the closing fence is kept out. */
export function readCodeBlock(block: string): { language: string; code: string } {
  const lines = block.split("\n");
  const language = lines[0].replace(/^```/, "").trim() || "text";
  const body = lines.slice(1, lines[lines.length - 1].trim() === "```" ? -1 : undefined);
  while (body.length > 0 && body[body.length - 1].trim() === "") body.pop();
  return { language, code: body.join("\n") };
}
