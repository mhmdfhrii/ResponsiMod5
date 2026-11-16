import { useState, useEffect } from 'react'

export const SPECIES = { Kucing: '🐱', Anjing: '🐶', Kelinci: '🐰', Burung: '🐦', Hamster: '🐹' }
const KEY = 'petpal_pets_v1'

const SEED = [
  { id: 's1', name: 'Mochi', species: 'Kucing', breed: 'Persia', age: 2, gender: 'Betina', description: 'Manja, suka tidur di pangkuan, sudah divaksin lengkap.', status: 'Tersedia', favorite: false },
  { id: 's2', name: 'Bruno', species: 'Anjing', breed: 'Golden Retriever', age: 3, gender: 'Jantan', description: 'Ramah dengan anak-anak dan sangat suka bermain bola.', status: 'Tersedia', favorite: false },
  { id: 's3', name: 'Cotton', species: 'Kelinci', breed: 'Holland Lop', age: 1, gender: 'Betina', description: 'Tenang, bulu lembut, makan sayur dengan lahap.', status: 'Tersedia', favorite: false },
  { id: 's4', name: 'Kiko', species: 'Burung', breed: 'Lovebird', age: 1, gender: 'Jantan', description: 'Aktif berkicau di pagi hari dan mudah dijinakkan.', status: 'Tersedia', favorite: false },
  { id: 's5', name: 'Nugget', species: 'Hamster', breed: 'Syrian', age: 1, gender: 'Jantan', description: 'Lucu dan aktif di malam hari, cocok untuk pemula.', status: 'Tersedia', favorite: false },
  { id: 's6', name: 'Luna', species: 'Kucing', breed: 'Domestik', age: 4, gender: 'Betina', description: 'Kucing rumahan yang tenang, sudah steril.', status: 'Teradopsi', favorite: false },
]

const read = () => {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : SEED
  } catch {
    return SEED
  }
}

const newId = () => (crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random()))

// Custom hook: state + CRUD + persistence ke localStorage (tetap jalan offline)
export function usePets() {
  const [pets, setPets] = useState(read)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(pets))
    } catch {
      /* storage penuh / mode privat */
    }
  }, [pets])

  const addPet = (data) =>
    setPets((p) => [{ ...data, id: newId(), status: 'Tersedia', favorite: false }, ...p])
  const updatePet = (id, data) => setPets((p) => p.map((x) => (x.id === id ? { ...x, ...data } : x)))
  const deletePet = (id) => setPets((p) => p.filter((x) => x.id !== id))
  const toggleFavorite = (id) => setPets((p) => p.map((x) => (x.id === id ? { ...x, favorite: !x.favorite } : x)))
  const adoptPet = (id) => updatePet(id, { status: 'Teradopsi' })
  const resetPets = () => setPets(SEED)

  return { pets, addPet, updatePet, deletePet, toggleFavorite, adoptPet, resetPets }
}
