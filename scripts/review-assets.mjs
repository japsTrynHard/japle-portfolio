import { readdir, mkdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import sharp from 'sharp'
import { createCanvas, DOMMatrix, ImageData, Path2D } from '@napi-rs/canvas'
const root = '.asset-source/all projects photos'
await mkdir('artifacts/asset-review', { recursive: true })
const index = {}
for (const folder of await readdir(root)) {
  const files = (await readdir(join(root, folder)))
    .filter((name) => /\.(png|jpg|jpeg)$/i.test(name))
    .sort()
  index[folder] = []
  for (let batch = 0; batch < Math.ceil(files.length / 6); batch++) {
    const composites = []
    const chunk = files.slice(batch * 6, batch * 6 + 6)
    for (let i = 0; i < chunk.length; i++) {
      const file = join(root, folder, chunk[i])
      const metadata = await sharp(file).metadata()
      const image = await sharp(file)
        .resize(390, 450, { fit: 'inside', withoutEnlargement: true })
        .png()
        .toBuffer()
      const info = await sharp(image).metadata()
      const x = (i % 3) * 400,
        y = Math.floor(i / 3) * 500
      composites.push({ input: image, left: x + Math.round((400 - info.width) / 2), top: y + 35 })
      const label = `<svg width="400" height="30"><text x="10" y="20" fill="white" font-family="Arial" font-size="14">${batch * 6 + i + 1}. ${chunk[i].slice(0, 35)}</text></svg>`
      composites.push({ input: Buffer.from(label), left: x, top: y })
      index[folder].push({
        index: batch * 6 + i + 1,
        file,
        width: metadata.width,
        height: metadata.height,
      })
    }
    await sharp({
      create: {
        width: 1200,
        height: Math.ceil(chunk.length / 3) * 500,
        channels: 3,
        background: '#222',
      },
    })
      .composite(composites)
      .png()
      .toFile(`artifacts/asset-review/${folder.replaceAll(' ', '-')}-${batch + 1}.png`)
  }
}
await writeFile('artifacts/asset-review/index.json', JSON.stringify(index, null, 2))
Object.assign(globalThis, { DOMMatrix, ImageData, Path2D })
const { getDocument } = await import('pdfjs-dist/legacy/build/pdf.mjs')
for (const name of ['japle-ats', 'japle-with-photo']) {
  const bytes = new Uint8Array(await readFile(`public/resumes/${name}.pdf`))
  const document = await getDocument({ data: bytes, useSystemFonts: true, isEvalSupported: false })
    .promise
  const pages = []
  for (let n = 1; n <= document.numPages; n++) {
    const page = await document.getPage(n)
    const viewport = page.getViewport({ scale: 1.5 })
    const canvas = createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height))
    await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise
    await writeFile(`artifacts/asset-review/${name}-${n}.png`, canvas.toBuffer('image/png'))
    pages.push((await page.getTextContent()).items.map((item) => item.str).join(' '))
  }
  await writeFile(`artifacts/asset-review/${name}.txt`, pages.join('\n\n'))
  console.log(`${name}: ${document.numPages} page(s), rendered for review`)
  await document.cleanup?.()
}
console.log('Contact sheets and PDF review renders are ready in artifacts/asset-review/.')
