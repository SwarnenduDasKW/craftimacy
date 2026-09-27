# Craftimacy

A modern, mobile-first catalogue website for **Craftimacy** — handcrafted
oxidised silver jewelry inspired by Indian artisans and craftsmanship.

Built with **Next.js (App Router) + TypeScript + Tailwind CSS**, with
**Sanity CMS** as the content layer.

## Architecture

- **Frontend:** Next.js 14, React 18, TypeScript, Tailwind CSS
- **CMS:** Sanity Studio (hosted content infrastructure)
- **Hosting:** Any Next.js-compatible provider (Vercel recommended, subject to commercial-use terms)
- **No custom backend, no PostgreSQL, no customer auth**

Customer journey:

```
Instagram / Facebook → Craftimacy website → Discover collection
→ View jewelry → Learn about Craftimacy → Google reviews
→ WhatsApp / contact → Purchase conversation
```

## Project Structure
craftimacy/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── products/
│   │   ├── page.tsx
│   │   ├── [slug]/page.tsx
│   │   └── category/[slug]/page.tsx
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── not-found.tsx
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── layout/Header.tsx
│   ├── layout/Footer.tsx
│   ├── layout/MobileNavigation.tsx
│   ├── home/HeroSection.tsx
│   ├── home/FeaturedProducts.tsx
│   ├── home/AboutSection.tsx
│   ├── home/ReviewSection.tsx
│   ├── products/ProductCard.tsx
│   ├── products/ProductGrid.tsx
│   ├── products/ProductGallery.tsx
│   ├── products/CategoryFilter.tsx
│   ├── products/SearchBox.tsx
│   ├── ui/WhatsAppButton.tsx
│   ├── ui/SocialLinks.tsx
│   └── ui/OptimizedImage.tsx
├── lib/
│   ├── sanity/client.ts
│   ├── sanity/queries.ts
│   ├── sanity/image.ts
│   └── utils/whatsapp.ts
├── sanity/
│   ├── schemas/
│   │   ├── product.ts
│   │   ├── category.ts
│   │   ├── siteSettings.ts
│   │   ├── homepage.ts
│   │   └── index.ts
│   └── sanity.config.ts
├── types/index.ts
├── .env.example
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md


## Local Development

### 1. Prerequisites

- Node.js 20+
- A Sanity project (free tier is fine)
- use this every tine you open a terminal
```
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
nvm use 20
node -v
npm install
```

### 2. Install

```bash
npm install
```

### 3. Environment variables

Copy `.env.example` to `.env.local` and fill in:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=...
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_VERSION=2024-01-01
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Create the Sanity project if you don't have one:

```bash
npx sanity@latest init --env
```

### 4. Run

```bash
npm run dev
```

- Website: http://localhost:3000
- Studio: http://localhost:3000/studio

### 5. First-time content setup

In Studio, create:

1. **Site Settings** — business name, WhatsApp number, social links, Google reviews URL
2. **Homepage** — hero title/image, about section, featured products
3. **Categories** — e.g. Earrings, Jhumkas, Necklaces, Bangles
4. **Products** — with images, category, price display mode

Adding products does **not** require a Git commit or deployment.

## Deployment

1. Push the repository to GitHub.
2. Connect the repository to Vercel (or another Next.js-compatible host).
3. Add the environment variables from `.env.example` in the host dashboard.
4. Configure the production domain and HTTPS.
5. Deploy the Sanity Studio:

```bash
npm run sanity:deploy
```

Ensure your Sanity project's CORS origins include your production URL.

## Content Management

Business owners use **Sanity Studio** at `/studio`:

- Create / edit / publish / unpublish products
- Upload product images (multiple angles supported)
- Assign categories
- Mark products as **Featured** or **Available**
- Update business info, social links, and Google reviews URL

## Design Principles

- Mobile-first (social-media traffic is predominantly mobile)
- Server-rendered where possible; minimal client JS
- Accessibility: semantic HTML, keyboard nav, focus states, alt text, WCAG 2.2 AA target
- SEO: per-product metadata, Open Graph, JSON-LD, sitemap, robots
- Performance: image optimization, lazy loading, caching, CDN delivery

## Non-Goals (Version 1)

No shopping cart · No checkout · No payments · No customer accounts ·
No review database · No custom backend · No PostgreSQL · No Redis ·
No Elasticsearch · No microservices.

## Future Evolution

The architecture is designed to evolve:

```
V1:  Next.js + Sanity
V2:  Next.js + Sanity + Commerce platform
V3:  Next.js + custom backend + Payments/Orders/Inventory
```

Do not prematurely implement V3 infrastructure.

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start the Next.js dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run sanity` | Run Sanity Studio locally (alternative) |
| `npm run sanity:deploy` | Deploy Studio to Sanity hosting |

## License

Proprietary — Craftimacy.

## SiteSettings
Business Name: Craftimacy
Tagline: Where Craft Meets Elegance
Phone: +91 90070 12181
Email: craftimacy2020@gmail.com
WhatsApp number: 919007012181
Address: 71, Vivekananda Rd, opposite Monalisa Art School, Bediapara, North Dumdum, Kolkata, West Bengal 700065, India
Google Maps URL: https://maps.app.goo.gl/4wTmaxC3TcfQfste7
Google Reviews URL: https://www.google.com/maps/place/Craftimacy/@22.6462694,88.403013,17z/data=!4m18!1m9!3m8!1s0x39f89f46e51ef085:0x3e0c8863c8856c86!2sCraftimacy!8m2!3d22.6462645!4d88.4055879!9m1!1b1!16s%2Fg%2F11qmxhvtqx!3m7!1s0x39f89f46e51ef085:0x3e0c8863c8856c86!8m2!3d22.6462645!4d88.4055879!9m1!1b1!16s%2Fg%2F11qmxhvtqx?entry=ttu&g_ep=EgoyMDI2MDkyMy4wIKXMDSoASAFQAw%3D%3D
Instagram URL: https://www.instagram.com/craftimacy/
Facebook URL: https://www.facebook.com/craftimacy2020