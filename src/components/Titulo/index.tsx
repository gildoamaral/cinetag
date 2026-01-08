import type { ReactNode } from 'react'

interface TituloProps {
  children: ReactNode
}

function Titulo({ children }: TituloProps) {
  return (
    <div className="text-center mb-8 animate-fade-in">
      <div className="inline-block">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
          {children}
        </h1>
        <div className="h-1 w-24 mx-auto bg-linear-to-r from-primary to-secondary rounded-full" />
      </div>
    </div>
  )
}

export default Titulo
