// Extracts a FAQPage schema object from a guide's raw MDX body by parsing its
// "Frequently asked questions" section. Guides follow a consistent house style --
// each Q&A is its own paragraph: **Question text?** Answer text, possibly with
// [markdown links](/like-this/) or **bold** emphasis inside the answer.
// Centralising this in one parser means every guide gets FAQPage schema
// automatically as long as it follows the house FAQ format, with no per-page
// schema to hand-author or keep in sync with the prose.

function stripMarkdown(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // [text](url) -> text
    .replace(/\*\*([^*]+)\*\*/g, '$1')       // **bold** -> bold
    .replace(/\s+/g, ' ')
    .trim();
}

export function extractFaqSchema(body: string | undefined, url: string): object | null {
  if (!body) return null;

  const faqHeadingMatch = body.match(/^##\s+.*(?:frequently asked questions|common questions).*$/im);
  if (!faqHeadingMatch || faqHeadingMatch.index === undefined) return null;

  const afterHeading = body.slice(faqHeadingMatch.index + faqHeadingMatch[0].length);
  const nextHeadingMatch = afterHeading.match(/^##\s+/m);
  const faqSection = nextHeadingMatch && nextHeadingMatch.index !== undefined
    ? afterHeading.slice(0, nextHeadingMatch.index)
    : afterHeading;

  const paragraphs = faqSection.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

  const qaPairs: { question: string; answer: string }[] = [];
  for (const para of paragraphs) {
    const match = para.match(/^\*\*(.+?)\*\*\s*(.+)$/s);
    if (!match) continue;
    const question = stripMarkdown(match[1]);
    const answer = stripMarkdown(match[2]);
    if (question && answer) qaPairs.push({ question, answer });
  }

  if (qaPairs.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: qaPairs.map((qa) => ({
      '@type': 'Question',
      name: qa.question,
      acceptedAnswer: { '@type': 'Answer', text: qa.answer },
    })),
    ...(url ? { url } : {}),
  };
}
