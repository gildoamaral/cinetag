export interface Video {
  id: number
  titulo: string
  capa: string
  link?: string
  release_date?: string
  vote_average?: number
  overview?: string
}

export interface FavoritoContextType {
  favorito: Video[]
  adicionarFavorito: (novoFavorito: Video) => void
}
