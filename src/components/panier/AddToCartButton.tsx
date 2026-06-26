'use client'

import type { ReactNode } from 'react'
import { useState } from 'react'
import { addPanierItem, type PanierItem } from '@/src/lib/panier'
import { notify } from '@/src/components/ui/ToastProvider'

type AddToCartButtonProps = {
  item: Omit<PanierItem, 'quantite'> & { quantite?: number }
  className?: string
  children: ReactNode
  title?: string
}

export default function AddToCartButton({ item, className, children, title }: AddToCartButtonProps) {
  const [ajoute, setAjoute] = useState(false)

  return (
    <button
      type="button"
      className={className}
      title={title}
      onClick={() => {
        addPanierItem(item)
        notify(`${item.nom} ajouté au panier`)
        setAjoute(true)
        window.setTimeout(() => setAjoute(false), 900)
      }}
    >
      {ajoute ? '✓' : children}
    </button>
  )
}
