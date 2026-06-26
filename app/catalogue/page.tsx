'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import AddToCartButton from '@/src/components/panier/AddToCartButton'
import BuyNowLink from '@/src/components/panier/BuyNowLink'
import { publicPath } from '@/src/lib/assets'
import { formatXaf } from '@/src/lib/panier'
import styles from './page.module.css'

type CategorieFiltre = 'tous' | 'miel' | 'chenille'
type TriFiltre = 'recents' | 'prix-croissant' | 'prix-decroissant' | 'mieux-notes'
type DisponibiliteFiltre = 'tous' | 'disponible' | 'rupture'

type ProduitCatalogue = {
  slug: string
  nom: string
  producteur: string
  categorie: 'miel' | 'chenille'
  image: string
  note: number
  avis: number
  prix: number
  prixLabel: string
  disponible: boolean
  badge: 'Nouveau' | 'Promo' | 'Vérifié' | 'Disponible' | 'Rupture'
}

const produits: ProduitCatalogue[] = [
  {
    slug: 'miel-foret-wolou',
    nom: 'Miel de Forêt du Wolou',
    producteur: 'Apiculteur Jean-Pierre',
    categorie: 'miel',
    image: '/images/product-honey-forest.png',
    note: 4.8,
    avis: 128,
    prix: 4500,
    prixLabel: '4 500 XAF',
    disponible: true,
    badge: 'Vérifié',
  },
  {
    slug: 'miel-fleurs-sauvages',
    nom: 'Miel de Fleurs Sauvages',
    producteur: 'Les Ruchers du Gabon',
    categorie: 'miel',
    image: '/images/product-honey-flowers.png',
    note: 4.7,
    avis: 73,
    prix: 5000,
    prixLabel: '5 000 XAF',
    disponible: true,
    badge: 'Promo',
  },
  {
    slug: 'miel-mangrove',
    nom: 'Miel de Mangrove',
    producteur: 'Nature & Saveurs',
    categorie: 'miel',
    image: '/images/product-honey-oyem.png',
    note: 4.6,
    avis: 58,
    prix: 4500,
    prixLabel: '4 500 XAF',
    disponible: true,
    badge: 'Disponible',
  },
  {
    slug: 'miel-savane',
    nom: 'Miel de Savane',
    producteur: 'Apis Gabon',
    categorie: 'miel',
    image: '/images/category-honey.png',
    note: 4.5,
    avis: 41,
    prix: 4000,
    prixLabel: '4 000 XAF',
    disponible: false,
    badge: 'Rupture',
  },
  {
    slug: 'chenilles-sechees-oyem',
    nom: "Chenilles Séchées d'Oyem",
    producteur: 'Entomo Gabon',
    categorie: 'chenille',
    image: '/images/product-caterpillars-oyem.png',
    note: 4.8,
    avis: 96,
    prix: 3500,
    prixLabel: '3 500 XAF',
    disponible: true,
    badge: 'Nouveau',
  },
  {
    slug: 'chenilles-fumees-mouila',
    nom: 'Chenilles Fumées de Mouila',
    producteur: 'Saveurs du Sud',
    categorie: 'chenille',
    image: '/images/product-caterpillars-mouila.png',
    note: 4.6,
    avis: 58,
    prix: 4000,
    prixLabel: '4 000 XAF',
    disponible: true,
    badge: 'Vérifié',
  },
  {
    slug: 'chenilles-lastoursville',
    nom: 'Chenilles de Lastoursville',
    producteur: 'Entomoculture Pro',
    categorie: 'chenille',
    image: '/images/category-caterpillars.png',
    note: 4.4,
    avis: 47,
    prix: 3800,
    prixLabel: '3 800 XAF',
    disponible: true,
    badge: 'Disponible',
  },
  {
    slug: 'chenilles-marinees',
    nom: 'Chenilles Marinées',
    producteur: 'Délices du Terroir',
    categorie: 'chenille',
    image: '/images/product-caterpillars-oyem.png',
    note: 4.3,
    avis: 36,
    prix: 4500,
    prixLabel: '4 500 XAF',
    disponible: false,
    badge: 'Rupture',
  },
]

const producteurs = ['Tous les producteurs', ...Array.from(new Set(produits.map((produit) => produit.producteur)))]

export default function Catalogue() {
  const [categorie, setCategorie] = useState<CategorieFiltre>('tous')
  const [producteur, setProducteur] = useState('Tous les producteurs')
  const [prixMax, setPrixMax] = useState(10000)
  const [tri, setTri] = useState<TriFiltre>('recents')
  const [disponibilite, setDisponibilite] = useState<DisponibiliteFiltre>('tous')
  const [recherche, setRecherche] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const rechercheUrl = params.get('recherche') ?? ''
    const typeUrl = params.get('type')

    window.queueMicrotask(() => {
      setRecherche(rechercheUrl)
      if (typeUrl === 'miel') setCategorie('miel')
      if (typeUrl === 'chenilles') setCategorie('chenille')
    })
  }, [])

  const totalMiels = produits.filter((produit) => produit.categorie === 'miel').length
  const totalChenilles = produits.filter((produit) => produit.categorie === 'chenille').length

  const produitsFiltres = useMemo(() => {
    const resultat = produits
      .filter((produit) => categorie === 'tous' || produit.categorie === categorie)
      .filter((produit) => producteur === 'Tous les producteurs' || produit.producteur === producteur)
      .filter((produit) => produit.prix <= prixMax)
      .filter((produit) => disponibilite === 'tous' || (disponibilite === 'disponible' ? produit.disponible : !produit.disponible))
      .filter((produit) => {
        const terme = recherche.trim().toLowerCase()
        if (!terme) return true
        return `${produit.nom} ${produit.producteur} ${produit.categorie}`.toLowerCase().includes(terme)
      })

    return [...resultat].sort((a, b) => {
      if (tri === 'prix-croissant') return a.prix - b.prix
      if (tri === 'prix-decroissant') return b.prix - a.prix
      if (tri === 'mieux-notes') return b.note - a.note
      return produits.indexOf(a) - produits.indexOf(b)
    })
  }, [categorie, disponibilite, producteur, prixMax, recherche, tri])

  const resetFiltres = () => {
    setCategorie('tous')
    setProducteur('Tous les producteurs')
    setPrixMax(10000)
    setDisponibilite('tous')
    setRecherche('')
    setTri('recents')
  }

  return (
    <main>

      {/* ── BREADCRUMB ── */}
      <div className={styles.breadcrumb}>
        <Link href="/" className={styles.breadcrumbLien}>Accueil</Link>
        <span>›</span>
        <span>Catalogue</span>
      </div>

      {/* ── LAYOUT ── */}
      <div className={styles.layout}>

        {/* ── SIDEBAR FILTRES ── */}
        <aside className={styles.sidebar}>
          <h2 className={styles.sidebarTitre}>Filtres</h2>

          <div className={styles.filtreGroupe}>
            <p className={styles.filtreGroupeTitre}>Catégorie</p>
            <label className={styles.filtreOption}>
              <input
                type="radio"
                name="categorie"
                checked={categorie === 'tous'}
                onChange={() => setCategorie('tous')}
              />
              <span>Tous ({produits.length})</span>
            </label>
            <label className={styles.filtreOption}>
              <input
                type="radio"
                name="categorie"
                checked={categorie === 'miel'}
                onChange={() => setCategorie('miel')}
              />
              <span>Miels ({totalMiels})</span>
            </label>
            <label className={styles.filtreOption}>
              <input
                type="radio"
                name="categorie"
                checked={categorie === 'chenille'}
                onChange={() => setCategorie('chenille')}
              />
              <span>Chenilles ({totalChenilles})</span>
            </label>
          </div>

          <div className={styles.filtreGroupe}>
            <p className={styles.filtreGroupeTitre}>Producteur</p>
            <select
              className={styles.filtreSelect}
              value={producteur}
              onChange={(event) => setProducteur(event.target.value)}
            >
              {producteurs.map((nomProducteur) => (
                <option key={nomProducteur}>{nomProducteur}</option>
              ))}
            </select>
          </div>

          <div className={styles.filtreGroupe}>
            <p className={styles.filtreGroupeTitre}>Disponibilité</p>
            <label className={styles.filtreOption}>
              <input type="radio" name="disponibilite" checked={disponibilite === 'tous'} onChange={() => setDisponibilite('tous')} />
              <span>Tous</span>
            </label>
            <label className={styles.filtreOption}>
              <input type="radio" name="disponibilite" checked={disponibilite === 'disponible'} onChange={() => setDisponibilite('disponible')} />
              <span>Disponibles</span>
            </label>
            <label className={styles.filtreOption}>
              <input type="radio" name="disponibilite" checked={disponibilite === 'rupture'} onChange={() => setDisponibilite('rupture')} />
              <span>Rupture</span>
            </label>
          </div>

          <div className={styles.filtreGroupe}>
            <p className={styles.filtreGroupeTitre}>Prix maximum</p>
            <input
              type="range"
              min={3000}
              max={10000}
              step={500}
              value={prixMax}
              onChange={(event) => setPrixMax(Number(event.target.value))}
              className={styles.prixRange}
            />
            <div className={styles.prixLabels}>
              <span>3 000 XAF</span>
              <span>{formatXaf(prixMax)}</span>
            </div>
          </div>

          <button className={styles.btnFiltrer} onClick={resetFiltres}>
            Réinitialiser
          </button>
        </aside>

        {/* ── CONTENU PRINCIPAL ── */}
        <div className={styles.contenu}>

          {/* Onglets */}
          <div className={styles.rechercheCatalogue}>
            <input
              className={styles.rechercheInput}
              placeholder="Rechercher un produit, un producteur..."
              value={recherche}
              onChange={(event) => setRecherche(event.target.value)}
            />
          </div>

          <div className={styles.onglets}>
            <button
              className={`${styles.onglet} ${categorie === 'tous' ? styles.ongletActif : ''}`}
              onClick={() => setCategorie('tous')}
            >
              Tous ({produits.length})
            </button>
            <button
              className={`${styles.onglet} ${categorie === 'miel' ? styles.ongletActif : ''}`}
              onClick={() => setCategorie('miel')}
            >
              🍯 Miels ({totalMiels})
            </button>
            <button
              className={`${styles.onglet} ${categorie === 'chenille' ? styles.ongletActif : ''}`}
              onClick={() => setCategorie('chenille')}
            >
              🐛 Chenilles ({totalChenilles})
            </button>
            <div className={styles.triBox}>
              <span className={styles.triLabel}>Trier par :</span>
              <select
                className={styles.triSelect}
                value={tri}
                onChange={(event) => setTri(event.target.value as TriFiltre)}
              >
                <option value="recents">Plus récents</option>
                <option value="prix-croissant">Prix croissant</option>
                <option value="prix-decroissant">Prix décroissant</option>
                <option value="mieux-notes">Mieux notés</option>
              </select>
            </div>
          </div>

          <div className={styles.resultatsMeta}>
            {produitsFiltres.length} produit{produitsFiltres.length > 1 ? 's' : ''} affiché{produitsFiltres.length > 1 ? 's' : ''}
          </div>

          {/* Grille produits */}
          {produitsFiltres.length > 0 ? (
            <div className={styles.produitsGrid}>
              {produitsFiltres.map((produit) => (
                <div className={styles.produitCard} key={produit.slug}>
                  <div className={styles.produitImageBox}>
                  <Image
                    src={publicPath(produit.image)}
                      alt={produit.nom}
                      width={200}
                      height={160}
                      className={styles.produitImage}
                    />
                    <span className={styles.produitBadge}>{produit.categorie === 'miel' ? 'Miel' : 'Chenille'}</span>
                    <span className={`${styles.produitEtat} ${produit.disponible ? styles.produitEtatOk : styles.produitEtatRupture}`}>
                      {produit.badge}
                    </span>
                    <button className={styles.produitFavori} type="button" aria-label={`Ajouter ${produit.nom} aux favoris`}>♡</button>
                  </div>
                  <div className={styles.produitBody}>
                    <p className={styles.produitNom}>{produit.nom}</p>
                    <p className={styles.produitProducteur}>par {produit.producteur}</p>
                    <p className={styles.produitNote}>★★★★☆ ({produit.avis})</p>
                    <p className={styles.produitPrix}>{produit.prixLabel}</p>
                    <div className={styles.produitActions}>
                      {produit.disponible ? (
                        <BuyNowLink
                          className={styles.btnAcheter}
                          item={{
                            slug: produit.slug,
                            nom: produit.nom,
                            producteur: produit.producteur,
                            categorie: produit.categorie === 'miel' ? 'Miel' : 'Chenille',
                            image: produit.image,
                            prix: produit.prix,
                            prixLabel: produit.prixLabel,
                            conditionnement: produit.categorie === 'miel' ? 'Pot de 500 g' : 'Sachet de 250 g',
                          }}
                        >
                          Acheter
                        </BuyNowLink>
                      ) : (
                        <button className={styles.btnIndisponible} type="button" disabled>Indisponible</button>
                      )}
                      <Link href={`/produit/${produit.slug}`} className={styles.btnDetails}>Voir</Link>
                      <AddToCartButton
                        className={styles.btnPanier}
                        title="Ajouter au panier"
                        item={{
                          slug: produit.slug,
                          nom: produit.nom,
                          producteur: produit.producteur,
                          categorie: produit.categorie === 'miel' ? 'Miel' : 'Chenille',
                          image: produit.image,
                          prix: produit.prix,
                          prixLabel: produit.prixLabel,
                          conditionnement: produit.categorie === 'miel' ? 'Pot de 500 g' : 'Sachet de 250 g',
                        }}
                      >
                        🛒
                      </AddToCartButton>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <p className={styles.emptyStateTitre}>Aucun produit trouvé</p>
              <p className={styles.emptyStateDesc}>Essayez une autre catégorie, un autre producteur ou un prix plus élevé.</p>
              <button className={styles.btnFiltrer} onClick={resetFiltres}>
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── FOOTER AVANTAGES ── */}
      <div className={styles.footerAvantages}>
        <div className={styles.footerAvantageItem}>
          <span className={styles.footerAvantageIcone}>🌿</span>
          <div>
            <p className={styles.footerAvantageTitre}>Produits 100% naturels</p>
            <p className={styles.footerAvantageDesc}>Des miels et chenilles sans additifs, issus de nos terroirs.</p>
          </div>
        </div>
        <div className={styles.footerAvantageItem}>
          <span className={styles.footerAvantageIcone}>🔒</span>
          <div>
            <p className={styles.footerAvantageTitre}>Paiement sécurisé</p>
            <p className={styles.footerAvantageDesc}>Vos paiements sont protégés et 100% sécurisés.</p>
          </div>
        </div>
        <div className={styles.footerAvantageItem}>
          <span className={styles.footerAvantageIcone}>🚚</span>
          <div>
            <p className={styles.footerAvantageTitre}>Livraison rapide</p>
            <p className={styles.footerAvantageDesc}>Partout au Gabon et à l&apos;international.</p>
          </div>
        </div>
        <div className={styles.footerAvantageItem}>
          <span className={styles.footerAvantageIcone}>👥</span>
          <div>
            <p className={styles.footerAvantageTitre}>Soutien aux producteurs</p>
            <p className={styles.footerAvantageDesc}>Vous soutenez directement les producteurs locaux.</p>
          </div>
        </div>
      </div>

    </main>
  )
}
