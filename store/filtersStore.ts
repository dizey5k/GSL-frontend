import { create } from 'zustand'

interface FiltersState {
  playerServer: string
  familyServer: string
  playerSort: 'rating' | 'win_rate' | 'total_matches'
  familySort: 'rating' | 'win_rate' | 'total_matches'
  compareMode: 'players' | 'families' | 'gangame'
  setPlayerServer: (server: string) => void
  setFamilyServer: (server: string) => void
  setPlayerSort: (sort: FiltersState['playerSort']) => void
  setFamilySort: (sort: FiltersState['familySort']) => void
  setCompareMode: (mode: FiltersState['compareMode']) => void
}

export const useFiltersStore = create<FiltersState>((set) => ({
  playerServer: '',
  familyServer: '',
  playerSort: 'rating',
  familySort: 'rating',
  compareMode: 'players',
  setPlayerServer: (server) => set({ playerServer: server }),
  setFamilyServer: (server) => set({ familyServer: server }),
  setPlayerSort: (sort) => set({ playerSort: sort }),
  setFamilySort: (sort) => set({ familySort: sort }),
  setCompareMode: (mode) => set({ compareMode: mode }),
}))
