import styles from './Titulo.module.css'
import type { ReactNode } from 'react'

interface TituloProps {
  children: ReactNode
}

function Titulo({ children }: TituloProps) {
  return <div className={styles.texto}>{children}</div>
}

export default Titulo
