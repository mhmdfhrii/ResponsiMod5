import { PawPrint, RotateCcw } from 'lucide-react'

const PROFILE = { nama: 'Muhammad Fahri Sani', nim: '21120124140132', kelompok: '20' }

export default function Profile({ store }) {
  const { pets, resetPets } = store
  const stats = [
    ['Total hewan', pets.length],
    ['Tersedia', pets.filter((p) => p.status === 'Tersedia').length],
    ['Teradopsi', pets.filter((p) => p.status === 'Teradopsi').length],
    ['Favorit', pets.filter((p) => p.favorite).length],
  ]
  return (
    <section>
      <h1 className="text-3xl font-extrabold">Profil</h1>
      <div className="mb-5 mt-4 rounded-2xl border border-orange-100 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-500 text-white"><PawPrint size={30} /></div>
          <div>
            <h2 className="text-xl font-bold">{PROFILE.nama}</h2>
            <p className="text-sm text-stone-500">Praktikum PPB · PWA PetPal</p>
          </div>
        </div>
        <dl className="mt-5 divide-y divide-orange-100 text-sm">
          {[['Nama', PROFILE.nama], ['NIM', PROFILE.nim], ['Kelompok', PROFILE.kelompok]].map(([k, v]) => (
            <div key={k} className="flex justify-between py-2.5"><dt className="text-stone-500">{k}</dt><dd className="font-semibold">{v}</dd></div>
          ))}
        </dl>
      </div>
      <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map(([label, val]) => (
          <div key={label} className="rounded-xl border border-orange-100 bg-white p-4 text-center">
            <p className="text-2xl font-extrabold text-orange-500">{val}</p>
            <p className="text-xs text-stone-500">{label}</p>
          </div>
        ))}
      </div>
      <button type="button" onClick={() => window.confirm('Kembalikan data ke contoh awal?') && resetPets()} className="flex items-center gap-2 rounded-xl border border-orange-200 bg-white px-4 py-2 text-sm font-semibold">
        <RotateCcw size={16} /> Reset data contoh
      </button>
    </section>
  )
}
