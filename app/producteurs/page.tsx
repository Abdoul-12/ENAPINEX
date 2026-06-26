'use client'

import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import { publicPath } from '@/src/lib/assets'
import styles from './page.module.css'

type Onglet = 'tableau-de-bord' | 'mes-produits' | 'publication' | 'mes-commandes'
type PublicationForm = {
  nom: string
  categorie: string
  conditionnement: string
  description: string
  prix: string
  stock: string
  ville: string
  delai: string
}

export default function DashboardProducteur() {
  const [onglet, setOnglet] = useState<Onglet>('tableau-de-bord')
  const [modalOuvert, setModalOuvert] = useState(false)
  const [filtreActif, setFiltreActif] = useState('Tous')
  const [profilOuvert, setProfilOuvert] = useState(false)
  const [profilNom, setProfilNom] = useState('Jean-Pierre')
  const [profilRole, setProfilRole] = useState('Apiculteur')
  const [profilLieu, setProfilLieu] = useState('Woleu-Ntem, Gabon')
  const [profilImage, setProfilImage] = useState('/images/logo.jpeg')
  const [publication, setPublication] = useState<PublicationForm>({
    nom: '',
    categorie: '🍯 Miel',
    conditionnement: '',
    description: '',
    prix: '',
    stock: '',
    ville: '',
    delai: 'Disponible immédiatement',
  })
  const [messagePublication, setMessagePublication] = useState('')
  const [ventesMois, setVentesMois] = useState([
    { label: '1 mai', h: 30, ventes: 4 },
    { label: '6 mai', h: 45, ventes: 7 },
    { label: '11 mai', h: 60, ventes: 10 },
    { label: '16 mai', h: 85, ventes: 15 },
    { label: '21 mai', h: 70, ventes: 12 },
    { label: '25 mai', h: 95, ventes: 18 },
  ])

  useEffect(() => {
    const interval = window.setInterval(() => {
      setVentesMois((courbe) => {
        const prochaine = courbe.map((item, index) => (
          index === courbe.length - 1
            ? { ...item, ventes: item.ventes + 1, h: Math.min(100, item.h + 4) }
            : { ...item, h: Math.max(20, item.h - 1) }
        ))

        return prochaine
      })
    }, 4500)

    return () => window.clearInterval(interval)
  }, [])

  const ventesTotalesMois = useMemo(
    () => ventesMois.reduce((total, item) => total + item.ventes, 0),
    [ventesMois],
  )

  const changerPublication = <K extends keyof PublicationForm>(champ: K, valeur: PublicationForm[K]) => {
    setPublication((formulaire) => ({ ...formulaire, [champ]: valeur }))
    setMessagePublication('')
  }

  const validerPublication = () => {
    if (!publication.nom.trim() || !publication.conditionnement.trim() || !publication.description.trim()) {
      setMessagePublication('Renseignez le nom, le conditionnement et la description du produit.')
      return
    }

    if (Number(publication.prix) <= 0 || Number(publication.stock) < 0) {
      setMessagePublication('Le prix doit être supérieur à 0 et le stock doit être valide.')
      return
    }

    if (!publication.ville.trim()) {
      setMessagePublication('Indiquez la ville d’expédition du produit.')
      return
    }

    setMessagePublication('Produit prêt à être publié. La sauvegarde réelle sera branchée au backend.')
  }

  return (
    <div className={styles.layout}>

      {/* ── SIDEBAR ── */}
      <aside className={styles.sidebar}>

        <div className={styles.sidebarProfil}>
          <button
            className={styles.sidebarProfilInfo}
            onClick={() => setProfilOuvert(!profilOuvert)}
            type="button"
          >
            <Image src={publicPath(profilImage)} alt={profilNom} width={44} height={44} className={styles.sidebarProfilPhoto} unoptimized />
            <div>
              <p className={styles.sidebarProfilNom}>{profilNom}</p>
              <p className={styles.sidebarProfilRole}>{profilRole}</p>
              <p className={styles.sidebarProfilLieu}>{profilLieu}</p>
            </div>
            <span className={styles.sidebarProfilChevron}>{profilOuvert ? '▴' : '▾'}</span>
          </button>

          {profilOuvert && (
            <div className={styles.profilEdition}>
              <label className={styles.profilPhotoLabel}>
                <span>Changer la photo</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    const fichier = event.target.files?.[0]
                    if (fichier) {
                      setProfilImage(URL.createObjectURL(fichier))
                    }
                  }}
                />
              </label>

              <label className={styles.profilLabel}>
                Nom
                <input
                  type="text"
                  value={profilNom}
                  onChange={(event) => setProfilNom(event.target.value)}
                  className={styles.profilInput}
                />
              </label>

              <label className={styles.profilLabel}>
                Activité
                <input
                  type="text"
                  value={profilRole}
                  onChange={(event) => setProfilRole(event.target.value)}
                  className={styles.profilInput}
                />
              </label>

              <label className={styles.profilLabel}>
                Localisation
                <input
                  type="text"
                  value={profilLieu}
                  onChange={(event) => setProfilLieu(event.target.value)}
                  className={styles.profilInput}
                />
              </label>

              <button className={styles.profilFermer} onClick={() => setProfilOuvert(false)} type="button">
                Enregistrer
              </button>
            </div>
          )}
        </div>

        <nav className={styles.sidebarNav}>
          <button
            className={`${styles.navBtn} ${onglet === 'tableau-de-bord' ? styles.navBtnActif : ''}`}
            onClick={() => setOnglet('tableau-de-bord')}
          >
            <span className={styles.navIcone}>🏠</span>
            Tableau de bord
          </button>
          <button
            className={`${styles.navBtn} ${onglet === 'mes-produits' ? styles.navBtnActif : ''}`}
            onClick={() => setOnglet('mes-produits')}
          >
            <span className={styles.navIcone}>📦</span>
            Mes produits
          </button>
          <button
            className={`${styles.navBtn} ${onglet === 'publication' ? styles.navBtnActif : ''}`}
            onClick={() => setOnglet('publication')}
          >
            <span className={styles.navIcone}>➕</span>
            Publication
          </button>
          <button
            className={`${styles.navBtn} ${onglet === 'mes-commandes' ? styles.navBtnActif : ''}`}
            onClick={() => setOnglet('mes-commandes')}
          >
            <span className={styles.navIcone}>🛒</span>
            Mes commandes
            <span className={styles.navBadge}>12</span>
          </button>
        </nav>

        <div className={styles.sidebarFooter}>
          <button className={styles.navDeconnexion}>
            <span className={styles.navIcone}>🚪</span>
            Déconnexion
          </button>
        </div>

      </aside>

      {/* ── CONTENU ── */}
      <main className={styles.contenu}>

        {/* ════════════════════════════════════════
            TABLEAU DE BORD
        ════════════════════════════════════════ */}
        {onglet === 'tableau-de-bord' && (
          <>
            <div className={styles.header}>
              <div>
                <h1 className={styles.headerTitre}>Bonjour Jean-Pierre ! 👋</h1>
                <p className={styles.headerDesc}>Voici un aperçu de votre activité sur ENAPINEX.</p>
              </div>
              <span className={styles.badgeVerifie}>✓ Boutique vérifiée</span>
            </div>

            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <div className={`${styles.statIconeBox} ${styles.statIconeOrange}`}>🛒</div>
                <div>
                  <p className={styles.statLabel}>Commandes totales</p>
                  <p className={styles.statValeur}>{ventesTotalesMois}</p>
                  <p className={styles.statEvolution}>+12 cette semaine ↗</p>
                </div>
              </div>
              <div className={styles.statCard}>
                <div className={`${styles.statIconeBox} ${styles.statIconeVert}`}>💰</div>
                <div>
                  <p className={styles.statLabel}>Revenus totaux</p>
                  <p className={styles.statValeur}>732 500 XAF</p>
                  <p className={styles.statEvolution}>+15% ce mois ↗</p>
                </div>
              </div>
              <div className={styles.statCard}>
                <div className={`${styles.statIconeBox} ${styles.statIconeBleu}`}>📦</div>
                <div>
                  <p className={styles.statLabel}>Produits en vente</p>
                  <p className={styles.statValeur}>12</p>
                  <p className={styles.statEvolution} style={{ color: '#1565c0' }}>Actifs</p>
                </div>
              </div>
              <div className={styles.statCard}>
                <div className={`${styles.statIconeBox} ${styles.statIconeJaune}`}>⭐</div>
                <div>
                  <p className={styles.statLabel}>Note moyenne</p>
                  <p className={styles.statValeur}>4,8 / 5</p>
                  <p className={styles.statEvolution} style={{ color: '#6B4F35' }}>128 avis</p>
                </div>
              </div>
            </div>

            <div className={styles.graphiqueSection}>
              <p className={styles.graphiqueTitre}>Évolution des ventes — Ce mois</p>
              <div className={styles.graphique}>
                {ventesMois.map((item) => (
                  <div key={item.label} className={styles.graphiqueBarre} title={`${item.ventes} ventes`}>
                    <div className={styles.barre} style={{ height: `${item.h}%` }}></div>
                    <span className={styles.barreLabel}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.infosGrid}>
              <div className={styles.infoCard}>
                <div className={styles.infoCardHeader}>
                  <h2 className={styles.infoCardTitre}>Commandes récentes</h2>
                  <button className={styles.infoCardLien} onClick={() => setOnglet('mes-commandes')}>
                    Voir toutes
                  </button>
                </div>
                {[
                  { img: '/images/product-honey-forest.png', nom: 'Miel de Forêt du Woleu', ref: '#ENAP-2024-05-25-1368', date: '25 mai 2024', badge: <span className={styles.badgeLivre}>Livrée</span> },
                  { img: '/images/product-caterpillars-oyem.png', nom: 'Chenilles Séchées d\'Oyem', ref: '#ENAP-2024-05-25-1367', date: '25 mai 2024', badge: <span className={styles.badgeLivre}>Livrée</span> },
                  { img: '/images/product-honey-flowers.png', nom: 'Miel de Fleurs Sauvages', ref: '#ENAP-2024-05-24-1348', date: '24 mai 2024', badge: <span className={styles.badgeLivraison}>En livraison</span> },
                  { img: '/images/product-caterpillars-mouila.png', nom: 'Chenilles Fumées de Mouila', ref: '#ENAP-2024-05-24-1345', date: '24 mai 2024', badge: <span className={styles.badgePreparation}>En préparation</span> },
                ].map((c, i) => (
                  <div key={i} className={styles.commandeItem}>
                    <Image src={publicPath(c.img)} alt={c.nom} width={48} height={48} className={styles.commandeImage} />
                    <div className={styles.commandeInfos}>
                      <p className={styles.commandeNom}>{c.nom}</p>
                      <p className={styles.commandeRef}>Commande {c.ref}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p className={styles.commandeDate}>{c.date}</p>
                      {c.badge}
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <div className={styles.infoCard} style={{ marginBottom: '1.5rem' }}>
                  <div className={styles.infoCardHeader}>
                    <h2 className={styles.infoCardTitre}>Produits les plus vendus</h2>
                    <button className={styles.infoCardLien} onClick={() => setOnglet('mes-produits')}>
                      Voir tous mes produits
                    </button>
                  </div>
                  {[
                    { rang: 1, img: '/images/product-honey-forest.png', nom: 'Miel de Forêt du Woleu', desc: 'Pot de 500 g', ventes: '23 ventes', revenu: '207 000 XAF' },
                    { rang: 2, img: '/images/product-caterpillars-oyem.png', nom: 'Chenilles Séchées d\'Oyem', desc: 'Sachet de 250 g', ventes: '15 ventes', revenu: '105 000 XAF' },
                    { rang: 3, img: '/images/product-honey-flowers.png', nom: 'Miel de Fleurs Sauvages', desc: 'Pot de 1 kg', ventes: '10 ventes', revenu: '80 000 XAF' },
                  ].map((p, i) => (
                    <div key={i} className={styles.produitVenduItem}>
                      <span className={styles.produitVenduRang}>{p.rang}</span>
                      <Image src={publicPath(p.img)} alt={p.nom} width={48} height={48} className={styles.produitVenduImage} />
                      <div className={styles.produitVenduInfos}>
                        <p className={styles.produitVenduNom}>{p.nom}</p>
                        <p className={styles.produitVenduDesc}>{p.desc}</p>
                      </div>
                      <div className={styles.produitVenduVentes}>
                        <p>{p.ventes}</p>
                        <p className={styles.produitVenduRevenu}>{p.revenu}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className={styles.infoCard}>
                  <div className={styles.infoCardHeader}>
                    <h2 className={styles.infoCardTitre}>Avis récents</h2>
                    <button className={styles.infoCardLien}>Voir tous les avis</button>
                  </div>
                  <div className={styles.avisItem}>
                    <div className={styles.avisHeader}>
                      <span className={styles.avisNote}>★★★★★</span>
                      <span className={styles.avisDate}>24 mai 2024</span>
                    </div>
                    <p className={styles.avisAuteur}>Marie L.</p>
                    <p className={styles.avisCommentaire}>Excellent miel ! Goût authentique et livraison rapide.</p>
                  </div>
                  <div className={styles.avisItem}>
                    <div className={styles.avisHeader}>
                      <span className={styles.avisNote}>★★★★★</span>
                      <span className={styles.avisDate}>22 mai 2024</span>
                    </div>
                    <p className={styles.avisAuteur}>Patrick B.</p>
                    <p className={styles.avisCommentaire}>Très bonnes chenilles, bien préparées. Je recommande.</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ════════════════════════════════════════
            MES PRODUITS
        ════════════════════════════════════════ */}
        {onglet === 'mes-produits' && (
          <>
            <div className={styles.header}>
              <div>
                <h1 className={styles.headerTitre}>Mes produits</h1>
                <p className={styles.headerDesc}>Gérez votre catalogue de miels et chenilles.</p>
              </div>
              <button className={styles.btnAjouter} onClick={() => setOnglet('publication')}>
                + Ajouter un produit
              </button>
            </div>

            <div className={styles.statsRapides}>
              <div className={styles.statCardSmall}>
                <span className={styles.statCardSmallIcone}>📦</span>
                <div>
                  <p className={styles.statCardSmallLabel}>Total produits</p>
                  <p className={styles.statCardSmallValeur}>12</p>
                </div>
              </div>
              <div className={styles.statCardSmall}>
                <span className={styles.statCardSmallIcone}>✅</span>
                <div>
                  <p className={styles.statCardSmallLabel}>Disponibles</p>
                  <p className={styles.statCardSmallValeur}>10</p>
                </div>
              </div>
              <div className={styles.statCardSmall}>
                <span className={styles.statCardSmallIcone}>❌</span>
                <div>
                  <p className={styles.statCardSmallLabel}>Rupture de stock</p>
                  <p className={styles.statCardSmallValeur}>2</p>
                </div>
              </div>
            </div>

            <div className={styles.filtresBar}>
              {['Tous', '🍯 Miels', '🐛 Chenilles', 'Disponibles', 'Rupture'].map((f) => (
                <button
                  key={f}
                  className={`${styles.filtrePill} ${filtreActif === f ? styles.filtrePillActif : ''}`}
                  onClick={() => setFiltreActif(f)}
                >
                  {f}
                </button>
              ))}
            </div>

            <div className={styles.tableauBox}>
              <div className={`${styles.tableauHeader} ${styles.tableauHeaderProduits}`}>
                <span>Produit</span>
                <span>Type</span>
                <span>Prix</span>
                <span>Stock</span>
                <span>Statut</span>
                <span>Actions</span>
              </div>

              {[
                { img: '/images/product-honey-forest.png', nom: 'Miel de Forêt du Woleu', desc: 'Pot de 500 g', type: '🍯 Miel', prix: '4 500 XAF', stock: '25 pots', dispo: true },
                { img: '/images/product-caterpillars-oyem.png', nom: 'Chenilles Séchées d\'Oyem', desc: 'Sachet de 250 g', type: '🐛 Chenilles', prix: '3 500 XAF', stock: '18 sachets', dispo: true },
                { img: '/images/product-honey-flowers.png', nom: 'Miel de Fleurs Sauvages', desc: 'Pot de 1 kg', type: '🍯 Miel', prix: '5 000 XAF', stock: '0 pot', dispo: false },
                { img: '/images/product-caterpillars-mouila.png', nom: 'Chenilles Fumées de Mouila', desc: 'Sachet de 500 g', type: '🐛 Chenilles', prix: '4 000 XAF', stock: '8 sachets', dispo: true },
                { img: '/images/product-honey-oyem.png', nom: 'Miel de Mangrove', desc: 'Pot de 500 g', type: '🍯 Miel', prix: '4 500 XAF', stock: '12 pots', dispo: true },
              ].map((p, i) => (
                <div key={i} className={styles.produitLigne}>
                  <div className={styles.produitInfo}>
                    <Image src={publicPath(p.img)} alt={p.nom} width={52} height={52} className={styles.produitImage} />
                    <div>
                      <p className={styles.produitNom}>{p.nom}</p>
                      <p className={styles.produitDesc}>{p.desc}</p>
                    </div>
                  </div>
                  <p className={styles.produitType}>{p.type}</p>
                  <p className={styles.produitPrix}>{p.prix}</p>
                  <p className={styles.produitStock}>{p.stock}</p>
                  {p.dispo
                    ? <span className={styles.badgeDisponible}>✓ Disponible</span>
                    : <span className={styles.badgeRupture}>✗ Rupture</span>
                  }
                  <div className={styles.actions}>
                    <button className={styles.btnModifier}>✏️</button>
                    <button className={styles.btnSupprimer}>🗑</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ════════════════════════════════════════
            PUBLICATION
        ════════════════════════════════════════ */}
        {onglet === 'publication' && (
          <>
            <div className={styles.header}>
              <div>
                <h1 className={styles.headerTitre}>Publier un produit</h1>
                <p className={styles.headerDesc}>Ajoutez une nouvelle fiche produit visible dans votre catalogue.</p>
              </div>
              <button className={styles.btnAjouter} onClick={() => setOnglet('mes-produits')}>
                Voir mes produits
              </button>
            </div>

            <div className={styles.publicationLayout}>
              <section className={styles.publicationForm}>
                <div className={styles.publicationSection}>
                  <h2 className={styles.publicationTitre}>Informations principales</h2>
                  <div className={styles.formGroupe}>
                      <label className={styles.formLabel}>Nom du produit</label>
                    <input
                      type="text"
                      placeholder="Ex: Miel de forêt du Woleu"
                      className={styles.formInput}
                      value={publication.nom}
                      onChange={(event) => changerPublication('nom', event.target.value)}
                    />
                  </div>
                  <div className={styles.formGrille}>
                    <div className={styles.formGroupe}>
                      <label className={styles.formLabel}>Catégorie</label>
                      <select
                        className={styles.formInput}
                        value={publication.categorie}
                        onChange={(event) => changerPublication('categorie', event.target.value)}
                      >
                        <option>🍯 Miel</option>
                        <option>🐛 Chenilles</option>
                      </select>
                    </div>
                    <div className={styles.formGroupe}>
                      <label className={styles.formLabel}>Conditionnement</label>
                      <input
                        type="text"
                        placeholder="Ex: Pot de 500 g"
                        className={styles.formInput}
                        value={publication.conditionnement}
                        onChange={(event) => changerPublication('conditionnement', event.target.value)}
                      />
                    </div>
                  </div>
                  <div className={styles.formGroupe}>
                    <label className={styles.formLabel}>Description du produit</label>
                    <textarea
                      placeholder="Décrivez l'origine, le goût, la préparation et les qualités du produit..."
                      className={styles.formInput}
                      rows={5}
                      value={publication.description}
                      onChange={(event) => changerPublication('description', event.target.value)}
                    />
                  </div>
                </div>

                <div className={styles.publicationSection}>
                  <h2 className={styles.publicationTitre}>Prix, stock et livraison</h2>
                  <div className={styles.formGrille}>
                    <div className={styles.formGroupe}>
                      <label className={styles.formLabel}>Prix (XAF)</label>
                      <input
                        type="number"
                        placeholder="Ex: 4500"
                        className={styles.formInput}
                        value={publication.prix}
                        onChange={(event) => changerPublication('prix', event.target.value)}
                      />
                    </div>
                    <div className={styles.formGroupe}>
                      <label className={styles.formLabel}>Stock disponible</label>
                      <input
                        type="number"
                        placeholder="Ex: 25"
                        className={styles.formInput}
                        value={publication.stock}
                        onChange={(event) => changerPublication('stock', event.target.value)}
                      />
                    </div>
                  </div>
                  <div className={styles.formGrille}>
                    <div className={styles.formGroupe}>
                      <label className={styles.formLabel}>Ville d&apos;expédition</label>
                      <input
                        type="text"
                        placeholder="Ex: Oyem"
                        className={styles.formInput}
                        value={publication.ville}
                        onChange={(event) => changerPublication('ville', event.target.value)}
                      />
                    </div>
                    <div className={styles.formGroupe}>
                      <label className={styles.formLabel}>Délai de préparation</label>
                      <select
                        className={styles.formInput}
                        value={publication.delai}
                        onChange={(event) => changerPublication('delai', event.target.value)}
                      >
                        <option>Disponible immédiatement</option>
                        <option>24 heures</option>
                        <option>48 heures</option>
                        <option>3 à 5 jours</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className={styles.publicationSection}>
                  <h2 className={styles.publicationTitre}>Images du produit</h2>
                  <div className={styles.uploadZone}>
                    <span className={styles.uploadIcone}>📷</span>
                    <p className={styles.uploadTitre}>Ajoutez les photos du produit</p>
                    <p className={styles.uploadDesc}>Image principale, détails du produit, emballage ou récolte.</p>
                    <input type="file" accept="image/*" multiple className={styles.formInput} />
                  </div>
                </div>

                <div className={styles.publicationActions}>
                  <button className={styles.btnAnnuler} onClick={() => setOnglet('mes-produits')}>
                    Annuler
                  </button>
                  <button className={styles.btnSauvegarder} onClick={validerPublication} type="button">
                    ✓ Publier le produit
                  </button>
                </div>
                {messagePublication && (
                  <p className={`${styles.publicationMessage} ${messagePublication.startsWith('Produit prêt') ? styles.publicationMessageSucces : ''}`}>
                    {messagePublication}
                  </p>
                )}
              </section>

              <aside className={styles.publicationPreview}>
                <p className={styles.previewLabel}>Aperçu de publication</p>
                <div className={styles.previewCard}>
                  <Image src={publicPath('/images/product-honey-forest.png')} alt="Aperçu produit" width={260} height={170} className={styles.previewImage} />
                  <div className={styles.previewBody}>
                    <span className={styles.previewBadge}>Produit naturel</span>
                    <h3 className={styles.previewNom}>{publication.nom || 'Votre nouveau produit'}</h3>
                    <p className={styles.previewDesc}>
                      {publication.description || 'La fiche publiée apparaîtra dans votre catalogue producteur.'}
                    </p>
                    <p className={styles.previewPrix}>{publication.prix ? `${publication.prix} XAF` : 'Prix à définir'}</p>
                  </div>
                </div>

                <div className={styles.publicationConseils}>
                  <p className={styles.publicationConseilsTitre}>Conseils rapides</p>
                  <ul>
                    <li>Utilisez une photo claire et bien cadrée.</li>
                    <li>Précisez le poids ou le conditionnement.</li>
                    <li>Indiquez le stock réellement disponible.</li>
                    <li>Décrivez l&apos;origine du produit simplement.</li>
                  </ul>
                </div>
              </aside>
            </div>
          </>
        )}

        {/* ════════════════════════════════════════
            MES COMMANDES
        ════════════════════════════════════════ */}
        {onglet === 'mes-commandes' && (
          <>
            <div className={styles.header}>
              <div>
                <h1 className={styles.headerTitre}>Mes commandes</h1>
                <p className={styles.headerDesc}>Suivez et gérez les commandes de vos clients.</p>
              </div>
            </div>

            <div className={styles.commandesHeader}>
              <div className={styles.filtresBar} style={{ padding: 0 }}>
                {['Toutes', 'En attente', 'Préparation', 'Expédiée', 'Livrée'].map((f) => (
                  <button
                    key={f}
                    className={`${styles.filtrePill} ${filtreActif === f ? styles.filtrePillActif : ''}`}
                    onClick={() => setFiltreActif(f)}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.tableauBox}>
              <div className={`${styles.tableauHeader} ${styles.tableauHeaderCommandes}`}>
                <span>N° commande</span>
                <span>Client</span>
                <span>Téléphone</span>
                <span>Adresse</span>
                <span>Produit</span>
                <span>Qté</span>
                <span>Montant</span>
                <span>Statut</span>
              </div>

              {[
                {
                  num: 'ENAP-1368', client: 'Marie L.', tel: '+241 62 34 56 78',
                  adresse: 'Nzeng-Ayong, Libreville', produit: 'Miel de Forêt du Woleu',
                  qte: '2', montant: '9 000 XAF', statut: 'Livrée',
                },
                {
                  num: 'ENAP-1367', client: 'Patrick B.', tel: '+241 77 45 12 89',
                  adresse: 'Lalala, Port-Gentil', produit: 'Chenilles Séchées d\'Oyem',
                  qte: '1', montant: '3 500 XAF', statut: 'Expédiée',
                },
                {
                  num: 'ENAP-1348', client: 'Sophie N.', tel: '+241 66 23 45 67',
                  adresse: 'Centre-ville, Oyem', produit: 'Miel de Fleurs Sauvages',
                  qte: '3', montant: '15 000 XAF', statut: 'Préparation',
                },
                {
                  num: 'ENAP-1345', client: 'Jean-Marc A.', tel: '+241 55 78 90 12',
                  adresse: 'Cocotiers, Franceville', produit: 'Chenilles Fumées de Mouila',
                  qte: '2', montant: '8 000 XAF', statut: 'En attente',
                },
                {
                  num: 'ENAP-1340', client: 'Carine M.', tel: '+241 74 56 34 21',
                  adresse: 'PK8, Libreville', produit: 'Miel de Mangrove',
                  qte: '1', montant: '4 500 XAF', statut: 'En attente',
                },
              ].map((c, i) => (
                <div key={i} className={styles.commandeLigne}>
                  <p className={styles.commandeNumero}>{c.num}</p>
                  <div>
                    <p className={styles.commandeClientNom}>{c.client}</p>
                  </div>
                  <p className={styles.commandeClientTel}>{c.tel}</p>
                  <p className={styles.commandeAdresse}>{c.adresse}</p>
                  <p className={styles.commandeProduitNom}>{c.produit}</p>
                  <p className={styles.commandeQte}>{c.qte}</p>
                  <p className={styles.commandeMontant}>{c.montant}</p>
                  <select className={styles.selectStatut} defaultValue={c.statut}>
                    <option>En attente</option>
                    <option>Préparation</option>
                    <option>Expédiée</option>
                    <option>Livrée</option>
                  </select>
                </div>
              ))}
            </div>
          </>
        )}

      </main>

      {/* ── MODAL AJOUT PRODUIT ── */}
      {modalOuvert && (
        <div className={styles.modalOverlay} onClick={() => setModalOuvert(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.modalTitre}>
              Ajouter un produit
              <button className={styles.modalFermer} onClick={() => setModalOuvert(false)}>✕</button>
            </h2>

            <div className={styles.formGroupe}>
              <label className={styles.formLabel}>Nom du produit</label>
              <input type="text" placeholder="Ex: Miel de forêt du Woleu" className={styles.formInput} />
            </div>

            <div className={styles.formGroupe}>
              <label className={styles.formLabel}>Type de produit</label>
              <select className={styles.formInput}>
                <option>🍯 Miel</option>
                <option>🐛 Chenilles</option>
              </select>
            </div>

            <div className={styles.formGrille}>
              <div className={styles.formGroupe}>
                <label className={styles.formLabel}>Prix (XAF)</label>
                <input type="number" placeholder="Ex: 4500" className={styles.formInput} />
              </div>
              <div className={styles.formGroupe}>
                <label className={styles.formLabel}>Stock disponible</label>
                <input type="number" placeholder="Ex: 25" className={styles.formInput} />
              </div>
            </div>

            <div className={styles.formGroupe}>
              <label className={styles.formLabel}>Conditionnement</label>
              <input type="text" placeholder="Ex: Pot de 500 g" className={styles.formInput} />
            </div>

            <div className={styles.formGroupe}>
              <label className={styles.formLabel}>Description</label>
              <textarea
                placeholder="Décrivez votre produit..."
                className={styles.formInput}
                rows={3}
                style={{ resize: 'vertical' }}
              />
            </div>

            <div className={styles.formGroupe}>
              <label className={styles.formLabel}>Photo du produit</label>
              <input type="file" accept="image/*" className={styles.formInput} />
            </div>

            <div className={styles.modalActions}>
              <button className={styles.btnAnnuler} onClick={() => setModalOuvert(false)}>
                Annuler
              </button>
              <button className={styles.btnSauvegarder}>
                ✓ Sauvegarder
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
