/**
 * Hikaya Kids Library - Official Store Policies Data
 * 
 * Centralized, authoritative policy content adhering to:
 * - Kenyan Consumer Protection Act, 2012
 * - Kenya Data Protection Act, 2019
 * - Safaricom Daraja API M-Pesa Integration Standards
 * 
 * Last updated: October 18, 2026
 */

export const POLICIES_METADATA = {
  lastUpdated: "October 18, 2026",
  jurisdiction: "Republic of Kenya",
  supportEmail: "hello@hkayalibrary.co.ke",
  supportPhone: "+254 793 477 288",
  currency: "Kenyan Shilling (KSh)"
};

export const POLICIES = [
  {
    id: "privacy",
    title: "Privacy Policy",
    shortTitle: "Privacy",
    icon: "ShieldCheck",
    summary: "How we collect, use, and protect your personal and payment details under the Kenya Data Protection Act, 2019.",
    sections: [
      {
        heading: "1. Information We Collect",
        content: `When you browse our catalog or place an order with Hikaya Kids Library, we may collect the following personal details strictly required to process your purchase and deliver your items:
• Full name and contact telephone number.
• Delivery address (physical address, estate, street, or landmark across Kenya).
• Email address for order receipts, dispatch tracking, and customer communications.
• Order history, item selections, and optional delivery instructions.
• Technical information including IP address, browser type, and device attributes used solely for security, session continuity, and site performance.`
      },
      {
        heading: "2. Why We Collect Your Information",
        content: `Your information is collected and processed for genuine business and operational purposes:
• Processing, packing, and dispatching your book and school supply orders.
• Coordinating accurate delivery with our in-house dispatch riders or contracted courier partners.
• Verifying and reconciling payments with Safaricom Daraja API or card processing gateways.
• Providing customer support, answering inquiries, and assisting with order updates.
• Meeting legal, accounting, and tax compliance obligations under Kenyan law.`
      },
      {
        heading: "3. How Information is Protected & Shared",
        content: `We implement administrative, technical, and physical safeguards to protect your personal information against unauthorized access, loss, or misuse:
• Restricted Access: Only authorized staff handling order packing and customer support have access to customer order details.
• Courier Partners: Necessary delivery details (name, phone number, and drop-off address) are shared with trusted courier partners (such as Fargo Courier, Wells Fargo, Speedaf, or vetted local Nairobi dispatch riders) solely to execute delivery.
• Zero Data Brokerage: We never sell, rent, monetize, or trade your personal information with third-party marketing brokers or advertising networks.
• Security Disclaimer: While we maintain industry-standard security practices, no electronic transmission over the internet or storage system can be guaranteed 100% impenetrable.`
      },
      {
        heading: "4. Third-Party Payment Processing",
        content: `Payment security is paramount:
• M-Pesa Payments: Processed directly through Safaricom Daraja API STK Push. When you check out, Safaricom sends an official prompt directly to your phone. You enter your PIN on Safaricom's encrypted prompt. Hikaya never requests, intercepts, views, or stores your M-Pesa PIN.
• Card Payments: Processed through certified PCI-DSS compliant tokenized payment gateways. Hikaya never sees or stores full payment card numbers or CVV codes on our servers.`
      },
      {
        heading: "5. Your Rights Under Kenyan Law",
        content: `Under the Kenya Data Protection Act, 2019, you have specific rights regarding your personal information:
• Right to be Informed: To know how your data is collected and used.
• Right of Access: To request confirmation and a copy of the personal data we hold about you.
• Right to Rectification: To update or correct any inaccurate, outdated, or incomplete details.
• Right to Deletion / Erasure: To request deletion of your personal data, subject to mandatory statutory tax and accounting retention periods.`
      },
      {
        heading: "6. Privacy Inquiries & Contact",
        content: `If you have questions, concerns, or requests regarding your personal information or this Privacy Policy, please contact our Data Protection desk:
• Email: hello@hkayalibrary.co.ke
• WhatsApp / Telephone: +254 793 477 288
• Location: Nairobi, Kenya`
      }
    ]
  },

  {
    id: "terms",
    title: "Terms & Conditions",
    shortTitle: "Terms",
    icon: "FileText",
    summary: "The clear terms of service governing your orders, catalog accuracy, and customer relationship with Hikaya.",
    sections: [
      {
        heading: "1. Placing an Order",
        content: `Customers place orders by browsing our catalog, adding items to the digital shopping cart, and providing accurate delivery and contact information at checkout.
• By clicking "Place Order" and completing payment, you make an offer to purchase the selected items under these terms.
• An order is formally confirmed once your payment has been verified by our backend server and an official Hikaya Order Number (e.g. HKY-XXXXXX) is generated.`
      },
      {
        heading: "2. Product Availability & Catalog Accuracy",
        content: `We strive to provide accurate photographs, book titles, author details, age suitability guidelines, and product descriptions for all children's books, school bags, stationery, lunch boxes, and toys.
• Stock counts are maintained in real-time in our database. In rare circumstances where an item becomes unavailable after order placement due to concurrent purchases, our team will promptly reach out to offer an immediate replacement, restock notification, or full refund.
• Minor variations in manufacturer packaging, cover artwork editions, or color shades may occur.`
      },
      {
        heading: "3. Pricing & Currency",
        content: `• All prices and delivery fees are displayed and charged in Kenyan Shillings (KSh).
• The total price, including applicable delivery fees, is clearly itemized in the cart and checkout modal before payment is authorized.
• Product prices are validated by our server against the database before initiating payment prompts, protecting customers from checkout calculation errors.`
      },
      {
        heading: "4. Order Modifications & Cancellations",
        content: `• If you need to modify your delivery address or contact number, please contact us immediately via WhatsApp or email with your Order Number.
• Cancellations can be accommodated if requested before your package has been handed over to the dispatch rider or courier. Once dispatched, standard delivery procedures apply.`
      },
      {
        heading: "5. Customer Complaints & Applicable Law",
        content: `• Hikaya is dedicated to amicable, customer-first resolution of any concerns. You can submit complaints through our Contact Us page, email, or WhatsApp.
• These terms and all transactions are governed by the laws of the Republic of Kenya, including the Consumer Protection Act, 2012. Nothing in these terms excludes or limits statutory rights guaranteed to consumers by Kenyan law.`
      }
    ]
  },

  {
    id: "shipping",
    title: "Shipping Policy",
    shortTitle: "Shipping Policy",
    icon: "Truck",
    summary: "We deliver across East Africa with same-day, next-day, and 2–3 day dispatch options.",
    sections: [
      {
        heading: "🚚 Shipping Policy",
        content: `We deliver across East Africa.

• Same-day delivery: In Mombasa and Nairobi for orders placed before 3:00 PM.
• Next-day delivery: For countrywide orders placed after 3:00 PM.
• 2–3 day delivery: For areas outside Nairobi and Mombasa.

You'll receive a confirmation once your order is out for delivery.

Shipping cost is calculated at checkout, and free pickup is available from our physical store.`
      }
    ]
  },

  {
    id: "returns",
    title: "Exchange Policy",
    shortTitle: "Exchange Policy",
    icon: "RotateCcw",
    summary: "We accept exchanges within 72 hours of delivery for unused items in original packaging.",
    sections: [
      {
        heading: "🔁 Exchange Policy",
        content: `We accept exchanges within 72 hours of delivery.

Items must be:
• Unused.
• In their original condition and packaging.

We do not offer refunds, but we're happy to assist with an exchange.

To request an exchange, contact us via WhatsApp:
WhatsApp: 0793 477 288
Link: https://wa.me/254793477288`
      }
    ]
  },

  {
    id: "payments",
    title: "Payment Options",
    shortTitle: "Payment Options",
    icon: "CreditCard",
    summary: "We accept secure payment methods: M-PESA, Pesapal, Visa, and Mastercard.",
    sections: [
      {
        heading: "💳 Payment Options",
        content: `We accept the following secure payment methods:

• M-PESA
• Pesapal
• Visa
• Mastercard

All online transactions are encrypted and processed through official authorized payment gateways. We preserve customer payment security and never store payment card details or mobile money PINs on our servers.`
      }
    ]
  }
];

export const getPolicyById = (id) => {
  return POLICIES.find(p => p.id === id) || POLICIES[0];
};
