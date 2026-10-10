/**
 * HKAYA Kids Library - Payment Service Adapter
 * 
 * Provides simulated payment handling for the front-end prototype.
 * Designed using the adapter pattern so a future backend with Safaricom Daraja API
 * or payment gateway (Paystack/Stripe/Pesapal) can replace the mock handlers
 * without modifying UI components.
 */

export const PaymentService = {
  /**
   * Initiates simulated M-Pesa checkout
   * @param {Object} details - { phoneNumber, amount, orderRef, customerName }
   * @returns {Promise<Object>} - Simulation response with transaction ID
   */
  async initiateMpesaSimulation(details) {
    const cleanPhone = details.phoneNumber.replace(/\s+/g, "");
    
    // Validate Kenyan phone format roughly: starts with 07, 01, 2547, +2547
    const isValidKenyanPhone = /^(?:(?:\+254)|(?:254)|0)?([17]\d{8})$/.test(cleanPhone);
    if (!isValidKenyanPhone) {
      throw new Error("Please enter a valid Kenyan mobile number (e.g. 0712 345 678 or 254712345678).");
    }

    // Simulate network delay for realistic front-end demonstration
    await new Promise((resolve) => setTimeout(resolve, 800));

    const mockReceipt = "SIM-" + Math.random().toString(36).substring(2, 9).toUpperCase();

    return {
      success: true,
      mode: "DEMO_SIMULATION",
      method: "mpesa",
      simulatedTransactionId: mockReceipt,
      amountKsh: details.amount,
      phoneFormatted: cleanPhone,
      timestamp: new Date().toISOString(),
      statusMessage: "Simulated payment request processed successfully (Demo Mode)."
    };
  },

  /**
   * Initiates simulated Card payment
   */
  async initiateCardSimulation(cardDetails) {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return {
      success: true,
      mode: "DEMO_SIMULATION",
      method: "card",
      simulatedTransactionId: "CARD-" + Math.random().toString(36).substring(2, 9).toUpperCase(),
      timestamp: new Date().toISOString()
    };
  }
};
