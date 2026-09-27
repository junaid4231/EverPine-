import type { Dictionary } from '@/content/types'
import { common } from './common'
import { images } from './images'
import { servicePages, servicesIndex } from './services'
import * as pages from './pages'

export const dictionary: Dictionary = { ...common, images, servicesIndex, servicePages }
export { pages }
