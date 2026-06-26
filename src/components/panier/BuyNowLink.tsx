'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'
import { saveCheckoutItems, type PanierItem } from '@/src/lib/panier'

type BuyNowLinkProps = {
  item: Omit<PanierItem, 'quantite'> & { quantite?: number }
  className?: string
  children: ReactNode
}

export default function BuyNowLink({ item, className, children }: BuyNowLinkProps) {
  return (
    <Link
      href="/livraison-paiement"
      className={className}
      onClick={() => {
        saveCheckoutItems([{ ...item, quantite: item.quantite ?? 1 }])
      }}
    >
      {children}
    </Link>
  )
}
