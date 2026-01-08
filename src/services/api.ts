import type { Video } from '@/types'

const API_BASE = import.meta.env.VITE_API_BASE;

export async function fetchVideos(): Promise<Video[]> {
  const response = await fetch(`${API_BASE}/videos`)
  if (!response.ok) {
    throw new Error('Erro ao carregar vídeos')
  }
  return response.json()
}

export async function fetchVideoById(id: string): Promise<Video | null> {
  const response = await fetch(`${API_BASE}/videos?id=${id}`)
  if (!response.ok) {
    throw new Error('Erro ao carregar vídeo')
  }
  const data: Video[] = await response.json()
  return data.length > 0 ? data[0] : null
}
