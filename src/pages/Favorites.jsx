import { Heart } from 'lucide-react'
import PetCard from '../components/PetCard'

export default function Favorites({ store, goTo }) {
  const { pets, toggleFavorite } = store
  const favs = pets.filter((p) => p.favorite)
  return (
    <section>
      <h1 className="text-3xl font-extrabold">Favorit Saya</h1>
      <p className="mb-5 mt-1 text-stone-600">Hewan yang kamu simpan untuk dipertimbangkan.</p>
      {favs.length === 0 ? (
        <div className="rounded-2xl bg-white p-10 text-center">
          <Heart className="mx-auto mb-2 text-stone-300" size={40} />
          <p className="text-stone-500">Belum ada favorit. Tekan ikon hati pada kartu hewan.</p>
          <button type="button" onClick={() => goTo('adopt')} className="mt-4 rounded-xl bg-orange-500 px-5 py-2 font-bold text-white">Lihat hewan</button>
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {favs.map((p) => <PetCard key={p.id} pet={p} onOpen={() => goTo('adopt')} onFav={toggleFavorite} />)}
        </ul>
      )}
    </section>
  )
}
