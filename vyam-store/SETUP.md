# VYAM Store — Go-Live Setup

The store is deployed and working in **demo mode**: browsing, cart and checkout all work,
but no payment is collected and orders aren't saved until you complete the two steps below.
Each step ends with adding keys to Vercel — the site picks them up automatically.

## 1. Supabase (order storage) — ~5 minutes, free

1. Go to https://supabase.com → Sign up → **New project** (name it `vyam-store`, region: Mumbai).
2. When it's ready, open **SQL Editor** → New query → paste the contents of `supabase/schema.sql` → **Run**.
3. Go to **Project Settings → API** and copy these two values:
   - Project URL  → this is `NEXT_PUBLIC_SUPABASE_URL`
   - `service_role` secret key → this is `SUPABASE_SERVICE_ROLE_KEY` (keep it secret)

## 2. Razorpay (payments) — test mode instant, live mode needs KYC

1. Go to https://razorpay.com → Sign up.
2. In the dashboard: **Settings → API Keys → Generate Test Key**. Copy:
   - Key ID     → `RAZORPAY_KEY_ID`
   - Key Secret → `RAZORPAY_KEY_SECRET`
3. Test-mode keys let you place orders with Razorpay's test cards (e.g. 4111 1111 1111 1111).
   When your KYC is approved, generate **Live** keys and replace the two values.

## 3. Add the keys to Vercel

1. Go to https://vercel.com → your project **vyam-store** → **Settings → Environment Variables**.
2. Add these four variables (Production environment):

   | Name | Value |
   |---|---|
   | `NEXT_PUBLIC_SUPABASE_URL` | from step 1 |
   | `SUPABASE_SERVICE_ROLE_KEY` | from step 1 |
   | `RAZORPAY_KEY_ID` | from step 2 |
   | `RAZORPAY_KEY_SECRET` | from step 2 |

3. Go to **Deployments** → ⋯ on the latest deployment → **Redeploy**.

That's it. Checkout now collects real payments and every order appears in
Supabase → Table Editor → `orders` (status `paid` once the payment is verified).

## Managing products

The catalog currently lives in `lib/catalog.js` (SMOD's five pod products with live prices from
buysmod.com, plus "coming soon" teasers for FYND, KHIND, RIWERS and Pet Care). To change
products or prices, edit that file and redeploy — or ask Claude to switch the app to read
products from the Supabase `products` table when you're ready to manage them in a dashboard.

## Custom domain

In Vercel → Settings → Domains you can attach `vyamretails.in` (or any domain you own).
