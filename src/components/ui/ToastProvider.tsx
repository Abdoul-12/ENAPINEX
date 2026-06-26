'use client'

import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import styles from './ToastProvider.module.css'

export const TOAST_EVENT = 'enapinex:toast'

type Toast = {
  id: number
  message: string
  type?: 'success' | 'error' | 'info'
}

export function notify(message: string, type: Toast['type'] = 'success') {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent(TOAST_EVENT, { detail: { message, type } }))
}

export default function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  useEffect(() => {
    const afficherToast = (event: Event) => {
      const detail = (event as CustomEvent<{ message: string; type?: Toast['type'] }>).detail
      const id = Date.now()

      setToasts((liste) => [...liste, { id, message: detail.message, type: detail.type ?? 'success' }])
      window.setTimeout(() => {
        setToasts((liste) => liste.filter((toast) => toast.id !== id))
      }, 2800)
    }

    window.addEventListener(TOAST_EVENT, afficherToast)
    return () => window.removeEventListener(TOAST_EVENT, afficherToast)
  }, [])

  return (
    <>
      {children}
      <div className={styles.toastZone} aria-live="polite">
        {toasts.map((toast) => (
          <div className={`${styles.toast} ${styles[toast.type ?? 'success']}`} key={toast.id}>
            {toast.message}
          </div>
        ))}
      </div>
    </>
  )
}
