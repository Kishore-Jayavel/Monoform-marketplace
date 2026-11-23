import { Product, DeliveryOption } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'notebook',
    name: 'Everyday Notebook',
    subtitle: 'Edition 01 — Ruled / Archival 100gsm',
    description: 'Thread-bound notebook with lay-flat opening, heavy linen textured cover, and numbered fountain-pen friendly pages.',
    pricePaise: 49900, // ₹499.00 (Fixed mandatory price)
    category: 'Stationery',
    tag: 'Essential Craft',
    details: ['192 Numbered Pages', 'Smyth-Sewn Binding', 'Fountain Pen Friendly'],
    rating: 4.9,
    reviewCount: 148,
    inStock: true,
    stockCount: 24,
    reviews: [
      {
        id: 'rev-1',
        author: 'Aarav Mehta',
        rating: 5,
        date: '12 Nov 2026',
        verified: true,
        comment: 'Exceptional paper quality. Fountain pen ink dries crisp without bleed-through or ghosting.'
      },
      {
        id: 'rev-2',
        author: 'Rhea Sen',
        rating: 5,
        date: '28 Oct 2026',
        verified: true,
        comment: 'The linen texture and Smyth-sewn binding lie completely flat. A daily joy to write in.'
      }
    ]
  },
  {
    id: 'bottle',
    name: 'Desk Bottle',
    subtitle: 'Double-Wall Vacuum Insulated / 500ml',
    description: 'Double-walled matte stainless steel flask engineered for all-day thermal retention with a tactile powder-coated stone finish.',
    pricePaise: 79900, // ₹799.00 (Fixed mandatory price)
    category: 'Drinkware',
    tag: 'Architectural Daily',
    details: ['18/8 Pro Stainless Steel', '12h Hot / 24h Cold', 'Leakproof Cap'],
    rating: 4.8,
    reviewCount: 96,
    inStock: true,
    stockCount: 18,
    reviews: [
      {
        id: 'rev-3',
        author: 'Vikram Joshi',
        rating: 5,
        date: '04 Nov 2026',
        verified: true,
        comment: 'Keeps water chilled throughout 8 hours at my studio desk. The textured powder coat provides great tactile grip.'
      },
      {
        id: 'rev-4',
        author: 'Ananya Sharma',
        rating: 4,
        date: '19 Oct 2026',
        verified: true,
        comment: 'Minimalist silhouette and zero condensation. Cap seal is solid.'
      }
    ]
  },
  {
    id: 'pen',
    name: 'Brass Desk Pen',
    subtitle: 'Solid Milled Brass / Schmidt Refill 0.5mm',
    description: 'Weighted precision writing instrument turned from untreated solid brass that patinas gracefully with daily touch.',
    pricePaise: 89900, // ₹899.00 (Synthetic demo)
    category: 'Stationery',
    tag: 'Patina Series',
    details: ['Solid Milled Brass', 'Balanced Center of Mass', 'Takes Parker & Schmidt Refills'],
    rating: 4.9,
    reviewCount: 64,
    inStock: true,
    stockCount: 12,
    reviews: [
      {
        id: 'rev-5',
        author: 'Devashish Ray',
        rating: 5,
        date: '02 Nov 2026',
        verified: true,
        comment: 'Substantial in hand without tiring during extended drafting sessions.'
      }
    ]
  },
  {
    id: 'tray',
    name: 'Linen Organizer Tray',
    subtitle: 'Pressed Archival Fiber / Raw Edge',
    description: 'Minimalist desktop catchment tray formed from pressed natural linen fiber and hardened plant-based binders.',
    pricePaise: 119900, // ₹1,199.00 (Synthetic demo)
    category: 'Desk Accessories',
    tag: 'Studio Order',
    details: ['Pressed Linen Fiber', 'Non-Marring Cork Base', '28cm × 18cm Dimensions'],
    rating: 4.7,
    reviewCount: 42,
    inStock: true,
    stockCount: 15,
    reviews: [
      {
        id: 'rev-6',
        author: 'Meera Nambiar',
        rating: 5,
        date: '25 Oct 2026',
        verified: true,
        comment: 'Creates clean spatial boundaries on my desk for fountain pens and watch.'
      }
    ]
  },
  {
    id: 'cup',
    name: 'Stoneware Espresso Cup',
    subtitle: 'Hand-Thrown Ceramic / Matte Mineral Glaze',
    description: 'Double-shot espresso cup fired with unglazed raw exterior and a rich satin-smooth cream mineral interior.',
    pricePaise: 59900, // ₹599.00 (Synthetic demo)
    category: 'Drinkware',
    tag: 'Studio Craft',
    details: ['High-Fire Stoneware', '90ml Capacity', 'Microwave & Dishwasher Safe'],
    rating: 4.8,
    reviewCount: 53,
    inStock: true,
    stockCount: 20,
    reviews: [
      {
        id: 'rev-7',
        author: 'Kunal Roy',
        rating: 5,
        date: '15 Oct 2026',
        verified: true,
        comment: 'Pleasant thermal retention and the lip contour is exceptionally comfortable.'
      }
    ]
  },
  {
    id: 'apron',
    name: 'Canvas Studio Apron',
    subtitle: '12oz Heavy Duck Canvas / Riveted Brass Hardware',
    description: 'Workshop utility apron featuring cross-back ergonomic harness, split leg walk-slit, and double-stitched tool pockets.',
    pricePaise: 149900, // ₹1,499.00 (Synthetic demo)
    category: 'Lifestyle Essentials',
    tag: 'Atelier Utility',
    details: ['12oz Heavy Duck Canvas', 'Cross-Back Strap Relief', 'Chest Pencil Slot & 4 Pockets'],
    rating: 4.9,
    reviewCount: 31,
    inStock: true,
    stockCount: 8,
    reviews: [
      {
        id: 'rev-8',
        author: 'Tara Nair',
        rating: 5,
        date: '08 Nov 2026',
        verified: true,
        comment: 'Remarkable durability. The cross-back design prevents neck strain completely.'
      }
    ]
  }
];

export const DELIVERY_OPTIONS: DeliveryOption[] = [
  {
    id: 'standard',
    name: 'Standard Studio Dispatch',
    pricePaise: 0, // Complimentary
    estimatedDelivery: '3–5 studio business days',
    description: 'Carefully packed with recycled honeycomb paper and dispatch tracking.'
  },
  {
    id: 'express',
    name: 'Express Priority Dispatch',
    pricePaise: 15000, // ₹150.00
    estimatedDelivery: '1–2 studio business days',
    description: 'Expedited processing from studio inventory with air dispatch.'
  }
];
