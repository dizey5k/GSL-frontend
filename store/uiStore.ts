import { create } from 'zustand'

interface Toast {
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
  visible: boolean
}

interface UIState {
  isMobileMenuOpen: boolean
  theme: 'dark' | 'light'
  toast: Toast
  modals: {
    player: { open: boolean; data?: any }
    family: { open: boolean; data?: any }
    compare: { open: boolean; data?: any }
    report: { open: boolean; data?: any }
    cfg: { open: boolean; data?: any }
    rules: { open: boolean; data?: any }
  }
  setMobileMenu: (open: boolean) => void
  setTheme: (theme: 'dark' | 'light') => void
  showToast: (message: string, type?: Toast['type']) => void
  hideToast: () => void
  openModal: (name: keyof UIState['modals'], data?: any) => void
  closeModal: (name: keyof UIState['modals']) => void
}

export const useUIStore = create<UIState>((set) => ({
  isMobileMenuOpen: false,
  theme: 'dark',
  toast: { message: '', type: 'info', visible: false },
  modals: {
    player: { open: false },
    family: { open: false },
    compare: { open: false },
    report: { open: false },
    cfg: { open: false },
  },
  setMobileMenu: (open) => set({ isMobileMenuOpen: open }),
  setTheme: (theme) => set({ theme }),
  showToast: (message, type = 'info') =>
    set({ toast: { message, type, visible: true } }),
  hideToast: () =>
    set({ toast: { message: '', type: 'info', visible: false } }),
  openModal: (name, data) =>
    set((state) => ({
      modals: {
        ...state.modals,
        [name]: { open: true, data },
      },
    })),
  closeModal: (name) =>
    set((state) => ({
      modals: {
        ...state.modals,
        [name]: { open: false, data: undefined },
      },
    })),
}))
