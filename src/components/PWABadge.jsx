import { useState, useEffect } from 'react'
import { Download, WifiOff, X } from 'lucide-react'

// Banner status offline + tombol install PWA
export default function PWABadge() {
  const [prompt, setPrompt] = useState(null)
  const [offline, setOffline] = useState(!navigator.onLine)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const onPrompt = (e) => { e.preventDefault(); setPrompt(e) }
    const onInstalled = () => setPrompt(null)
    const on = () => setOffline(false)
    const off = () => setOffline(true)
    window.addEventListener('beforeinstallprompt', onPrompt)
    window.addEventListener('appinstalled', onInstalled)
    window.addEventListener('online', on)
    window.addEventListener('offline', off)
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt)
      window.removeEventListener('appinstalled', onInstalled)
      window.removeEventListener('online', on)
      window.removeEventListener('offline', off)
    }
  }, [])

  const install = async () => {
    prompt.prompt()
    await prompt.userChoice
    setPrompt(null)
  }

  const box = 'fixed left-4 right-4 bottom-24 md:bottom-6 md:left-auto md:right-6 md:w-96 z-40 flex items-center justify-between gap-3 rounded-xl px-4 py-3 shadow-lg text-sm'
  if (offline) {
    return (
      <aside className={`${box} bg-stone-800 text-white`} role="status">
        <span className="flex items-center gap-2"><WifiOff size={16} /> Mode offline: data tersimpan di perangkat.</span>
      </aside>
    )
  }
  if (prompt && !hidden) {
    return (
      <aside className={`${box} border border-orange-200 bg-white`}>
        <span className="flex items-center gap-2"><Download size={16} className="text-orange-500" /> Pasang <b>PetPal</b> di perangkatmu</span>
        <span className="flex items-center gap-2">
          <button type="button" onClick={install} className="rounded-lg bg-orange-500 px-3 py-1.5 font-semibold text-white">Install</button>
          <button type="button" onClick={() => setHidden(true)} aria-label="Tutup"><X size={16} /></button>
        </span>
      </aside>
    )
  }
  return null
}
