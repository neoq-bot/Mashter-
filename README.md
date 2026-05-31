# 🚀 AI Forex & Crypto Signal Scanner Pro

**Advanced AI-powered trading signal scanner for Forex & Cryptocurrency markets**

## 🎯 Features

✅ **AI Signal Engine** - Real-time trading signals using EMA, RSI, MACD, and breakout detection
✅ **Live Scanner Dashboard** - 6 major trading pairs (EUR/USD, GBP/USD, USD/JPY, USD/CAD, XAU/USD, BTC/USD)
✅ **Stripe Subscription System** - Pro plan with automatic billing
✅ **Admin Dashboard** - Secure user management (locked to admin email only)
✅ **Dark Terminal UI** - Professional trading interface with neon colors
✅ **Role-Based Access Control** - Whitelist, subscription, and plan-based access
✅ **Mobile Responsive** - Works on all devices

## 🔐 Security

- **Admin Lock**: Only `nmdakane860@gmail.com` can be admin
- **No Frontend Admin Creation**: Admin assigned only via database
- **Strict Role-Based Access**: User, Whitelist, Pro subscriber, or Admin
- **Secure Payment Processing**: Stripe webhook verification
- **No Role Escalation**: Impossible to promote from UI

## 🏗️ Tech Stack

- **Frontend**: Next.js 14, React, TailwindCSS
- **Backend**: Next.js API Routes, Node.js
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Payments**: Stripe
- **Hosting**: Vercel

## 📋 Setup Guide

### Prerequisites

```bash
Node.js 18+
npm or yarn
Supabase account
Stripe account
```

### Installation

```bash
# Clone repository
git clone https://github.com/neoq-bot/Mashter-.git
cd Mashter-

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local

# Run development server
npm run dev
```

### Database Setup

1. Create Supabase project
2. Run SQL migrations from `database/migrations.sql`
3. Enable Row Level Security (RLS)

### Admin Setup

Run in Supabase SQL editor:

```sql
update profiles
set is_admin = true
where email = 'nmdakane860@gmail.com';
```

## 📊 Signal Scoring System

| Factor | Score Impact |
|--------|---------------|
| EMA50 > EMA200 | +20 |
| RSI < 30 | +15 |
| MACD Bullish | +15 |
| Breakout | +20 |
| High Volatility | -10 |

**Final Signals:**
- ≥ 70 = **BUY** 🟢
- ≤ 30 = **SELL** 🔴
- 30-70 = **WAIT** 🟡

## 🔗 API Endpoints

- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/signals` - Get all trading signals
- `POST /api/admin/whitelist` - Toggle whitelist (admin only)
- `POST /api/admin/revoke` - Revoke user access (admin only)
- `POST /api/webhooks/stripe` - Stripe payment webhook

## 📁 Project Structure

```
Mashter-/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   ├── signals/
│   │   ├── admin/
│   │   └── webhooks/
│   ├── dashboard/
│   ├── admin/
│   ├── pricing/
│   └── layout.tsx
├── components/
│   ├── Scanner/
│   ├── SignalCard/
│   ├── AdminPanel/
│   └── Navigation/
├── lib/
│   ├── supabase.ts
│   ├── stripe.ts
│   ├── signals.ts
│   └── auth.ts
├── database/
│   └── migrations.sql
├── .env.example
├── next.config.js
├── tailwind.config.js
└── package.json
```

## 🚀 Deployment

Deploy to Vercel:

```bash
vercel
```

Set environment variables in Vercel dashboard.

## 📝 License

MIT License - See LICENSE file

## ⚠️ Disclaimer

This scanner provides signals based on technical analysis. Always conduct your own research before trading. Past performance does not guarantee future results.
