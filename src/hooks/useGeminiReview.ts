import { useState, useCallback, useRef } from 'react';
import { useCacheGeminiStore } from '@/stores/cacheGeminiStore';

export const useGeminiReview = (titulo: string | undefined) => {
  const [comentario, setComentario] = useState<string>('');
  const [loadingAI, setLoadingAI] = useState(false);
  
  // Zustand store para cache
  const { obterComentario, salvarComentario } = useCacheGeminiStore();
  
  // Armazena qual foi o último título processado
  const tituloProcessado = useRef<string | null>(null);

  const buscarComentario = useCallback(async () => {
    // Se não tem título ou já foi processado, cancela
    if (!titulo || titulo === tituloProcessado.current) return;

    // Marca imediatamente como processado
    tituloProcessado.current = titulo;

    // Verifica se há comentário no cache
    const comentarioEmCache = obterComentario(titulo);
    if (comentarioEmCache) {
      // Delay de 1 segundo antes de exibir (mesmo do cache)
      setLoadingAI(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setComentario(comentarioEmCache);
      setLoadingAI(false);
      return;
    }

    // Se não há cache, faz a requisição
    setLoadingAI(true);

    // Delay inicial de 1 segundo
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      // Detecta automaticamente a URL correta
      const apiUrl = import.meta.env.DEV 
        ? 'http://localhost:3001/api/comentario'  // Desenvolvimento local
        : '/api/comentario';  // Produção (Vercel)

      const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ titulo })
      });

      if (!response.ok) throw new Error('Falha na resposta do servidor');

      const data = await response.json();
      setComentario(data.comentario);
      // Salva no cache
      salvarComentario(titulo, data.comentario);
      
    } catch (error) {
      console.error('Erro:', error);
      const mensagemErro = 'A IA está de folga e não quis comentar.';
      setComentario(mensagemErro);
      // Também salva o erro em cache para não repetir a requisição
      salvarComentario(titulo, mensagemErro);
    } finally {
      setLoadingAI(false);
    }
  }, [titulo, obterComentario, salvarComentario]);

  return { comentario, loadingAI, buscarComentario };
};