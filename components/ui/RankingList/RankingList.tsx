interface Item {
  id: string | number
  rank: number
  name: string
  elo: number | null
  raw?: any
}

interface Props {
  items: Item[]
  onItemClick?: (item: Item) => void
  className?: string
}
