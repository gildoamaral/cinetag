import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CacheItem {
  comentario: string
  timestamp: number
}

interface CacheGeminiStore {
  cache: Record<string, CacheItem>
  
  // Actions
  obterComentario: (titulo: string) => string | null
  salvarComentario: (titulo: string, comentario: string) => void
  limparCacheGeral: () => void // Nome mais claro para limpeza total
}

const UM_DIA_MS = 24 * 60 * 60 * 1000

// Helper para evitar chaves duplicadas (ex: "Matrix" vs "matrix")
const normalizarChave = (texto: string) => texto.trim().toLowerCase()

export const useCacheGeminiStore = create<CacheGeminiStore>()(
  persist(
    (set, get) => ({
      cache: {},

      obterComentario: (titulo) => {
        const { cache } = get()
        const chave = normalizarChave(titulo)
        const item = cache[chave]

        if (!item) return null

        const agora = Date.now()
        
        // Verificação rápida (O(1)): Se expirou, deleta SÓ este item e retorna null
        if (agora - item.timestamp > UM_DIA_MS) {
          // Usamos destructuring para remover uma chave específica de forma imutável
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { [chave]: deletado, ...restoDoCache } = cache
          
          set({ cache: restoDoCache })
          return null
        }

        return item.comentario
      },

      salvarComentario: (titulo, comentario) => {
        const chave = normalizarChave(titulo)
        
        set((state) => ({
          cache: {
            ...state.cache,
            [chave]: {
              comentario,
              timestamp: Date.now(),
            },
          },
        }))
      },

      // Use isso apenas no useEffect inicial do seu App, ou no onRehydrateStorage
      limparCacheGeral: () => {
        set((state) => {
          const agora = Date.now()
          
          // Abordagem funcional mais limpa
          const cacheValido = Object.entries(state.cache).reduce((acc, [chave, item]) => {
             if (agora - item.timestamp <= UM_DIA_MS) {
                acc[chave] = item
             }
             return acc
          }, {} as Record<string, CacheItem>)

          // Só atualiza o estado se houver diferença de tamanho (evita render desnecessário)
          if (Object.keys(cacheValido).length === Object.keys(state.cache).length) {
            return state
          }

          return { cache: cacheValido }
        })
      },
    }),
    {
      name: 'cinetag-cache-gemini',
      // Opcional: Limpar automaticamente ao carregar a página
      onRehydrateStorage: () => (state) => {
        state?.limparCacheGeral()
      }
    }
  )
)