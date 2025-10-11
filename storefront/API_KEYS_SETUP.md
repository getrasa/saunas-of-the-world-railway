# API Keys Setup

## Frontend (.env.local)

```bash
# Google Places API for address autocomplete
NEXT_PUBLIC_GOOGLE_PLACES_API_KEY=your_google_places_api_key_here

# Stripe publishable key (starts with pk_)
NEXT_PUBLIC_STRIPE_KEY=pk_test_your_stripe_publishable_key_here
```

## Backend (MedusaJS)

Your backend needs the **Stripe Secret Key**:

```bash
# In your backend .env file
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
```

### Important:
- **Frontend uses**: `pk_test_...` (publishable key) - safe to expose
- **Backend uses**: `sk_test_...` (secret key) - NEVER expose this!

### Getting Stripe Keys:

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Navigate to: **Developers → API keys**
3. You'll see two keys:
   - **Publishable key** (`pk_test_...`) → Frontend
   - **Secret key** (`sk_test_...`) → Backend

### MedusaJS Stripe Plugin Configuration:

Make sure your backend's `medusa-config.js` has:

```javascript
const plugins = [
  // ... other plugins
  {
    resolve: "@medusajs/stripe",
    options: {
      api_key: process.env.STRIPE_SECRET_KEY, // Backend secret key
    },
  },
]
```

### Manual Payment Provider (for "Request Quote"):

Also ensure manual payment is enabled:

```javascript
{
  resolve: "@medusajs/manual",
  options: {},
}
```

---

**Quick Test:**
- Use test card: `4242 4242 4242 4242`
- Any future expiry date
- Any 3-digit CVC

