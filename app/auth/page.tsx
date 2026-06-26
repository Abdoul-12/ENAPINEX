'use client'

import Link from 'next/link'
import Image from 'next/image'
import type { FormEvent } from 'react'
import { useState } from 'react'
import styles from './page.module.css'

type ConnexionForm = {
  identifiant: string
  motDePasse: string
  souvenir: boolean
}

type InscriptionForm = {
  nom: string
  prenom: string
  email: string
  telephone: string
  motDePasse: string
  confirmation: string
  ville: string
  quartier: string
  adresse: string
  cgu: boolean
}

const motDePasseRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/

export default function Auth() {
  const [onglet, setOnglet] = useState<'connexion' | 'inscription'>('connexion')
  const [motDePasseVisible, setMotDePasseVisible] = useState(false)
  const [motDePasseInscriptionVisible, setMotDePasseInscriptionVisible] = useState(false)
  const [confirmationVisible, setConfirmationVisible] = useState(false)
  const [connexion, setConnexion] = useState<ConnexionForm>({
    identifiant: '',
    motDePasse: '',
    souvenir: false,
  })
  const [inscription, setInscription] = useState<InscriptionForm>({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    motDePasse: '',
    confirmation: '',
    ville: '',
    quartier: '',
    adresse: '',
    cgu: false,
  })
  const [messageConnexion, setMessageConnexion] = useState('')
  const [messageInscription, setMessageInscription] = useState('')

  const changerInscription = <K extends keyof InscriptionForm>(champ: K, valeur: InscriptionForm[K]) => {
    setInscription((formulaire) => ({ ...formulaire, [champ]: valeur }))
    setMessageInscription('')
  }

  const validerConnexion = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!connexion.identifiant.trim() || !connexion.motDePasse.trim()) {
      setMessageConnexion('Renseignez votre email ou téléphone ainsi que votre mot de passe.')
      return
    }

    setMessageConnexion('Connexion prête. Les informations seront envoyées au serveur dès que le backend sera branché.')
  }

  const validerInscription = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (
      !inscription.nom.trim() ||
      !inscription.prenom.trim() ||
      !inscription.email.trim() ||
      !inscription.telephone.trim() ||
      !inscription.ville ||
      !inscription.quartier.trim() ||
      !inscription.adresse.trim()
    ) {
      setMessageInscription('Remplissez tous les champs obligatoires, surtout la ville et le quartier pour la livraison.')
      return
    }

    if (!motDePasseRegex.test(inscription.motDePasse)) {
      setMessageInscription('Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.')
      return
    }

    if (inscription.motDePasse !== inscription.confirmation) {
      setMessageInscription('Les deux mots de passe ne correspondent pas.')
      return
    }

    if (!inscription.cgu) {
      setMessageInscription('Vous devez accepter les conditions générales et la politique de confidentialité.')
      return
    }

    setMessageInscription('Compte prêt à être créé. Les données seront envoyées au serveur dès que le backend sera branché.')
  }

  return (
    <div className={styles.page}>

      {/* ── TOP BAR ── */}
      <div className={styles.topBar}>
        <Link href="/" className={styles.retourLien}>
          ← Retour à l&apos;accueil
        </Link>
      </div>

      {/* ── LAYOUT ── */}
      <div className={styles.layout}>

        {/* ── COLONNE GAUCHE ── */}
        <div className={styles.colonneGauche}>
          <div>
            <h1 className={styles.gaucheTitre}>
              Bienvenue sur ENAPINEX
            </h1>
            <div className={styles.gaucheSeparateur}></div>
            <p className={styles.gaucheDesc}>
              La marketplace qui connecte les producteurs gabonais
              aux consommateurs en quête de produits naturels et authentiques.
            </p>
            <div className={styles.avantages}>
              <div className={styles.avantageItem}>
                <div className={styles.avantageIcone}>🌿</div>
                <div>
                  <p className={styles.avantageTitre}>Produits 100% naturels</p>
                  <p className={styles.avantageDesc}>Miel pur, chenilles séchées et bien plus.</p>
                </div>
              </div>
              <div className={styles.avantageItem}>
                <div className={styles.avantageIcone}>👥</div>
                <div>
                  <p className={styles.avantageTitre}>Soutien aux producteurs locaux</p>
                  <p className={styles.avantageDesc}>Valorisons ensemble le terroir gabonais.</p>
                </div>
              </div>
              <div className={styles.avantageItem}>
                <div className={styles.avantageIcone}>🔒</div>
                <div>
                  <p className={styles.avantageTitre}>Paiement sécurisé</p>
                  <p className={styles.avantageDesc}>Achetez en toute confiance.</p>
                </div>
              </div>
            </div>
          </div>
          <Image
            src="/images/auth.jpeg"
            alt="Miels et chenilles ENAPINEX"
            width={400}
            height={200}
            className={styles.gaucheImage}
          />
        </div>

        {/* ── COLONNE DROITE ── */}
        <div className={styles.colonneDroite}>

          {/* Onglets */}
          <div className={styles.onglets}>
            <button
              className={`${styles.onglet} ${onglet === 'connexion' ? styles.ongletActif : ''}`}
              onClick={() => setOnglet('connexion')}
            >
              Se connecter
            </button>
            <button
              className={`${styles.onglet} ${onglet === 'inscription' ? styles.ongletActif : ''}`}
              onClick={() => setOnglet('inscription')}
            >
              S&apos;inscrire
            </button>
          </div>

          {/* ── FORMULAIRE CONNEXION ── */}
          {onglet === 'connexion' && (
            <form onSubmit={validerConnexion}>
              <h2 className={styles.formTitre}>Bon retour !</h2>
              <p className={styles.formSousTitre}>Connectez-vous à votre compte</p>

              <div className={styles.formGroupe}>
                <label className={styles.formLabel}>Email ou téléphone</label>
                <div className={styles.inputBox}>
                  <span className={styles.inputIcone}>👤</span>
                  <input
                    type="text"
                    placeholder="Entrez votre email ou numéro de téléphone"
                    className={styles.input}
                    value={connexion.identifiant}
                    onChange={(event) => {
                      setConnexion((formulaire) => ({ ...formulaire, identifiant: event.target.value }))
                      setMessageConnexion('')
                    }}
                  />
                </div>
              </div>

              <div className={styles.formGroupe}>
                <label className={styles.formLabel}>Mot de passe</label>
                <div className={styles.inputBox}>
                  <span className={styles.inputIcone}>🔒</span>
                  <input
                    type={motDePasseVisible ? 'text' : 'password'}
                    placeholder="Entrez votre mot de passe"
                    className={styles.input}
                    value={connexion.motDePasse}
                    onChange={(event) => {
                      setConnexion((formulaire) => ({ ...formulaire, motDePasse: event.target.value }))
                      setMessageConnexion('')
                    }}
                  />
                  <button
                    type="button"
                    className={styles.inputToggle}
                    onClick={() => setMotDePasseVisible(!motDePasseVisible)}
                    aria-label={motDePasseVisible ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                  >
                    👁
                  </button>
                </div>
              </div>

              <div className={styles.formOptions}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={connexion.souvenir}
                    onChange={(event) => setConnexion((formulaire) => ({ ...formulaire, souvenir: event.target.checked }))}
                  />
                  Se souvenir de moi
                </label>
                <Link href="/aide" className={styles.motDePasseOublie}>
                  Mot de passe oublié ?
                </Link>
              </div>

              {messageConnexion && (
                <p className={`${styles.formMessage} ${messageConnexion.startsWith('Connexion prête') ? styles.formMessageSucces : ''}`}>
                  {messageConnexion}
                </p>
              )}

              <button className={styles.btnSubmit} type="submit">
                Se connecter
              </button>

              <div className={styles.separateur}>
                <div className={styles.separateurLigne}></div>
                <span className={styles.separateurTexte}>ou</span>
                <div className={styles.separateurLigne}></div>
              </div>

              <a className={styles.btnSocial} href="https://accounts.google.com/" target="_blank" rel="noopener noreferrer">
                <span className={`${styles.socialIcone} ${styles.googleIcone}`}>G</span> Continuer avec Google
              </a>
              <a className={styles.btnSocial} href="https://www.facebook.com/login/" target="_blank" rel="noopener noreferrer">
                <span className={`${styles.socialIcone} ${styles.facebookIcone}`}>f</span> Continuer avec Facebook
              </a>

              <p className={styles.formFooter}>
                Vous n&apos;avez pas de compte ?{' '}
                <span
                  className={styles.formFooterLien}
                  onClick={() => setOnglet('inscription')}
                >
                  S&apos;inscrire
                </span>
              </p>
            </form>
          )}

          {/* ── FORMULAIRE INSCRIPTION ── */}
          {onglet === 'inscription' && (
            <form onSubmit={validerInscription}>
              <h2 className={styles.formTitre}>Créer un compte</h2>
              <p className={styles.formSousTitre}>
                Rejoignez ENAPINEX et profitez du meilleur du terroir gabonais.
              </p>

              <div className={styles.formGrille}>
                <div className={styles.formGroupe}>
                  <label className={styles.formLabel}>Nom</label>
                  <div className={styles.inputBox}>
                    <span className={styles.inputIcone}>👤</span>
                    <input
                      type="text"
                      placeholder="Entrez votre nom"
                      className={styles.input}
                      value={inscription.nom}
                      onChange={(event) => changerInscription('nom', event.target.value)}
                    />
                  </div>
                </div>
                <div className={styles.formGroupe}>
                  <label className={styles.formLabel}>Prénom</label>
                  <div className={styles.inputBox}>
                    <span className={styles.inputIcone}>👤</span>
                    <input
                      type="text"
                      placeholder="Entrez votre prénom"
                      className={styles.input}
                      value={inscription.prenom}
                      onChange={(event) => changerInscription('prenom', event.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.formGrille}>
                <div className={styles.formGroupe}>
                  <label className={styles.formLabel}>Adresse e-mail</label>
                  <div className={styles.inputBox}>
                    <span className={styles.inputIcone}>✉️</span>
                    <input
                      type="email"
                      placeholder="Entrez votre adresse e-mail"
                      className={styles.input}
                      value={inscription.email}
                      onChange={(event) => changerInscription('email', event.target.value)}
                    />
                  </div>
                </div>
                <div className={styles.formGroupe}>
                  <label className={styles.formLabel}>Numéro de téléphone</label>
                  <div className={styles.inputBox}>
                    <span className={styles.inputIcone}>📞</span>
                    <input
                      type="tel"
                      placeholder="Ex: +241 62 34 56 78"
                      className={styles.input}
                      value={inscription.telephone}
                      onChange={(event) => changerInscription('telephone', event.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.formGrille}>
                <div className={styles.formGroupe}>
                  <label className={styles.formLabel}>Mot de passe</label>
                  <div className={styles.inputBox}>
                    <span className={styles.inputIcone}>🔒</span>
                    <input
                      type={motDePasseInscriptionVisible ? 'text' : 'password'}
                      placeholder="Créez un mot de passe"
                      className={styles.input}
                      value={inscription.motDePasse}
                      onChange={(event) => changerInscription('motDePasse', event.target.value)}
                    />
                    <button
                      type="button"
                      className={styles.inputToggle}
                      onClick={() => setMotDePasseInscriptionVisible(!motDePasseInscriptionVisible)}
                      aria-label={motDePasseInscriptionVisible ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                    >
                      👁
                    </button>
                  </div>
                </div>
                <div className={styles.formGroupe}>
                  <label className={styles.formLabel}>Confirmer le mot de passe</label>
                  <div className={styles.inputBox}>
                    <span className={styles.inputIcone}>🔒</span>
                    <input
                      type={confirmationVisible ? 'text' : 'password'}
                      placeholder="Confirmez votre mot de passe"
                      className={styles.input}
                      value={inscription.confirmation}
                      onChange={(event) => changerInscription('confirmation', event.target.value)}
                    />
                    <button
                      type="button"
                      className={styles.inputToggle}
                      onClick={() => setConfirmationVisible(!confirmationVisible)}
                      aria-label={confirmationVisible ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                    >
                      👁
                    </button>
                  </div>
                </div>
              </div>

              <div className={styles.formGrille}>
                <div className={styles.formGroupe}>
                  <label className={styles.formLabel}>Ville</label>
                  <div className={styles.inputBox}>
                    <span className={styles.inputIcone}>📍</span>
                    <select
                      className={styles.input}
                      style={{ cursor: 'pointer' }}
                      required
                      value={inscription.ville}
                      onChange={(event) => changerInscription('ville', event.target.value)}
                    >
                      <option value="">Sélectionnez votre ville</option>
                      <option>Libreville</option>
                      <option>Port-Gentil</option>
                      <option>Oyem</option>
                      <option>Franceville</option>
                      <option>Moanda</option>
                      <option>Mouila</option>
                      <option>Lambaréné</option>
                    </select>
                  </div>
                </div>
                <div className={styles.formGroupe}>
                  <label className={styles.formLabel}>Quartier</label>
                  <div className={styles.inputBox}>
                    <span className={styles.inputIcone}>📍</span>
                    <input
                      type="text"
                      placeholder="Entrez votre quartier"
                      className={styles.input}
                      required
                      value={inscription.quartier}
                      onChange={(event) => changerInscription('quartier', event.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.formGroupe}>
                <label className={styles.formLabel}>Adresse de livraison</label>
                <div className={styles.inputBox}>
                  <span className={styles.inputIcone}>🏠</span>
                  <input
                    type="text"
                    placeholder="Entrez votre adresse complète"
                    className={styles.input}
                    required
                    value={inscription.adresse}
                    onChange={(event) => changerInscription('adresse', event.target.value)}
                  />
                </div>
              </div>

              <div className={styles.formGroupe}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={inscription.cgu}
                    onChange={(event) => changerInscription('cgu', event.target.checked)}
                  />
                  <span className={styles.cguTexte}>
                    J&apos;accepte les{' '}
                    <Link href="/conditions-generales" className={styles.cguLien}>conditions générales d&apos;utilisation</Link>
                    {' '}et la{' '}
                    <Link href="/politique-confidentialite" className={styles.cguLien}>politique de confidentialité</Link>
                  </span>
                </label>
              </div>

              <div className={styles.passwordRules}>
                <span className={motDePasseRegex.test(inscription.motDePasse) ? styles.ruleOk : ''}>
                  8 caractères, majuscule, minuscule, chiffre et caractère spécial
                </span>
              </div>

              {messageInscription && (
                <p className={`${styles.formMessage} ${messageInscription.startsWith('Compte prêt') ? styles.formMessageSucces : ''}`}>
                  {messageInscription}
                </p>
              )}

              <button className={styles.btnSubmit} type="submit">
                👤 S&apos;inscrire
              </button>

              <div className={styles.separateur}>
                <div className={styles.separateurLigne}></div>
                <span className={styles.separateurTexte}>OU</span>
                <div className={styles.separateurLigne}></div>
              </div>

              <a className={styles.btnSocial} href="https://accounts.google.com/" target="_blank" rel="noopener noreferrer">
                <span className={`${styles.socialIcone} ${styles.googleIcone}`}>G</span> S&apos;inscrire avec Google
              </a>
              <a className={styles.btnSocial} href="https://www.facebook.com/login/" target="_blank" rel="noopener noreferrer">
                <span className={`${styles.socialIcone} ${styles.facebookIcone}`}>f</span> S&apos;inscrire avec Facebook
              </a>

              <p className={styles.formFooter}>
                Vous avez déjà un compte ?{' '}
                <span
                  className={styles.formFooterLien}
                  onClick={() => setOnglet('connexion')}
                >
                  Se connecter
                </span>
              </p>
            </form>
          )}

        </div>
      </div>

      {/* ── FOOTER ── */}
      <div className={styles.pageFooter}>
        © 2026 ENAPINEX — Tous droits réservés.
      </div>

    </div>
  )
}
