import { useState, useMemo } from 'react'
import { Search, X, PawPrint } from 'lucide-react'
import PetCard from '../components/PetCard'
import { SPECIES } from '../hooks/usePets'

export default function Adopt({ store }) {
  const { pets, toggleFavorite, adoptPet } = store
  const [q, setQ] = useState('')
  const [species, setSpecies] = useState('Semua')
  const [selectedId, setSelectedId] = useState(null)

  const list = useMemo(
    () => pets.filter((p) => (species === 'Semua' || p.species === species) && `${p.name} ${p.breed} ${p.description}`.toLowerCase().includes(q.toLowerCase())),
    [pets, q, species],
  )
  const selected = pets.find((p) => p.id === selectedId)

  return (
    <section>
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold">Temukan sahabat barumu 🐾</h1>
        <p className="mt-1 text-stone-600">Adopsi hewan peliharaan dan beri mereka rumah yang penuh kasih.</p>
      </div>

      <div className="relative mb-3">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari nama, ras, atau deskripsi…" className="w-full rounded-xl border border-orange-200 bg-white py-2.5 pl-9 pr-3 outline-none focus:border-orange-500" />
      </div>
      <div className="mb-5 flex flex-wrap gap-2">
        {['Semua', ...Object.keys(SPECIES)].map((s) => (
          <button key={s} type="button" onClick={() => setSpecies(s)} className={`rounded-full border px-3 py-1 text-sm font-medium ${species === s ? 'border-orange-500 bg-orange-500 text-white' : 'border-orange-200 bg-white text-stone-600'}`}>
            {s}
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <p className="rounded-xl bg-white p-10 text-center text-stone-500">Tidak ada hewan yang cocok.</p>
      ) : (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => <PetCard key={p.id} pet={p} onOpen={(x) => setSelectedId(x.id)} onFav={toggleFavorite} />)}
        </ul>
      )}

      {selected && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 sm:items-center" onClick={() => setSelectedId(null)}>
          <div className="w-full max-w-md rounded-2xl bg-white p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between">
              <div className="text-6xl">{SPECIES[selected.species]}</div>
              <button type="button" onClick={() => setSelectedId(null)} aria-label="Tutup"><X /></button>
            </div>
            <h2 className="mt-2 text-2xl font-bold">{selected.name}</h2>
            <p className="text-sm text-stone-500">{selected.species} · {selected.breed || 'Campuran'} · {selected.gender} · {selected.age} tahun</p>
            <p className="my-3 text-stone-700">{selected.description}</p>
            {selected.status === 'Tersedia' ? (
              <button type="button" onClick={() => adoptPet(selected.id)} className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 py-3 font-bold text-white">
                <PawPrint size={18} /> Adopsi {selected.name}
              </button>
            ) : (
              <p className="rounded-xl bg-stone-100 py-3 text-center font-semibold text-stone-600">Sudah diadopsi 💛</p>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
