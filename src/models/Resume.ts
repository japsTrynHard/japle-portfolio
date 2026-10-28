export interface Resume {
  id: 'ats' | 'photo'
  name: string
  description: string
  path: string
  downloadName: string
}
export type FileAvailability = 'checking' | 'available' | 'missing'
