import { useFavoritosStore } from '@/stores/favoritosStore'
import { Link } from 'react-router-dom'

interface CardProps {
  id: number
  titulo: string
  capa: string
  vote_average?: number
}

function Card({ id, titulo, capa, vote_average }: CardProps) {
  const { toggleFavorito, favoritos } = useFavoritosStore()
  const ehFavorito = favoritos.some((fav) => fav.id === id)

  // Função para determinar a cor da nota
  const getScoreColor = (score: number) => {
    if (score < 5) return 'text-red-500 bg-red-500/20 border-red-500/50'
    if (score < 7) return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/50'
    if (score < 9) return 'text-green-400 bg-green-400/20 border-green-400/50'
    return 'text-blue-400 bg-blue-400/20 border-blue-400/50'
  }

  return (
    <div className="group relative bg-linear-to-br from-dark-lighter to-dark rounded-sm overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 animate-fade-in">
      {/* Card Image */}
      <Link to={`/videos/${id}`} className="block relative overflow-hidden">
        <div className="aspect-video overflow-hidden">
          <img 
            src={capa} 
            alt={titulo} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-dark via-transparent to-transparent opacity-60" />
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 hover:bg-white/30 transition-colors">
            <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
      </Link>

      {/* Card Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h2 className="text-white font-semibold text-lg truncate group-hover:text-primary transition-colors flex-1">
            {titulo}
          </h2>
          {vote_average !== undefined && (
            <div className={`flex items-center gap-1 px-2 py-1 rounded-lg border ${
              getScoreColor(vote_average)
            } font-bold text-sm shrink-0`}>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {vote_average.toFixed(1)}
            </div>
          )}
        </div>
      </div>

      {/* Favorite Button */}
      <button
        onClick={() => toggleFavorito({ id, titulo, capa })}
        className={`
          absolute top-3 right-3 w-10 h-10 rounded-full backdrop-blur-sm
          flex items-center justify-center transition-all duration-300
          ${ehFavorito 
            ? 'bg-secondary/90 text-white scale-110' 
            : 'bg-black/40 text-white/70 hover:bg-black/60 hover:text-white hover:scale-110'
          }
        `}
        aria-label={ehFavorito ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
      >
        <svg 
          className={`w-5 h-5 transition-transform duration-300 ${ehFavorito ? 'scale-110' : ''}`} 
          fill={ehFavorito ? 'currentColor' : 'none'} 
          stroke="currentColor" 
          strokeWidth={2} 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>

      {/* Glow Effect */}
      <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none" />
    </div>
  )
}

export default Card
