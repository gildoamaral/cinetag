import type { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
}

function Container({ children }: ContainerProps) {
  return (
    <section className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {children}
    </section>
  )
}

export default Container
