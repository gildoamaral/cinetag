import { useFavoritoContext } from "contextos/Favoritos";
import styles from "./Card.module.css";
import iconeFavoritar from "./favoritar.png";
import iconeDesfavoritar from './desfavoritar.png';
import { Link } from "react-router-dom";

function Card({ id, titulo, capa }) {
    const { favorito, adicionarFavorito } = useFavoritoContext();
    const ehFavorito = favorito.some((fav) => fav.id === id);
    let icone = ehFavorito ? iconeDesfavoritar : iconeFavoritar;
  

    

    return (
        <div className={styles.container}>
            <Link className={styles.link} to={`/videos/${id}`}>
                <img src={capa} alt={titulo} className={styles.capa} />
                <h2>{titulo}</h2>
            </Link>
            <div className={styles.coracao}>
                <img src={icone}
                    alt="Favoritar filme"
                    className={styles.favoritar}
                    // onMouseEnter={}
                    onClick={() => {
                        adicionarFavorito({ id, titulo, capa })
                    }}
                />
            </div>
        </div>
    )
}

export default Card;