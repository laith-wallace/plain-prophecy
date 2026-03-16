/**
 * Minimal markdown-to-HTML converter for admin content preview.
 * Handles headings, bold, italic, inline code, code blocks, blockquotes,
 * horizontal rules, unordered/ordered lists, and paragraphs.
 * Output is used with dangerouslySetInnerHTML in a trusted admin context.
 */
export function markdownToHtml(md: string): string {
  const lines = md.split("\n");
  const output: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Fenced code block
    if (line.startsWith("```")) {
      const inner: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        inner.push(escape(lines[i]));
        i++;
      }
      output.push(`<pre class="bg-stone-800 rounded-lg p-3 overflow-x-auto text-sm font-mono"><code>${inner.join("\n")}</code></pre>`);
      i++;
      continue;
    }

    // Blockquote
    if (line.startsWith("> ")) {
      output.push(`<blockquote class="border-l-2 border-stone-600 pl-4 text-stone-400 italic">${inline(line.slice(2))}</blockquote>`);
      i++;
      continue;
    }

    // Horizontal rule
    if (/^[-*_]{3,}$/.test(line.trim())) {
      output.push(`<hr class="border-stone-700 my-4" />`);
      i++;
      continue;
    }

    // Headings
    const h = line.match(/^(#{1,6})\s+(.+)/);
    if (h) {
      const level = h[1].length;
      const sizes = ["", "text-2xl font-bold", "text-xl font-bold", "text-lg font-semibold", "text-base font-semibold", "text-sm font-semibold", "text-xs font-semibold"];
      output.push(`<h${level} class="${sizes[level]} text-stone-100 mt-4 mb-1">${inline(h[2])}</h${level}>`);
      i++;
      continue;
    }

    // Unordered list
    if (line.match(/^[-*+]\s/)) {
      const items: string[] = [];
      while (i < lines.length && lines[i].match(/^[-*+]\s/)) {
        items.push(`<li class="ml-4 list-disc text-stone-300">${inline(lines[i].slice(2))}</li>`);
        i++;
      }
      output.push(`<ul class="space-y-1 my-2">${items.join("")}</ul>`);
      continue;
    }

    // Ordered list
    if (line.match(/^\d+\.\s/)) {
      const items: string[] = [];
      while (i < lines.length && lines[i].match(/^\d+\.\s/)) {
        items.push(`<li class="ml-4 list-decimal text-stone-300">${inline(lines[i].replace(/^\d+\.\s/, ""))}</li>`);
        i++;
      }
      output.push(`<ol class="space-y-1 my-2">${items.join("")}</ol>`);
      continue;
    }

    // Blank line — skip
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Paragraph
    const para: string[] = [];
    while (i < lines.length && lines[i].trim() !== "" && !lines[i].startsWith("#") && !lines[i].startsWith(">") && !lines[i].startsWith("```") && !lines[i].match(/^[-*+]\s/) && !lines[i].match(/^\d+\.\s/) && !/^[-*_]{3,}$/.test(lines[i].trim())) {
      para.push(inline(lines[i]));
      i++;
    }
    if (para.length) {
      output.push(`<p class="text-stone-300 leading-relaxed">${para.join("<br />")}</p>`);
    }
  }

  return output.join("\n");
}

function escape(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function inline(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    // Bold + italic
    .replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>")
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-stone-100">$1</strong>')
    .replace(/__(.+?)__/g, '<strong class="font-semibold text-stone-100">$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/_(.+?)_/g, "<em>$1</em>")
    // Inline code
    .replace(/`(.+?)`/g, '<code class="bg-stone-800 px-1 rounded text-sm font-mono text-amber-300">$1</code>');
}
