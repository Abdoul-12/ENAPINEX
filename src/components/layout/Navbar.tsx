'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getPanierCount, PANIER_EVENT } from '@/src/lib/panier'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [panierCount, setPanierCount] = useState(0)
  const [recherche, setRecherche] = useState('')
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const synchroniserPanier = () => setPanierCount(getPanierCount())

    synchroniserPanier()
    window.addEventListener(PANIER_EVENT, synchroniserPanier)
    window.addEventListener('storage', synchroniserPanier)

    return () => {
      window.removeEventListener(PANIER_EVENT, synchroniserPanier)
      window.removeEventListener('storage', synchroniserPanier)
    }
  }, [])

  const lancerRecherche = () => {
    const terme = recherche.trim()
    if (terme) {
      router.push(`/catalogue?recherche=${encodeURIComponent(terme)}`)
    } else {
      router.push('/catalogue')
    }
  }

  const navClass = (href: string) => (
    `${styles.navLien} ${pathname === href ? styles.navLienActif : ''}`
  )

  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/images/logo.jpeg"
            alt="ENAPINEX"
            width={52}
            height={52}
            className={styles.logoImage}
          />
          <div className={styles.logoTexte}>
            <span className={styles.logoNom}>ENAPINEX</span>
            <span className={styles.logoSlogan}>Les saveurs du terroir gabonais</span>
          </div>
        </Link>

        <form
          className={styles.recherche}
          onSubmit={(event) => {
            event.preventDefault()
            lancerRecherche()
          }}
        >
          <input
            type="text"
            placeholder="Rechercher un miel, une chenille ou un producteur..."
            className={styles.rechercheInput}
            value={recherche}
            onChange={(event) => setRecherche(event.target.value)}
          />
          <button className={styles.rechercheBtn} type="submit" aria-label="Rechercher">🔍</button>
        </form>

        <div className={styles.actions}>
          <Link href="/auth" className={`${styles.actionLien} ${styles.actionConnexion}`}>
            <span>👤</span>
            <span>Se connecter</span>
          </Link>
          <Link href="/panier" className={`${styles.actionLien} ${styles.actionPanier}`}>
            <div className={styles.panierBox}>
              <span>🛒</span>
              {panierCount > 0 && (
                <span className={styles.panierBadge}>{panierCount}</span>
              )}
            </div>
            <span>Panier</span>
          </Link>
        </div>
      </div>

      <nav className={styles.nav}>
        <Link href="/" className={navClass('/')}>Accueil</Link>
        <Link href="/catalogue" className={navClass('/catalogue')}>Catalogue</Link>
        <Link href="/dashboard/producteur" className={navClass('/dashboard/producteur')}>Producteurs</Link>
        <Link href="/contact" className={navClass('/contact')}>Contact</Link>
      </nav>
    </header>
  )
}
