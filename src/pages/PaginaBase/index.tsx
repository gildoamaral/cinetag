import Cabecalho from 'components/Cabecalho'
import Container from 'components/Container'
import Rodape from 'components/Rodape'
import { Outlet } from 'react-router-dom'

function PaginaBase() {
  return (
    <div className="min-h-screen flex flex-col bg-linear-to-br from-dark via-dark-lighter to-dark">
      <Cabecalho />
      <Container>
        <Outlet />
      </Container>
      <Rodape />
    </div>
  )
}

export default PaginaBase
