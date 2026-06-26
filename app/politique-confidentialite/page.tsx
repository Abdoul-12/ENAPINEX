import styles from '../contact/page.module.css'

export default function PolitiqueConfidentialite() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>Confidentialité</p>
          <h1 className={styles.titre}>Vos données doivent rester protégées et maîtrisées.</h1>
          <p className={styles.description}>
            ENAPINEX collecte uniquement les informations utiles à la création de compte, aux commandes et aux livraisons.
          </p>
        </div>
      </section>
      <section className={styles.grid}>
        {['Données de compte', 'Adresse de livraison', 'Paiement', 'Sécurité'].map((titre) => (
          <div className={styles.infoItem} key={titre}>
            <h3>{titre}</h3>
            <p>Cette rubrique précise les données concernées et leur usage dans la plateforme.</p>
          </div>
        ))}
      </section>
    </main>
  )
}
