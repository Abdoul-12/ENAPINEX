import styles from '../contact/page.module.css'

export default function ProfilClient() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>Profil client</p>
          <h1 className={styles.titre}>Votre espace personnel ENAPINEX.</h1>
          <p className={styles.description}>
            Retrouvez vos informations, vos adresses de livraison et l&apos;historique visuel de vos commandes.
          </p>
        </div>
        <div className={styles.contactCard}>
          <p className={styles.cardTitre}>Marie L.</p>
          <span className={styles.badge}>Client vérifié</span>
          <p className={styles.description}>Libreville, Gabon</p>
        </div>
      </section>
      <section className={styles.grid}>
        {[
          ['Informations personnelles', 'Nom, prénom, email, téléphone et préférences de contact.'],
          ['Adresses de livraison', 'Adresse principale, quartier, ville, pays et repères utiles.'],
          ['Historique commandes', 'Commandes récentes, statuts, reçus et montants payés.'],
          ['Préférences', 'Notifications, favoris et moyens de paiement préférés.'],
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
