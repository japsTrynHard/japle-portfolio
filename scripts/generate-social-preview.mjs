import { writeFile } from 'node:fs/promises'
import sharp from 'sharp'
const portrait = (
  await sharp('public/images/profile/japle-professional.webp').png().toBuffer()
).toString('base64')
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<defs><pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".7" fill="#254f92" opacity=".15"/></pattern><clipPath id="portrait"><rect x="810" y="130" width="320" height="390" rx="160"/></clipPath></defs>
<rect width="1200" height="630" fill="#f8fafc"/><rect x="740" y="55" width="420" height="520" fill="url(#grid)"/>
<path d="M70 115H1130M70 550H1130" stroke="#0f172a20"/><text x="70" y="81" fill="#0f172a" font-family="Arial,sans-serif" font-weight="bold" font-size="34" letter-spacing="-1">japle<tspan fill="#2563eb">.dev</tspan></text><text x="820" y="79" fill="#475569" font-family="monospace" font-size="11" letter-spacing="2">REACT / FLUTTER / SUPABASE / FIREBASE</text>
<text x="70" y="181" fill="#254f92" font-family="monospace" font-size="13" letter-spacing="2">SOFTWARE DEVELOPMENT INTERN CANDIDATE</text>
<text x="65" y="285" fill="#0f172a" font-family="Arial,sans-serif" font-weight="600" font-size="110" letter-spacing="-4">Japle</text><text x="68" y="383" fill="#2563eb" font-family="Arial,sans-serif" font-weight="600" font-size="110" letter-spacing="-3">Ligaya.</text>
<text x="72" y="447" fill="#475569" font-family="Arial,sans-serif" font-size="20">Full-Stack &amp; Mobile Application Developer</text><text x="72" y="483" fill="#475569" font-family="Arial,sans-serif" font-size="17">Flutter, React, authentication, and database integration.</text>
<rect x="810" y="130" width="320" height="390" rx="160" fill="#fff" stroke="#254f9220"/><image x="830" y="130" width="280" height="373" href="data:image/png;base64,${portrait}" clip-path="url(#portrait)"/><text x="863" y="535" fill="#254f92" font-family="monospace" font-size="11" letter-spacing="2">INTERN CANDIDATE</text>
<path d="M1142 171V195M1130 183H1154M793 425L780 440L794 455" stroke="#2563eb" stroke-width="2" fill="none"/><text x="72" y="585" fill="#475569" font-family="monospace" font-size="11" letter-spacing="1">PROJECTS / TECHNICAL SKILLS / RESUME</text></svg>`
await writeFile('public/images/social-preview.svg', svg)
await sharp(Buffer.from(svg)).png().toFile('public/images/social-preview.png')
console.log('Updated the share image with the actual supplied portrait and light design.')
