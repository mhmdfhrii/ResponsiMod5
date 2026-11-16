import { useState } from 'react'
import { Pencil, Trash2, Plus, Save } from 'lucide-react'
import { SPECIES } from '../hooks/usePets'

const EMPTY = { name: '', species: 'Kucing', breed: '', age: '', gender: 'Jantan', description: '' }
const input = 'w-full rounded-lg border border-orange-200 bg-white px-3 py-2 outline-none focus:border-orange-500'

// Halaman CRUD: Create (form), Read (daftar), Update (edit), Delete (hapus)
export default function Manage({ store }) {
  const { pets, addPet, updatePet, deletePet } = store
  const [form, setForm] = useState(EMPTY)
  const [editId, setEditId] = useState(null)
  const [error, setError] = useState('')

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    if (form.name.trim().length < 2) return setError('Nama minimal 2 karakter.')
    if (form.age === '' || Number(form.age) < 0) return setError('Umur harus diisi dengan angka ≥ 0.')
    const data = { ...form, name: form.name.trim(), breed: form.breed.trim(), description: form.description.trim() || 'Belum ada deskripsi.', age: Number(form.age) }
    editId ? updatePet(editId, data) : addPet(data)
    setForm(EMPTY)
    setEditId(null)
    setError('')
  }

  const startEdit = (p) => {
    setEditId(p.id)
    setForm({ name: p.name, species: p.species, breed: p.breed, age: p.age, gender: p.gender, description: p.description })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const cancel = () => { setEditId(null); setForm(EMPTY); setError('') }
  const remove = (p) => {
    if (window.confirm(`Hapus data ${p.name}?`)) {
      deletePet(p.id)
      if (editId === p.id) cancel()
    }
  }

  return (
    <section>
      <h1 className="text-3xl font-extrabold">Kelola Hewan</h1>
      <p className="mb-5 mt-1 text-stone-600">Tambah, ubah, atau hapus data hewan yang tersedia untuk adopsi.</p>

      <form onSubmit={submit} className="mb-8 grid gap-3 rounded-2xl border border-orange-100 bg-white p-5 shadow-sm sm:grid-cols-2">
        <h2 className="font-bold sm:col-span-2">{editId ? 'Ubah data hewan' : 'Tambah hewan baru'}</h2>
        {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 sm:col-span-2">{error}</p>}
        <label className="text-sm font-medium">Nama<input className={input} value={form.name} onChange={set('name')} placeholder="Contoh: Mochi" /></label>
        <label className="text-sm font-medium">Jenis
          <select className={input} value={form.species} onChange={set('species')}>{Object.keys(SPECIES).map((s) => <option key={s}>{s}</option>)}</select>
        </label>
        <label className="text-sm font-medium">Ras<input className={input} value={form.breed} onChange={set('breed')} placeholder="Contoh: Persia" /></label>
        <label className="text-sm font-medium">Umur (tahun)<input type="number" min="0" className={input} value={form.age} onChange={set('age')} /></label>
        <label className="text-sm font-medium">Jenis kelamin
          <select className={input} value={form.gender} onChange={set('gender')}><option>Jantan</option><option>Betina</option></select>
        </label>
        <label className="text-sm font-medium sm:col-span-2">Deskripsi<textarea rows="3" className={input} value={form.description} onChange={set('description')} /></label>
        <div className="flex gap-2 sm:col-span-2">
          <button type="submit" className="flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-2.5 font-bold text-white">
            {editId ? <Save size={16} /> : <Plus size={16} />} {editId ? 'Simpan perubahan' : 'Tambah'}
          </button>
          {editId && <button type="button" onClick={cancel} className="rounded-xl border border-orange-200 bg-white px-5 py-2.5 font-semibold">Batal</button>}
        </div>
      </form>

      <h2 className="mb-3 font-bold">Daftar hewan ({pets.length})</h2>
      {pets.length === 0 && <p className="rounded-xl bg-white p-8 text-center text-stone-500">Belum ada data. Tambahkan hewan pertama!</p>}
      <ul className="space-y-2">
        {pets.map((p) => (
          <li key={p.id} className="flex items-center gap-3 rounded-xl border border-orange-100 bg-white p-3">
            <span className="text-3xl">{SPECIES[p.species] || '🐾'}</span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold">{p.name} <span className="text-xs font-normal text-stone-500">· {p.status}</span></p>
              <p className="truncate text-sm text-stone-500">{p.species} · {p.breed || 'Campuran'} · {p.age} th</p>
            </div>
            <button type="button" onClick={() => startEdit(p)} aria-label={`Ubah ${p.name}`} className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"><Pencil size={18} /></button>
            <button type="button" onClick={() => remove(p)} aria-label={`Hapus ${p.name}`} className="rounded-lg p-2 text-red-600 hover:bg-red-50"><Trash2 size={18} /></button>
          </li>
        ))}
      </ul>
    </section>
  )
}
