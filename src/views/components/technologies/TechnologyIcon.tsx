import type { IconType } from 'react-icons'
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiTypescript,
  SiDart,
  SiPhp,
  SiPython,
  SiReact,
  SiFlutter,
  SiBootstrap,
  SiTailwindcss,
  SiVite,
  SiNextdotjs,
  SiLaravel,
  SiNodedotjs,
  SiUnity,
  SiFirebase,
  SiSupabase,
  SiMysql,
  SiPostgresql,
  SiCloudinary,
  SiGooglegemini,
  SiGit,
  SiGithub,
  SiFigma,
  SiAndroidstudio,
  SiXampp,
  SiCodemagic,
  SiVercel,
} from 'react-icons/si'
import { FaJava } from 'react-icons/fa'
import { VscVscode } from 'react-icons/vsc'
import { Braces, Cpu, ScanText, Zap } from 'lucide-react'
const icons: Record<string, IconType> = {
  html: SiHtml5,
  css: SiCss,
  javascript: SiJavascript,
  typescript: SiTypescript,
  dart: SiDart,
  php: SiPhp,
  python: SiPython,
  java: FaJava,
  react: SiReact,
  flutter: SiFlutter,
  bootstrap: SiBootstrap,
  tailwind: SiTailwindcss,
  vite: SiVite,
  next: SiNextdotjs,
  laravel: SiLaravel,
  node: SiNodedotjs,
  unity: SiUnity,
  firebase: SiFirebase,
  supabase: SiSupabase,
  mysql: SiMysql,
  postgres: SiPostgresql,
  cloudinary: SiCloudinary,
  gemini: SiGooglegemini,
  git: SiGit,
  github: SiGithub,
  figma: SiFigma,
  vscode: VscVscode,
  android: SiAndroidstudio,
  xampp: SiXampp,
  codemagic: SiCodemagic,
  vercel: SiVercel,
}
export function TechnologyIcon({ name }: { name: string }) {
  const Icon = icons[name]
  return Icon ? (
    <Icon aria-hidden="true" />
  ) : name === 'groq' ? (
    <Zap aria-hidden="true" />
  ) : name === 'mlkit' ? (
    <ScanText aria-hidden="true" />
  ) : name === 'openai' ? (
    <Cpu aria-hidden="true" />
  ) : (
    <Braces aria-hidden="true" />
  )
}
