import Image from 'next/image'
import { images, type ImageId } from '@/lib/images'
import type { Dictionary } from '@/content/types'

interface Props {
  id: ImageId
  dict: Dictionary
  sizes: string
  priority?: boolean
  className?: string
  /** CSS object-position for cropped frames. */
  position?: string
  fill?: boolean
  quality?: 50 | 60 | 75 | 85 | 90
  /** Blur-up placeholder. Only worth it on large, above-the-fold images: each one is an SVG blur filter the browser must rasterise. */
  blur?: boolean
}

/** next/image bound to the typed registry: intrinsic size, blur placeholder and alt text come for free. */
export function Img({ id, dict, sizes, priority, className, position, fill, quality = 75, blur = priority }: Props) {
  const src = images[id]
  const alt = dict.images[id].alt
  return (
    <Image
      src={src}
      alt={alt}
      sizes={sizes}
      priority={priority}
      fetchPriority={priority ? 'high' : undefined}
      placeholder={blur ? 'blur' : 'empty'}
      quality={quality}
      className={className}
      fill={fill}
      style={position ? { objectPosition: position } : undefined}
    />
  )
}
