const formatter: Intl.NumberFormat = new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 })

export function formatNumber(value: number): string {
  return formatter.format(value)
}