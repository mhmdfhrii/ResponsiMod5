import { Heart } from 'lucide-react'
import { SPECIES } from '../hooks/usePets'

export default function PetCard({ pet, onOpen, onFav }) {
  const adopted = pet.status === 'Teradopsi'
  return (
    <li className="relative overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm transition hover:shadow-md">
      <button type="button" onClick={() => onOpen(pet)} className="block w-full text-left" aria-label={`Lihat ${pet.name}`}>
        <div className="flex h-32 items-center justify-center bg-orange-100 text-6xl">{SPECIES[pet.species] || '🐾'}</div>
        <div className="p-4">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-lg font-bold">{pet.name}</h3>
            <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${adopted ? 'bg-stone-200 text-stone-600' : 'bg-green-100 text-green-700'}`}>{pet.status}</span>
          </div>
          <p className="text-sm text-stone-500">{pet.species} · {pet.breed || 'Campuran'} · {pet.age} th</p>
          <p className="mt-2 line-clamp-2 text-sm text-stone-600">{pet.description}</p>
        </div>
      </button>
      <button
        type="button"
        onClick={() => onFav(pet.id)}
        aria-label={pet.favorite ? 'Hapus dari favorit' : 'Tambah ke favorit'}
        className="absolute right-2 top-2 rounded-full bg-white/90 p-2 shadow"
      >
        <Heart size={18} className={pet.favorite ? 'fill-red-500 text-red-500' : 'text-stone-400'} />
      </button>
    </li>
  )
}
