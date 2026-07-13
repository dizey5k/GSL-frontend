import { create } from 'zustand'
import { CompareMode } from '@/types'

interface CompareState {
  mode: CompareMode
  valueA: string
  valueB: string
  setMode: (mode: CompareMode) => void
  setValueA: (val: string) => void
  setValueB: (val: string) => void
  reset: () => void
}

export const useCompareStore = create<CompareState>((set) => ({
  mode: 'players',
  valueA: '',
  valueB: '',
  setMode: (mode) => set({ mode }),
  setValueA: (val) => set({ valueA: val }),
  setValueB: (val) => set({ valueB: val }),
  reset: () => set({ valueA: '', valueB: '' }),
}))
