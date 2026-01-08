import { useFavoritosStore } from '@/stores/favoritosStore'
import { Link } from 'react-router-dom'

interface CardProps {
  id: number
  titulo: string
  capa: string
}

function Card({ id, titulo, capa }: CardProps) {
  const { toggleFavorito, favoritos } = useFavoritosStore()
  const ehFavorito = favoritos.some((fav) => fav.id === id)

  return (
    <div className="group relative bg-linear-to-br from-dark-lighter to-dark rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 animate-fade-in">
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
        <h2 className="text-white font-semibold text-lg truncate group-hover:text-primary transition-colors">
          {titulo}
        </h2>
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
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 pointer-events-none" />
    </div>
  )
}

export default Card
