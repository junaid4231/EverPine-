import type { ImageId } from '@/lib/images'
import type { ImageCopy } from '@/content/types'

/**
 * Alt text describes only what is visible. Captions never name a client,
 * property, venue or community.
 */
export const images: Record<ImageId, ImageCopy> = {
  'villa-balcony-red-bow-warm-string-lights-dusk': {
    alt: 'Two-storey villa at dusk outlined in warm string lights along the eaves, balcony and arched windows, with a large red bow on the balcony railing and a palm beside the drive',
    caption: 'House lighting — eaves, balcony and arches, with a lacquer-red bow',
    types: ['lighting'],
    palette: 'red-gold',
  },
  'villa-facade-icicle-lights-reindeer-dusk': {
    alt: 'Villa façade with warm icicle lights along every roofline, a lit wire reindeer on the roof and a date palm in front, against a blue evening sky',
    caption: 'Rooflines in icicle lights, a lit reindeer above the entrance',
    types: ['lighting'],
    palette: 'red-gold',
  },
  'staircase-frosted-garland-red-gold-baubles-candles': {
    alt: 'Stone staircase with a glass balustrade dressed in a frosted garland of red and gold baubles and pine cones, and candle-style lights on each step',
    caption: 'Staircase — frosted garland, red and gold, candlelight on every step',
    types: ['stairs'],
    palette: 'red-gold',
  },
  'onyx-counter-garland-runner-reindeer-figurines': {
    alt: 'Frosted evergreen runner along an onyx marble counter with a white reindeer, a burgundy reindeer and a red jingle bell',
    caption: 'Table styling on onyx — frosted runner and reindeer figurines',
    types: ['tables'],
    palette: 'quiet-neutral',
  },
  'frosted-tree-poinsettias-gift-boxes-pool-view': {
    alt: 'Frosted Christmas tree with red and gold baubles and red poinsettias, gift boxes and a white skirt at its base, in front of a window looking onto a pool and palms',
    caption: 'Frosted tree with poinsettias and gift boxes, by the pool window',
    types: ['trees'],
    palette: 'red-gold',
  },
  'black-door-arch-red-white-gold-baubles-lit-reindeer-night': {
    alt: 'Black pivot front door at night framed by an evergreen arch of red, white and gold baubles, with a gold wreath, wrapped gift boxes and a lit gold reindeer beside it',
    caption: 'Door arch at night — red, white and gold, with a lit reindeer',
    types: ['entrances', 'lighting'],
    palette: 'red-gold',
  },
  'silver-gold-frosted-arch-carved-white-door': {
    alt: 'Frosted garland arch of silver and gold baubles around a white front door carved with a geometric pattern',
    caption: 'Frost and silver around a carved white door',
    types: ['entrances'],
    palette: 'frost-silver',
  },
  'flocked-lit-garland-arch-wood-door-frosted-wreath': {
    alt: 'Flocked, lit garland with red and silver baubles framing a tall panelled wooden door with a frosted wreath at its centre',
    caption: 'Lit, flocked garland and a frosted wreath on panelled wood',
    types: ['entrances'],
    palette: 'frost-silver',
  },
  'evergreen-door-arch-red-gold-baubles-wreath-white-door': {
    alt: 'Full evergreen arch with clusters of red and gold baubles framing a white modern front door with a matching wreath',
    caption: 'Evergreen arch and wreath — red and gold clusters',
    types: ['entrances'],
    palette: 'red-gold',
  },
  'double-door-arch-red-bows-twin-wreaths-oversized-baubles': {
    alt: 'Black double front doors with twin wreaths tied in red bows, framed by a red and gold garland, with oversized red baubles on the floor either side',
    caption: 'Twin wreaths on double doors, oversized baubles at the threshold',
    types: ['entrances'],
    palette: 'red-gold',
  },
  'olive-tree-planter-baubles-nutcracker-reindeer': {
    alt: 'Olive tree in a large stone planter hung with red baubles and a red bow, surrounded by a nutcracker, a white reindeer, a small house and a berry garland',
    caption: 'A dressed olive planter with nutcracker and reindeer figurines',
    types: ['tables'],
    palette: 'red-gold',
  },
  'red-gold-tree-poinsettias-faux-fur-skirt-living-room': {
    alt: 'Tall Christmas tree dressed in red and gold baubles and poinsettias with a burgundy bow topper and a white faux-fur skirt in a living room',
    caption: 'Classic red and gold, finished with a faux-fur skirt',
    types: ['trees'],
    palette: 'red-gold',
  },
  'lit-garland-arch-wood-door-cone-lights-evening': {
    alt: 'Wooden front door framed by a lit garland with red bows, with lit wire cone trees and candle-style lights beside it in the evening',
    caption: 'Warm-lit arch with cone trees and candle lights',
    types: ['entrances', 'lighting'],
    palette: 'red-gold',
  },
  'modern-entrance-silver-gold-door-arch-night': {
    alt: 'Recessed white entrance at night with a black door framed by a silver and gold bauble arch, flanked by round topiary planters',
    caption: 'Silver and gold on a modern entrance, after dark',
    types: ['entrances'],
    palette: 'frost-silver',
    galleryHidden: true, // floor debris visible — re-crop or retouch before showing
  },
  'arched-entrance-evergreen-garland-large-red-bow': {
    alt: 'Arched villa entrance framed with an evergreen garland and clusters of red and gold baubles, crowned with a large red bow',
    caption: 'An arched entrance crowned with a large red bow',
    types: ['entrances'],
    palette: 'red-gold',
  },
  'emerald-gold-bauble-arch-sunburst-door': {
    alt: 'Dense arch of emerald green and gold baubles around a dark door carved in a sunburst pattern, in a white entrance',
    caption: 'Emerald and gold, bauble on bauble',
    types: ['entrances'],
    palette: 'emerald-gold',
  },
  'table-runner-poinsettia-pinecones-marble-table': {
    alt: 'Long evergreen table runner with a red poinsettia, gold baubles and pine cones on a grey marble dining table',
    caption: 'Dining runner on marble — poinsettia, gold and pine cones',
    types: ['tables'],
    palette: 'red-gold',
  },
  'console-garland-silver-reindeer-oval-mirror': {
    alt: 'Console table with a frosted garland and two silver reindeer beneath a tall oval mirror reflecting a garlanded staircase',
    caption: 'Entrance console — frosted garland and silver reindeer',
    types: ['tables'],
    palette: 'frost-silver',
  },
  'tall-bronze-champagne-tree-lounge-window': {
    alt: 'Very tall Christmas tree with bronze, blush and champagne ornaments and a star topper beside floor-to-ceiling windows in a lounge',
    caption: 'A tall tree in bronze and champagne for a lounge',
    types: ['trees', 'commercial'],
    palette: 'bronze-champagne',
  },
  'red-bauble-arch-shopfront-evening': {
    alt: 'Glass shopfront in the evening framed by an arch of red baubles, with giant red baubles at the base and a decorated tree visible inside',
    caption: 'Shopfront arch in red, lit from within',
    types: ['entrances', 'commercial'],
    palette: 'red-gold',
  },
  'red-bauble-tree-candle-lights-entrance-garland': {
    alt: 'Christmas tree with red baubles and candle-style lights beside a glass entrance garlanded with red baubles, white globes and berries',
    caption: 'Candle-style lights and red baubles at an entrance',
    types: ['trees', 'lighting'],
    palette: 'red-gold',
  },
  'green-gold-tree-velvet-bow-neutral-living-room': {
    alt: 'Christmas tree in green and gold baubles with an oversized dark velvet bow cascading from the top, beside a rattan sideboard with white florals',
    caption: 'Quiet neutrals — green, gold and a cascading velvet bow',
    types: ['trees'],
    palette: 'quiet-neutral',
  },
  'greenery-garland-glass-entrance-wreath': {
    alt: 'Soft greenery garland with white sprays framing a glass-fronted entrance, with a wreath on the open wooden door',
    caption: 'Greenery garland on a glass entrance',
    types: ['entrances', 'commercial'],
    palette: 'quiet-neutral',
  },
  'spiral-red-bauble-garland-tree-plants-interior': {
    alt: 'Christmas tree wrapped in spiralling garlands of red baubles among large indoor plants, with a red ornament hanging from the ceiling',
    caption: 'Spiral bauble garlands in a planted interior',
    types: ['trees', 'commercial'],
    palette: 'red-gold',
  },
  'spiral-red-peppermint-garland-tree-greenery': {
    alt: 'Lit tree with a spiral of red and peppermint-striped baubles, a large red bauble and a velvet reindeer at its base, surrounded by greenery',
    caption: 'A red and peppermint spiral among greenery',
    types: ['trees', 'commercial'],
    palette: 'peppermint',
  },
  'media-wall-garland-poinsettias-stockings': {
    alt: 'Lit garland with red poinsettias and baubles framing a television wall, with two red stockings hanging below and small cone trees on the console',
    caption: 'A media wall framed in garland, stockings below',
    types: ['stairs'],
    palette: 'red-gold',
  },
  'peppermint-candy-door-arch-wrought-iron-doors': {
    alt: 'Wrought-iron double doors framed by a playful arch of peppermint swirls, candy canes, stars and red and white striped baubles',
    caption: 'Peppermint and candy cane — the playful arch',
    types: ['entrances'],
    palette: 'peppermint',
  },
  'stylist-placing-red-baubles-on-tree': {
    alt: 'A stylist’s hand placing a red bauble on a tree dressed in red, between two cream armchairs',
    caption: 'Styling by hand, bauble by bauble',
    types: ['process'],
    palette: 'red-gold',
  },
  'peppermint-tree-installation-protective-sheeting': {
    alt: 'Christmas tree with peppermint and red ornaments part-way through installation, standing on protective sheeting in a marble room',
    caption: 'Mid-installation — a peppermint tree taking shape',
    types: ['process'],
    palette: 'peppermint',
  },
  'dining-centrepiece-installation-in-progress': {
    alt: 'Evergreen centrepiece with red berries on a dark dining table during installation, with a lit tree and a garlanded staircase in the background',
    caption: 'Installation day — table, tree and staircase together',
    types: ['process', 'tables'],
    palette: 'red-gold',
  },
  'gold-lit-tree-red-bauble-base-atrium': {
    alt: 'Christmas tree glowing with warm gold lights, its base heaped with red baubles, in a double-height atrium with plants',
    caption: 'A gold-lit tree with a red bauble base, for an atrium',
    types: ['trees', 'commercial'],
    palette: 'red-gold',
  },
  'bronze-copper-bauble-wall-illuminated-arch': {
    alt: 'Illuminated arch filled with a dense wall of bronze and copper baubles, pine cones and grey ribbon bows, with a café’s name at the centre',
    caption: 'A bronze bauble wall inside an illuminated arch',
    types: ['commercial'],
    palette: 'bronze-champagne',
  },
}
