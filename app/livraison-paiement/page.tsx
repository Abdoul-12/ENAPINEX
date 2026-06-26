'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import { publicPath } from '@/src/lib/assets'
import {
  clearCheckoutItems,
  clearPanier,
  formatXaf,
  getCheckoutItems,
  getPanierTotals,
  type PanierItem,
} from '@/src/lib/panier'
import styles from './page.module.css'

const commandeParDefaut: PanierItem[] = [
  {
    slug: 'miel-foret-wolou',
    nom: 'Miel de Forêt du Wolou',
    producteur: 'Apiculteur Jean-Pierre',
    categorie: 'Miel',
    image: '/images/product-honey-forest.png',
    prix: 4500,
    prixLabel: '4 500 XAF',
    conditionnement: 'Pot de 500 g',
    quantite: 1,
  },
]

type VerificationStatut = 'attente' | 'verification' | 'succes' | 'insuffisant'
type MethodePaiement = 'carte' | 'airtel' | 'moov' | 'ria'
type ZoneLivraison = 'gabon' | 'diaspora'

type LivraisonForm = {
  zone: ZoneLivraison
  nom: string
  telephone: string
  pays: string
  ville: string
  quartier: string
  adresse: string
}

type PaiementForm = {
  reference: string
  titulaire: string
  expiration: string
  cvv: string
}

const paysDiaspora = ['France', 'Belgique', 'Canada', 'États-Unis', 'Sénégal', 'Côte d’Ivoire', 'Autre pays']
const villesGabon = ['Libreville', 'Akanda', 'Owendo', 'Port-Gentil', 'Oyem', 'Franceville', 'Mouila', 'Lambaréné', 'Autre ville']

function verifierCarteLuhn(numero: string) {
  const digits = numero.replace(/\D/g, '')

  if (digits.length < 13 || digits.length > 19) return false

  let somme = 0
  let doubler = false

  for (let index = digits.length - 1; index >= 0; index -= 1) {
    let chiffre = Number(digits[index])

    if (doubler) {
      chiffre *= 2
      if (chiffre > 9) chiffre -= 9
    }

    somme += chiffre
    doubler = !doubler
  }

  return somme % 10 === 0
}

function verifierExpiration(expiration: string) {
  const match = expiration.match(/^(\d{2})\s*\/?\s*(\d{2})$/)
  if (!match) return false

  const mois = Number(match[1])
  const annee = 2000 + Number(match[2])
  if (mois < 1 || mois > 12) return false

  const maintenant = new Date()
  const expirationDate = new Date(annee, mois)
  return expirationDate > maintenant
}

function masquerReference(reference: string) {
  const propre = reference.replace(/\s/g, '')
  if (propre.length <= 4) return 'Référence validée'
  return `•••• ${propre.slice(-4)}`
}

function calculerLivraison(livraison: LivraisonForm) {
  if (!livraison.ville || !livraison.quartier || !livraison.pays) return 0

  if (livraison.zone === 'gabon') {
    if (['Libreville', 'Akanda', 'Owendo'].includes(livraison.ville)) return 1500
    if (livraison.ville === 'Port-Gentil') return 3000
    return 4500
  }

  if (['Sénégal', 'Côte d’Ivoire'].includes(livraison.pays)) return 12000
  if (['France', 'Belgique'].includes(livraison.pays)) return 18000
  if (['Canada', 'États-Unis'].includes(livraison.pays)) return 25000
  return 30000
}

export default function LivraisonPaiement() {
  const [etape, setEtape] = useState<1 | 2 | 3>(1)
  const [methodePaiement, setMethodePaiement] = useState<MethodePaiement>('carte')
  const [items, setItems] = useState<PanierItem[]>(commandeParDefaut)
  const [verificationStatut, setVerificationStatut] = useState<VerificationStatut>('attente')
  const [numeroCommande, setNumeroCommande] = useState('ENAP-2026-06-26-1368')
  const [dateCommande, setDateCommande] = useState('26/06/2026 à 12:00')
  const [messageErreur, setMessageErreur] = useState('')
  const [livraison, setLivraison] = useState<LivraisonForm>({
    zone: 'gabon',
    nom: '',
    telephone: '',
    pays: 'Gabon',
    ville: 'Libreville',
    quartier: '',
    adresse: '',
  })
  const [paiement, setPaiement] = useState<PaiementForm>({
    reference: '',
    titulaire: '',
    expiration: '',
    cvv: '',
  })

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const checkoutItems = getCheckoutItems()
      setItems(checkoutItems.length > 0 ? checkoutItems : commandeParDefaut)
    }, 0)

    return () => window.clearTimeout(timer)
  }, [])

  const fraisLivraison = useMemo(() => calculerLivraison(livraison), [livraison])
  const totals = useMemo(() => getPanierTotals(items, fraisLivraison), [fraisLivraison, items])
  const totalArticles = items.reduce((total, item) => total + item.quantite, 0)
  const methodeLabel = {
    carte: 'Carte bancaire',
    airtel: 'Airtel Money',
    moov: 'Moov Money',
    ria: 'Ria',
  }[methodePaiement]

  useEffect(() => {
    if (etape !== 2 || verificationStatut !== 'verification') return

    const verificationTimer = window.setTimeout(() => {
      const reference = paiement.reference.replace(/\s/g, '')
      const soldeInsuffisant = reference.endsWith('0000') || reference.toUpperCase().includes('INSUFFISANT')

      if (soldeInsuffisant) {
        setVerificationStatut('insuffisant')
        return
      }

      const now = new Date()
      setNumeroCommande(`ENAP-${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`)
      setDateCommande(
        `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()} à ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`,
      )
      setVerificationStatut('succes')
    }, 1600)

    return () => window.clearTimeout(verificationTimer)
  }, [etape, paiement.reference, verificationStatut])

  useEffect(() => {
    if (verificationStatut !== 'succes') return

    const confirmationTimer = window.setTimeout(() => {
      clearCheckoutItems()
      clearPanier()
      setEtape(3)
    }, 1300)

    return () => window.clearTimeout(confirmationTimer)
  }, [verificationStatut])

  const changerZone = (zone: ZoneLivraison) => {
    setMessageErreur('')
    setLivraison((formulaire) => ({
      ...formulaire,
      zone,
      pays: zone === 'gabon' ? 'Gabon' : 'France',
      ville: zone === 'gabon' ? 'Libreville' : '',
      quartier: '',
      adresse: '',
    }))
  }

  const changerMethode = (methode: MethodePaiement) => {
    setMethodePaiement(methode)
    setMessageErreur('')
    setPaiement({ reference: '', titulaire: '', expiration: '', cvv: '' })
  }

  const validerLivraison = () => {
    if (!livraison.nom.trim() || !livraison.telephone.trim()) {
      return 'Renseignez le nom complet et le numéro de téléphone du client.'
    }

    if (!livraison.pays || !livraison.ville.trim() || !livraison.quartier.trim() || !livraison.adresse.trim()) {
      return 'Renseignez le pays, la ville, le quartier et l’adresse de livraison.'
    }

    if (fraisLivraison <= 0) {
      return 'La localisation doit permettre de calculer les frais de livraison.'
    }

    return ''
  }

  const validerPaiement = () => {
    const reference = paiement.reference.replace(/\s/g, '')

    if (!paiement.titulaire.trim()) {
      return 'Renseignez le nom du titulaire du moyen de paiement.'
    }

    if (methodePaiement === 'carte') {
      if (!verifierCarteLuhn(reference)) return 'Le numéro de carte n’est pas valide.'
      if (!verifierExpiration(paiement.expiration)) return 'La date d’expiration de la carte n’est pas valide.'
      if (!/^\d{3,4}$/.test(paiement.cvv)) return 'Le cryptogramme doit contenir 3 ou 4 chiffres.'
      return ''
    }

    if (methodePaiement === 'airtel' || methodePaiement === 'moov') {
      if (!/^(\+241|241|0)?[0-9]{8,9}$/.test(reference)) {
        return 'Le numéro Mobile Money doit être un numéro gabonais valide.'
      }
      return ''
    }

    if (!/^RIA[-\s]?\d{6,12}$/i.test(reference)) {
      return 'La référence Ria doit respecter le format RIA-123456.'
    }

    return ''
  }

  const verifierPaiement = () => {
    const erreurLivraison = validerLivraison()
    if (erreurLivraison) {
      setMessageErreur(erreurLivraison)
      return
    }

    const erreurPaiement = validerPaiement()
    if (erreurPaiement) {
      setMessageErreur(erreurPaiement)
      return
    }

    setMessageErreur('')
    setEtape(2)
    setVerificationStatut('verification')
  }

  return (
    <div className={styles.page}>
      <div className={styles.stepper}>
        <div className={styles.stepItem}>
          <div className={`${styles.stepCercle} ${etape >= 1 ? styles.stepCercleActif : ''}`}>1</div>
          <span className={`${styles.stepLabel} ${etape === 1 ? styles.stepLabelActif : ''}`}>Livraison & Paiement</span>
        </div>
        <div className={`${styles.stepLigne} ${etape >= 2 ? styles.stepLigneFaite : ''}`}></div>
        <div className={styles.stepItem}>
          <div className={`${styles.stepCercle} ${etape >= 2 ? styles.stepCercleActif : ''}`}>2</div>
          <span className={`${styles.stepLabel} ${etape === 2 ? styles.stepLabelActif : ''}`}>Vérification</span>
        </div>
        <div className={`${styles.stepLigne} ${etape >= 3 ? styles.stepLigneFaite : ''}`}></div>
        <div className={styles.stepItem}>
          <div className={`${styles.stepCercle} ${etape >= 3 ? styles.stepCercleActif : ''}`}>3</div>
          <span className={`${styles.stepLabel} ${etape === 3 ? styles.stepLabelActif : ''}`}>Confirmation</span>
        </div>
      </div>

      <div className={styles.layout}>
        {etape === 1 && (
          <div className={styles.formulaire}>
            <h1 className={styles.sectionTitre}>Livraison & Paiement</h1>
            <p className={styles.sectionDesc}>
              Renseignez vos informations de livraison et choisissez votre moyen de paiement.
            </p>

            <div className={styles.livraisonTitre}>
              <div className={styles.livraisonIcone}>📍</div>
              <span>1. Informations de livraison</span>
            </div>

            <div className={styles.localisationTabs}>
              <button
                type="button"
                className={`${styles.localisationTab} ${livraison.zone === 'gabon' ? styles.localisationTabActif : ''}`}
                onClick={() => changerZone('gabon')}
              >
                Livraison nationale
              </button>
              <button
                type="button"
                className={`${styles.localisationTab} ${livraison.zone === 'diaspora' ? styles.localisationTabActif : ''}`}
                onClick={() => changerZone('diaspora')}
              >
                Livraison diaspora
              </button>
            </div>

            <div className={styles.formGrille2}>
              <div className={styles.formGroupe}>
                <label className={styles.formLabel}>Nom complet</label>
                <input
                  type="text"
                  placeholder="Ex: Marie L."
                  className={styles.input}
                  value={livraison.nom}
                  onChange={(event) => {
                    setMessageErreur('')
                    setLivraison((formulaire) => ({ ...formulaire, nom: event.target.value }))
                  }}
                />
              </div>
              <div className={styles.formGroupe}>
                <label className={styles.formLabel}>Numéro de téléphone</label>
                <input
                  type="tel"
                  placeholder="+241 62 34 56 78"
                  className={styles.input}
                  value={livraison.telephone}
                  onChange={(event) => {
                    setMessageErreur('')
                    setLivraison((formulaire) => ({ ...formulaire, telephone: event.target.value }))
                  }}
                />
              </div>
            </div>

            <div className={styles.formGrille3}>
              <div className={styles.formGroupe}>
                <label className={styles.formLabel}>Pays</label>
                {livraison.zone === 'gabon' ? (
                  <input className={styles.input} value="Gabon" readOnly />
                ) : (
                  <select
                    className={styles.input}
                    value={livraison.pays}
                    onChange={(event) => setLivraison((formulaire) => ({ ...formulaire, pays: event.target.value }))}
                  >
                    {paysDiaspora.map((pays) => <option key={pays}>{pays}</option>)}
                  </select>
                )}
              </div>
              <div className={styles.formGroupe}>
                <label className={styles.formLabel}>Ville</label>
                {livraison.zone === 'gabon' ? (
                  <select
                    className={styles.input}
                    value={livraison.ville}
                    onChange={(event) => setLivraison((formulaire) => ({ ...formulaire, ville: event.target.value }))}
                  >
                    {villesGabon.map((ville) => <option key={ville}>{ville}</option>)}
                  </select>
                ) : (
                  <input
                    className={styles.input}
                    placeholder="Ex: Lyon"
                    value={livraison.ville}
                    onChange={(event) => setLivraison((formulaire) => ({ ...formulaire, ville: event.target.value }))}
                  />
                )}
              </div>
              <div className={styles.formGroupe}>
                <label className={styles.formLabel}>Quartier</label>
                <input
                  className={styles.input}
                  placeholder={livraison.zone === 'gabon' ? 'Ex: Nzeng-Ayong' : 'Ex: La Part-Dieu'}
                  value={livraison.quartier}
                  onChange={(event) => setLivraison((formulaire) => ({ ...formulaire, quartier: event.target.value }))}
                />
              </div>
            </div>

            <div className={styles.formGroupe}>
              <label className={styles.formLabel}>Adresse de livraison</label>
              <input
                type="text"
                placeholder="Rue, repère, immeuble, appartement..."
                className={styles.input}
                value={livraison.adresse}
                onChange={(event) => setLivraison((formulaire) => ({ ...formulaire, adresse: event.target.value }))}
              />
            </div>

            <div className={styles.paiementTitre}>
              <div className={styles.livraisonIcone}>💳</div>
              <span>2. Moyen de paiement</span>
            </div>
            <p className={styles.paiementDesc}>
              Sélectionnez votre moyen de paiement puis renseignez les informations requises.
            </p>

            <div className={styles.methodesGrid}>
              {[
                { key: 'carte', icone: '💳', nom: 'Carte bancaire', desc: 'Visa, MasterCard, etc.' },
                { key: 'airtel', icone: '📱', nom: 'Airtel Money', desc: 'Paiement mobile' },
                { key: 'moov', icone: '📱', nom: 'Moov Money', desc: 'Paiement mobile' },
                { key: 'ria', icone: '💸', nom: 'Ria', desc: 'Transfert d’argent' },
              ].map((methode) => (
                <button
                  type="button"
                  key={methode.key}
                  className={`${styles.methodeCard} ${methodePaiement === methode.key ? styles.methodeCardActif : ''}`}
                  onClick={() => changerMethode(methode.key as MethodePaiement)}
                >
                  <input type="radio" className={styles.methodeRadio} checked={methodePaiement === methode.key} readOnly />
                  <span className={styles.methodeIcone}>{methode.icone}</span>
                  <span className={styles.methodeNom}>{methode.nom}</span>
                  <span className={styles.methodeDesc}>{methode.desc}</span>
                </button>
              ))}
            </div>

            <div className={styles.formCarte}>
              <p className={styles.formCarteTitre}>Paiement par {methodeLabel}</p>
              {methodePaiement === 'carte' ? (
                <div className={styles.carteLayout}>
                  <div>
                    <div className={styles.formGroupe} style={{ marginBottom: '0.75rem' }}>
                      <label className={styles.formLabel}>Numéro de carte</label>
                      <input
                        type="text"
                        inputMode="numeric"
                        placeholder="4242 4242 4242 4242"
                        className={styles.input}
                        value={paiement.reference}
                        onChange={(event) => setPaiement((formulaire) => ({ ...formulaire, reference: event.target.value }))}
                      />
                    </div>
                    <div className={styles.formGroupe} style={{ marginBottom: '0.75rem' }}>
                      <label className={styles.formLabel}>Nom du titulaire</label>
                      <input
                        type="text"
                        placeholder="Nom inscrit sur la carte"
                        className={styles.input}
                        value={paiement.titulaire}
                        onChange={(event) => setPaiement((formulaire) => ({ ...formulaire, titulaire: event.target.value }))}
                      />
                    </div>
                    <div className={styles.formGrille2}>
                      <div className={styles.formGroupe}>
                        <label className={styles.formLabel}>Date d&apos;expiration</label>
                        <input
                          type="text"
                          placeholder="MM / AA"
                          className={styles.input}
                          value={paiement.expiration}
                          onChange={(event) => setPaiement((formulaire) => ({ ...formulaire, expiration: event.target.value }))}
                        />
                      </div>
                      <div className={styles.formGroupe}>
                        <label className={styles.formLabel}>Cryptogramme (CVV)</label>
                        <input
                          type="password"
                          inputMode="numeric"
                          placeholder="123"
                          className={styles.input}
                          value={paiement.cvv}
                          onChange={(event) => setPaiement((formulaire) => ({ ...formulaire, cvv: event.target.value }))}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={styles.carteVisuel}>
                    <div style={{ fontSize: '1.5rem' }}>💳</div>
                    <div>
                      <div className={styles.carteNumero}>{masquerReference(paiement.reference)}</div>
                      <div className={styles.carteInfo}>
                        <span>{paiement.expiration || 'MM/AA'}</span>
                        <span>{paiement.cvv ? '•••' : 'CVV'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className={styles.formGrille2}>
                  <div className={styles.formGroupe}>
                    <label className={styles.formLabel}>{methodePaiement === 'ria' ? 'Référence de transaction' : 'Numéro de téléphone'}</label>
                    <input
                      type="text"
                      placeholder={methodePaiement === 'ria' ? 'RIA-123456789' : '+241 62 34 56 78'}
                      className={styles.input}
                      value={paiement.reference}
                      onChange={(event) => setPaiement((formulaire) => ({ ...formulaire, reference: event.target.value }))}
                    />
                  </div>
                  <div className={styles.formGroupe}>
                    <label className={styles.formLabel}>Nom du titulaire</label>
                    <input
                      type="text"
                      placeholder="Nom du titulaire"
                      className={styles.input}
                      value={paiement.titulaire}
                      onChange={(event) => setPaiement((formulaire) => ({ ...formulaire, titulaire: event.target.value }))}
                    />
                  </div>
                </div>
              )}
              <p style={{ fontSize: '0.78rem', color: '#6B4F35', marginTop: '0.75rem' }}>
                🔒 Les coordonnées sont contrôlées avant la vérification. Une vraie mise en production devra passer par une passerelle bancaire ou Mobile Money.
              </p>
            </div>

            {messageErreur && <p className={styles.formMessage}>{messageErreur}</p>}

            <button className={styles.btnVerifier} onClick={verifierPaiement} type="button">
              🔒 Vérifier le paiement →
            </button>
            <p className={styles.securite}>
              ℹ️ La commande ne passe en vérification que si la livraison et le paiement sont complets.
            </p>
          </div>
        )}

        {etape === 2 && (
          <div className={styles.verificationBox}>
            <h1 className={styles.verificationTitre}>Vérification du paiement</h1>
            <p className={styles.verificationDesc}>
              Veuillez patienter pendant que nous vérifions votre paiement.
            </p>

            <div className={styles.verificationEtapes}>
              <div className={styles.verificationEtape}>
                <span className={styles.etapeIcone}>✅</span>
                <div>
                  <p className={styles.etapeTitre}>Connexion sécurisée à la passerelle de paiement</p>
                  <p className={styles.etapeDesc}>Connexion établie avec succès.</p>
                </div>
              </div>
              <div className={styles.verificationEtape}>
                <span className={styles.etapeIcone}>{verificationStatut === 'verification' ? '🔄' : '✅'}</span>
                <div>
                  <p className={styles.etapeTitre}>Vérification des informations de paiement</p>
                  <p className={styles.etapeDesc}>
                    {verificationStatut === 'verification' ? 'Analyse des informations fournies...' : 'Les informations fournies sont valides.'}
                  </p>
                </div>
              </div>
              <div className={styles.verificationEtape}>
                <span className={styles.etapeIcone}>
                  {verificationStatut === 'insuffisant' ? '❌' : verificationStatut === 'verification' ? '⏳' : '✅'}
                </span>
                <div>
                  <p className={styles.etapeTitre}>Vérification du solde</p>
                  <p className={styles.etapeDesc}>
                    {verificationStatut === 'insuffisant'
                      ? 'Solde insuffisant pour finaliser cette transaction.'
                      : verificationStatut === 'verification'
                        ? 'Nous vérifions la disponibilité des fonds sur votre compte.'
                        : 'Solde débité avec succès.'}
                  </p>
                </div>
              </div>
              <div className={styles.verificationEtape}>
                <span className={styles.etapeIcone}>{verificationStatut === 'succes' ? '✅' : '⏳'}</span>
                <div>
                  <p className={styles.etapeTitre}>Répartition automatique des revenus</p>
                  <p className={styles.etapeDesc}>
                    {verificationStatut === 'succes'
                      ? `ENAPINEX retient ${formatXaf(totals.revenuEnapinex)} et les producteurs reçoivent ${formatXaf(totals.revenuProducteurs)}.`
                      : 'Préparation de la commission plateforme et du versement producteur.'}
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.alerteInfo}>
              <span>ℹ️</span>
              <p className={styles.alerteInfoTexte}>
                Ne fermez pas cette page pendant le processus de vérification.
                Cette opération peut prendre quelques secondes.
              </p>
            </div>

            {verificationStatut === 'verification' && (
              <div className={styles.paiementValide}>
                <div className={styles.paiementValideTexte}>
                  <span style={{ fontSize: '1.5rem' }}>🔄</span>
                  <div>
                    <p className={styles.paiementValideTitre}>Vérification en cours...</p>
                    <p className={styles.paiementValideDesc}>
                      La plateforme contrôle le paiement, le solde et la répartition des revenus.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {verificationStatut === 'succes' && (
              <div className={styles.paiementValide}>
                <div className={styles.paiementValideTexte}>
                  <span style={{ fontSize: '1.5rem' }}>✅</span>
                  <div>
                    <p className={styles.paiementValideTitre}>Solde débité avec succès !</p>
                    <p className={styles.paiementValideDesc}>
                      Paiement validé. La commande va se confirmer automatiquement.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {verificationStatut === 'insuffisant' && (
              <div className={styles.paiementRefuse}>
                <div className={styles.paiementValideTexte}>
                  <span style={{ fontSize: '1.5rem' }}>❌</span>
                  <div>
                    <p className={styles.paiementRefuseTitre}>Solde insuffisant</p>
                    <p className={styles.paiementRefuseDesc}>
                      Le compte ou la carte ne dispose pas du montant nécessaire. Essayez un autre moyen de paiement.
                    </p>
                  </div>
                </div>
                <button className={styles.btnConfirmer} onClick={() => {
                  setEtape(1)
                  setVerificationStatut('attente')
                }}>
                  Modifier le paiement
                </button>
              </div>
            )}

            <button className={styles.btnRetour} onClick={() => setEtape(1)} style={{ marginTop: '1.5rem' }}>
              ← Retour à la livraison & paiement
            </button>
          </div>
        )}

        {etape === 3 && (
          <div className={styles.confirmationBox}>
            <div className={styles.confirmationIcone}>✅</div>
            <h1 className={styles.confirmationTitre}>Commande confirmée !</h1>
            <p className={styles.confirmationDesc}>
              Merci {livraison.nom}. Votre commande a été enregistrée avec succès.
            </p>

            <div className={styles.commandeNumeroBox}>
              <span className={styles.commandeNumeroLabel}>Numéro de commande</span>
              <span className={styles.commandeNumero}>
                {numeroCommande}
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' }}>📋</button>
              </span>
            </div>

            <p className={styles.confirmationEmail}>
              Un récapitulatif de confirmation vous sera envoyé par email ou SMS
              <br />avec tous les détails de votre commande.
            </p>

            <div className={styles.alertePreparation}>
              <span>ℹ️</span>
              <p className={styles.alertePreparationTexte}>
                <strong>Nous préparons votre commande avec soin.</strong>
                <br />Le panier a été remis à zéro après validation de la commande.
              </p>
            </div>

            <div className={styles.confirmationDetails}>
              <div className={styles.detailItem}>
                <div className={styles.detailIcone}>📍</div>
                <p className={styles.detailLabel}>Informations de livraison</p>
                <p className={styles.detailValeur}>
                  {livraison.nom}<br />
                  {livraison.telephone}<br />
                  {livraison.adresse}<br />
                  {livraison.quartier}, {livraison.ville}<br />
                  {livraison.pays}
                </p>
              </div>
              <div className={styles.detailItem}>
                <div className={styles.detailIcone}>💳</div>
                <p className={styles.detailLabel}>Méthode de paiement</p>
                <p className={styles.detailValeur}>
                  {methodeLabel}<br/>
                  {masquerReference(paiement.reference)}
                </p>
                <span className={styles.badgePaiement}>Paiement validé</span>
              </div>
              <div className={styles.detailItem}>
                <div className={styles.detailIcone}>📅</div>
                <p className={styles.detailLabel}>Date de commande</p>
                <p className={styles.detailValeur}>{dateCommande}</p>
              </div>
              <div className={styles.detailItem}>
                <div className={styles.detailIcone}>🔒</div>
                <p className={styles.detailLabel}>Statut du paiement</p>
                <p className={styles.detailValeur}>Transaction approuvée avec succès.</p>
                <span className={styles.badgePaiement}>Paiement réussi</span>
              </div>
            </div>

            <div className={styles.produitsCommandes}>
              <h2 className={styles.produitsCommandesTitre}>Produits commandés ({totalArticles} article{totalArticles > 1 ? 's' : ''})</h2>
              <div className={styles.produitCommandeHeader}>
                <span></span>
                <span>Prix unitaire</span>
                <span>Quantité</span>
                <span>Sous-total</span>
              </div>

              {items.map((item) => (
                <div className={styles.produitCommandeLigne} key={item.slug}>
                  <div className={styles.produitCommandeInfo}>
                    <Image src={publicPath(item.image)} alt={item.nom} width={48} height={48} className={styles.produitCommandeImage} />
                    <div>
                      <p className={styles.produitCommandeNom}>{item.nom}</p>
                      <p className={styles.produitCommandeDesc}>{item.conditionnement}</p>
                    </div>
                  </div>
                  <p className={styles.produitCommandePrix}>{item.prixLabel}</p>
                  <p className={styles.produitCommandeQte}>{item.quantite}</p>
                  <p className={styles.produitCommandeTotal}>{formatXaf(item.prix * item.quantite)}</p>
                </div>
              ))}
            </div>

            <div className={styles.recapConfirmation}>
              <div className={styles.recapConfirmationBox}>
                <h3 className={styles.recapConfirmationTitre}>Récapitulatif de la commande</h3>
                <div className={styles.recapConfirmationLigne}>
                  <span>Sous-total</span>
                  <span>{formatXaf(totals.sousTotal)}</span>
                </div>
                <div className={styles.recapConfirmationLigne}>
                  <span>Frais de livraison</span>
                  <span>{formatXaf(totals.livraison)}</span>
                </div>
                <div className={styles.recapConfirmationLigne}>
                  <span>Frais de service</span>
                  <span>{formatXaf(totals.service)}</span>
                </div>
                <div className={styles.recapConfirmationTotal}>
                  <span className={styles.recapConfirmationTotalLabel}>Total payé</span>
                  <span className={styles.recapConfirmationTotalMontant}>{formatXaf(totals.total)}</span>
                </div>
              </div>

              <div className={styles.recapConfirmationBox}>
                <h3 className={styles.recapConfirmationTitre}>Répartition automatique</h3>
                <div className={styles.recapConfirmationLigne}>
                  <span>Commission ENAPINEX (8%)</span>
                  <span>{formatXaf(totals.commissionPlateforme)}</span>
                </div>
                <div className={styles.recapConfirmationLigne}>
                  <span>Frais de service ENAPINEX</span>
                  <span>{formatXaf(totals.service)}</span>
                </div>
                <div className={styles.recapConfirmationLigne}>
                  <span>Revenu producteur</span>
                  <span>{formatXaf(totals.revenuProducteurs)}</span>
                </div>
                <div className={styles.recapConfirmationTotal}>
                  <span className={styles.recapConfirmationTotalLabel}>Revenu ENAPINEX</span>
                  <span className={styles.recapConfirmationTotalMontant}>{formatXaf(totals.revenuEnapinex)}</span>
                </div>
              </div>
            </div>

            <Link href="/" className={styles.btnRetourAccueil}>
              🏠 Retour à l&apos;accueil
            </Link>
          </div>
        )}

        {etape !== 3 && (
          <div className={styles.recap}>
            <h2 className={styles.recapTitre}>Récapitulatif de la commande</h2>

            {items.map((item) => (
              <div className={styles.recapArticle} key={item.slug}>
                <Image src={publicPath(item.image)} alt={item.nom} width={48} height={48} className={styles.recapArticleImage} />
                <span className={styles.recapArticleNom}>{item.nom} — {item.conditionnement} × {item.quantite}</span>
                <span className={styles.recapArticlePrix}>{formatXaf(item.prix * item.quantite)}</span>
              </div>
            ))}

            <div className={styles.recapSeparateur}></div>

            <div className={styles.recapLigne}>
              <span>Sous-total</span>
              <span>{formatXaf(totals.sousTotal)}</span>
            </div>
            <div className={styles.recapLigne}>
              <span>Frais de livraison</span>
              <span>{formatXaf(totals.livraison)}</span>
            </div>
            <div className={styles.recapLigne}>
              <span>Frais de service</span>
              <span>{formatXaf(totals.service)}</span>
            </div>
            <div className={styles.recapLigne}>
              <span>Commission ENAPINEX (8%)</span>
              <span>{formatXaf(totals.commissionPlateforme)}</span>
            </div>

            <div className={styles.recapTotal}>
              <span className={styles.recapTotalLabel}>Total à payer</span>
              <span className={styles.recapTotalMontant}>{formatXaf(totals.total)}</span>
            </div>

            <div className={styles.recapSeparateur}></div>
            <p style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1A0F07', marginBottom: '0.6rem' }}>
              Répartition automatique
            </p>
            <div className={styles.recapLigne}>
              <span>Producteurs</span>
              <span>{formatXaf(totals.revenuProducteurs)}</span>
            </div>
            <div className={styles.recapLigne}>
              <span>ENAPINEX</span>
              <span>{formatXaf(totals.revenuEnapinex)}</span>
            </div>

            {etape === 2 && (
              <>
                <div className={styles.recapSeparateur}></div>
                <p style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1A0F07', marginBottom: '0.6rem' }}>
                  Détails du paiement
                </p>
                <div className={styles.recapLigne}>
                  <span>Méthode de paiement</span>
                  <span>{methodeLabel}</span>
                </div>
                <div className={styles.recapLigne}>
                  <span>Référence</span>
                  <span>{masquerReference(paiement.reference)}</span>
                </div>
                <div className={styles.recapLigne}>
                  <span>Titulaire</span>
                  <span>{paiement.titulaire}</span>
                </div>
              </>
            )}

            <div className={styles.recapAvantages}>
              <div className={styles.recapAvantageItem}>
                <span className={styles.recapAvantageIcone}>🔒</span>
                <div>
                  <p className={styles.recapAvantageTitre}>Paiement contrôlé</p>
                  <p className={styles.recapAvantageDesc}>La commande ne passe pas si les coordonnées sont incomplètes.</p>
                </div>
              </div>
              <div className={styles.recapAvantageItem}>
                <span className={styles.recapAvantageIcone}>🚚</span>
                <div>
                  <p className={styles.recapAvantageTitre}>Livraison adaptée</p>
                  <p className={styles.recapAvantageDesc}>Les frais changent selon la zone nationale ou diaspora.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className={styles.pageFooter}>
        <div className={styles.footerAide}>
          <span>💬</span>
          <span>Besoin d&apos;aide ?</span>
        </div>
        <p className={styles.footerContact}>
          Contactez-nous au{' '}
          <Link href="tel:+24177123456" className={styles.footerContactLien}>+241 77 12 34 56</Link>
          {' '}ou par email à{' '}
          <Link href="mailto:contact@enapinex.ga" className={styles.footerContactLien}>contact@enapinex.ga</Link>
        </p>
      </div>
    </div>
  )
}
