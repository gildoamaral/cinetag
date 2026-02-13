import type { ReactNode } from 'react'

interface BannerProps {
  imagem: string
  children?: ReactNode
}

function Banner({ imagem, children }: BannerProps) {
  return (
    <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden rounded-lg mb-8">
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
        style={{ backgroundImage: `url('/images/banner-${imagem}.png')` }}
      />
      <div className="absolute inset-0 bg-linear-to-t from-dark via-dark/50 to-transparent" />
      <div className="absolute inset-0 bg-linear-to-r from-primary/20 to-secondary/20" />
      
      {children && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center animate-fade-in">
            {children}
          </div>
        </div>
      )}
    </div>
  )
}

export default Banner
