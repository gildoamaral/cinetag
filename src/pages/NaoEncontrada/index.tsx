import { Link } from 'react-router-dom'

function NaoEncontrada() {
  return (
    <section className="flex flex-col items-center justify-center py-20 animate-fade-in">
      {/* Animated 404 */}
      <div className="relative mb-8">
        <div className="text-[120px] md:text-[180px] font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent opacity-20">
          404
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-linear-to-br from-primary/20 to-secondary/20 flex items-center justify-center backdrop-blur-sm border border-white/10">
            <svg className="w-12 h-12 md:w-16 md:h-16 text-gray-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Message */}
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
        Ops! Página não encontrada
      </h2>
      <p className="text-gray-400 text-center max-w-md mb-8">
        O conteúdo que você procura não existe ou foi movido para outro lugar.
      </p>

      {/* Action Button */}
      <Link 
        to="/"
        className="group flex items-center gap-2 px-6 py-3 bg-linear-to-r from-primary to-secondary text-white font-medium rounded-full hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:scale-105"
      >
        <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Voltar para Home
      </Link>
    </section>
  )
}

export default NaoEncontrada
