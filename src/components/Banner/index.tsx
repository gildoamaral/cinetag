interface BannerProps {
  imagem: string
}

function Banner({ imagem }: BannerProps) {
  return (
    <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden rounded-2xl mb-8">
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
        style={{ backgroundImage: `url('../../src/images/banner-${imagem}.png')` }}
      />
      <div className="absolute inset-0 bg-linear-to-t from-dark via-dark/50 to-transparent" />
      <div className="absolute inset-0 bg-linear-to-r from-primary/20 to-secondary/20" />
    </div>
  )
}

export default Banner
