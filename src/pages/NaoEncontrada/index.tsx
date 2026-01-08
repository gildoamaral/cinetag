import styles from './NaoEncontrada.module.css'
import confuse from './confuse.png'

function NaoEncontrada() {
  return (
    <section className={styles.container}>
      <img src={confuse} alt="ghost of not found" className={styles.confuse} />
      <h2>Ops!</h2>
      <p>O conteúdo que você procura não foi encontrado</p>
    </section>
  )
}

export default NaoEncontrada
