import Banner from 'components/Banner'
import Titulo from 'components/Titulo'
import { useParams } from 'react-router-dom'
import styles from './Player.module.css'
import NaoEncontrada from 'pages/NaoEncontrada'
import { useEffect, useState } from 'react'
import type { Video } from '@/types'

function Player() {
  const [video, setVideo] = useState<Video | null>(null)
  const [loading, setLoading] = useState(true)
  const parametros = useParams<{ id: string }>()

  useEffect(() => {
    fetch(
      `https://my-json-server.typicode.com/gildoamaral/cinetag-api/videos?id=${parametros.id}`
    )
      .then((resposta) => resposta.json())
      .then((dados: Video[]) => {
        if (dados.length > 0) {
          setVideo(dados[0])
        }
        setLoading(false)
      })
  }, [parametros.id])

  if (loading) {
    return <div>Carregando...</div>
  }

  if (!video) {
    return <NaoEncontrada />
  }

  return (
    <>
      <Banner imagem="player" />
      <Titulo>
        <h1>Veja o Trailer</h1>
      </Titulo>
      <section className={styles.container}>
        <iframe
          width="100%"
          height="100%"
          src={video.link}
          title={video.titulo}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </section>
    </>
  )
}

export default Player
