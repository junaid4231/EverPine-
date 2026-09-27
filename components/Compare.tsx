import styles from './Compare.module.css'
import { formatAED, formatHeight, siteConfig, type PackageInclude } from '@/lib/site-config'
import type { Dictionary } from '@/content/types'
import type { Locale } from '@/lib/i18n'

const ORDER: PackageInclude[] = ['tree', 'treeSkirt', 'giftBoxes', 'doorArch', 'wreath', 'stairDecoration', 'tableDecoration', 'figurines', 'houseLighting']

/** Accessible comparison table — secondary to the Collection, for people who want to scan. */
export function Compare({ dict, locale, caption }: { dict: Dictionary; locale: Locale; caption: string }) {
  const pkgs = siteConfig.packages
  return (
    <div className={styles.wrap}>
      <table className={styles.table}>
        <caption>{caption}</caption>
        <thead>
          <tr>
            <td />
            {pkgs.map((p) => (
              <th key={p.id} scope="col">
                {dict.packages.items[p.id].name}
                <span>{formatHeight(p.treeHeightM)} {dict.ui.tree}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ORDER.map((inc) => (
            <tr key={inc}>
              <th scope="row">{dict.packages.includeLabels[inc]}</th>
              {pkgs.map((p) => {
                const has = (p.includes as readonly string[]).includes(inc)
                return (
                  <td key={p.id}>
                    {has ? <span className={styles.yes} role="img" aria-label={dict.ui.included} /> : <span className={styles.no} role="img" aria-label={dict.ui.notIncluded}>—</span>}
                  </td>
                )
              })}
            </tr>
          ))}
          <tr>
            <th scope="row">{dict.ui.deliveryInstallStyling}</th>
            {pkgs.map((p) => (
              <td key={p.id}>
                <span className={styles.yes} role="img" aria-label={dict.ui.included} />
              </td>
            ))}
          </tr>
          <tr className={styles.price}>
            <th scope="row">{dict.ui.packagePrice}</th>
            {pkgs.map((p) => (
              <td key={p.id}>{formatAED(p.priceAED, locale)}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  )
}
