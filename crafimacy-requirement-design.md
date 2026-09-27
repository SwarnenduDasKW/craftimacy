# Craftimacy — Modern Handcrafted Jewelry Website
## Architecture & AI Coding Agent Specification

## 1. Document Purpose

This document is the implementation specification for rebuilding the existing **Craftimacy** website as a modern, responsive, mobile-first product catalogue.

The existing site is a simple Weebly website. Its current content describes Craftimacy as a business focused on bringing joy through handcrafted jewelry, discovering designs from artisans and craftsmen across India, and offering a collection of oxidised silver jewelry. The current site also uses a gallery/portfolio-style presentation and directs customers to contact the business by email or WhatsApp rather than providing a full e-commerce checkout. citeturn0view0turn1view0

The new application should preserve that business model while substantially improving:

- visual quality
- product discovery
- mobile experience
- product photography
- navigation
- SEO
- performance
- maintainability
- business-owner content management

The goal is to build a **premium-looking handcrafted jewelry catalogue**, not a generic corporate website and not a full e-commerce platform.

This document is intentionally written so that an AI coding agent can use it as the primary technical and product specification when designing, implementing, testing, and deploying the application.

The website is primarily a marketing, discovery, and authenticity destination driven by Instagram and Facebook traffic. It is **not a full e-commerce application** in the initial version.

Customers should be able to discover handcrafted jewelry, browse collections, view detailed product imagery/video, learn about Craftimacy, and contact the business to purchase or ask questions. The existing site currently uses email and WhatsApp as contact/purchase channels. citeturn0view0

---

# 2. Business Goals

The website must:

1. Present the business professionally and establish trust.
2. Showcase products through high-quality images and optional model videos.
3. Allow a business owner to add, edit, publish, unpublish, and remove products without developer involvement.
4. Work exceptionally well on mobile devices because social-media traffic is expected to be predominantly mobile.
5. Provide clear links to:
   - Instagram
   - Facebook
   - WhatsApp
   - Google Maps / business location
   - Google reviews
   - Phone/email where applicable
6. Display the business's Google review rating and provide a clear link to the Google Business Profile/reviews.
7. Be inexpensive to operate.
8. Avoid unnecessary backend infrastructure.
9. Be SEO-friendly.
10. Be designed so the system can later evolve into e-commerce or a custom backend if the business grows.

---

# 3. Agreed Technology Stack

## Frontend

- Next.js
- React
- TypeScript
- Modern CSS approach; Tailwind CSS is recommended
- Responsive/mobile-first design

## Content Management

- Sanity CMS
- Sanity Studio for administration
- Sanity's hosted content/data infrastructure

## Hosting

Use a commercial-compatible hosting provider for the production website.

Preferred implementation target:

- Vercel or another Next.js-compatible provider, subject to the selected plan's commercial-use terms.

Do not design the application around a provider's personal/hobby-only plan.

## Source Control

- Git
- GitHub

## Backend

- No Spring Boot in the initial version.
- No custom API server.

## Database

- No separately managed PostgreSQL database.

Sanity is the content-management/data layer.

## Reviews

- Do NOT build a custom review submission system.
- Do NOT store customer reviews in the application's database.
- Link users to the business's Google Business Profile / Google reviews.
- If the design displays a Google rating/review count, make the source clear.

## Payments

- None in Version 1.

## Authentication

- No customer authentication.
- Business-owner authentication is handled by Sanity.

---

# 4. High-Level Architecture

```text
                           SOCIAL MEDIA
                     ┌─────────────────────┐
                     │ Instagram / Facebook│
                     └──────────┬──────────┘
                                │
                                ▼
                     ┌─────────────────────┐
                     │   PUBLIC WEBSITE    │
                     │      Next.js        │
                     │       React         │
                     └──────────┬──────────┘
                                │
             ┌──────────────────┼──────────────────┐
             │                  │                  │
             ▼                  ▼                  ▼
        Product Data       Google Reviews      Business Links
             │                  │                  │
             ▼                  ▼                  ▼
        Sanity CMS         Google Maps       WhatsApp/Instagram
             │
             ├── Products
             ├── Categories
             ├── Images
             ├── Videos / media references
             └── Site content

                     ┌─────────────────────┐
                     │    Business Owner   │
                     └──────────┬──────────┘
                                │
                                ▼
                         Sanity Studio
                                │
                    Add/Edit/Publish Products
```

---

# 5. Craftimacy-Specific Product Experience

## 5.1 Jewelry Is the Hero

The site should be designed around **visual product discovery**.

Product photography should be the dominant visual element.

The design should feel appropriate for:

- handcrafted jewelry
- oxidised silver jewelry
- artisan-made pieces
- Indian craftsmanship
- boutique/fashion products
- giftable products

Avoid generic SaaS, technology, corporate, or marketplace styling.

## 5.2 Recommended Brand Feel

The visual language should communicate:

- handcrafted
- artistic
- elegant
- authentic
- warm
- premium but approachable
- Indian artisan/craft heritage
- contemporary fashion

Use a restrained, editorial aesthetic.

Do not overuse ornamental Indian motifs. The design should feel modern first, with subtle craftsmanship-inspired details where appropriate.

## 5.3 Homepage Story

The homepage should answer these questions quickly:

1. What is Craftimacy?
2. What kind of jewelry does it sell?
3. What makes the pieces special?
4. What products are currently available?
5. How can I buy/contact the business?
6. Where can I find Craftimacy online?
7. Is the business authentic/trustworthy?

Suggested hero:

```text
CRAFTIMACY

Handcrafted jewelry inspired by
Indian artisans and craftsmanship.

[Explore Collection]
[WhatsApp Us]
```

Use a high-quality jewelry/model image or carefully selected video.

## 5.4 Collection-Focused Navigation

Replace the current generic "Portfolio" concept with a stronger customer-facing catalogue concept.

Preferred navigation:

```text
Home
Shop / Collection
About Craftimacy
Contact
```

Optional:

```text
New Arrivals
Collections
```

Avoid retaining "Services" unless the business actually provides distinct services.

The current site has a Services navigation item, but the crawled page contains no substantive service content. citeturn1view1

## 5.5 Suggested Jewelry Categories

The CMS must NOT hard-code these categories. The business owner should be able to create/edit categories.

Potential initial categories:

```text
Earrings
Jhumkas
Necklaces
Neckpieces
Bracelets
Bangles
Rings
Oxidised Silver
Statement Jewelry
New Arrivals
```

Only use categories that match the actual inventory.

## 5.6 Product Cards

Each product card should prioritize:

1. product image
2. product name
3. optional short description
4. optional price
5. availability
6. optional "New" / "Featured" badge

Example:

```text
┌───────────────────────────────┐
│                               │
│       PRODUCT IMAGE           │
│                               │
│                         NEW   │
└───────────────────────────────┘

Hanging Beads
Oxidised Silver Earrings

[View Details]
```

Do not force a price if Craftimacy prefers customers to contact the business.

## 5.7 Product Detail Page

A product page should include:

```text
Product Gallery
        │
        ▼
Product Name
Category
Price / Contact for Price
Availability
Description
Materials / Details
Dimensions (if provided)
Care Instructions (if provided)

[WhatsApp to Enquire]
[Share Product]

Related Products
```

The primary conversion action should be **WhatsApp/contact**, not checkout.

## 5.8 Jewelry Photography

The design must accommodate:

- close-up jewelry photographs
- model-wearing photographs
- multiple product angles
- detail shots
- lifestyle photographs
- optional short model videos

Use large imagery and avoid tiny product thumbnails.

## 5.9 Model Videos

If Craftimacy has videos of models wearing jewelry, use them as premium visual content.

Possible locations:

- homepage hero
- product detail page
- collection banner
- editorial/story section

Do not autoplay with sound.

For product videos:

```text
muted
playsinline
poster image
lazy loaded
controls available
```

## 5.10 Product Enquiry

Instead of checkout, the primary CTA can be:

```text
WhatsApp to Enquire
```

The WhatsApp link should optionally include the product name.

Example concept:

```text
Hi Craftimacy, I'm interested in the "Hanging Beads" earrings.
```

The product name must be generated dynamically from CMS content.

## 5.11 Google Reviews

The site should use Google as the external source of truth for reviews.

Do not create a Craftimacy review database.

Recommended section:

```text
Loved by Our Customers

★★★★★
4.8 / 5 on Google

[Read Our Google Reviews]
```

Only show an actual rating/count when verified.

The current business model does not require customer accounts or review submission.

## 5.12 Social Proof

Because the business is expected to be marketed through Instagram/Facebook, social proof should be prominent but lightweight.

Preferred:

- Instagram link
- Facebook link
- Google Reviews link
- WhatsApp CTA

Avoid heavy embedded social widgets that hurt page speed.

## 5.13 About Craftimacy

Create a stronger version of the current "Who are WE" page.

The existing copy emphasizes:

- bringing joy through handcrafted jewelry
- discovering designs from artisans/craftsmen across India
- unique oxidised silver jewelry

These themes should be retained, rewritten professionally, and expanded only with factual information supplied by the business owner. citeturn1view0

Suggested structure:

```text
Our Story
Why Craftimacy
Our Connection With Indian Artisans
Our Jewelry
Craftsmanship / Materials
Follow Craftimacy
```

Do not invent claims about sourcing, materials, certifications, sustainability, fair trade, or manufacturing unless the business owner confirms them.

## 5.14 Existing Product/Collection Migration

The current site references products including:

- Hanging Beads — oxidised silver earrings
- Shackled — oxidised silver earrings
- Rain Dancer — described as an upcoming Craftimacy exclusive

These should be treated as **migration candidates**, not automatically assumed to be current inventory. Verify current product names, descriptions, prices, images, availability, and spelling with the business owner before publishing. citeturn0view0


# 5. Architecture Principles

The implementation must follow these principles:

### 5.1 Mobile First

The majority of visitors are expected to arrive from social media.

Design for:

- mobile first
- touch interactions
- fast loading
- readable typography
- large tap targets
- compressed/optimized media

Then progressively enhance for tablet and desktop.

### 5.2 Static/Server-Rendered Where Possible

The site should avoid unnecessary client-side JavaScript.

Use Next.js server rendering/static generation where practical.

Interactive client components should only be used where required.

### 5.3 Content Driven

Product information must never be hard-coded into React components.

Bad:

```typescript
const products = [
  {
    name: "Blue Saree",
    price: 7500
  }
];
```

Good:

```text
Sanity CMS
   ↓
Next.js
   ↓
Product pages
```

### 5.4 No Business Logic in UI Components

Keep data fetching, validation, content transformation, and presentation concerns separated.

### 5.5 Accessibility First

Target WCAG 2.2 AA principles.

Minimum requirements:

- semantic HTML
- keyboard navigation
- visible focus states
- sufficient color contrast
- descriptive image alt text
- accessible buttons
- accessible menus
- reduced-motion support
- form labels where forms exist

### 5.6 SEO First

Every product should have an indexable URL and metadata.

---

# 6. Website Information Architecture

Initial pages:

```text
/
├── Home
├── Collection / Products
│   ├── Category pages
│   └── Product detail pages
├── About Craftimacy
├── Contact
└── 404
```

Optional:

```text
/new-arrivals
/collections/[slug]
/lookbook
```

Do not create separate "Services" or "Portfolio" pages unless the business owner confirms they are still required. The existing site uses those labels, but the current Services and Portfolio pages contain little/no substantive crawlable content. citeturn1view1turn1view2


Potential future pages:

```text
/faq
/shipping
/returns
/privacy
/terms
```

Only add pages that are actually required by the business.

---

# 7. Homepage

The homepage should communicate the business within seconds.

Recommended structure:

```text
------------------------------------------------
Header
Logo | Products | About | Contact | WhatsApp
------------------------------------------------

Hero
Large product/model visual
Business statement
Primary CTA
Secondary CTA

------------------------------------------------

Featured Products
Product cards
Product cards
Product cards

[View All Products]

------------------------------------------------

Why Choose Us / About
Short business story
Authenticity / quality / craftsmanship

------------------------------------------------

Google Reviews
⭐ 4.8 / 5
Based on Google reviews

[Read Reviews on Google]

------------------------------------------------

Instagram / Social Media
Selected visual content or link

------------------------------------------------

Contact / Location
Address
Phone
WhatsApp
Google Maps

------------------------------------------------
Footer
Social links
Contact
Copyright
Policies
```

The exact sections should remain configurable where practical.

---

# 8. Product Catalogue

The product catalogue is the central feature.

Users should be able to:

- browse products
- filter by category
- search products
- open product details
- view images
- view optional videos
- contact the business

Do not implement shopping cart or checkout in Version 1.

---

# 9. Product Data Model

Create a Sanity `product` schema.

Recommended fields:

```text
Product
├── title
├── slug
├── shortDescription
├── description
├── price
├── priceDisplayMode
├── category
├── images
├── video
├── featured
├── available
├── sortOrder
├── seo
│   ├── metaTitle
│   ├── metaDescription
│   └── socialImage
├── createdAt
└── updatedAt
```

## Field definitions

### title

Required.

Human-readable product name.

### slug

Required and unique.

Example:

```text
blue-banarasi-silk-saree
```

URL:

```text
/products/blue-banarasi-silk-saree
```

### shortDescription

Short catalogue-card description.

### description

Longer product description.

Support rich text where appropriate.

### price

Optional.

Some businesses may want to show:

- exact price
- "Contact us"
- "Price on request"

Do not assume every product has a public price.

### priceDisplayMode

Suggested values:

```text
EXACT_PRICE
CONTACT_FOR_PRICE
HIDDEN
```

### category

Reference to a Sanity `category`.

### images

Required.

Allow multiple images.

Each image should support:

- alt text
- optional caption
- hotspot/crop where supported

### video

Optional.

Prefer a reference/URL to a suitable video-hosting solution rather than storing large videos unnecessarily inside the CMS.

### featured

Boolean.

Controls whether the product appears in featured sections.

### available

Boolean.

Controls whether the product is currently available.

Do not automatically delete unavailable products.

### sortOrder

Optional integer.

Allows business owner to manually influence catalogue ordering.

### SEO

Optional structured SEO fields.

---

# 10. Category Data Model

Create a Sanity `category` schema.

```text
Category
├── name
├── slug
├── description
├── image
├── sortOrder
└── active
```

Example:

```text
Sarees
Salwar Suits
Lehengas
Accessories
New Arrivals
```

Do not hard-code category names into the frontend.

---

# 11. Site Settings Data Model

Create a Sanity `siteSettings` singleton.

Recommended fields:

```text
Site Settings
├── businessName
├── logo
├── favicon
├── tagline
├── phone
├── email
├── whatsappNumber
├── address
├── googleMapsUrl
├── googleReviewsUrl
├── instagramUrl
├── facebookUrl
├── openingHours
├── defaultSeoTitle
├── defaultSeoDescription
└── defaultSocialImage
```

This allows the business owner to update business information without code changes.

---

# 12. Homepage Content Model

Where practical, create a `homepage` singleton.

Possible fields:

```text
Homepage
├── heroTitle
├── heroSubtitle
├── heroImage
├── heroVideo
├── featuredProducts
├── aboutHeading
├── aboutText
├── aboutImage
├── reviewSectionTitle
├── socialSectionTitle
└── CTA configuration
```

Do not over-engineer the CMS.

Only expose fields the business owner actually needs.

---

# 13. Sanity Studio

Sanity Studio is the business owner's administration interface.

The owner should be able to:

1. Log in.
2. Create a product.
3. Upload product images.
4. Enter product information.
5. Select a category.
6. Mark a product as featured.
7. Mark availability.
8. Save draft.
9. Preview if configured.
10. Publish.
11. Edit existing products.
12. Unpublish/hide products.

The Studio should use clear labels and descriptions intended for a non-technical user.

Avoid exposing technical fields unnecessarily.

---

# 14. Product Publishing Workflow

Recommended workflow:

```text
Create Product
      ↓
Save Draft
      ↓
Preview
      ↓
Publish
      ↓
Website displays product
```

For simple operation, do not introduce a complicated editorial approval workflow.

---

# 15. Product Images

Images are a major part of this application.

Requirements:

- use Next.js image optimization
- responsive image sizes
- lazy-load below-the-fold images
- use appropriate image formats
- provide meaningful alt text
- prevent layout shift by reserving image dimensions
- avoid serving unnecessarily large originals to mobile users

Product listing pages should use thumbnails.

Product detail pages can load larger images.

---

# 16. Product Videos

Videos are optional.

Do not autoplay videos with sound.

Recommended behavior:

- muted
- playsinline
- controls available where appropriate
- poster image
- lazy loading
- do not load large video files until necessary

For a small business, consider storing videos in a dedicated video/media service and storing the URL/reference in Sanity rather than making Sanity the primary video delivery platform.

---

# 17. Google Reviews

Version 1 must NOT implement a review submission system.

The website should provide:

```text
Google Reviews

⭐ 4.8 / 5

Based on Google reviews

[ Read our reviews on Google ]
```

The CTA should link to the business's official Google Business Profile / review destination.

The website must not claim a review count or rating unless it is currently verified.

If the business later wants live review data displayed directly inside the website, evaluate Google's Places API and its current pricing, attribution, storage, and display policies before implementation.

Do not put Google API keys in public frontend source code.

---

# 18. Social Media

The website should provide prominent links to:

- Instagram
- Facebook
- WhatsApp

Social icons must have accessible labels.

Example:

```text
aria-label="Visit us on Instagram"
```

Do not embed heavy social-media widgets unless there is a clear business reason.

Simple links are preferred for performance.

---

# 19. WhatsApp

For a business where social media is the primary marketing channel, WhatsApp should be highly visible.

Use a configurable WhatsApp number from Sanity.

Possible CTA:

```text
Chat with us on WhatsApp
```

On mobile, it should open WhatsApp naturally.

The implementation should not hard-code the business number.

---

# 20. Search

For a small catalogue, search can initially be implemented using product data already retrieved by Next.js.

Avoid introducing Elasticsearch or another search service.

If the catalogue eventually becomes very large, evaluate a dedicated search provider.

---

# 21. Filtering

Initial filters:

- category
- availability
- featured/new

Keep filtering simple.

Do not build an advanced commerce filtering engine in Version 1.

---

# 22. URL Structure

Use clean URLs.

Examples:

```text
/
 /products
 /products/sarees
 /products/blue-banarasi-silk-saree
 /about
 /contact
```

Avoid:

```text
/product?id=12345
```

Use slugs.

---

# 23. SEO Requirements

Each product page should generate:

- title
- meta description
- canonical URL
- Open Graph metadata
- Twitter/X card metadata where useful
- structured data where appropriate

Product structured data must only include information actually displayed and accurate for the business.

Generate:

```text
sitemap.xml
robots.txt
```

Use semantic headings.

One primary H1 per page.

Images must have useful alt text.

---

# 24. Performance Requirements

Target:

- excellent Core Web Vitals
- fast first load on mobile networks
- minimal client-side JavaScript
- optimized images
- lazy loading
- caching
- CDN delivery

Avoid unnecessary:

- animation libraries
- huge JavaScript bundles
- third-party trackers
- social widgets
- autoplay video
- client-side data fetching for content that can be rendered on the server

---

# 25. Design Requirements

The visual design should feel:

- modern
- premium
- elegant
- trustworthy
- clean
- image-focused
- mobile-first

Do not create a generic "developer portfolio" appearance.

The product imagery should be the visual focus.

Use:

- generous whitespace
- refined typography
- consistent spacing
- restrained animations
- subtle hover states
- strong visual hierarchy
- high-quality product cards

Avoid excessive gradients, excessive shadows, clutter, and unnecessary animations.

---

# 26. Responsive Breakpoints

Support at minimum:

```text
Mobile: 320px+
Tablet: 768px+
Desktop: 1024px+
Large Desktop: 1440px+
```

The design must remain usable between breakpoints.

Do not design only for specific device widths.

---

# 27. Accessibility

Requirements:

- semantic HTML
- keyboard-accessible navigation
- keyboard-accessible dialogs
- visible focus state
- proper heading hierarchy
- form labels
- alt text
- accessible color contrast
- no information conveyed by color alone
- accessible mobile menu
- reduced-motion support
- accessible carousel controls if carousels are used

Do not use images containing important text unless equivalent text is available.

---

# 28. Security

Because there is no custom backend, the security surface is intentionally small.

Requirements:

- never expose private CMS credentials
- use environment variables
- never commit secrets to Git
- use Sanity's official authentication
- validate external URLs where appropriate
- keep dependencies updated
- configure security headers where supported
- protect preview functionality
- do not expose server-side API keys to the browser

---

# 29. Environment Variables

Use `.env.local` for development.

Potential variables:

```text
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
SANITY_API_VERSION=
SANITY_API_TOKEN=
NEXT_PUBLIC_SITE_URL=
```

Only expose variables prefixed with `NEXT_PUBLIC_` when they are safe for browser exposure.

A write token must NEVER be `NEXT_PUBLIC_`.

If a token is only required by server-side tooling, keep it server-side.

---

# 30. Project Structure

Recommended structure:

```text
project-root/
│
├── app/
│   ├── page.tsx
│   ├── products/
│   │   ├── page.tsx
│   │   ├── [slug]/
│   │   │   └── page.tsx
│   │   └── category/
│   │       └── [slug]/
│   │           └── page.tsx
│   ├── about/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   ├── not-found.tsx
│   ├── sitemap.ts
│   ├── robots.ts
│   └── layout.tsx
│
├── components/
│   ├── layout/
│   ├── navigation/
│   ├── home/
│   ├── products/
│   ├── reviews/
│   ├── social/
│   └── ui/
│
├── lib/
│   ├── sanity/
│   ├── seo/
│   └── utils/
│
├── sanity/
│   ├── schemas/
│   │   ├── product.ts
│   │   ├── category.ts
│   │   ├── siteSettings.ts
│   │   └── homepage.ts
│   └── sanity.config.ts
│
├── public/
│   └── static-assets/
│
├── types/
│
├── tests/
│
├── .env.example
├── next.config.ts
├── package.json
└── README.md
```

Adjust this structure to current Next.js conventions during implementation.

---

# 31. Component Architecture

Prefer small reusable components.

Examples:

```text
Header
MobileNavigation
Footer
HeroSection
ProductCard
ProductGrid
ProductGallery
ProductVideo
CategoryFilter
SearchBox
GoogleReviewSection
SocialLinks
WhatsAppButton
ContactSection
```

Components should not contain unnecessary business logic.

---

# 32. Data Fetching

Use a dedicated Sanity client.

Do not scatter raw Sanity queries throughout components.

Preferred pattern:

```text
Sanity client
     ↓
Repository/query functions
     ↓
Page/server component
     ↓
UI components
```

Example conceptual API:

```typescript
getProducts()
getProductBySlug(slug)
getCategories()
getSiteSettings()
getHomepage()
```

---

# 33. Caching

Because catalogue content does not change every second, use caching/revalidation.

When a product is published or updated, the website should update without requiring a full manual code deployment.

Use the current Next.js revalidation/caching capabilities appropriate to the selected Next.js version.

Do not disable caching globally.

---

# 34. Error Handling

The website should gracefully handle:

- missing product
- deleted product
- CMS unavailable
- malformed product data
- broken image
- invalid category
- missing optional media

A CMS failure should not result in a raw stack trace being shown to users.

Use friendly error pages.

---

# 35. Analytics

Analytics are optional.

If the business wants analytics, use a lightweight privacy-conscious analytics solution.

At minimum, track:

- page views
- product page views
- WhatsApp clicks
- Instagram clicks
- Google Reviews clicks
- contact clicks

Do not add analytics libraries until there is a business reason.

---

# 36. Privacy

If analytics, cookies, contact forms, or other tracking mechanisms are introduced, review the applicable privacy requirements for the business's target customers.

Do not collect personal information unless necessary.

Version 1 should minimize data collection.

---

# 37. Deployment

Recommended flow:

```text
Developer
   │
   ▼
GitHub
   │
   ▼
CI/CD
   │
   ▼
Hosting Provider
   │
   ▼
Production Website
```

CMS:

```text
Business Owner
      │
      ▼
Sanity Studio
      │
      ▼
Published content
      │
      ▼
Next.js revalidation/cache
      │
      ▼
Production Website
```

Adding a product must NOT require a Git commit or deployment.

---

# 38. Domain

Use a custom domain.

Examples:

```text
businessname.com
businessname.ca
businessname.in
```

Choose the domain based on the business's actual market and availability.

Configure:

- HTTPS
- www/non-www canonical behavior
- DNS
- production site URL
- Open Graph URL
- sitemap URL

---

# 39. Cost Philosophy

The application is intentionally designed around a very small budget.

Initial recurring services should target:

```text
Domain                  Required
Next.js                 Free/open source
Sanity                  Free tier initially
Database                No separately managed DB
Spring Boot             None
Google Reviews API      None in Version 1
Payments                None
Search service          None
```

The business should not incur unnecessary SaaS costs.

Before adopting any paid service, confirm:

1. Is it actually required?
2. Is there a free/open-source alternative?
3. Does the free tier permit commercial use?
4. What happens when usage grows?
5. Can the service be replaced later?

---

# 40. Explicit Non-Goals

Version 1 must NOT implement:

- shopping cart
- checkout
- payment processing
- customer accounts
- order management
- inventory management
- customer review submission
- custom Spring Boot API
- PostgreSQL infrastructure
- Kubernetes
- microservices
- Elasticsearch
- Redis
- Kafka
- custom authentication
- custom admin dashboard

These may be considered later if business requirements justify them.

---

# 41. Future Evolution

The architecture must allow future expansion.

Potential future:

```text
Version 1

Next.js
   +
Sanity
```

Then:

```text
Version 2

Next.js
   +
Sanity
   +
Commerce platform
```

Then potentially:

```text
Version 3

Next.js
   ↓
Spring Boot
   ↓
PostgreSQL
   ↓
Payments / Orders / Inventory
```

Do not prematurely implement Version 3 infrastructure.

---

# 42. AI Coding Agent Instructions

The coding agent must follow these rules.

## Before coding

1. Read this entire document.
2. Inspect the repository.
3. Identify existing code before changing it.
4. Do not introduce unnecessary infrastructure.
5. Prefer current stable versions of the specified technologies.
6. If a technology choice conflicts with a current framework requirement, explain the change before implementing it.

## During coding

1. Use TypeScript.
2. Use reusable components.
3. Keep components small.
4. Keep business/content data out of source code.
5. Use Sanity schemas for editable business content.
6. Use server-side data fetching where appropriate.
7. Optimize images.
8. Maintain accessibility.
9. Maintain responsive behavior.
10. Do not expose secrets.
11. Do not add a custom backend unless explicitly requested.
12. Do not add PostgreSQL.
13. Do not add authentication outside Sanity unless explicitly requested.
14. Do not add unnecessary dependencies.

## Quality requirements

Every feature should include:

- implementation
- responsive behavior
- accessibility
- error handling
- appropriate loading state
- tests where practical

---

# 43. Definition of Done

The application is considered complete when:

### Public website

- [ ] Homepage is responsive.
- [ ] Navigation works on mobile and desktop.
- [ ] Product catalogue works.
- [ ] Category filtering works.
- [ ] Product detail pages work.
- [ ] Product images are optimized.
- [ ] Optional videos work.
- [ ] About page works.
- [ ] Contact information is displayed.
- [ ] WhatsApp link works.
- [ ] Instagram link works.
- [ ] Facebook link works.
- [ ] Google Maps link works.
- [ ] Google review link works.
- [ ] 404 page exists.
- [ ] SEO metadata exists.
- [ ] Sitemap exists.
- [ ] Robots configuration exists.
- [ ] Accessibility checks pass.
- [ ] Mobile performance is acceptable.

### CMS

- [ ] Business owner can log in.
- [ ] Business owner can add products.
- [ ] Business owner can edit products.
- [ ] Business owner can upload images.
- [ ] Business owner can associate products with categories.
- [ ] Business owner can publish/unpublish products.
- [ ] Business owner can mark featured products.
- [ ] Business owner can update business information.
- [ ] Business owner can update social links.
- [ ] Product changes appear on the website without code changes.

### Engineering

- [ ] No secrets committed to Git.
- [ ] `.env.example` exists.
- [ ] README contains local setup instructions.
- [ ] README contains deployment instructions.
- [ ] Production build succeeds.
- [ ] No unnecessary backend service exists.
- [ ] No managed PostgreSQL dependency exists.
- [ ] No customer review database exists.

---

# 44. Recommended Development Sequence

Build in this order.

## Phase 1 — Project foundation

1. Create Next.js + TypeScript project.
2. Configure styling.
3. Configure linting and formatting.
4. Configure Git.
5. Configure environment variables.
6. Configure Sanity.

## Phase 2 — CMS

1. Create Product schema.
2. Create Category schema.
3. Create Site Settings schema.
4. Create Homepage schema.
5. Configure Sanity Studio.
6. Add sample content.

## Phase 3 — Website shell

1. Global layout.
2. Header.
3. Mobile navigation.
4. Footer.
5. Typography.
6. Responsive design system.

## Phase 4 — Catalogue

1. Product listing.
2. Category listing.
3. Product filtering.
4. Product detail page.
5. Product gallery.
6. Optional product video.

## Phase 5 — Business information

1. About.
2. Contact.
3. Google Maps.
4. WhatsApp.
5. Instagram.
6. Facebook.
7. Google Reviews link.

## Phase 6 — SEO/performance

1. Metadata.
2. Open Graph.
3. Sitemap.
4. Robots.
5. Image optimization.
6. Caching/revalidation.
7. Performance testing.

## Phase 7 — Testing

Test at:

- 320px mobile
- 375px mobile
- 390px mobile
- 768px tablet
- 1024px desktop
- 1440px desktop

Test:

- keyboard navigation
- screen-reader basics
- broken images
- missing products
- missing optional fields
- CMS unavailable
- slow network
- long product names
- large images
- products with no video
- products with many images

## Phase 8 — Deployment

1. Create production project.
2. Configure environment variables.
3. Configure Sanity production dataset.
4. Configure domain.
5. Configure HTTPS.
6. Test production site.
7. Verify SEO.
8. Verify social links.
9. Verify Google review link.
10. Train business owner on Sanity Studio.

---

# 45. Design Quality Bar

The result should NOT look like the existing generic Weebly/template website or a generic SaaS template.

It should feel like a professionally designed **handcrafted jewelry boutique / artisan brand**.

Prioritize:

1. Jewelry photography
2. Elegant editorial typography
3. Generous whitespace
4. Visual storytelling
5. Mobile-first product discovery
6. Fast loading from social-media links
7. Clear WhatsApp/contact calls to action
8. Craftsmanship and authenticity signals
9. Subtle Indian/artisan character without becoming visually stereotypical

Use subtle animation only when it improves the experience.

Avoid:

- excessive animations
- distracting parallax
- huge JavaScript libraries
- unnecessary popups
- intrusive cookie banners unless legally required
- autoplay audio
- cluttered navigation
- overly complicated product filters

---

# 46. Final Target Architecture

The final Version 1 architecture should remain approximately:

```text
                         ┌────────────────────┐
                         │ Instagram / Facebook│
                         └─────────┬──────────┘
                                   │
                                   ▼
                         ┌────────────────────┐
                         │                    │
                         │     Next.js        │
                         │  React + TypeScript│
                         │                    │
                         └─────────┬──────────┘
                                   │
                ┌──────────────────┼──────────────────┐
                │                  │                  │
                ▼                  ▼                  ▼
          Sanity Content      Google Reviews      Social Links
                │                  │                  │
                │                  │                  ├── Instagram
                │                  │                  ├── Facebook
                │                  │                  └── WhatsApp
                │                  │
                │                  └── Google Business Profile
                │
                ├── Products
                ├── Categories
                ├── Images
                ├── Site Settings
                └── Homepage Content

                         Business Owner
                                │
                                ▼
                         Sanity Studio
                                │
                                ▼
                       Content Management
```

The key architectural decision is:

> **Use Next.js for the public Craftimacy experience and Sanity for business-managed jewelry content. Do not build a custom backend until actual business requirements justify one.**

The first release is a **catalogue and brand experience**, not an e-commerce platform.

The customer journey should be:

```text
Instagram / Facebook
        ↓
Craftimacy Website
        ↓
Discover Collection
        ↓
View Jewelry
        ↓
Learn About Craftimacy
        ↓
Google Reviews / Social Proof
        ↓
WhatsApp / Contact
        ↓
Purchase conversation with the business
```

This keeps the initial application inexpensive, maintainable, fast, SEO-friendly, mobile-friendly, and simple enough for a non-technical business owner to operate.
