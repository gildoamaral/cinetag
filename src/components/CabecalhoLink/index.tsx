import { Link } from 'react-router-dom'
import styles from './CabecalhoLink.module.css'
import type { ReactNode } from 'react'

interface CabecalhoLinkProps {
  url: string
  children: ReactNode
}

function CabecalhoLink({ url, children }: CabecalhoLinkProps) {
  return (
    <Link to={url} className={styles.link}>
      {children}
    </Link>
  )
}

export default CabecalhoLink
