import { Link } from "react-router-dom";
import logo from "./logo.png";
import styles from "./Cabecalho.module.css";
import CabecalhoLink from "components/CabecalhoLink";

function Cabecalho() {
    return (
        <header className={styles.cabecalho}>
            <Link to='./'>
                <img src={logo} alt="logo do cinetag"></img>
            </Link>

            <nav>
                
                <CabecalhoLink
                    url="./"
                    children="Home" />
                {/* Home
                </CabecalhoLink> */}
                <CabecalhoLink
                    url="./Favoritos"
                    children="Favoritos" />
                {/* Favoritos
                </CabecalhoLink> */}
            </nav>

        </header>

    )
}

export default Cabecalho;