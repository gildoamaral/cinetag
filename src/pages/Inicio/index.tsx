import Banner from 'components/Banner'
import Card from 'components/Card'
import Titulo from 'components/Titulo'
import { useVideos } from '@/hooks/useVideos'

function Inicio() {
  const { data: videos, isLoading, error } = useVideos()

  if (isLoading) {
    return (
      <div className="animate-fade-in">
        <Banner imagem="home" />
        <Titulo>
          <h1>Um lugar para guardar seus vídeos e filmes!</h1>
        </Titulo>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-dark-lighter rounded-2xl overflow-hidden animate-pulse">
              <div className="aspect-video bg-gray/20" />
              <div className="p-4">
                <div className="h-6 bg-gray/20 rounded w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
        <div className="text-6xl mb-4">😕</div>
        <h2 className="text-2xl font-bold text-white mb-2">Ops! Algo deu errado</h2>
        <p className="text-gray-400">Não foi possível carregar os vídeos.</p>
      </div>
    )
  }

  return (
    <div className="animate-fade-in">
      <Banner imagem="home" />
      <Titulo>
        <h1>Um lugar para guardar seus vídeos e filmes!</h1>
      </Titulo>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {videos?.map((video, index) => (
          <div 
            key={video.id} 
            style={{ animationDelay: `${index * 0.1}s` }}
            className="animate-fade-in opacity-0"
          >
            <Card {...video} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Inicio
