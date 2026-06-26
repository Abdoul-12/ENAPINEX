import Link from 'next/link'
import Image from 'next/image'
import AddToCartButton from '@/src/components/panier/AddToCartButton'
import BuyNowLink from '@/src/components/panier/BuyNowLink'
import styles from './page.module.css'

export default function Home() {
  return (
    <main>

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroTexte}>
          <h1 className={styles.heroTitre}>
            Découvrez les meilleurs{' '}
            <span className={styles.heroTitreAccent}>miels et chenilles</span>{' '}
            du terroir gabonais, directement auprès des producteurs.
          </h1>
          <p className={styles.heroDesc}>
            ENAPINEX connecte les consommateurs aux producteurs
            locaux pour des produits authentiques, naturels et de qualité.
          </p>
          <div className={styles.heroBoutons}>
            <Link href="/catalogue?type=miel" className={styles.btnPrimaire}>
              Découvrir nos miels →
            </Link>
            <Link href="/catalogue?type=chenilles" className={styles.btnSecondaire}>
              Découvrir nos chenilles →
            </Link>
          </div>
        </div>
        <Image
          src="/images/hero-products.png"
          alt="Miels et chenilles du Gabon"
          width={500}
          height={380}
          className={styles.heroImage}
        />
      </section>

      {/* ── AVANTAGES ── */}
      <section className={styles.avantages}>
        <div className={styles.avantageItem}>
          <span className={styles.avantageIcone}>🌿</span>
          <div>
            <p className={styles.avantageTitre}>Produits 100% naturels</p>
            <p className={styles.avantageDesc}>Sans additifs et issus de nos terroirs.</p>
          </div>
        </div>
        <div className={styles.avantageItem}>
          <span className={styles.avantageIcone}>🔒</span>
          <div>
            <p className={styles.avantageTitre}>Paiement sécurisé</p>
            <p className={styles.avantageDesc}>Vos paiements sont protégés et 100% sécurisés.</p>
          </div>
        </div>
        <div className={styles.avantageItem}>
          <span className={styles.avantageIcone}>🚚</span>
          <div>
            <p className={styles.avantageTitre}>Livraison rapide</p>
            <p className={styles.avantageDesc}>Partout au Gabon, à domicile.</p>
          </div>
        </div>
        <div className={styles.avantageItem}>
          <span className={styles.avantageIcone}>👥</span>
          <div>
            <p className={styles.avantageTitre}>Soutien aux producteurs</p>
            <p className={styles.avantageDesc}>Vous soutenez directement les producteurs locaux.</p>
          </div>
        </div>
      </section>

      {/* ── NOS PRODUITS ── */}
      <section className={styles.nosProduits}>
        <h2 className={styles.sectionTitre}>Nos produits</h2>
        <div className={styles.categoriesGrid}>

          <div className={styles.categorieCard}>
            <Image
              src="/images/category-honey.png"
              alt="Miels du Gabon"
              width={180}
              height={160}
              className={styles.categorieImage}
            />
            <div className={styles.categorieTexte}>
              <h3 className={styles.categorieTitre}>Miels</h3>
              <p className={styles.categorieDesc}>
                Découvrez toutes les variétés de miel proposées par nos producteurs.
              </p>
              <Link href="/catalogue?type=miel" className={styles.categorieLien}>
                Voir les miels →
              </Link>
            </div>
          </div>

          <div className={styles.categorieCard}>
            <Image
              src="/images/category-caterpillars.png"
              alt="Chenilles comestibles du Gabon"
              width={180}
              height={160}
              className={styles.categorieImage}
            />
            <div className={styles.categorieTexte}>
              <h3 className={styles.categorieTitre}>Chenilles</h3>
              <p className={styles.categorieDesc}>
                Découvrez toutes les variétés de chenilles proposées par nos producteurs.
              </p>
              <Link href="/catalogue?type=chenilles" className={styles.categorieLien}>
                Voir les chenilles →
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ── PRODUITS EN VEDETTE ── */}
      <section className={styles.vedette}>
        <div className={styles.vedetteHeader}>
          <h2 className={styles.sectionTitre}>Produits en vedette</h2>
          <Link href="/catalogue" className={styles.voirTout}>
            Voir tous les produits →
          </Link>
        </div>
        <div className={styles.produitsGrid}>

          <div className={styles.produitCard}>
            <Image
              src="/images/product-honey-forest.png"
              alt="Miel de Forêt du Wolou"
              width={200}
              height={130}
              className={styles.produitImage}
            />
            <span className={`${styles.produitBadge} ${styles.badgeVerifie}`}>Vérifié</span>
            <div className={styles.produitBody}>
              <p className={styles.produitNom}>Miel de Forêt du Wolou</p>
              <p className={styles.produitNote}>★★★★☆ (128)</p>
              <p className={styles.produitPrix}>4 500 XAF</p>
              <div className={styles.produitActions}>
                <BuyNowLink
                  className={styles.btnAcheter}
                  item={{
                    slug: 'miel-foret-wolou',
                    nom: 'Miel de Forêt du Wolou',
                    producteur: 'Apiculteur Jean-Pierre',
                    categorie: 'Miel',
                    image: '/images/product-honey-forest.png',
                    prix: 4500,
                    prixLabel: '4 500 XAF',
                    conditionnement: 'Pot de 500 g',
                  }}
                >
                  Acheter
                </BuyNowLink>
                <Link href="/produit/miel-foret-wolou" className={styles.btnDetails}>Voir</Link>
                <AddToCartButton
                  className={styles.btnPanier}
                  title="Ajouter au panier"
                  item={{
                    slug: 'miel-foret-wolou',
                    nom: 'Miel de Forêt du Wolou',
                    producteur: 'Apiculteur Jean-Pierre',
                    categorie: 'Miel',
                    image: '/images/product-honey-forest.png',
                    prix: 4500,
                    prixLabel: '4 500 XAF',
                    conditionnement: 'Pot de 500 g',
                  }}
                >
                  🛒
                </AddToCartButton>
              </div>
            </div>
          </div>

          <div className={styles.produitCard}>
            <Image
              src="/images/product-caterpillars-oyem.png"
              alt="Chenilles Séchées d'Oyem"
              width={200}
              height={130}
              className={styles.produitImage}
            />
            <span className={`${styles.produitBadge} ${styles.badgeNouveau}`}>Nouveau</span>
            <div className={styles.produitBody}>
              <p className={styles.produitNom}>Chenilles Séchées d&apos;Oyem</p>
              <p className={styles.produitNote}>★★★★☆ (96)</p>
              <p className={styles.produitPrix}>3 500 XAF</p>
              <div className={styles.produitActions}>
                <BuyNowLink
                  className={styles.btnAcheter}
                  item={{
                    slug: 'chenilles-sechees-oyem',
                    nom: "Chenilles Séchées d'Oyem",
                    producteur: 'Entomo Gabon',
                    categorie: 'Chenille',
                    image: '/images/product-caterpillars-oyem.png',
                    prix: 3500,
                    prixLabel: '3 500 XAF',
                    conditionnement: 'Sachet de 250 g',
                  }}
                >
                  Acheter
                </BuyNowLink>
                <Link href="/produit/chenilles-sechees-oyem" className={styles.btnDetails}>Voir</Link>
                <AddToCartButton
                  className={styles.btnPanier}
                  title="Ajouter au panier"
                  item={{
                    slug: 'chenilles-sechees-oyem',
                    nom: "Chenilles Séchées d'Oyem",
                    producteur: 'Entomo Gabon',
                    categorie: 'Chenille',
                    image: '/images/product-caterpillars-oyem.png',
                    prix: 3500,
                    prixLabel: '3 500 XAF',
                    conditionnement: 'Sachet de 250 g',
                  }}
                >
                  🛒
                </AddToCartButton>
              </div>
            </div>
          </div>

          <div className={styles.produitCard}>
            <Image
              src="/images/product-honey-oyem.png"
              alt="Miel d'Oyem Premium"
              width={200}
              height={130}
              className={styles.produitImage}
            />
            <span className={`${styles.produitBadge} ${styles.badgePromo}`}>Promo</span>
            <div className={styles.produitBody}>
              <p className={styles.produitNom}>Miel d&apos;Oyem Premium</p>
              <p className={styles.produitNote}>★★★★☆ (73)</p>
              <p className={styles.produitPrix}>5 000 XAF</p>
              <div className={styles.produitActions}>
                <BuyNowLink
                  className={styles.btnAcheter}
                  item={{
                    slug: 'miel-oyem-premium',
                    nom: "Miel d'Oyem Premium",
                    producteur: 'Les Ruchers du Gabon',
                    categorie: 'Miel',
                    image: '/images/product-honey-oyem.png',
                    prix: 5000,
                    prixLabel: '5 000 XAF',
                    conditionnement: 'Pot de 500 g',
                  }}
                >
                  Acheter
                </BuyNowLink>
                <Link href="/produit/miel-oyem-premium" className={styles.btnDetails}>Voir</Link>
                <AddToCartButton
                  className={styles.btnPanier}
                  title="Ajouter au panier"
                  item={{
                    slug: 'miel-oyem-premium',
                    nom: "Miel d'Oyem Premium",
                    producteur: 'Les Ruchers du Gabon',
                    categorie: 'Miel',
                    image: '/images/product-honey-oyem.png',
                    prix: 5000,
                    prixLabel: '5 000 XAF',
                    conditionnement: 'Pot de 500 g',
                  }}
                >
                  🛒
                </AddToCartButton>
              </div>
            </div>
          </div>

          <div className={styles.produitCard}>
            <Image
              src="/images/product-caterpillars-mouila.png"
              alt="Chenilles Fumées de Mouila"
              width={200}
              height={130}
              className={styles.produitImage}
            />
            <span className={`${styles.produitBadge} ${styles.badgeVerifie}`}>Vérifié</span>
            <div className={styles.produitBody}>
              <p className={styles.produitNom}>Chenilles Fumées de Mouila</p>
              <p className={styles.produitNote}>★★★★☆ (58)</p>
              <p className={styles.produitPrix}>4 000 XAF</p>
              <div className={styles.produitActions}>
                <BuyNowLink
                  className={styles.btnAcheter}
                  item={{
                    slug: 'chenilles-fumees-mouila',
                    nom: 'Chenilles Fumées de Mouila',
                    producteur: 'Saveurs du Sud',
                    categorie: 'Chenille',
                    image: '/images/product-caterpillars-mouila.png',
                    prix: 4000,
                    prixLabel: '4 000 XAF',
                    conditionnement: 'Sachet de 500 g',
                  }}
                >
                  Acheter
                </BuyNowLink>
                <Link href="/produit/chenilles-fumees-mouila" className={styles.btnDetails}>Voir</Link>
                <AddToCartButton
                  className={styles.btnPanier}
                  title="Ajouter au panier"
                  item={{
                    slug: 'chenilles-fumees-mouila',
                    nom: 'Chenilles Fumées de Mouila',
                    producteur: 'Saveurs du Sud',
                    categorie: 'Chenille',
                    image: '/images/product-caterpillars-mouila.png',
                    prix: 4000,
                    prixLabel: '4 000 XAF',
                    conditionnement: 'Sachet de 500 g',
                  }}
                >
                  🛒
                </AddToCartButton>
              </div>
            </div>
          </div>

          <div className={styles.produitCard}>
            <Image
              src="/images/product-honey-flowers.png"
              alt="Miel de Fleurs Sauvages"
              width={200}
              height={130}
              className={styles.produitImage}
            />
            <span className={`${styles.produitBadge} ${styles.badgeDisponible}`}>Disponible</span>
            <div className={styles.produitBody}>
              <p className={styles.produitNom}>Miel de Fleurs Sauvages</p>
              <p className={styles.produitNote}>★★★★☆ (41)</p>
              <p className={styles.produitPrix}>4 200 XAF</p>
              <div className={styles.produitActions}>
                <BuyNowLink
                  className={styles.btnAcheter}
                  item={{
                    slug: 'miel-fleurs-sauvages',
                    nom: 'Miel de Fleurs Sauvages',
                    producteur: 'Les Ruchers du Gabon',
                    categorie: 'Miel',
                    image: '/images/product-honey-flowers.png',
                    prix: 4200,
                    prixLabel: '4 200 XAF',
                    conditionnement: 'Pot de 500 g',
                  }}
                >
                  Acheter
                </BuyNowLink>
                <Link href="/produit/miel-fleurs-sauvages" className={styles.btnDetails}>Voir</Link>
                <AddToCartButton
                  className={styles.btnPanier}
                  title="Ajouter au panier"
                  item={{
                    slug: 'miel-fleurs-sauvages',
                    nom: 'Miel de Fleurs Sauvages',
                    producteur: 'Les Ruchers du Gabon',
                    categorie: 'Miel',
                    image: '/images/product-honey-flowers.png',
                    prix: 4200,
                    prixLabel: '4 200 XAF',
                    conditionnement: 'Pot de 500 g',
                  }}
                >
                  🛒
                </AddToCartButton>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── BANNIÈRE PRODUCTEUR ── */}
      <section className={styles.banniereProducteur}>
        <div className={styles.banniereGauche}>
          <span style={{ fontSize: '2.5rem' }}>👥</span>
          <div>
            <p className={styles.banniereTitre}>Vous êtes producteur ?</p>
            <p className={styles.banniereDesc}>
              Rejoignez ENAPINEX et développez votre activité.<br />
              Vendez vos produits en ligne, gérez vos commandes et augmentez vos revenus.
            </p>
          </div>
        </div>
        <Link href="/auth" className={styles.banniereBouton}>
          S&apos;inscrire comme producteur →
        </Link>
      </section>

    </main>
  )
}
