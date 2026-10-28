import type { Contact } from '../models/Contact'
export const email = 'ligayajaple@gmail.com'
export const contactLinks: Contact[] = [
  { label: 'Email', href: `mailto:${email}`, handle: 'Discuss a role', icon: 'mail' },
  {
    label: 'GitHub',
    href: 'https://github.com/japsTrynHard',
    handle: 'Review source code',
    icon: 'github',
  },
  {
    label: 'LinkedIn',
    href: 'https://ph.linkedin.com/in/japle-ligaya-79aa652b5',
    handle: 'Professional profile',
    icon: 'linkedin',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/lgy_jpl/',
    handle: 'Personal profile',
    icon: 'instagram',
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/LgyJpl/',
    handle: 'Contact profile',
    icon: 'facebook',
  },
]
