/**
 * HKAYA Kids Library - Central Store Configuration
 * 
 * All operational settings, business contact points, social media profiles,
 * delivery rules, and payment configurations are centralized here so the
 * store owner can easily update them in one place.
 * 
 * SECURITY NOTICE: Never store M-Pesa PINs, secret passkeys, or private API keys
 * in this public frontend configuration. Sensitive Daraja credentials belong strictly
 * in server environment variables (server/.env).
 */

export const STORE_CONFIG = {
  brand: {
    name: "Hikaya",
    subName: "Kids Library",
    arabicName: "حكاية",
    tagline: "Little minds. Big dreams.",
    mission: "Hikaya is a warm, trusted children's library and learning store that helps parents discover quality books, stationery, school bags, lunch boxes, educational toys, and meaningful gifts for children in Kenya.",
    country: "Kenya",
    currency: "KSh",
    locationNotes: "Nairobi, Kenya", // General location context
    establishedYear: 2026,
  },

  // Central business contact details
  contacts: {
    email: {
      label: "Business Email",
      address: "hello@hkayalibrary.co.ke",
      isConfigured: true
    },
    phone: {
      label: "Business Phone",
      displayNumber: "+254 793 477 288",
      rawNumber: "+254793477288",
      isConfigured: true // Set to false to hide phone links when unavailable
    },
    whatsapp: {
      label: "WhatsApp Support",
      displayNumber: "+254 793 477 288",
      targetNumber: "254793477288", // Confirmed official WhatsApp number: https://wa.me/254793477288
      isConfigured: true,
      helpPrompt: "Assalamu Alaikum! I would like to enquire about products from Hikaya Kids Library."
    },
    supportHours: {
      label: "Customer Support Hours",
      days: "Monday – Saturday",
      hours: "8:30 AM – 6:00 PM EAT",
      isConfirmed: false // Only displayed if confirmed per store policies
    }
  },

  // Social media profiles (Instagram and TikTok)
  // Social media profiles (Instagram and TikTok)
  // Official HKAYA Kids Library social accounts
  social: {
    instagram: {
      platform: "Instagram",
      label: "Follow HKAYA Kids Library on Instagram",
      tooltip: "Follow us on Instagram",
      handle: "@hkaya_kids_library",
      url: "https://www.instagram.com/hkaya_kids_library/",
      isConfigured: true
    },
    tiktok: {
      platform: "TikTok",
      label: "Follow HKAYA Kids Library on TikTok",
      tooltip: "Follow us on TikTok",
      handle: "@hkaya_kids_library",
      url: "https://www.tiktok.com/@hkaya_kids_library",
      isConfigured: true
    }
  },

  // Payment configuration (safe frontend display details only)
  payments: {
    mpesaPaymentMethod: "Safaricom Daraja STK Push",
    mpesaTillNumber: null, // Daraja API uses STK Push via Paybill/Till shortcode, not manual till entry
    mpesaPaybillNumber: null,
    mpesa: {
      id: "mpesa",
      label: "M-Pesa Express (Safaricom Daraja API)",
      mpesaPaymentMethod: "Safaricom Daraja STK Push",
      description: "Official Safaricom Daraja STK Push integration. PIN entered securely on your phone's official Safaricom prompt.",
      enabled: true,
      isSimulation: false,
      badgeText: "Safaricom Daraja"
    },
    card: {
      id: "card",
      label: "Credit / Debit Card",
      description: "PCI-compliant tokenized payment gateway. HKAYA never stores raw card credentials.",
      enabled: true,
      isSimulation: false,
      badgeText: "PCI Tokenized"
    }
  },

  // Delivery rules & East Africa delivery
  delivery: {
    freeDeliveryThreshold: 20000, // Free delivery on orders above KSh 20,000
    standardFee: 350,
    supportedCounties: [
      "Nairobi",
      "Mombasa",
      "Kiambu",
      "Nakuru",
      "Machakos",
      "Kisumu",
      "Uasin Gishu (Eldoret)",
      "Kilifi",
      "Kajiado",
      "Nyeri",
      "Meru",
      "Other Kenyan County"
    ],
    dispatchNotice: "Orders are prepared with care and dispatched across East Africa."
  },

  // Newsletter settings (configurable - discount disabled by default)
  newsletter: {
    title: "Join the Hkaya Family",
    subtitle: "Get new book recommendations, learning ideas and special offers.",
    discountEnabled: false
  },

  // Policies & disclosures (HKAYA does not offer returns)
  policies: {
    returns: "HKAYA does not offer returns. All products are thoroughly inspected for quality before delivery.",
    paymentDisclaimer: "Production architecture: Orders recorded in SQLite database. Safaricom M-Pesa gateway in setup/sandbox mode."
  },

  // Environment notice
  prototype: {
    isDemo: false,
    bannerText: "Production Architecture Active — Secure backend server, SQLite database, and Safaricom Daraja API connected (Sandbox/Setup Mode)."
  }
};

// Convenience helpers & placeholders for social and contact URLs
export const whatsappNumber = STORE_CONFIG.contacts.whatsapp.targetNumber;
export const whatsappUrl = `https://wa.me/${STORE_CONFIG.contacts.whatsapp.targetNumber}?text=${encodeURIComponent(STORE_CONFIG.contacts.whatsapp.helpPrompt)}`;
export const instagramUrl = STORE_CONFIG.social.instagram.url;
export const tiktokUrl = STORE_CONFIG.social.tiktok.url;

