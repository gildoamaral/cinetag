export interface Video {
  id: number
  titulo: string
  capa: string
  link?: string
}

export interface FavoritoContextType {
  favorito: Video[]
  adicionarFavorito: (novoFavorito: Video) => void
}
