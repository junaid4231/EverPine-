import Link from 'next/link'
import styles from './Included.module.css'
import { Rich } from '@/components/Rich'
import { formatAED, getPackage, type PackageId } from '@/lib/site-config'
import { localePath, type Locale } from '@/lib/i18n'
import type { Dictionary } from '@/content/types'

/** Pine band connecting a service page to the packages that contain it. */
export function Included({ dict, locale, packages, note }: { dict: Dictionary; locale: Locale; packages: PackageId[]; note: string }) {
  return (
    <section className={`theme-pine ${styles.band}`}>
      <div className={`container ${styles.grid}`}>
        <p className={styles.note}>
          <Rich text={note} locale={locale} />
        </p>
        <ul className={styles.pkgs} role="list">
          {(packages.length ? packages : (['basic', 'silver', 'gold'] as PackageId[])).map((id) => (
            <li key={id}>
              <Link href={`${localePath(locale, '/packages')}#${id}`}>
                <span className={styles.n}>{dict.packages.items[id].name}</span>
                <span className={styles.p}>{formatAED(getPackage(id).priceAED, locale)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
