import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Video } from '@/types'

interface FavoritosStore {
  favoritos: Video[]
  adicionarFavorito: (video: Video) => void
  removerFavorito: (id: number) => void
  toggleFavorito: (video: Video) => void
  isFavorito: (id: number) => boolean
}

export const useFavoritosStore = create<FavoritosStore>()(
  persist(
    (set, get) => ({
      favoritos: [],
      
      adicionarFavorito: (video) => {
        set((state) => ({
          favoritos: [...state.favoritos, video]
        }))
      },
      
      removerFavorito: (id) => {
        set((state) => ({
          favoritos: state.favoritos.filter((fav) => fav.id !== id)
        }))
      },
      
      toggleFavorito: (video) => {
        const { favoritos } = get()
        const existe = favoritos.some((fav) => fav.id === video.id)
        
        if (existe) {
          set({ favoritos: favoritos.filter((fav) => fav.id !== video.id) })
        } else {
          set({ favoritos: [...favoritos, video] })
        }
      },
      
      isFavorito: (id) => {
        return get().favoritos.some((fav) => fav.id === id)
      }
    }),
    {
      name: 'cinetag-favoritos'
    }
  )
)
