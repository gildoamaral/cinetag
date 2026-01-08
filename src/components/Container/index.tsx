import styles from './Container.module.css'
import type { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
}

function Container({ children }: ContainerProps) {
  return <section className={styles.container}>{children}</section>
}

export default Container
