export const promptRules = [
  {
    name: 'Clear task',
    hint: 'Use an action such as explain, write, compare, create, or summarize.',
    test: (value: string) =>
      /\b(explain|write|compare|create|summari[sz]e|list|describe|design|teach|generate)\b/i.test(
        value,
      ),
  },
  {
    name: 'Useful context',
    hint: 'Name an audience or purpose using for, audience, beginner, or student.',
    test: (value: string) => /\b(for|audience|beginner|student|because|context)\b/i.test(value),
  },
  {
    name: 'Output format',
    hint: 'Specify a list, table, bullets, steps, paragraph, or word limit.',
    test: (value: string) => /\b(list|table|bullets?|steps?|paragraphs?|\d+ words)\b/i.test(value),
  },
  {
    name: 'Verification',
    hint: 'Ask for sources, evidence, uncertainty, or fact checking.',
    test: (value: string) =>
      /\b(sources?|evidence|uncertainty|verify|fact.check|citations?)\b/i.test(value),
  },
]
export function evaluatePrompt(value: string) {
  return promptRules.map((rule) => ({ name: rule.name, hint: rule.hint, passed: rule.test(value) }))
}
