import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import path from 'node:path'

export const dynamic = 'force-static'

/** 600×568 PNG of the Everpine Events logo on ivory — referenced as `logo` in Organization schema. */
export async function GET() {
  const svg = await readFile(path.join(process.cwd(), 'public/brand/everpine-logo.svg'))
  const uri = `data:image/svg+xml;base64,${svg.toString('base64')}`
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f6f0e4' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={uri} width={560} height={530} alt="" />
      </div>
    ),
    { width: 600, height: 568 },
  )
}
