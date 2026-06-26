import styles from '../contact/page.module.css'

export default function ConditionsGenerales() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>Conditions générales</p>
          <h1 className={styles.titre}>Les règles d&apos;utilisation d&apos;ENAPINEX.</h1>
          <p className={styles.description}>
            Ces conditions expliquent les engagements entre les clients, les producteurs et la plateforme.
          </p>
        </div>
      </section>
      <section className={styles.grid}>
        {['Commandes et paiements', 'Livraison', 'Producteurs', 'Responsabilités'].map((titre) => (
          <div className={styles.infoItem} key={titre}>
            <h3>{titre}</h3>
            <p>Cette section sera reliée aux règles juridiques finales avant la mise en production.</p>
          </div>
        ))}
      </section>
    </main>
  )
}
