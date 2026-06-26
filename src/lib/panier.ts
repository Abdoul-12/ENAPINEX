export type PanierItem = {
  slug: string
  nom: string
  producteur: string
  categorie: string
  image: string
  prix: number
  prixLabel: string
  conditionnement: string
  quantite: number
}

export const PANIER_STORAGE_KEY = 'enapinex:panier'
export const CHECKOUT_STORAGE_KEY = 'enapinex:checkout'
export const PANIER_EVENT = 'enapinex:panier-change'
export const COMMISSION_PLATEFORME_RATE = 0.08

export function formatXaf(montant: number) {
  return `${Math.round(montant).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} XAF`
}

export function parsePrix(prix: string | number) {
  if (typeof prix === 'number') return prix
  return Number(prix.replace(/[^\d]/g, '')) || 0
}

function dispatchPanierEvent() {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new Event(PANIER_EVENT))
}

function readItems(key: string): PanierItem[] {
  if (typeof window === 'undefined') return []

  try {
    const contenu = window.localStorage.getItem(key)
    if (!contenu) return []
    const items = JSON.parse(contenu)
    return Array.isArray(items) ? items : []
  } catch {
    return []
  }
}

function writeItems(key: string, items: PanierItem[]) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(key, JSON.stringify(items))
}

export function getPanierItems() {
  return readItems(PANIER_STORAGE_KEY)
}

export function savePanierItems(items: PanierItem[]) {
  writeItems(PANIER_STORAGE_KEY, items)
  dispatchPanierEvent()
}

export function getCheckoutItems() {
  const checkoutItems = readItems(CHECKOUT_STORAGE_KEY)
  return checkoutItems.length > 0 ? checkoutItems : getPanierItems()
}

export function saveCheckoutItems(items: PanierItem[]) {
  writeItems(CHECKOUT_STORAGE_KEY, items)
}

export function clearCheckoutItems() {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(CHECKOUT_STORAGE_KEY)
}

export function addPanierItem(item: Omit<PanierItem, 'quantite'> & { quantite?: number }) {
  const items = getPanierItems()
  const quantite = item.quantite ?? 1
  const index = items.findIndex((panierItem) => panierItem.slug === item.slug)

  if (index >= 0) {
    items[index] = {
      ...items[index],
      quantite: items[index].quantite + quantite,
    }
  } else {
    items.push({ ...item, quantite })
  }

  savePanierItems(items)
}

export function updatePanierQuantite(slug: string, quantite: number) {
  const items = getPanierItems()
    .map((item) => (item.slug === slug ? { ...item, quantite: Math.max(1, quantite) } : item))

  savePanierItems(items)
}

export function removePanierItem(slug: string) {
  savePanierItems(getPanierItems().filter((item) => item.slug !== slug))
}

export function clearPanier() {
  savePanierItems([])
}

export function getPanierCount(items = getPanierItems()) {
  return items.reduce((total, item) => total + item.quantite, 0)
}

export function getPanierTotals(items: PanierItem[], livraisonPersonnalisee?: number) {
  const sousTotal = items.reduce((total, item) => total + item.prix * item.quantite, 0)
  const livraison = typeof livraisonPersonnalisee === 'number'
    ? livraisonPersonnalisee
    : sousTotal === 0 || sousTotal >= 25000 ? 0 : 2500
  const service = sousTotal === 0 ? 0 : Math.min(2500, Math.max(500, Math.round(sousTotal * 0.03)))
  const commissionPlateforme = Math.round(sousTotal * COMMISSION_PLATEFORME_RATE)
  const revenuProducteurs = Math.max(0, sousTotal - commissionPlateforme)
  const revenuEnapinex = commissionPlateforme + service
  const total = sousTotal + livraison + service

  return { sousTotal, livraison, service, commissionPlateforme, revenuProducteurs, revenuEnapinex, total }
}
