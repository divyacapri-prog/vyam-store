// Single source of truth for brands and products.
// SMOD data pulled from buysmod.com (live catalog). Other brands are pre-launch teasers.
// When those brands launch, set buyable:true and add variants/prices — or manage rows in Supabase.

export const BRANDS = {
  smod: {
    slug: "smod", name: "SMOD", color: "#2743C8", tint: "#E9EDFB", dark: "#1b2f8f",
    grad: "linear-gradient(150deg,#3b57d8,#1d2f7e)",
    cat: "Laundry • Home Care",
    pos: "Smarter choices. Made for everyday mess.",
    story: "Detergent, redesigned. SMOD replaces messy powders and guess-work dosing with pre-measured laundry pods — smart dosing, maximum clean, optimised care and dependable freshness in every wash.",
    live: true
  },
  fynd: {
    slug: "fynd", name: "FYND", color: "#C2186B", tint: "#FAE8F1", dark: "#8f1250",
    grad: "linear-gradient(150deg,#d42a80,#8f1250)",
    cat: "Colour Cosmetics",
    pos: "Colour made for expression.",
    story: "Makeup isn't a mask — it's a mood. FYND builds colour cosmetics for people who treat makeup as everyday expression: easy to wear, easy to experiment with, made for real days.",
    live: false
  },
  khind: {
    slug: "khind", name: "KHIND", color: "#0E7A6C", tint: "#E4F1EE", dark: "#0a594f",
    grad: "linear-gradient(150deg,#159884,#0a5a4f)",
    cat: "Oral Care • Personal Care",
    pos: "Everyday care, made simple.",
    story: "Personal care is full of overcomplicated claims. KHIND takes the opposite view: the daily essentials, done properly — simple, effective and easy to trust.",
    live: false
  },
  riwers: {
    slug: "riwers", name: "RIWERS", color: "#31502F", tint: "#EAEFE6", dark: "#25411f",
    grad: "linear-gradient(150deg,#476b40,#25411f)",
    cat: "Hair & Scalp Care",
    pos: "Rethinking everyday hair care.",
    story: "Most hair care starts with the hair. RIWERS starts with the scalp — and the everyday realities that shape how hair actually behaves.",
    live: false
  },
  petcare: {
    slug: "petcare", name: "PET CARE", color: "#A9740E", tint: "#F7EFDC", dark: "#7c5407",
    grad: "linear-gradient(150deg,#c78f1c,#7c5407)",
    cat: "Pet Hygiene • Pet Care",
    pos: "Everyday care for happier pets.",
    story: "Pets are family — their care should feel that way too. Simple, safe, effective everyday hygiene for the people who love them.",
    live: false
  }
};

export const PRODUCTS = [
  {
    slug: "smod-regular", brand: "smod", buyable: true,
    name: "SMOD Regular Laundry Pods",
    short: "Convenient, effective and safe for the whole family's clothes. All fabrics, all colors.",
    desc: "SMOD Regular Laundry Washing Pods are convenient, effective and safe for the whole family's clothes. Suitable for all fabrics and colors — one pre-measured pod per load, no measuring, no mess.",
    features: ["Deep clean", "Fresh scent", "Safe for colors", "Top + front load compatible", "Triple-action enzymes", "Anti-microbial formula", "Child-safe closure, recyclable pack"],
    variants: [
      { label: "20 Pods", price: 499, note: "₹24.95 per wash", images: ["https://d8j0ntlcm91z4.cloudfront.net/user_3IMyctpTEDyautVxPt2exFQaBqy/hf_20260905_141047_e51bf72c-8e3b-481b-8921-e604fc0c1a83.png", "https://d8j0ntlcm91z4.cloudfront.net/user_3IMyctpTEDyautVxPt2exFQaBqy/hf_20260905_141230_978c3a64-8d08-4aff-bd84-96943d32f4c5.png", "https://d8j0ntlcm91z4.cloudfront.net/user_3IMyctpTEDyautVxPt2exFQaBqy/hf_20260905_142748_49e78147-16ae-4aff-bf33-872ccf2dfa08.png"] },
      { label: "40 Pods", price: 899, note: "₹22.48 per wash — best value", images: ["https://d8j0ntlcm91z4.cloudfront.net/user_3IMyctpTEDyautVxPt2exFQaBqy/hf_20260905_141047_7f10d0e3-7557-4cda-9894-623b88a49b46.png", "https://d8j0ntlcm91z4.cloudfront.net/user_3IMyctpTEDyautVxPt2exFQaBqy/hf_20260905_141230_a0c94974-db1f-4dce-a8db-04834a7ac1aa.png", "https://d8j0ntlcm91z4.cloudfront.net/user_3IMyctpTEDyautVxPt2exFQaBqy/hf_20260905_142748_67bdbc4a-f39c-4a1c-9cc1-31aa65f773d9.png"] }
    ],
    images: ["https://d8j0ntlcm91z4.cloudfront.net/user_3IMyctpTEDyautVxPt2exFQaBqy/hf_20260905_141047_e51bf72c-8e3b-481b-8921-e604fc0c1a83.png"]
  },
  {
    slug: "smod-sports", brand: "smod", buyable: true,
    name: "SMOD Sports Laundry Pods",
    short: "A technical pod tuned for activewear — removes sweat, salts and odor without damaging fibers.",
    desc: "A technical pod tuned for moisture-wicking polyester, spandex and merino. Removes sweat, salts and odor without damaging fibers. Tested on Lycra, Dri-FIT, merino and recycled polyester.",
    features: ["Activewear protection", "Sweat & odor control", "Performance-fabric safe", "Top + front load compatible", "Triple-action enzymes", "Child-safe closure, recyclable pack"],
    variants: [
      { label: "20 Pods", price: 499, note: "₹24.95 per wash", images: ["https://d8j0ntlcm91z4.cloudfront.net/user_3IMyctpTEDyautVxPt2exFQaBqy/hf_20260905_140650_fe2edaba-6a19-44b4-8f74-cf1933db2be2.png", "https://d8j0ntlcm91z4.cloudfront.net/user_3IMyctpTEDyautVxPt2exFQaBqy/hf_20260905_140830_165bee47-7d7b-46fd-bd5b-8454ac326c62.png", "https://d8j0ntlcm91z4.cloudfront.net/user_3IMyctpTEDyautVxPt2exFQaBqy/hf_20260905_142748_194d18b8-97a8-4d93-9210-ece04de78fbc.png"] },
      { label: "40 Pods", price: 899, note: "₹22.48 per wash — best value", images: ["https://d8j0ntlcm91z4.cloudfront.net/user_3IMyctpTEDyautVxPt2exFQaBqy/hf_20260905_140651_aaf8cbf2-f4be-452c-8ff1-1eda994311b9.png", "https://d8j0ntlcm91z4.cloudfront.net/user_3IMyctpTEDyautVxPt2exFQaBqy/hf_20260905_140830_704d9277-0388-430f-9b2c-7ce8126f7122.png", "https://d8j0ntlcm91z4.cloudfront.net/user_3IMyctpTEDyautVxPt2exFQaBqy/hf_20260905_142748_fc9a228f-87d1-491f-bb18-3ecea171d7e5.png"] }
    ],
    images: ["https://d8j0ntlcm91z4.cloudfront.net/user_3IMyctpTEDyautVxPt2exFQaBqy/hf_20260905_140650_fe2edaba-6a19-44b4-8f74-cf1933db2be2.png"]
  },
  {
    slug: "smod-baby", brand: "smod", buyable: true,
    name: "SMOD Baby Laundry Pods",
    short: "Powerful clean, extra gentle on baby's skin and clothes. Free from bleach, parabens and harsh dyes.",
    desc: "SMOD Baby Laundry Pods deliver a powerful clean while being extra gentle on baby's skin and clothes. Free from bleach, parabens and harsh dyes, with quick-dissolving pre-measured pods.",
    features: ["Gentle on sensitive skin", "Powerful stain removal", "Antimicrobial and safe", "No bleach, parabens or harsh dyes", "Top + front load compatible", "Child-safe closure, recyclable pack"],
    variants: [
      { label: "20 Pods", price: 499, note: "₹24.95 per wash", images: ["https://d8j0ntlcm91z4.cloudfront.net/user_3IMyctpTEDyautVxPt2exFQaBqy/hf_20260905_135403_b862f20b-f2be-421e-8fef-e014a95248e0.png", "https://d8j0ntlcm91z4.cloudfront.net/user_3IMyctpTEDyautVxPt2exFQaBqy/hf_20260905_135643_30daf741-c9a2-4b06-a1c6-025b2afba74c.png", "https://d8j0ntlcm91z4.cloudfront.net/user_3IMyctpTEDyautVxPt2exFQaBqy/hf_20260905_142748_b9cc6ac2-4e40-4066-b3a9-9233bb5acb9f.png"] },
      { label: "40 Pods", price: 899, note: "₹22.48 per wash — best value", images: ["https://d8j0ntlcm91z4.cloudfront.net/user_3IMyctpTEDyautVxPt2exFQaBqy/hf_20260905_135402_e2c6a2e8-8c90-4bb6-8eb5-20fc34a7dfb2.png", "https://d8j0ntlcm91z4.cloudfront.net/user_3IMyctpTEDyautVxPt2exFQaBqy/hf_20260905_135643_d4ee6712-60d6-4571-abcd-69737c6ce533.png", "https://d8j0ntlcm91z4.cloudfront.net/user_3IMyctpTEDyautVxPt2exFQaBqy/hf_20260905_142748_7e7f979d-67c3-4fa3-9dde-6fadd0c4fd22.png"] }
    ],
    images: ["https://d8j0ntlcm91z4.cloudfront.net/user_3IMyctpTEDyautVxPt2exFQaBqy/hf_20260905_135403_b862f20b-f2be-421e-8fef-e014a95248e0.png"]
  },
  {
    slug: "smod-socks", brand: "smod", buyable: true,
    name: "SMOD Socks Laundry Pods",
    short: "Enzyme-loaded pods engineered for the toughest sweat odors and ground-in grime.",
    desc: "An enzyme-loaded pod engineered for the toughest sweat odors and ground-in grime. Bring tired socks back to life.",
    features: ["Deep odor removal", "Sweat stain reduction", "Long-lasting freshness", "Top + front load compatible", "Pre-measured dosing", "Child-safe closure, recyclable pack"],
    variants: [
      { label: "20 Pods", price: 499, note: "₹24.95 per wash", images: ["https://d8j0ntlcm91z4.cloudfront.net/user_3IMyctpTEDyautVxPt2exFQaBqy/hf_20260905_141657_489bc0d3-42f7-4d15-ab6a-6cabe2a2f0e8.png", "https://d8j0ntlcm91z4.cloudfront.net/user_3IMyctpTEDyautVxPt2exFQaBqy/hf_20260905_142312_f243ef02-3799-440c-93fb-cb4cd9b3a8fb.png", "https://d8j0ntlcm91z4.cloudfront.net/user_3IMyctpTEDyautVxPt2exFQaBqy/hf_20260905_142748_81dd84c3-49e0-4a92-81fd-1a9fdd2e1af1.png"] },
      { label: "40 Pods", price: 899, note: "₹22.48 per wash — best value", images: ["https://d8j0ntlcm91z4.cloudfront.net/user_3IMyctpTEDyautVxPt2exFQaBqy/hf_20260905_141657_0c437bd7-e393-4763-8d2a-cb199edbe6bd.png", "https://d8j0ntlcm91z4.cloudfront.net/user_3IMyctpTEDyautVxPt2exFQaBqy/hf_20260905_142312_ef1d8a47-015b-4ef9-b3fe-26d728fdbecb.png", "https://d8j0ntlcm91z4.cloudfront.net/user_3IMyctpTEDyautVxPt2exFQaBqy/hf_20260905_142748_e899b88e-fc5c-43a2-9561-721e45b472eb.png"] }
    ],
    images: ["https://d8j0ntlcm91z4.cloudfront.net/user_3IMyctpTEDyautVxPt2exFQaBqy/hf_20260905_141657_489bc0d3-42f7-4d15-ab6a-6cabe2a2f0e8.png"]
  },
  {
    slug: "smod-intimate", brand: "smod", buyable: true,
    name: "SMOD Intimate Wear Pods",
    short: "Removes tough stains, odor & bacteria while staying gentle on delicate fabrics.",
    desc: "Specially formulated to remove tough stains, odor and bacteria while being gentle on delicate fabrics. Ideal for bras, panties and other intimate wear.",
    features: ["Deep clean", "Gentle care", "Antimicrobial", "Pre-measured dosing", "Top + front load compatible", "Child-safe closure, recyclable pack"],
    variants: [
      { label: "20 Pods", price: 499, note: "₹24.95 per wash", images: ["https://d8j0ntlcm91z4.cloudfront.net/user_3IMyctpTEDyautVxPt2exFQaBqy/hf_20260905_135940_88398521-674a-4b26-9f16-5072158709c0.png", "https://d8j0ntlcm91z4.cloudfront.net/user_3IMyctpTEDyautVxPt2exFQaBqy/hf_20260905_140309_b345c55a-b80c-492e-9a8e-84f5d903809d.png", "https://d8j0ntlcm91z4.cloudfront.net/user_3IMyctpTEDyautVxPt2exFQaBqy/hf_20260905_142748_0c32046f-9cf1-45a1-a0f7-745fd7602029.png"] },
      { label: "40 Pods", price: 899, note: "₹22.48 per wash — best value", images: ["https://d8j0ntlcm91z4.cloudfront.net/user_3IMyctpTEDyautVxPt2exFQaBqy/hf_20260905_135940_353ba11b-4b0d-4aba-b66e-151d26438417.png", "https://d8j0ntlcm91z4.cloudfront.net/user_3IMyctpTEDyautVxPt2exFQaBqy/hf_20260905_140334_d57d3271-de05-483e-8a34-ffef7846d6cf.png", "https://d8j0ntlcm91z4.cloudfront.net/user_3IMyctpTEDyautVxPt2exFQaBqy/hf_20260905_142748_cd8ce858-a18d-49fa-89ac-4caeb283b592.png"] }
    ],
    images: ["https://d8j0ntlcm91z4.cloudfront.net/user_3IMyctpTEDyautVxPt2exFQaBqy/hf_20260905_135940_88398521-674a-4b26-9f16-5072158709c0.png"]
  },

  // ---- Pre-launch teasers (not buyable yet) ----
  { slug: "fynd-lips", brand: "fynd", buyable: false, name: "FYND Lip Colour", short: "Everyday lip colour built for comfort and wear.", desc: "Launching soon.", features: [], variants: [], images: [] },
  { slug: "fynd-eyes", brand: "fynd", buyable: false, name: "FYND Eye Essentials", short: "Simple, expressive eye products that work in real life.", desc: "Launching soon.", features: [], variants: [], images: [] },
  { slug: "khind-oral", brand: "khind", buyable: false, name: "KHIND Oral Care", short: "Daily oral-care essentials built on simple, effective routines.", desc: "Launching soon.", features: [], variants: [], images: [] },
  { slug: "khind-personal", brand: "khind", buyable: false, name: "KHIND Personal Care", short: "Everyday personal-care products with clear, honest benefits.", desc: "Launching soon.", features: [], variants: [], images: [] },
  { slug: "riwers-hair", brand: "riwers", buyable: false, name: "RIWERS Hair Care", short: "Everyday cleansing and care built around real hair habits.", desc: "Launching soon.", features: [], variants: [], images: [] },
  { slug: "riwers-scalp", brand: "riwers", buyable: false, name: "RIWERS Scalp Care", short: "Scalp-first products, because healthy hair starts there.", desc: "Launching soon.", features: [], variants: [], images: [] },
  { slug: "petcare-hygiene", brand: "petcare", buyable: false, name: "VYAM Pet Hygiene", short: "Everyday hygiene essentials for clean, comfortable pets.", desc: "Launching soon.", features: [], variants: [], images: [] },
  { slug: "petcare-grooming", brand: "petcare", buyable: false, name: "VYAM Pet Grooming", short: "Simple grooming products for routine, at-home care.", desc: "Launching soon.", features: [], variants: [], images: [] }
];

export function getProduct(slug) {
  return PRODUCTS.find((p) => p.slug === slug) || null;
}

export function productsByBrand(brandSlug) {
  return PRODUCTS.filter((p) => p.brand === brandSlug);
}

export function priceOf(slug, variantLabel) {
  const p = getProduct(slug);
  if (!p || !p.buyable) return null;
  const v = p.variants.find((v) => v.label === variantLabel);
  return v ? { price: v.price, name: p.name, variant: v.label } : null;
}

export function inr(n) {
  return "₹" + Number(n).toLocaleString("en-IN");
}
