import Link from 'next/link'
import styles from '../contact/page.module.css'

export default function Aide() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>Aide & FAQ</p>
          <h1 className={styles.titre}>Une réponse rapide pour continuer sans blocage.</h1>
          <p className={styles.description}>
            Retrouvez les questions fréquentes sur les commandes, la livraison, les paiements et l&apos;espace producteur.
          </p>
        </div>
        <div className={styles.contactCard}>
          <p className={styles.cardTitre}>Besoin d&apos;une aide directe ?</p>
          <Link href="/contact" className={styles.contactLien}>Contacter le support</Link>
        </div>
      </section>
      <section className={styles.grid}>
        {[
          ['Comment ajouter un produit au panier ?', 'Cliquez sur l’icône panier depuis l’accueil, le catalogue ou la fiche produit.'],
          ['Comment suivre une commande ?', 'Le reçu de commande affiche un numéro ENAPINEX et un récapitulatif.'],
          ['Comment publier un produit ?', 'Un producteur peut utiliser l’onglet Publication dans son dashboard.'],
          ['Quels paiements sont acceptés ?', 'Carte bancaire, Airtel Money, Moov Money et Ria sont prévus.'],
        ].map(([titre, texte]) => (
          <div className={styles.infoItem} key={titre}>
            <h3>{titre}</h3>
            <p>{texte}</p>
          </div>
        ))}
      </section>
    </main>
  )
}
