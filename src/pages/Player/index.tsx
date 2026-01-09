import Banner from 'components/Banner'
import Titulo from 'components/Titulo'
import { useParams, Link } from 'react-router-dom'
import NaoEncontrada from 'pages/NaoEncontrada'
import { useVideo } from '@/hooks/useVideos'
import { useFavoritosStore } from '@/stores/favoritosStore'
import { useGeminiReview } from '@/hooks/useGeminiReview'
import { useEffect, useRef, useState } from 'react'

function Player() {
  const { id } = useParams<{ id: string }>()
  const { data: video, isLoading, error } = useVideo(id || '')
  const { comentario, loadingAI, buscarComentario } = useGeminiReview(video?.titulo)
  const { toggleFavorito, favoritos } = useFavoritosStore()

  const [comentarioExibido, setComentarioExibido] = useState('')
  const [iniciouBusca, setIniciouBusca] = useState(false)
  const aiSectionRef = useRef<HTMLDivElement>(null)

  const ehFavorito = video ? favoritos.some((fav) => fav.id === video.id) : false

  // Intersection Observer para detectar quando a seção da IA está visível
  useEffect(() => {
    if (!aiSectionRef.current || iniciouBusca) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !iniciouBusca) {
          setIniciouBusca(true)
          buscarComentario()
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(aiSectionRef.current)

    return () => observer.disconnect()
  }, [buscarComentario, iniciouBusca])

  // Efeito de digitação (typewriter)
  useEffect(() => {
    if (!comentario || loadingAI) {
      setComentarioExibido('')
      return
    }

    let currentIndex = 0
    setComentarioExibido('')

    const interval = setInterval(() => {
      if (currentIndex <= comentario.length) {
        setComentarioExibido(comentario.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(interval)
      }
    }, 30) // 30ms por caractere para digitação rápida

    return () => clearInterval(interval)
  }, [comentario, loadingAI])

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
    <div className="animate-fade-in sm:w-5xl">
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
          <h2 className="text-2xl md:text-3xl font-bold text-white">{video.titulo}</h2>
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

      <div>
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
          <h2 className="text-lg font-semibold text-white mb-4">Detalhes do Filme</h2>

          <div className="space-y-3">
            {/* Nota e Data de Lançamento */}
            <div className="flex flex-wrap gap-4">
              {video.vote_average !== undefined && (
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">Avaliação:</span>
                  <div className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border font-bold ${video.vote_average < 5
                    ? 'text-red-500 bg-red-500/20 border-red-500/50'
                    : video.vote_average < 7
                      ? 'text-yellow-400 bg-yellow-400/20 border-yellow-400/50'
                      : video.vote_average < 9
                        ? 'text-green-400 bg-green-400/20 border-green-400/50'
                        : 'text-blue-400 bg-blue-400/20 border-blue-400/50'
                    }`}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {video.vote_average.toFixed(1)}
                  </div>
                </div>
              )}

              {video.release_date && (
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">Lançamento:</span>
                  <span className="text-white font-medium">
                    {new Date(video.release_date).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              )}
            </div>

            {/* Sinopse */}
            {video.overview && (
              <div>
                <h3 className="text-white font-medium mb-2">Sinopse</h3>
                <p className="text-gray-400 leading-relaxed">
                  {video.overview}
                </p>
              </div>
            )}

            {/* Área da IA */}
            <div ref={aiSectionRef} className="mt-8 p-6 bg-gray-900/80 rounded-2xl border border-purple-500/30 ">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">🤖</span>
                <h3 className="text-xl font-bold text-white">Crítica do Gemini Sincero</h3>
              </div>

              {loadingAI ? (
                <div className="flex items-center gap-2 text-purple-300 animate-pulse">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-75" />
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-150" />
                  <span>Gerando opinião polêmica...</span>
                </div>
              ) : comentarioExibido ? (
                <p className="text-gray-300 text-lg leading-relaxed italic border-l-4 border-purple-600 pl-4">
                  "{comentarioExibido}"
                </p>
              ) : null}
            </div>
          </div>
        </div>


      </div>



    </div>
  )
}

export default Player
