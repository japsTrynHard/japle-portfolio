import { writeFile } from 'node:fs/promises'
import sharp from 'sharp'
const portrait = (
  await sharp('public/images/profile/japle-professional.webp').png().toBuffer()
).toString('base64')
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<defs>
  <clipPath id="portrait"><rect x="843" y="179" width="285" height="324" rx="3"/></clipPath>
</defs>
<rect width="1200" height="630" fill="#f8fafc"/>
<rect x="64" y="43" width="42" height="46" rx="3" fill="#1d428a"/>
<path d="M101 44V88" stroke="#c8102e" stroke-width="6"/>
<text x="72" y="72" fill="#ffffff" font-family="Arial,sans-serif" font-weight="700" font-size="21" letter-spacing="-2">JL</text>
<text x="123" y="61" fill="#0f172a" font-family="Arial,sans-serif" font-weight="700" font-size="13" letter-spacing="2">JAPLE</text>
<text x="123" y="80" fill="#0f172a" font-family="Arial,sans-serif" font-weight="700" font-size="13" letter-spacing="2">LIGAYA</text>
<text x="1136" y="71" text-anchor="end" fill="#475569" font-family="monospace" font-size="12" letter-spacing="1">WEB / MOBILE / API INTEGRATION</text>
<path d="M64 110H1136" stroke="#0f172a25"/>
<rect x="65" y="154" width="6" height="6" fill="#c8102e"/>
<text x="83" y="162" fill="#475569" font-family="monospace" font-size="12" letter-spacing="1.3">OPEN TO DEVELOPMENT OPPORTUNITIES</text>
<text x="58" y="284" fill="#0f172a" font-family="Arial,sans-serif" font-weight="700" font-size="128" letter-spacing="-7">JAPLE</text>
<text x="59" y="397" fill="#1d428a" font-family="Arial,sans-serif" font-weight="700" font-size="128" letter-spacing="-7">LIGAYA.</text>
<text x="65" y="451" fill="#0f172a" font-family="Arial,sans-serif" font-size="24" font-weight="500">Full-Stack Web &amp; Mobile Developer</text>
<text x="65" y="485" fill="#475569" font-family="Arial,sans-serif" font-size="17">Flutter, React, authentication, and database integration.</text>
<path d="M65 518H637" stroke="#1d428a" stroke-width="5"/><path d="M637 518H735" stroke="#c8102e" stroke-width="5"/>
<rect x="832" y="142" width="307" height="376" rx="6" fill="#ffffff" stroke="#0f172a25"/>
<rect x="849" y="157" width="5" height="5" rx="2.5" fill="#c8102e"/>
<rect x="861" y="157" width="5" height="5" rx="2.5" fill="#475569"/>
<rect x="873" y="157" width="5" height="5" rx="2.5" fill="#1d428a"/>
<text x="1121" y="164" text-anchor="end" fill="#475569" font-family="monospace" font-size="10">profile.ts</text>
<image x="843" y="129" width="285" height="380" href="data:image/png;base64,${portrait}" clip-path="url(#portrait)"/>
<text x="985" y="545" text-anchor="middle" fill="#475569" font-family="monospace" font-size="11" letter-spacing="1">BULACAN, PHILIPPINES</text>
<path d="M64 568H1136" stroke="#0f172a25"/>
<text x="65" y="600" fill="#475569" font-family="monospace" font-size="12" letter-spacing=".6">REACT · FLUTTER · SUPABASE · FIREBASE</text>
<text x="1136" y="601" text-anchor="end" fill="#1d428a" font-family="monospace" font-size="19">&lt;/&gt;</text>
</svg>`
await writeFile('public/images/social-preview.svg', svg)
await sharp(Buffer.from(svg)).png().toFile('public/images/social-preview.png')
console.log('Updated the share image with the JL identity and light, red, and blue palette.')
