import { readFile, writeFile, mkdir } from 'node:fs/promises'
import sharp from 'sharp'
const review = JSON.parse(await readFile('artifacts/asset-review/index.json', 'utf8'))
// Curated original captures. Captures containing contract/payment records, precise
// geofence locations, or infrastructure-console details remain in private staging.
const selection = {
  carmelink: {
    folder: 'carmelink photos',
    entries: [
      [1, 'Dormitory public landing page'],
      [3, 'Room inventory and availability interface'],
    ],
  },
  promptwise: {
    folder: 'promptwise photos',
    entries: [
      [5, 'Mobile learning home and progress'],
      [1, 'Prompt Coach practice interface'],
      [2, 'Prompt quality feedback and rubric'],
      [10, 'Learning lesson overview'],
      [4, 'In-lesson dictionary and verification terms'],
      [11, 'Knowledge Check question'],
      [12, 'Review Check practice'],
      [3, 'Compare Images learning activity'],
      [6, 'Web content overview'],
      [7, 'Content management workspace'],
      [8, 'Learning Studio workspace'],
      [9, 'Verification Studio workspace'],
    ],
  },
  'autosched-ai': {
    folder: 'autosched photos',
    entries: [
      [3, 'Mobile academic planning home'],
      [2, 'COR scanner and extraction review entry'],
      [5, 'Smart Planner daily timeline'],
      [4, 'Academic task configuration'],
      [1, 'AI Assistant interface'],
      [6, 'Profile and school-term preferences'],
    ],
  },
  'bayanihan-link': {
    folder: 'bayanihanlink photos',
    entries: [
      [1, 'Community platform public landing page'],
      [2, 'Account sign-in interface'],
      [4, 'Resident dashboard and community actions'],
      [5, 'Job finding and hiring interface'],
      [7, 'Barangay service selection'],
      [8, 'Emergency assistance report form'],
    ],
  },
  rodelconnect: {
    folder: 'rodels photos',
    entries: [
      [1, 'Catering public landing page'],
      [11, 'Catering package selection'],
      [10, 'Event availability calendar'],
      [12, 'Public catering assistant interface'],
      [6, 'Catering dish management interface'],
      [7, 'Menu and package composition interface'],
    ],
  },
  'map-explorer': {
    folder: 'map explorer',
    entries: [
      [1, 'Game start screen'],
      [2, 'Character introduction'],
      [3, 'Regional puzzle learning card'],
      [4, 'Cordillera region learning card'],
      [5, 'Luzon puzzle completion'],
      [6, 'Regional knowledge quiz'],
      [7, 'Quiz result and progression'],
      [8, 'Island-group map selection'],
    ],
  },
}
const manifest = {}
for (const [id, project] of Object.entries(selection)) {
  await mkdir(`public/images/projects/${id}`, { recursive: true })
  manifest[id] = { items: [] }
  for (let order = 0; order < project.entries.length; order++) {
    const [number, caption] = project.entries[order]
    const source = review[project.folder].find((item) => item.index === number)
    const filename = `${String(order + 1).padStart(2, '0')}-${caption
      .toLowerCase()
      .replaceAll(/[^a-z0-9]+/g, '-')
      .replace(/-$/, '')}`
    const width = Math.min(source.width, 1920)
    const path = `/images/projects/${id}/${filename}.webp`
    const image = await sharp(source.file)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 90, effort: 5 })
      .toBuffer({ resolveWithObject: true })
    await writeFile(`public${path}`, image.data)
    let srcSet = `${path} ${image.info.width}w`
    if (image.info.width > 800) {
      const smallPath = `/images/projects/${id}/${filename}-800.webp`
      await sharp(source.file)
        .resize({ width: 800, withoutEnlargement: true })
        .webp({ quality: 87 })
        .toFile(`public${smallPath}`)
      srcSet = `${smallPath} 800w, ${srcSet}`
    }
    manifest[id].items.push({
      id: `${id}-${order + 1}`,
      type: 'image',
      src: path,
      alt: `${id === 'map-explorer' ? 'Map Explorer PH' : id === 'autosched-ai' ? 'AutoSched AI' : id === 'bayanihan-link' ? 'Bayanihan Link' : id === 'promptwise' ? 'PromptWise' : id === 'rodelconnect' ? 'RodelConnect' : 'CarmeLink'} — ${caption}`,
      caption: `${caption} · supplied project screenshot`,
      order,
      width: image.info.width,
      height: image.info.height,
      srcSet,
      sizes: '(max-width: 680px) 100vw, (max-width: 1100px) 90vw, 1600px',
    })
  }
}
await writeFile(
  'src/data/mediaManifest.ts',
  `import type { MediaManifest } from '../models/Gallery'\n\n// Every gallery, card, case-study hero, and the homepage share this manifest.\n// Add images or optional videos here; no controller or component changes are needed.\nexport const mediaManifest: MediaManifest = ${JSON.stringify(manifest, null, 2)}\n`,
)
await mkdir('public/images/profile', { recursive: true })
await sharp('C:/Users/ligay/OneDrive/Pictures/professional photo.png')
  .webp({ quality: 92 })
  .toFile('public/images/profile/japle-professional.webp')
await sharp('C:/Users/ligay/OneDrive/Pictures/normal photo.jpg')
  .resize({ width: 1100, withoutEnlargement: true })
  .webp({ quality: 90 })
  .toFile('public/images/profile/japle-casual.webp')
console.log(
  `Imported ${Object.values(manifest).reduce((sum, entry) => sum + entry.items.length, 0)} authentic screenshots across six projects and two original portraits.`,
)
