export function fmt(n: number | null | undefined): string {
  if (n == null || isNaN(Number(n))) return '—'
  return Math.round(Number(n)).toLocaleString('ru-RU')
}

export function makeAvatar(name: string, size = 76): string {
  const p = (name || '?').trim().replace(/_/g, ' ').split(/\s+/)
  const letters =
    p.length >= 2
      ? (p[0].charAt(0) + p[1].charAt(0)).toUpperCase()
      : p[0].slice(0, 2).toUpperCase()
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="100%" height="100%" rx="12" fill="#2a2a2e"/><text x="50%" y="54%" text-anchor="middle" dominant-baseline="middle" fill="#FFD600" font-family="Inter,sans-serif" font-size="${Math.round(size * 0.38)}" font-weight="700">${letters}</text></svg>`
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}
