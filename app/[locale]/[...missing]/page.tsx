import { notFound } from 'next/navigation'

/** Any unmatched URL renders the localized not-found page inside the site layout (HTTP 404). */
export default function CatchAll() {
  notFound()
}
