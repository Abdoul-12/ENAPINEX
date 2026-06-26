import styles from './loading.module.css'

export default function Loading() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <div className={styles.header}></div>
        <div className={styles.grid}>
          <div className={styles.card}></div>
          <div className={styles.card}></div>
          <div className={styles.card}></div>
        </div>
      </div>
    </main>
  )
}
