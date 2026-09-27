import { getImageProps } from 'next/image'
import { images, type ImageId } from '@/lib/images'

/**
 * A giant word filled with a photograph — the villa's lights seen through the letters.
 * The photo loads only when the word scrolls into view (the reveal script adds .is-in),
 * and slowly pans while visible. Purely decorative; the phrase is also given as text.
 */
export function PhotoWord({ word, image, caption }: { word: string; image: ImageId; caption?: string }) {
  const { props } = getImageProps({ src: images[image], alt: '', width: 1080, quality: 60, sizes: '100vw' })
  return (
    <figure className="photo-word" data-reveal style={{ ['--photo' as string]: `url("${props.src}")` }}>
      <span className="photo-word-text">{word}</span>
      {caption ? <figcaption className="photo-word-cap">{caption}</figcaption> : null}
    </figure>
  )
}
