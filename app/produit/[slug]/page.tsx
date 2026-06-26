import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import AddToCartButton from '@/src/components/panier/AddToCartButton'
import BuyNowLink from '@/src/components/panier/BuyNowLink'
import { getProduitBySlug, getProduitsSimilaires, produits } from '@/src/data/produits'
import { parsePrix } from '@/src/lib/panier'
import styles from '../page.module.css'

export function generateStaticParams() {
  return produits.map((produit) => ({
    slug: produit.slug,
  }))
}

export default async function FicheProduit({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const produit = getProduitBySlug(slug)

  if (!produit) {
    notFound()
  }

  const produitsSimilaires = getProduitsSimilaires(produit.slug, produit.categorie)

  return (
    <main>

      {/* ── BREADCRUMB ── */}
      <div className={styles.breadcrumb}>
        <Link href="/" className={styles.breadcrumbLien}>Accueil</Link>
        <span>›</span>
        <Link href="/catalogue" className={styles.breadcrumbLien}>Catalogue</Link>
        <span>›</span>
        <Link href="/catalogue" className={styles.breadcrumbLien}>{produit.categorie}s</Link>
        <span>›</span>
        <span>{produit.nom}</span>
      </div>

      {/* ── LAYOUT 3 COLONNES ── */}
      <div className={styles.layout}>

        {/* ── COLONNE IMAGE ── */}
        <div className={styles.colonneImage}>
          <div className={styles.imageBox}>
            <Image
              src={produit.image}
              alt={produit.nom}
              width={480}
              height={380}
              className={styles.imageprincipale}
            />
            <span className={styles.imageBadge}>{produit.categorie}</span>
            <button className={styles.imageZoom}>🔍</button>
          </div>
          <div className={styles.vignettes}>
            <Image src={produit.image} alt={`${produit.nom} vue 1`} width={72} height={72} className={`${styles.vignette} ${styles.vignetteActive}`} />
            <Image src={produit.image} alt={`${produit.nom} vue 2`} width={72} height={72} className={styles.vignette} />
            <Image src={produit.image} alt={`${produit.nom} vue 3`} width={72} height={72} className={styles.vignette} />
            <Image src={produit.image} alt={`${produit.nom} vue 4`} width={72} height={72} className={styles.vignette} />
            <Image src={produit.image} alt={`${produit.nom} vue 5`} width={72} height={72} className={styles.vignette} />
          </div>
        </div>

        {/* ── COLONNE INFOS ── */}
        <div className={styles.colonneInfos}>
          <h1 className={styles.produitNom}>{produit.nom}</h1>
          <div className={styles.produitProducteur}>
            <span>par {produit.producteur}</span>
            <span className={styles.badgeVerifie}>✓ Producteur vérifié</span>
          </div>
          <div className={styles.produitNote}>
            <span>{produit.note}</span>
            <span className={styles.produitNoteCount}>({produit.avis} avis)</span>
          </div>
          <p className={styles.produitPrix}>{produit.prix}</p>
          <p className={styles.produitUnite}>{produit.unite}</p>
          <p className={styles.produitDesc}>{produit.description}</p>

          {/* Caractéristiques */}
          <div className={styles.caracteristiques}>
            {produit.caracteristiques.map((caracteristique) => (
              <div className={styles.caracteristiqueItem} key={caracteristique.label}>
                <span className={styles.caracteristiqueIcone}>{caracteristique.icone}</span>
                <span className={styles.caracteristiqueLabel}>{caracteristique.label}</span>
              </div>
            ))}
          </div>

          {/* Onglets */}
          <div className={styles.onglets}>
            <button className={`${styles.onglet} ${styles.ongletActif}`}>Description</button>
            <button className={styles.onglet}>Bienfaits</button>
            <button className={styles.onglet}>Conseils d&apos;utilisation</button>
            <button className={styles.onglet}>Livraison & Retours</button>
          </div>

          <div className={styles.ongletContenu}>
            <p style={{ marginBottom: '1rem' }}>{produit.descriptionLongue}</p>
            <ul>
              {produit.bienfaits.map((bienfait) => (
                <li key={bienfait}>{bienfait}</li>
              ))}
            </ul>

            <table className={styles.tableau} style={{ marginTop: '1rem' }}>
              <tbody>
                <tr><td>Origine</td><td>{produit.origine}</td></tr>
                <tr><td>Type de produit</td><td>{produit.typeProduit}</td></tr>
                <tr><td>Texture</td><td>{produit.texture}</td></tr>
                <tr><td>Goût</td><td>{produit.gout}</td></tr>
                <tr><td>Conservation</td><td>{produit.conservation}</td></tr>
              </tbody>
            </table>
          </div>

          {/* À propos du producteur */}
          <div className={styles.producteurBox}>
            <p className={styles.producteurBoxTitre}>À propos du producteur</p>
            <div className={styles.producteurProfil}>
              <Image
                src="/images/logo.jpeg"
                alt={produit.producteur}
                width={64}
                height={64}
                className={styles.producteurPhoto}
              />
              <div>
                <p className={styles.producteurNom}>
                  {produit.producteur}
                  <span className={styles.badgeVerifie}>✓ Vérifié</span>
                </p>
                <p className={styles.producteurDesc}>{produit.producteurDescription}</p>
                <div className={styles.producteurStats}>
                  {produit.producteurStats.map((stat) => (
                    <span key={stat}>{stat}</span>
                  ))}
                </div>
                <Link href="/producteurs" className={styles.producteurLien}>
                  Voir tous ses produits
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ── COLONNE ACHAT ── */}
        <div className={styles.colonneAchat}>
          <p className={styles.achatTitre}>Acheter maintenant</p>

          <p className={styles.conditionnementTitre}>Conditionnement</p>
          <div className={styles.conditionnements}>
            {produit.conditionnements.map((conditionnement) => (
              <button
                className={`${styles.conditionnementBtn} ${conditionnement === produit.conditionnementActif ? styles.conditionnementActif : ''}`}
                key={conditionnement}
              >
                {conditionnement}
              </button>
            ))}
          </div>

          <p className={styles.quantiteTitre}>Quantité</p>
          <div className={styles.quantiteBox}>
            <div className={styles.quantiteControle}>
              <button className={styles.quantiteBtn}>−</button>
              <span className={styles.quantiteValeur}>1</span>
              <button className={styles.quantiteBtn}>+</button>
            </div>
            <span className={styles.stock}>{produit.stock}</span>
          </div>

          <p className={styles.prixTotal}>Prix total</p>
          <p className={styles.prixTotalMontant}>{produit.prix}</p>

          <BuyNowLink
            className={styles.btnAcheterMaintenant}
            item={{
              slug: produit.slug,
              nom: produit.nom,
              producteur: produit.producteur,
              categorie: produit.categorie,
              image: produit.image,
              prix: parsePrix(produit.prix),
              prixLabel: produit.prix,
              conditionnement: produit.conditionnementActif,
            }}
          >
            ⚡ Acheter maintenant
          </BuyNowLink>
          <AddToCartButton
            className={styles.btnAjouterPanier}
            item={{
              slug: produit.slug,
              nom: produit.nom,
              producteur: produit.producteur,
              categorie: produit.categorie,
              image: produit.image,
              prix: parsePrix(produit.prix),
              prixLabel: produit.prix,
              conditionnement: produit.conditionnementActif,
            }}
          >
            🛒 Ajouter au panier
          </AddToCartButton>
          <div className={styles.securite}>
            🔒 Paiement 100% sécurisé — Vos données sont protégées
          </div>
        </div>

      </div>

      {/* ── PRODUITS SIMILAIRES ── */}
      <section className={styles.similaires}>
        <h2 className={styles.similairesTitre}>Produits similaires</h2>
        <div className={styles.similairesGrid}>
          {produitsSimilaires.map((similaire) => (
            <Link href={`/produit/${similaire.slug}`} className={styles.similaireCard} key={similaire.slug}>
              <Image src={similaire.image} alt={similaire.nom} width={64} height={64} className={styles.similaireImage} />
              <div>
                <p className={styles.similaireNom}>{similaire.nom}</p>
                <p className={styles.similaireNote}>{similaire.note} ({similaire.avis})</p>
                <p className={styles.similairePrix}>{similaire.prix}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </main>
  )
}
