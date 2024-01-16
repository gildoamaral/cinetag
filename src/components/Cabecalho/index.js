import { Link } from "react-router-dom";
import logo from "./logo.png";
import styles from "./Cabecalho.module.css";
import CabecalhoLink from "components/CabecalhoLink";

function Cabecalho() {
    return (
        <header className={styles.cabecalho}>
            <Link to='./'>
                <img src={logo} alt="logo do cinetag" className={styles.logo}></img>
            </Link>

            <nav>
                
                <CabecalhoLink url="./">
                Home
                </CabecalhoLink>
                <CabecalhoLink url="./favoritos">
                Favoritos
                </CabecalhoLink>
            </nav>

        </header>

    )
}

export default Cabecalho;