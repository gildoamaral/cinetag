function Rodape() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-dark/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            © 2026 Cinetag. Todos os direitos reservados.
          </p>
          <p className="text-gray-500 text-sm">
            Desenvolvido por{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-medium">
              Marco Antonio Gil
            </span>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Rodape
