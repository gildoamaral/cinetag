/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Video } from '@/types'

const API_KEY = import.meta.env.VITE_API_KEY;
const API_BASE = import.meta.env.VITE_API_BASE;
const IMG_BASE = import.meta.env.VITE_IMG_BASE;

const mapToVideo = (movie: any): Video => ({
  id: movie.id.toString(),
  titulo: movie.title,
  capa: `${IMG_BASE}${movie.poster_path}`,
  link: movie.videos?.results.find((v: any) => v.type === 'Trailer') 
        ? `https://www.youtube.com/embed/${movie.videos.results.find((v: any) => v.type === 'Trailer').key}`
        : `https://www.youtube.com/embed/dQw4w9WgXcQ` 
});

export async function fetchVideos(): Promise<Video[]> {
  const response = await fetch(`${API_BASE}/movie/popular?api_key=${API_KEY}&language=pt-BR&append_to_response=videos`)
  if (!response.ok) {
    throw new Error('Erro ao carregar vídeos')
  }
  const data = await response.json()
  console.log(data.results.map(mapToVideo));
  return data.results.map(mapToVideo)
}

export async function fetchVideoById(id: string): Promise<Video | null> {
  const response = await fetch(`${API_BASE}/movie/${id}?api_key=${API_KEY}&language=pt-BR&append_to_response=videos`)
  
  if (!response.ok) {
    return null
  }
  
  const data = await response.json()
  return mapToVideo(data)
}
