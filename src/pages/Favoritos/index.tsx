import Banner from 'components/Banner'
import Titulo from 'components/Titulo'
import Card from 'components/Card'
import { useFavoritosStore } from '@/stores/favoritosStore'
import { Link } from 'react-router-dom'

function Favoritos() {
  const { favoritos } = useFavoritosStore()

  return (
    <div className="animate-fade-in">
      <Banner imagem="favoritos" />
      <Titulo>
        <h1>Seus filmes favoritos!</h1>
      </Titulo>
      
      {favoritos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
          <div className="w-24 h-24 mb-6 rounded-full bg-linear-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">
            Nenhum favorito ainda
          </h2>
          <p className="text-gray-400 text-center mb-6 max-w-md">
            Explore nossos vídeos e adicione seus favoritos clicando no ícone de coração!
          </p>
          <Link 
            to="/"
            className="px-6 py-3 bg-linear-to-r from-primary to-secondary text-white font-medium rounded-full hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:scale-105"
          >
            Explorar Vídeos
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoritos.map((fav, index) => (
            <div 
              key={fav.id}
              style={{ animationDelay: `${index * 0.1}s` }}
              className="animate-fade-in opacity-0"
            >
              <Card {...fav} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Favoritos
