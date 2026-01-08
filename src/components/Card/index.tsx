import { useFavoritoContext } from 'contextos/Favoritos'
import styles from './Card.module.css'
import iconeFavoritar from './favoritar.png'
import iconeDesfavoritar from './desfavoritar.png'
import { Link } from 'react-router-dom'

interface CardProps {
  id: number
  titulo: string
  capa: string
}

function Card({ id, titulo, capa }: CardProps) {
  const { favorito, adicionarFavorito } = useFavoritoContext()
  const ehFavorito = favorito.some((fav) => fav.id === id)
  const icone = ehFavorito ? iconeDesfavoritar : iconeFavoritar

  return (
    <div className={styles.container}>
      <Link className={styles.link} to={`/videos/${id}`}>
        <img src={capa} alt={titulo} className={styles.capa} />
        <h2>{titulo}</h2>
      </Link>
      <div className={styles.coracao}>
        <img
          src={icone}
          alt="Favoritar filme"
          className={styles.favoritar}
          onClick={() => {
            adicionarFavorito({ id, titulo, capa })
          }}
        />
      </div>
    </div>
  )
}

export default Card
