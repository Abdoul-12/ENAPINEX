import Link from 'next/link'
import styles from './page.module.css'

export default function Contact() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>Contact</p>
          <h1 className={styles.titre}>Parlons de vos commandes, produits ou partenariats.</h1>
          <p className={styles.description}>
            Une question sur une livraison, un produit, un producteur ou l&apos;inscription sur ENAPINEX ? L&apos;équipe vous répond rapidement.
          </p>
        </div>
        <div className={styles.contactCard}>
          <p className={styles.cardTitre}>Support ENAPINEX</p>
          <Link href="tel:+24177123456" className={styles.contactLien}>+241 77 12 34 56</Link>
          <Link href="mailto:contact@enapinex.ga" className={styles.contactLien}>contact@enapinex.ga</Link>
          <span className={styles.badge}>Réponse sous 24h</span>
        </div>
      </section>

      <section className={styles.grid}>
        <form className={styles.form}>
          <h2 className={styles.sectionTitre}>Envoyer un message</h2>
          <input className={styles.input} placeholder="Nom complet" />
          <input className={styles.input} placeholder="Email ou téléphone" />
          <select className={styles.input} defaultValue="">
            <option value="" disabled>Motif de contact</option>
            <option>Commande</option>
            <option>Livraison</option>
            <option>Producteur</option>
            <option>Partenariat</option>
          </select>
          <textarea className={styles.textarea} placeholder="Votre message" rows={5} />
          <button className={styles.btn} type="button">Envoyer le message</button>
        </form>

        <div className={styles.infoList}>
          {[
            ['Commandes', 'Suivi, modification, annulation ou confirmation.'],
            ['Producteurs', 'Inscription, publication de produits et visibilité.'],
            ['Paiements', 'Aide sur carte bancaire, Airtel Money, Moov Money ou Ria.'],
          ].map(([titre, texte]) => (
            <div className={styles.infoItem} key={titre}>
              <h3>{titre}</h3>
              <p>{texte}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
