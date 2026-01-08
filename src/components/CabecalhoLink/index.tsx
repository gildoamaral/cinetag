import { NavLink } from 'react-router-dom'
import type { ReactNode } from 'react'

interface CabecalhoLinkProps {
  url: string
  children: ReactNode
}

function CabecalhoLink({ url, children }: CabecalhoLinkProps) {
  return (
    <NavLink 
      to={url} 
      className={({ isActive }) => `
        relative px-4 py-2 rounded-full font-medium text-sm md:text-base
        transition-all duration-300 ease-out
        ${isActive 
          ? 'bg-linear-to-r from-primary to-secondary text-white shadow-lg shadow-primary/30' 
          : 'text-gray-300 hover:text-white hover:bg-white/10'
        }
      `}
    >
      {children}
    </NavLink>
  )
}

export default CabecalhoLink
