import Banner from 'components/Banner'
import Titulo from 'components/Titulo'
import { useParams, Link } from 'react-router-dom'
import NaoEncontrada from 'pages/NaoEncontrada'
import { useVideo } from '@/hooks/useVideos'
import { useFavoritosStore } from '@/stores/favoritosStore'

function Player() {
  const { id } = useParams<{ id: string }>()
  const { data: video, isLoading, error } = useVideo(id || '')
  const { toggleFavorito, favoritos } = useFavoritosStore()
  
  const ehFavorito = video ? favoritos.some((fav) => fav.id === video.id) : false

  if (isLoading) {
    return (
      <div className="animate-fade-in">
        <Banner imagem="player" />
        <Titulo>
          <h1>Carregando...</h1>
        </Titulo>
        <div className="aspect-video bg-dark-lighter rounded-2xl animate-pulse" />
      </div>
    )
  }

  if (error || !video) {
    return <NaoEncontrada />
  }

  return (
    <div className="animate-fade-in">
      <Banner imagem="player" />
      
      {/* Video Info Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div>
          <Link 
            to="/" 
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-2"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Voltar
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-white">{video.titulo}</h1>
        </div>
        
        <button
          onClick={() => toggleFavorito({ id: video.id, titulo: video.titulo, capa: video.capa })}
          className={`
            flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-300
            ${ehFavorito 
              ? 'bg-secondary text-white shadow-lg shadow-secondary/30' 
              : 'bg-white/10 text-white hover:bg-white/20'
            }
          `}
        >
          <svg 
            className="w-5 h-5" 
            fill={ehFavorito ? 'currentColor' : 'none'} 
            stroke="currentColor" 
            strokeWidth={2} 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          {ehFavorito ? 'Favoritado' : 'Favoritar'}
        </button>
      </div>

      {/* Video Player */}
      <div className="relative aspect-video rounded-2xl overflow-hidden bg-dark-lighter shadow-2xl animate-pulse-glow">
        <iframe
          className="absolute inset-0 w-full h-full"
          src={video.link}
          title={video.titulo}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
      
      {/* Video Description */}
      <div className="mt-6 p-6 bg-dark-lighter/50 rounded-2xl border border-white/5">
        <h2 className="text-lg font-semibold text-white mb-2">Sobre este vídeo</h2>
        <p className="text-gray-400">
          Assista ao trailer de {video.titulo} e adicione aos seus favoritos para acessar mais tarde!
        </p>
      </div>
    </div>
  )
}

export default Player
