import type { Technology, TechnologyCategory } from '../models/Technology'
const groups: [TechnologyCategory, [string, string, string[]][]][] = [
  [
    'Languages',
    [
      ['HTML5', 'html', []],
      ['CSS3', 'css', []],
      ['JavaScript', 'javascript', ['bayanihan-link']],
      ['TypeScript', 'typescript', ['rodelconnect']],
      ['Dart', 'dart', ['carmelink', 'promptwise', 'autosched-ai', 'map-explorer']],
      ['PHP', 'php', []],
      ['Python', 'python', []],
      ['Java', 'java', []],
    ],
  ],
  [
    'Frameworks & platforms',
    [
      ['React.js', 'react', ['bayanihan-link', 'rodelconnect']],
      ['Flutter', 'flutter', ['carmelink', 'promptwise', 'autosched-ai', 'map-explorer']],
      ['Bootstrap', 'bootstrap', []],
      ['Tailwind CSS', 'tailwind', []],
      ['Vite', 'vite', ['bayanihan-link', 'rodelconnect']],
      ['Next.js', 'next', []],
      ['Laravel', 'laravel', []],
      ['Node.js', 'node', []],
      ['Unity', 'unity', []],
    ],
  ],
  [
    'Backend & data',
    [
      ['Firebase', 'firebase', ['carmelink', 'autosched-ai', 'bayanihan-link']],
      ['Supabase', 'supabase', ['carmelink', 'promptwise', 'rodelconnect']],
      ['MySQL', 'mysql', []],
      ['PostgreSQL', 'postgres', ['carmelink', 'promptwise', 'rodelconnect']],
      ['REST API', 'api', []],
      ['Cloudinary', 'cloudinary', []],
    ],
  ],
  [
    'AI & ML',
    [
      ['Groq AI', 'groq', ['autosched-ai']],
      ['Gemini', 'gemini', []],
      ['Google ML Kit', 'mlkit', ['autosched-ai']],
    ],
  ],
  [
    'Tools & deployment',
    [
      ['Git', 'git', []],
      ['GitHub', 'github', []],
      ['Figma', 'figma', []],
      ['VS Code', 'vscode', []],
      ['Android Studio', 'android', []],
      ['XAMPP', 'xampp', []],
      ['Codemagic', 'codemagic', []],
      ['Vercel', 'vercel', []],
      ['OpenAI Codex', 'openai', []],
    ],
  ],
]
export const technologyCategories = groups.map(([category]) => category)
export const technologies: Technology[] = groups.flatMap(([category, items]) =>
  items.map(([name, icon, projects]) => ({
    name,
    icon,
    category,
    projects,
    description: `Part of my ${category.toLowerCase()} toolkit—used or explored. No specific project association is asserted without supplied evidence.`,
  })),
)
