# Travel Agency SaaS - Full Stack Monorepo

All-in-One Travel Agency SaaS Platform dengan arsitektur monorepo modern menggunakan Turborepo, SolidStart, NestJS, dan PostgreSQL.

## 🏗️ Arsitektur

```
travel-agency-saas/
├── apps/
│   ├── web/            # SolidStart Frontend (Port 3000)
│   ├── api/            # NestJS Backend API (Port 3001)
│   └── admin/          # Next.js Admin Dashboard (Port 3002)
├── packages/
│   ├── database/       # Kysely + Drizzle ORM
│   ├── contracts/      # Shared TypeScript Types & DTOs
│   ├── ui/             # Reusable UI Components (SolidJS)
│   └── utils/          # Shared Utility Functions
├── turbo.json          # Turborepo Configuration
└── package.json        # Root Package Configuration
```

## 🚀 Tech Stack

- **Frontend**: SolidStart + Tailwind CSS
- **Backend**: NestJS + TypeScript
- **Database**: PostgreSQL + Drizzle ORM + Kysely
- **Monorepo**: Turborepo
- **Package Manager**: pnpm
- **Authentication**: JWT + Passport
- **API Documentation**: Swagger/OpenAPI
- **Validation**: Class Validator + Class Transformer

## 🎯 Fitur Utama

### A. Manajemen Produk & Inventory
- ✅ Digital Katalog Produk (Travel, Hotel, Umroh/Haji)
- ✅ Template khusus paket Umroh/Haji dengan fitur Islamic
- ✅ Dynamic Pricing berdasarkan musim dan kuota
- ✅ Sistem inventori hotel dan allotment
- 🔄 Integrasi API GDS (Amadeus/Sabre) - Coming Soon

### B. Booking & Payment Hub
- ✅ Multi-Channel Booking (Online, Offline, Mobile)
- ✅ Payment Gateway terintegrasi (Midtrans, Xendit)
- ✅ Manajemen pembayaran Umroh/Haji dengan cicilan Syariah
- ✅ Rekonsiliasi otomatis pembayaran
- ✅ Notifikasi jatuh tempo dan pelacakan status

### C. Website Builder & Digital Presence
- ✅ Drag-and-Drop Landing Page Builder
- ✅ Template siap pakai (Travel, Hotel, Umroh/Haji)
- ✅ Kustomisasi branding (warna, font, logo)
- ✅ SEO-friendly structure
- ✅ Fitur khusus Umroh/Haji (jadwal sholat, live tracking)

### D. Operasional & CRM
- ✅ Customer Management dengan database jamaah
- ✅ Loyalty program dan ulasan otomatis
- ✅ Agent productivity toolkit
- ✅ Task management dan komisi otomatis
- ✅ Generator dokumen (invoice, voucher, kontrak)

### E. Analytics & Intelligence
- ✅ Performance Dashboard real-time
- ✅ Konversi booking dan sumber pelanggan
- ✅ Umroh/Haji Analytics khusus
- ✅ Prediksi kuota dan analisis profitabilitas

## 🛠️ Setup Development

### Prerequisites
- Node.js >= 18.0.0
- pnpm >= 8.0.0
- PostgreSQL >= 14

### Installation

1. **Clone repository**
```bash
git clone <repository-url>
cd travel-agency-saas
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Setup environment variables**
```bash
# Copy environment template
cp .env.example .env

# Edit environment variables
DATABASE_URL="postgresql://postgres:password@localhost:5432/travel_agency"
JWT_SECRET="your-jwt-secret-key"
```

4. **Setup database**
```bash
# Generate database schema
pnpm db:generate

# Push schema to database
pnpm db:push

# Run migrations
pnpm db:migrate
```

5. **Start development servers**
```bash
# Start all applications in parallel
pnpm dev

# Or start individually
pnpm --filter @travel-agency/web dev    # Frontend (Port 3000)
pnpm --filter @travel-agency/api dev    # Backend API (Port 3001)
```

## 📚 API Documentation

Setelah menjalankan backend API, dokumentasi Swagger tersedia di:
- **Local**: http://localhost:3001/api/docs
- **Production**: https://your-domain.com/api/docs

## 🗄️ Database Schema

### Core Tables
- **users** - User management dan authentication
- **customers** - Customer data dengan Islamic profile
- **products** - Travel packages, hotels, Umroh/Haji
- **bookings** - Booking management dengan participant details
- **payments** - Payment processing dengan Shariah compliance
- **umroh_packages** - Specialized Umroh/Haji package details

### Key Features
- ✅ Islamic tourism compliance (Halal, Shariah)
- ✅ Multi-currency support (IDR default)
- ✅ Installment payment plans (Mudharabah)
- ✅ Document management (passport, visa, certificates)
- ✅ Group management untuk jamaah
- ✅ Real-time tracking dan communication

## 🔧 Scripts

```bash
# Development
pnpm dev              # Start all apps in development mode
pnpm build            # Build all applications
pnpm lint             # Lint all packages
pnpm test             # Run all tests

# Database
pnpm db:generate      # Generate Drizzle schema
pnpm db:push          # Push schema to database
pnpm db:migrate       # Run database migrations
pnpm db:studio        # Open Drizzle Studio

# Utilities
pnpm clean            # Clean all build artifacts
```

## 🚀 Deployment

### Production Build
```bash
# Build all applications
pnpm build

# Start production servers
pnpm start
```

### Docker Deployment
```bash
# Build Docker images
docker-compose build

# Start services
docker-compose up -d
```

### Environment Variables (Production)
```bash
NODE_ENV=production
DATABASE_URL="postgresql://user:password@host:5432/travel_agency"
JWT_SECRET="your-production-jwt-secret"
REDIS_URL="redis://localhost:6379"
```

## 🔐 Security Features

- ✅ JWT Authentication dengan refresh tokens
- ✅ Role-based access control (Admin, Manager, Agent)
- ✅ Input validation dan sanitization
- ✅ Rate limiting dan CORS protection
- ✅ Encrypted sensitive data storage
- ✅ Audit logging untuk compliance

## 🕌 Islamic Compliance Features

- ✅ **Shariah-compliant payments** - Mudharabah contracts
- ✅ **Prayer times calculation** - Real-time untuk jamaah
- ✅ **Qibla direction** - GPS-based calculation
- ✅ **Halal certification tracking** - Food dan accommodation
- ✅ **Islamic calendar integration** - Hijri dates
- ✅ **Mahram management** - Family relationship tracking

## 📈 Performance & Scalability

- ✅ **Database optimization** - Indexed queries dan connection pooling
- ✅ **Caching strategy** - Redis untuk session dan data caching
- ✅ **API rate limiting** - Protection dari abuse
- ✅ **Image optimization** - Compressed uploads dan CDN ready
- ✅ **Background jobs** - Queue system untuk heavy operations

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ for Indonesian Travel Industry**