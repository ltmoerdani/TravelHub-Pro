# TravelHub Pro - All-in-One Travel Agency SaaS

Platform SaaS lengkap untuk agensi travel yang memungkinkan pengelolaan produk travel, hotel, dan paket umroh/haji dalam satu sistem terintegrasi dengan fitur Islamic compliance dan automation tools.

## 🏗️ Arsitektur Sistem

```
travel-agency-saas/
├── apps/
│   ├── web/            # SolidStart Frontend (Port 3000)
│   ├── api/            # NestJS Backend API (Port 3001)
│   └── admin/          # Next.js Admin Dashboard (Port 3002)
├── packages/
│   ├── database/       # Drizzle ORM + PostgreSQL Schema
│   ├── contracts/      # Shared TypeScript Types & DTOs
│   ├── ui/             # Reusable SolidJS Components
│   └── utils/          # Shared Utility Functions
├── turbo.json          # Turborepo Configuration
└── package.json        # Root Package Configuration
```

## 🚀 Tech Stack Production-Grade

- **Frontend**: SolidStart + Tailwind CSS + TypeScript
- **Backend**: NestJS + Drizzle ORM + PostgreSQL
- **Database**: PostgreSQL dengan Drizzle ORM
- **Monorepo**: Turborepo untuk development efficiency
- **Package Manager**: pnpm dengan lockfile versioning
- **Authentication**: JWT + Passport strategies
- **API Documentation**: Swagger/OpenAPI dengan interactive docs
- **Validation**: Class Validator + Class Transformer

## 🎯 Fitur Utama Platform

### A. 📦 Manajemen Produk & Inventory
- ✅ **Digital Katalog Produk** dengan template khusus Umroh/Haji
- ✅ **Dynamic Pricing Engine** berdasarkan musim, kuota, dan demand
- ✅ **Inventory Management** untuk hotel, flight seats, dan tour slots
- ✅ **Multi-Product Support**: Travel reguler, Hotel, Umroh, Haji
- ✅ **Price Rules Engine** dengan seasonal dan group discounts

### B. 💳 Booking & Payment Hub
- ✅ **Multi-Channel Booking**: Online, offline, mobile integration
- ✅ **Payment Gateway Integration**: Midtrans, Xendit, OVO support
- ✅ **Shariah-Compliant Payments**: Mudharabah installment plans
- ✅ **Automatic Reconciliation**: Payment tracking dan status updates
- ✅ **Invoice Generation**: Automated document creation

### C. 🕌 Islamic Tourism Specialization
- ✅ **Prayer Times Integration**: Real-time calculation based on location
- ✅ **Qibla Direction Compass**: GPS-based Kaaba direction finder
- ✅ **Islamic Calendar**: Hijri dates dengan Islamic events tracking
- ✅ **Umroh/Haji Management**: Specialized package handling
- ✅ **Halal Compliance**: Food, accommodation, service requirements
- ✅ **Mahram Tracking**: Family relationship management for women travelers

### D. 👥 Customer Relationship Management
- ✅ **Customer Database**: Comprehensive profile dengan Islamic requirements
- ✅ **Loyalty Program**: Points dan rewards system
- ✅ **Automated Communications**: Email, SMS, WhatsApp integration
- ✅ **Document Management**: Passport, visa, medical records tracking
- ✅ **Review System**: Automated feedback collection

### E. 🎯 Agent Productivity Tools
- ✅ **Task Management**: Follow-up tracking dan reminders
- ✅ **Commission Automation**: Automatic calculation dan payouts
- ✅ **Performance Analytics**: Sales metrics dan ranking
- ✅ **Lead Management**: Customer pipeline tracking
- ✅ **Territory Management**: Geographic assignment system

### F. 📊 Business Intelligence & Analytics
- ✅ **Real-time Dashboard**: Revenue, bookings, customer metrics
- ✅ **Advanced Reporting**: Customizable reports dengan export options
- ✅ **Predictive Analytics**: Demand forecasting dan trend analysis
- ✅ **Customer Segmentation**: VIP, regular, new customer analysis
- ✅ **ROI Tracking**: Marketing campaign performance

### G. 🎨 Website Builder & Digital Presence
- ✅ **Template System**: Travel, Hotel, Umroh/Haji themes
- ✅ **Drag-and-Drop Builder**: Visual customization tools
- ✅ **SEO Optimization**: Built-in SEO best practices
- ✅ **Mobile Responsive**: Automatic mobile optimization
- ✅ **Booking Widget**: Embeddable booking forms

### H. 🔄 Marketing Automation
- ✅ **Campaign Management**: Email, SMS, WhatsApp campaigns
- ✅ **Promotion Engine**: Discount codes dan usage tracking
- ✅ **Customer Journey**: Automated follow-up sequences
- ✅ **A/B Testing**: Campaign optimization tools
- ✅ **Analytics Integration**: Marketing ROI tracking

## 🛠️ Setup Development Environment

### Prerequisites
- Node.js >= 18.0.0
- pnpm >= 8.0.0
- PostgreSQL >= 14
- Redis (optional, untuk caching)

### Quick Start

1. **Clone dan Install Dependencies**
```bash
git clone <repository-url>
cd travel-agency-saas
pnpm install
```

2. **Environment Configuration**
```bash
# Copy environment template
cp .env.example .env

# Edit environment variables
DATABASE_URL="postgresql://postgres:password@localhost:5432/travel_agency"
JWT_SECRET="your-super-secret-jwt-key"
API_PORT=3001
WEB_PORT=3000
ADMIN_PORT=3002
```

3. **Database Setup**
```bash
# Generate database schema
pnpm db:generate

# Run migrations
pnpm db:migrate

# Optional: Open database studio
pnpm db:studio
```

4. **Start Development Servers**
```bash
# Start all applications in parallel
pnpm dev

# Or start individually:
pnpm --filter @travel-agency/web dev    # Frontend (Port 3000)
pnpm --filter @travel-agency/api dev    # Backend API (Port 3001)
pnpm --filter @travel-agency/admin dev  # Admin Dashboard (Port 3002)
```

## 📚 API Documentation

Setelah menjalankan backend API, dokumentasi Swagger tersedia di:
- **Development**: http://localhost:3001/api/docs
- **Health Check**: http://localhost:3001/health

### API Endpoints Overview

```
Authentication
├── POST /api/auth/login
├── POST /api/auth/register
└── GET  /api/auth/profile

Products & Inventory
├── GET    /api/products
├── POST   /api/products
├── GET    /api/inventory
└── POST   /api/inventory/pricing/calculate

Bookings & Payments
├── GET    /api/bookings
├── POST   /api/bookings
├── POST   /api/payments/process
└── POST   /api/payments/installment

Islamic Tourism
├── GET    /api/umroh/prayer-times
├── GET    /api/umroh/qibla
├── POST   /api/umroh/package
└── GET    /api/umroh/islamic-calendar

Analytics & Reports
├── GET    /api/analytics/dashboard
├── GET    /api/analytics/revenue
└── GET    /api/analytics/umroh

Agent Management
├── GET    /api/agents
├── GET    /api/agents/:id/performance
├── GET    /api/agents/:id/commissions
└── POST   /api/agents/:id/tasks
```

## 🗄️ Database Schema

### Core Tables
- **users** - User authentication dan profile management
- **customers** - Customer data dengan Islamic profile support
- **products** - Travel packages, hotels, Umroh/Haji products
- **bookings** - Booking management dengan participant details
- **payments** - Payment processing dengan Shariah compliance
- **umroh_packages** - Specialized Umroh/Haji package details
- **inventory** - Dynamic inventory dengan pricing rules
- **agents** - Sales agent management dan commission tracking
- **documents** - Document storage dan compliance tracking
- **campaigns** - Marketing campaign management

### Key Features
- ✅ **Islamic Compliance**: Halal, Shariah-compliant financial transactions
- ✅ **Multi-Currency**: IDR default dengan support untuk USD, EUR
- ✅ **Installment Plans**: Mudharabah-compliant payment schedules
- ✅ **Document Workflow**: Automated passport, visa, certificate tracking
- ✅ **Group Management**: Jamaah tracking untuk religious tourism
- ✅ **Real-time Sync**: Live updates across all applications

## 🔧 Available Scripts

```bash
# Development
pnpm dev              # Start all apps in development mode
pnpm build            # Build all applications for production
pnpm lint             # Lint all packages
pnpm test             # Run all test suites

# Database Operations
pnpm db:generate      # Generate Drizzle schema from database
pnpm db:push          # Push schema changes to database
pnpm db:migrate       # Run database migrations
pnpm db:studio        # Open Drizzle Studio (database GUI)

# Utilities
pnpm clean            # Clean all build artifacts
pnpm type-check       # Run TypeScript type checking
```

## 🚀 Production Deployment

### Docker Deployment
```bash
# Build production images
docker-compose build

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f
```

### Environment Variables (Production)
```bash
NODE_ENV=production
DATABASE_URL="postgresql://user:password@host:5432/travel_agency"
JWT_SECRET="your-production-jwt-secret-256-bit"
REDIS_URL="redis://localhost:6379"

# Payment Gateways
MIDTRANS_SERVER_KEY="your-midtrans-server-key"
XENDIT_SECRET_KEY="your-xendit-secret-key"

# External APIs
AMADEUS_API_KEY="your-amadeus-api-key"
WHATSAPP_TOKEN="your-whatsapp-business-token"
```

## 🔐 Security Features

- ✅ **JWT Authentication** dengan refresh token rotation
- ✅ **Role-based Access Control**: Admin, Manager, Agent permissions
- ✅ **Input Validation** dengan comprehensive sanitization
- ✅ **Rate Limiting** untuk API protection
- ✅ **CORS Configuration** dengan whitelist domains
- ✅ **SQL Injection Prevention** via ORM parameterized queries
- ✅ **Audit Logging** untuk compliance tracking

## 🕌 Islamic Compliance Features

### Financial Compliance
- ✅ **Riba-Free Transactions**: No interest-based financing
- ✅ **Mudharabah Contracts**: Profit-sharing agreements
- ✅ **Transparent Pricing**: No hidden fees atau charges
- ✅ **Halal Investment**: Shariah-compliant business practices

### Religious Features
- ✅ **Prayer Time Calculation**: Accurate prayer schedules
- ✅ **Qibla Direction**: GPS-based Kaaba direction
- ✅ **Islamic Calendar**: Hijri date system integration
- ✅ **Halal Certification**: Food dan accommodation tracking
- ✅ **Mahram Management**: Family relationship compliance

## 📈 Performance & Scalability

- ✅ **Database Optimization**: Indexed queries dan connection pooling
- ✅ **Caching Strategy**: Redis integration untuk session management
- ✅ **API Rate Limiting**: Protection dari abuse dan overload
- ✅ **Image Optimization**: Compressed uploads dan CDN ready
- ✅ **Background Jobs**: Queue system untuk heavy operations
- ✅ **Horizontal Scaling**: Microservice-ready architecture

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### Development Guidelines
- Follow TypeScript strict mode
- Use conventional commits
- Add tests for new features
- Update documentation
- Ensure Islamic compliance for religious features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- 📧 Email: support@travelhub.pro
- 📱 WhatsApp: +62 812 3456 7890
- 📖 Documentation: https://docs.travelhub.pro
- 🐛 Issues: https://github.com/travelhub-pro/issues

---

**Built with ❤️ for Indonesian Travel Industry**

*Empowering travel agencies with modern technology while respecting Islamic values and traditions.*