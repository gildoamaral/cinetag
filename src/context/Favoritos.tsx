import { createContext, useContext, useState, type ReactNode } from 'react'
import type { Video, FavoritoContextType } from '@/types'

export const FavoritosContext = createContext<FavoritoContextType | null>(null)
FavoritosContext.displayName = 'Favoritos'

interface FavoritosProviderProps {
  children: ReactNode
}

export default function FavoritosProvider({ children }: FavoritosProviderProps) {
  const [favorito, setFavorito] = useState<Video[]>([])

  function adicionarFavorito(novoFavorito: Video) {
    const favoritoRepetido = favorito.some((item) => item.id === novoFavorito.id)

    let novaLista = [...favorito]

    if (!favoritoRepetido) {
      novaLista.push(novoFavorito)
      setFavorito(novaLista)
      return
    }

    novaLista = favorito.filter((fav) => fav.id !== novoFavorito.id)
    setFavorito(novaLista)
  }

  return (
    <FavoritosContext.Provider value={{ favorito, adicionarFavorito }}>
      {children}
    </FavoritosContext.Provider>
  )
}

export function useFavoritoContext(): FavoritoContextType {
  const context = useContext(FavoritosContext)

  if (!context) {
    throw new Error('useFavoritoContext deve ser usado dentro de FavoritosProvider')
  }

  return context
}
