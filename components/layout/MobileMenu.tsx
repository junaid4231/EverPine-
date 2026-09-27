'use client'

import { useRef } from 'react'
import styles from './MobileMenu.module.css'
import { NavLink } from './NavLink'
import { WhatsAppIcon } from '@/components/Icons'

interface Item {
  href: string
  label: string
}

interface Props {
  labels: { menu: string; close: string; nav: string; quote: string; whatsapp: string }
  primary: Item[]
  secondary: Item[]
  quoteHref: string
  whatsappHref: string | null
}

/** Full-screen menu on a native <dialog>: focus trap, Esc to close and inert background for free. */
export function MobileMenu({ labels, primary, secondary, quoteHref, whatsappHref }: Props) {
  const ref = useRef<HTMLDialogElement>(null)
  const open = () => ref.current?.showModal()
  const close = () => ref.current?.close()

  return (
    <>
      <button type="button" className={styles.toggle} onClick={open} aria-haspopup="dialog">
        {labels.menu}
        <span className={styles.lines} aria-hidden="true" />
      </button>
      <dialog ref={ref} className={styles.dialog} aria-label={labels.nav}>
        <div className="container">
          <div className={styles.top}>
            <button type="button" className={styles.close} onClick={close}>
              {labels.close}
            </button>
          </div>
          <nav aria-label={labels.nav}>
            <ul className={styles.primary}>
              {primary.map((i) => (
                <li key={i.href}>
                  <NavLink href={i.href} onClick={close}>
                    {i.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <ul className={styles.secondary}>
              {secondary.map((i) => (
                <li key={i.href}>
                  <NavLink href={i.href} onClick={close}>
                    {i.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className={styles.ctas}>
            {whatsappHref ? (
              <a href={whatsappHref} className="btn btn-primary" data-track="whatsapp_click" data-track-label="menu">
                <WhatsAppIcon />
                {labels.whatsapp}
              </a>
            ) : null}
            <NavLink href={quoteHref} className={whatsappHref ? 'btn btn-ghost' : 'btn btn-primary'} onClick={close}>
              {labels.quote}
            </NavLink>
          </div>
        </div>
      </dialog>
    </>
  )
}
