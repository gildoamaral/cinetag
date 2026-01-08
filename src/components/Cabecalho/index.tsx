import { Link } from 'react-router-dom'
import logo from './logo.png'
import CabecalhoLink from 'components/CabecalhoLink'

function Cabecalho() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-dark/80 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center group">
            <img 
              src={logo} 
              alt="logo do cinetag" 
              className="h-10 md:h-12 transition-transform duration-300 group-hover:scale-110"
            />
          </Link>

          <nav className="flex items-center gap-2">
            <CabecalhoLink url="/">Home</CabecalhoLink>
            <CabecalhoLink url="/favoritos">Favoritos</CabecalhoLink>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Cabecalho
