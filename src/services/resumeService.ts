export async function checkPdfAvailability(path: string, signal?: AbortSignal): Promise<boolean> {
  try {
    const response = await fetch(path, { signal, headers: { Range: 'bytes=0-4' } })
    if (!response.ok || !response.headers.get('content-type')?.includes('application/pdf'))
      return false
    const data = await response.blob()
    return (await data.slice(0, 5).text()) === '%PDF-'
  } catch {
    return false
  }
}
