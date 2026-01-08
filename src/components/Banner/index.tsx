import styles from './Banner.module.css'

interface BannerProps {
  imagem: string
}

function Banner({ imagem }: BannerProps) {
  return (
    <div
      className={styles.capa}
      style={{ backgroundImage: `url('/imagens/banner-${imagem}.png')` }}
    />
  )
}

export default Banner
