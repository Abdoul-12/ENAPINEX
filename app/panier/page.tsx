'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import AddToCartButton from '@/src/components/panier/AddToCartButton'
import { publicPath } from '@/src/lib/assets'
import {
  clearPanier,
  formatXaf,
  getPanierCount,
  getPanierItems,
  getPanierTotals,
  PANIER_EVENT,
  removePanierItem,
  saveCheckoutItems,
  type PanierItem,
  updatePanierQuantite,
} from '@/src/lib/panier'
import styles from './page.module.css'

const suggestions: PanierItem[] = [
  {
    slug: 'miel-mangrove',
    nom: 'Miel de Mangrove',
    producteur: 'Nature & Saveurs',
    categorie: 'Miel',
    image: '/images/product-honey-oyem.png',
    prix: 4500,
    prixLabel: '4 500 XAF',
    conditionnement: 'Pot de 500 g',
    quantite: 1,
  },
  {
    slug: 'chenilles-sechees-oyem',
    nom: "Chenilles Séchées d'Oyem",
    producteur: 'Entomo Gabon',
    categorie: 'Chenille',
    image: '/images/product-caterpillars-oyem.png',
    prix: 3500,
    prixLabel: '3 500 XAF',
    conditionnement: 'Sachet de 250 g',
    quantite: 1,
  },
  {
    slug: 'miel-fleurs-sauvages',
    nom: 'Miel de Fleurs Sauvages',
    producteur: 'Les Ruchers du Gabon',
    categorie: 'Miel',
    image: '/images/product-honey-flowers.png',
    prix: 4200,
    prixLabel: '4 200 XAF',
    conditionnement: 'Pot de 500 g',
    quantite: 1,
  },
  {
    slug: 'chenilles-fumees-mouila',
    nom: 'Chenilles Fumées de Mouila',
    producteur: 'Saveurs du Sud',
    categorie: 'Chenille',
    image: '/images/product-caterpillars-mouila.png',
    prix: 4000,
    prixLabel: '4 000 XAF',
    conditionnement: 'Sachet de 500 g',
    quantite: 1,
  },
]

export default function Panier() {
  const [items, setItems] = useState<PanierItem[]>([])

  useEffect(() => {
    const synchroniserPanier = () => setItems(getPanierItems())

    synchroniserPanier()
    window.addEventListener(PANIER_EVENT, synchroniserPanier)
    window.addEventListener('storage', synchroniserPanier)

    return () => {
      window.removeEventListener(PANIER_EVENT, synchroniserPanier)
      window.removeEventListener('storage', synchroniserPanier)
    }
  }, [])

  const totals = useMemo(() => getPanierTotals(items), [items])
  const totalArticles = getPanierCount(items)
  const panierVide = items.length === 0

  const modifierQuantite = (slug: string, quantite: number) => {
    updatePanierQuantite(slug, quantite)
    setItems(getPanierItems())
  }

  const supprimerArticle = (slug: string) => {
    removePanierItem(slug)
    setItems(getPanierItems())
  }

  const viderPanier = () => {
    clearPanier()
    setItems([])
  }

  return (
    <div className={styles.page}>

      <div className={styles.breadcrumb}>
        <Link href="/" className={styles.breadcrumbLien}>Accueil</Link>
        <span>›</span>
        <span>Panier</span>
      </div>

      <div className={styles.headerPanier}>
        <div className={styles.headerGauche}>
          <div className={styles.headerIcone}>🛒</div>
          <div>
            <h1 className={styles.headerTitre}>Mon panier ({totalArticles})</h1>
            <p className={styles.headerDesc}>
              Vérifiez vos articles, modifiez les quantités ou passez votre commande.
            </p>
          </div>
        </div>
        <div className={styles.livraisonOfferte}>
          🚚 Livraison offerte dès 25 000 XAF
        </div>
      </div>

      <div className={styles.layout}>
        <div className={styles.tableauBox}>
          {panierVide ? (
            <div className={styles.panierVide}>
              <div className={styles.panierVideIcone}>🛒</div>
              <h2 className={styles.panierVideTitre}>Votre panier est vide</h2>
              <p className={styles.panierVideDesc}>
                Ajoutez des miels ou des chenilles depuis l&apos;accueil ou le catalogue.
              </p>
              <Link href="/catalogue" className={styles.btnContinuer}>
                ← Voir le catalogue
              </Link>
            </div>
          ) : (
            <>
              <div className={styles.tableauHeader}>
                <span>Produit</span>
                <span>Prix unitaire</span>
                <span>Quantité</span>
                <span>Sous-total</span>
                <span></span>
              </div>

              {items.map((item) => (
                <div className={styles.article} key={item.slug}>
                  <div className={styles.articleProduit}>
                    <Image
                      src={publicPath(item.image)}
                      alt={item.nom}
                      width={72}
                      height={72}
                      className={styles.articleImage}
                    />
                    <div>
                      <p className={styles.articleNom}>{item.nom}</p>
                      <p className={styles.articleProducteur}>par {item.producteur}</p>
                      <p className={styles.articleMeta}>{item.conditionnement}</p>
                      <span className={styles.articleBadge}>🌿 {item.categorie}</span>
                    </div>
                  </div>
                  <p className={styles.articlePrix}>{item.prixLabel}</p>
                  <div className={styles.quantiteControle}>
                    <button
                      className={styles.quantiteBtn}
                      onClick={() => modifierQuantite(item.slug, item.quantite - 1)}
                      type="button"
                    >
                      −
                    </button>
                    <span className={styles.quantiteValeur}>{item.quantite}</span>
                    <button
                      className={styles.quantiteBtn}
                      onClick={() => modifierQuantite(item.slug, item.quantite + 1)}
                      type="button"
                    >
                      +
                    </button>
                  </div>
                  <p className={styles.articleTotal}>{formatXaf(item.prix * item.quantite)}</p>
                  <button
                    className={styles.btnSupprimer}
                    onClick={() => supprimerArticle(item.slug)}
                    type="button"
                    title="Supprimer"
                  >
                    🗑
                  </button>
                </div>
              ))}

              <div className={styles.tableauFooter}>
                <Link href="/catalogue" className={styles.btnContinuer}>
                  ← Continuer mes achats
                </Link>
                <div className={styles.securitePanier}>
                  🔒 Paiement 100% sécurisé
                </div>
                <button className={styles.btnVider} onClick={viderPanier} type="button">
                  🗑 Vider le panier
                </button>
              </div>
            </>
          )}
        </div>

        <div className={styles.recap}>
          <h2 className={styles.recapTitre}>Récapitulatif de la commande</h2>

          <div className={styles.recapLigne}>
            <span className={styles.recapLigneLabel}>Sous-total ({totalArticles} article{totalArticles > 1 ? 's' : ''})</span>
            <span className={styles.recapLigneValeur}>{formatXaf(totals.sousTotal)}</span>
          </div>
          <div className={styles.recapLigne}>
            <span className={styles.recapLigneLabel}>Livraison</span>
            <span className={styles.recapLigneValeur}>{totals.livraison === 0 ? 'Offerte' : formatXaf(totals.livraison)}</span>
          </div>
          <div className={styles.recapLigne}>
            <span className={styles.recapLigneLabel}>Frais de service</span>
            <span className={styles.recapLigneValeur}>{formatXaf(totals.service)}</span>
          </div>

          <div className={styles.recapPromo}>
            <span className={styles.recapPromoTexte}>
              🏷️ Vous avez un code promo ?
            </span>
            <span>›</span>
          </div>

          <div className={styles.recapTotal}>
            <span className={styles.recapTotalLabel}>Total estimé</span>
            <span className={styles.recapTotalMontant}>{formatXaf(totals.total)}</span>
          </div>

          <Link
            href={panierVide ? '/catalogue' : '/livraison-paiement'}
            className={styles.btnCommander}
            onClick={() => {
              if (!panierVide) saveCheckoutItems(items)
            }}
          >
            {panierVide ? 'Voir les produits →' : '🔒 Passer la commande →'}
          </Link>
          <Link href="/catalogue" className={styles.btnAcheterMaintenant}>
            ⚡ Ajouter d&apos;autres articles
          </Link>

          <div className={styles.recapSecurite}>
            🔒 Paiement 100% sécurisé — Vos données sont protégées
          </div>

          <p className={styles.recapPaiements}>Nous acceptons</p>
          <div className={styles.paiementsIcones}>
            <span className={styles.paiementIcone}>VISA</span>
            <span className={styles.paiementIcone}>MC</span>
            <span className={styles.paiementIcone}>Moov</span>
            <span className={styles.paiementIcone}>Airtel</span>
            <span className={styles.paiementIcone}>Ria</span>
          </div>
        </div>
      </div>

      <div className={styles.livraisonBanniere}>
        <div className={styles.livraisonGauche}>
          <span className={styles.livraisonIcone}>🚚</span>
          <div>
            <p className={styles.livraisonTitre}>Livraison partout au Gabon et à l&apos;international</p>
            <p className={styles.livraisonDesc}>Suivi de commande en temps réel et emballage sécurisé.</p>
          </div>
        </div>
        <Link href="/livraison-paiement" className={styles.livraisonLien}>Finaliser →</Link>
      </div>

      <div className={styles.suggestions}>
        <h2 className={styles.suggestionsTitre}>Vous aimerez aussi</h2>
        <div className={styles.suggestionsGrid}>
          {suggestions.map((suggestion) => (
            <div className={styles.suggestionCard} key={suggestion.slug}>
              <Image src={publicPath(suggestion.image)} alt={suggestion.nom} width={64} height={64} className={styles.suggestionImage} />
              <div>
                <p className={styles.suggestionNom}>{suggestion.nom}</p>
                <p className={styles.articleMeta}>{suggestion.conditionnement}</p>
                <p className={styles.suggestionPrix}>{suggestion.prixLabel}</p>
              </div>
              <AddToCartButton className={styles.btnSuggestionPanier} item={suggestion} title="Ajouter au panier">
                🛒
              </AddToCartButton>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.footerAvantages}>
        <div className={styles.footerAvantageItem}>
          <span className={styles.footerAvantageIcone}>🌿</span>
          <div>
            <p className={styles.footerAvantageTitre}>Produits 100% naturels</p>
            <p className={styles.footerAvantageDesc}>Sans additifs, sans conservateurs.</p>
          </div>
        </div>
        <div className={styles.footerAvantageItem}>
          <span className={styles.footerAvantageIcone}>👥</span>
          <div>
            <p className={styles.footerAvantageTitre}>Producteurs locaux vérifiés</p>
            <p className={styles.footerAvantageDesc}>Soutenez l&apos;économie locale.</p>
          </div>
        </div>
        <div className={styles.footerAvantageItem}>
          <span className={styles.footerAvantageIcone}>🚚</span>
          <div>
            <p className={styles.footerAvantageTitre}>Livraison rapide & sûre</p>
            <p className={styles.footerAvantageDesc}>Partout au Gabon.</p>
          </div>
        </div>
        <div className={styles.footerAvantageItem}>
          <span className={styles.footerAvantageIcone}>🔒</span>
          <div>
            <p className={styles.footerAvantageTitre}>Paiement 100% sécurisé</p>
            <p className={styles.footerAvantageDesc}>Par carte, Mobile Money ou RIA.</p>
          </div>
        </div>
      </div>

    </div>
  )
}
