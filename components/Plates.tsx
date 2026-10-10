import styles from './Plates.module.css'
import { Img } from '@/components/Img'
import type { ImageId } from '@/lib/images'
import type { Dictionary } from '@/content/types'

/** An editorial, deliberately uneven set of 2–5 captioned photographs. */
export function Plates({ ids, dict, startAt = 1 }: { ids: ImageId[]; dict: Dictionary; startAt?: number }) {
  const count = Math.min(Math.max(ids.length, 2), 5)
  return (
    <div className={`${styles.plates} ${styles[`count${count}` as keyof typeof styles] ?? ''}`}>
      {ids.map((id, i) => (
        <figure key={id} className={styles.plate}>
          <div className={styles.frame} data-reveal style={{ ['--d' as string]: i % 3 }}>
            <Img id={id} dict={dict} fill sizes="(min-width: 64rem) 34vw, (min-width: 48rem) 60vw, 100vw" />
          </div>
          <figcaption className="plate">
            <b>{String(startAt + i).padStart(2, '0')}</b>
            <span>{dict.images[id].caption}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  )
}
