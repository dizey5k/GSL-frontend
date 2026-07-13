// Маппинг названий семей на URL логотипов (из старого family-logos.js)
const FAMILY_LOGOS: Record<string, string> = {
  // Примеры (нужно взять из старого файла)
  // 'Alarm': '/family-const/alarm.png',
  // 'GUCCI': '/family-const/gucci.png',
  // и т.д.
}

export function getFamilyLogoUrl(name: string): string {
  if (!name) return ''
  const key = name.toLowerCase().trim()
  // Ищем по точному совпадению или по ключу
  if (FAMILY_LOGOS[key]) return FAMILY_LOGOS[key]
  // Если нет, возвращаем заглушку
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=2a2a2e&color=fff&size=88`
}
