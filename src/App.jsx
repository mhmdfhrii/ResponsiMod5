import { useState, useEffect } from 'react'
import { Home, ClipboardList, Heart, User, PawPrint } from 'lucide-react'
import { usePets } from './hooks/usePets'
import Adopt from './pages/Adopt'
import Manage from './pages/Manage'
import Favorites from './pages/Favorites'
import Profile from './pages/Profile'
import PWABadge from './components/PWABadge'

const NAV = [
  { id: 'adopt', label: 'Adopsi', icon: Home },
  { id: 'manage', label: 'Kelola', icon: ClipboardList },
  { id: 'fav', label: 'Favorit', icon: Heart },
  { id: 'profile', label: 'Profil', icon: User },
]
const current = () => (NAV.some((n) => n.id === location.hash.slice(1)) ? location.hash.slice(1) : 'adopt')

export default function App() {
  const store = usePets()
  const [tab, setTab] = useState(current)

  useEffect(() => {
    const onHash = () => setTab(current())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const goTo = (id) => { location.hash = id; window.scrollTo({ top: 0 }) }
  const favCount = store.pets.filter((p) => p.favorite).length

  return (
    <div className="flex min-h-svh flex-col">
      <header className="sticky top-0 z-30 border-b border-orange-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
          <button type="button" onClick={() => goTo('adopt')} className="flex items-center gap-2 text-xl font-extrabold text-orange-500">
            <PawPrint /> PetPal
          </button>
          <nav className="hidden gap-6 md:flex">
            {NAV.map((n) => (
              <button key={n.id} type="button" onClick={() => goTo(n.id)} className={`border-b-2 pb-1 text-sm font-semibold ${tab === n.id ? 'border-orange-500 text-orange-600' : 'border-transparent text-stone-500'}`}>
                {n.label}{n.id === 'fav' && favCount > 0 && <span className="ml-1 rounded-full bg-orange-500 px-1.5 text-xs text-white">{favCount}</span>}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-4xl flex-1 px-4 pb-28 pt-6 md:pb-10">
        {tab === 'adopt' && <Adopt store={store} />}
        {tab === 'manage' && <Manage store={store} />}
        {tab === 'fav' && <Favorites store={store} goTo={goTo} />}
        {tab === 'profile' && <Profile store={store} />}
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-30 flex border-t border-orange-100 bg-white md:hidden" style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
        {NAV.map(({ id, label, icon: Icon }) => (
          <button key={id} type="button" onClick={() => goTo(id)} className={`flex flex-1 flex-col items-center gap-0.5 py-2 text-xs font-semibold ${tab === id ? 'text-orange-600' : 'text-stone-400'}`}>
            <Icon size={20} />{label}
          </button>
        ))}
      </nav>

      <PWABadge />
    </div>
  )
}
