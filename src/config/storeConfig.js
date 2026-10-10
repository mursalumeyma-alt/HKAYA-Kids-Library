/**
 * HKAYA Kids Library - Central Store Configuration
 * 
 * All operational settings, contact placeholders, delivery rules,
 * and payment configs are centralized here so the store owner can
 * easily update them without touching component code.
 */

export const STORE_CONFIG = {
  brand: {
    name: "HKAYA",
    subName: "Kids Library",
    arabicName: "حكاية",
    tagline: "Little minds. Big dreams.",
    mission: "Hkaya is a warm, trusted children's library and learning store that helps parents discover quality books, Islamic learning resources, educational materials, stationery, toys, and meaningful gifts for children.",
    country: "Kenya",
    currency: "KSh",
    locationNotes: "Nairobi, Kenya", // General location context only
    establishedYear: 2026,
  },

  // Central contact points (configurable - clearly labeled placeholders)
  contacts: {
    whatsapp: {
      label: "WhatsApp Support",
      displayNumber: "Contact number to be configured",
      targetNumber: "", // Configured by store owner
      isConfigured: false,
      helpPrompt: "Hi Hkaya, I would like to inquire about children's books and learning resources."
    },
    email: {
      label: "Customer Care",
      address: "hello@hkayalibrary.co.ke",
      isConfigured: false
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

  // Payment methods & simulation flags
  payments: {
    mpesa: {
      id: "mpesa",
      label: "M-Pesa Express (Safaricom Daraja API)",
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
    isDemo: true,
    bannerText: "Production Architecture Active — Secure backend server, SQLite database, and Safaricom Daraja API connected (Sandbox/Setup Mode)."
  }
};
