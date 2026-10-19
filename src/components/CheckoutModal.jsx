import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useStore } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';
import { STORE_CONFIG } from '../config/storeConfig';
import { api } from '../services/api';
import {
  X,
  CheckCircle2,
  ShieldCheck,
  Truck,
  ArrowRight,
  ArrowLeft,
  Smartphone,
  CreditCard,
  AlertCircle,
  Loader2,
  Printer,
  Info
} from 'lucide-react';

export default function CheckoutModal() {
  const { isCheckoutOpen, setIsCheckoutOpen } = useStore();
  const { cartItems, subtotal, deliveryFee, grandTotal, clearCart } = useCart();
  const { user } = useAuth();

  const [step, setStep] = useState(1); // 1: Delivery Info, 2: Payment Method, 3: Order Result
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    county: STORE_CONFIG.delivery.supportedCounties[0],
    city: '',
    estate: '',
    notes: '',
    paymentMethod: 'mpesa' // 'mpesa' | 'card'
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [orderReceipt, setOrderReceipt] = useState(null);

  // M-Pesa STK Push polling states
  const [isWaitingForMpesa, setIsWaitingForMpesa] = useState(false);
  const [stkMessage, setStkMessage] = useState('');
  const [stkStatus, setStkStatus] = useState('initiating'); // 'initiating' | 'waiting' | 'confirmed' | 'failed'

  // Pre-fill user data if authenticated
  useEffect(() => {
    if (user && isCheckoutOpen) {
      setFormData(prev => ({
        ...prev,
        fullName: prev.fullName || user.name || '',
        email: prev.email || user.email || '',
        phone: prev.phone || user.phone || ''
      }));
    }
  }, [user, isCheckoutOpen]);

  if (!isCheckoutOpen) return null;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) {
      setErrorMsg('Please provide your full name, email, and Kenyan phone number.');
      return;
    }
    setErrorMsg(null);
    setStep(2);
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    setErrorMsg(null);

    try {
      // 1. Submit order to backend for zero-trust calculation & DB creation
      const orderPayload = {
        items: cartItems.map(item => ({
          productId: item.id,
          quantity: item.quantity
        })),
        customerName: formData.fullName,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        county: formData.county,
        deliveryAddress: `${formData.estate ? formData.estate + ', ' : ''}${formData.city || formData.county}`,
        notes: formData.notes,
        paymentMethod: formData.paymentMethod
      };

      const orderResponse = await api.orders.create(orderPayload);
      if (!orderResponse.success || !orderResponse.order) {
        throw new Error(orderResponse.error || 'Failed to create order on server.');
      }

      const createdOrder = orderResponse.order;

      // 2. Handle specific payment methods
      if (formData.paymentMethod === 'mpesa') {
        setIsWaitingForMpesa(true);
        setStkMessage('Connecting to Safaricom Daraja M-Pesa gateway...');

        const mpesaRes = await api.payments.initiateMpesa({
          orderId: createdOrder.id,
          phone: formData.phone
        });

        if (!mpesaRes.isConfigured) {
          // Transparent setup mode: Order is recorded in DB as pending
          setIsWaitingForMpesa(false);
          setOrderReceipt({
            order: createdOrder,
            paymentMode: 'mpesa_setup',
            setupNotice: mpesaRes.message,
            instructions: mpesaRes.instructions
          });
          clearCart();
          setStep(3);
          return;
        }

        // Real Daraja STK Push active: Poll payment status
        setStkStatus('waiting');
        setStkMessage(mpesaRes.customerMessage || 'Prompt sent to your phone. Please enter your M-Pesa PIN.');

        let attempts = 0;
        const maxAttempts = 15; // 45 seconds total

        const pollInterval = setInterval(async () => {
          attempts++;
          try {
            const statusRes = await api.payments.getStatus(createdOrder.id);
            if (statusRes.paymentStatus === 'paid') {
              clearInterval(pollInterval);
              setIsWaitingForMpesa(false);
              setStkStatus('confirmed');
              setOrderReceipt({
                order: { ...createdOrder, payment_status: 'paid', status: 'processing' },
                paymentMode: 'mpesa_paid',
                receiptNumber: statusRes.payment?.provider_reference || 'CONFIRMED'
              });
              clearCart();
              setStep(3);
            } else if (statusRes.paymentStatus === 'failed') {
              clearInterval(pollInterval);
              setIsWaitingForMpesa(false);
              setErrorMsg('M-Pesa payment was cancelled or failed. Your order has been saved and can be retried.');
            } else if (attempts >= maxAttempts) {
              clearInterval(pollInterval);
              setIsWaitingForMpesa(false);
              setOrderReceipt({
                order: createdOrder,
                paymentMode: 'mpesa_pending',
                setupNotice: 'Payment prompt timed out or is awaiting Safaricom callback. Your order is safely recorded.'
              });
              clearCart();
              setStep(3);
            }
          } catch (pollErr) {
            console.error('Error polling payment status:', pollErr);
          }
        }, 3000);

        return;
      } else if (formData.paymentMethod === 'card') {
        // Card payments in setup/testing mode
        setOrderReceipt({
          order: createdOrder,
          paymentMode: 'card_setup',
          setupNotice: 'Credit/Debit card payment gateway is in sandbox setup. Order has been securely registered in the backend.'
        });
        clearCart();
        setStep(3);
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setErrorMsg(err.message || 'An error occurred during order submission.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setStep(1);
    setIsWaitingForMpesa(false);
    setOrderReceipt(null);
    setErrorMsg(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-charcoal/60 backdrop-blur-xs transition-opacity"
        onClick={handleClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-cream-50 rounded-3xl shadow-2xl border border-sand-200 overflow-hidden z-10 flex flex-col my-auto max-h-[92vh]">
        {/* Top Header */}
        <div className="px-6 py-5 bg-white border-b border-sand-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-forest-100 text-forest-800 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-terracotta-600" />
            </div>
            <div>
              <h3 className="font-bold text-base text-forest-900">
                {step === 3 ? 'Order Status & Receipt' : 'HKAYA Secure Checkout'}
              </h3>
              <p className="text-[11px] text-charcoal-muted">
                {step === 1 && 'Step 1: Contact & Delivery Information'}
                {step === 2 && 'Step 2: Select Payment Method & Place Order'}
                {step === 3 && 'Step 3: Server Order Confirmation'}
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-2 rounded-xl text-charcoal-muted hover:text-charcoal hover:bg-sand-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto">
          {errorMsg && (
            <div className="mb-4 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* M-Pesa STK Waiting Overlay */}
          {isWaitingForMpesa && (
            <div className="p-8 text-center bg-white rounded-3xl border border-sand-200 shadow-soft space-y-4 my-4">
              <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto animate-pulse">
                <Smartphone className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-lg text-forest-900">M-Pesa STK Push in Progress</h4>
              <p className="text-xs text-charcoal-muted max-w-md mx-auto leading-relaxed">
                {stkMessage}
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sand-100 text-charcoal text-xs font-semibold">
                <Loader2 className="w-4 h-4 animate-spin text-terracotta-600" />
                <span>Awaiting Safaricom confirmation...</span>
              </div>
              <p className="text-[11px] text-charcoal-muted">
                Do not refresh or close this window. Enter your PIN on your phone screen when prompted.
              </p>
            </div>
          )}

          {/* STEP 1: Delivery Information */}
          {!isWaitingForMpesa && step === 1 && (
            <form onSubmit={handleProceedToPayment} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-forest-900 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="e.g. Amina Hassan"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-sand-300 text-xs text-charcoal focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-forest-900 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="amina@example.com"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-sand-300 text-xs text-charcoal focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-forest-900 mb-1">
                  Kenyan Mobile Number (for M-Pesa & Courier) *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="0712 345 678 or 254712345678"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-sand-300 text-xs text-charcoal focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                <div>
                  <label className="block text-xs font-bold text-forest-900 mb-1">
                    County *
                  </label>
                  <select
                    name="county"
                    value={formData.county}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-sand-300 text-xs text-charcoal focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                  >
                    {STORE_CONFIG.delivery.supportedCounties.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-forest-900 mb-1">
                    City / Town / Area *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="e.g. Westlands, Nairobi"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-sand-300 text-xs text-charcoal focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-forest-900 mb-1">
                  Estate, Apartment, or Delivery Landmark
                </label>
                <input
                  type="text"
                  name="estate"
                  value={formData.estate}
                  onChange={handleInputChange}
                  placeholder="e.g. Court 4, House 12B"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-sand-300 text-xs text-charcoal focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                />
              </div>

              {/* Order Summary Snapshot */}
              <div className="p-4 rounded-2xl bg-white border border-sand-200 mt-4 space-y-1.5 text-xs">
                <div className="flex justify-between text-charcoal-muted">
                  <span>Items Subtotal</span>
                  <span>KSh {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-charcoal-muted">
                  <span>Delivery Fee (Kenya)</span>
                  <span>{deliveryFee === 0 ? 'FREE' : `KSh ${deliveryFee.toLocaleString()}`}</span>
                </div>
                <div className="flex justify-between font-extrabold text-sm text-[#C2410C] pt-1.5 border-t border-sand-200">
                  <span>Estimated Total</span>
                  <span>KSh {grandTotal.toLocaleString()}</span>
                </div>
                <p className="text-[10px] text-charcoal-muted italic">
                  * Final pricing, stock availability, and delivery fees are verified securely by the backend server.
                </p>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-terracotta-600 hover:bg-terracotta-700 text-white font-bold text-sm shadow-soft transition-all flex items-center justify-center gap-2"
                >
                  <span>Continue to Payment Method</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Payment Method */}
          {!isWaitingForMpesa && step === 2 && (
            <div className="space-y-5">
              {/* Secure Payments Section */}
              <div className="p-4 rounded-2xl bg-white border border-sand-200 shadow-2xs space-y-2.5">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-[#F97316]" />
                      <span>Secure Payments</span>
                    </h4>
                    <p className="text-xs text-charcoal-muted mt-0.5">
                      We accept secure payment methods.
                    </p>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-full border border-emerald-200 shrink-0">
                    Encrypted & Secure
                  </span>
                </div>

                {/* Four Payment Logos in a neat, responsive row */}
                <div className="grid grid-cols-4 gap-2 sm:gap-2.5 pt-1">
                  {/* M-PESA */}
                  <div className="bg-[#FFF9F1] rounded-xl p-2 border border-sand-200 flex items-center justify-center h-11 sm:h-12 shadow-2xs hover:border-[#F97316]/50 transition-all">
                    <img
                      src="/images/reference/payment-mpesa.png"
                      alt="M-PESA"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  {/* Pesapal (Informational logo only) */}
                  <div className="bg-[#FFF9F1] rounded-xl p-2 border border-sand-200 flex items-center justify-center h-11 sm:h-12 shadow-2xs hover:border-[#F97316]/50 transition-all">
                    <img
                      src="/images/reference/payment-pesapal.png"
                      alt="Pesapal"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  {/* Visa */}
                  <div className="bg-[#FFF9F1] rounded-xl p-2 border border-sand-200 flex items-center justify-center h-11 sm:h-12 shadow-2xs hover:border-[#F97316]/50 transition-all">
                    <img
                      src="/images/reference/payment-visa.png"
                      alt="Visa"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  {/* Mastercard */}
                  <div className="bg-[#FFF9F1] rounded-xl p-2 border border-sand-200 flex items-center justify-center h-11 sm:h-12 shadow-2xs hover:border-[#F97316]/50 transition-all">
                    <img
                      src="/images/reference/payment-mastercard.png"
                      alt="Mastercard"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-cream-100 border border-sand-200 text-xs text-forest-900 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-terracotta-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">Secure Server-Side Payment Processing:</strong>
                  <span>
                    Your order total and inventory are calculated and reserved by our backend API. The browser never handles private credentials or M-Pesa PINs.
                  </span>
                </div>
              </div>

              {/* Payment Methods Options (Only M-PESA and Credit/Debit Card) */}
              <div className="space-y-2.5">
                {/* 1. M-Pesa Option */}
                <label
                  className={`p-4 rounded-2xl border flex items-start gap-3.5 cursor-pointer transition-all ${
                    formData.paymentMethod === 'mpesa'
                      ? 'bg-emerald-50/70 border-emerald-500 shadow-xs'
                      : 'bg-white border-sand-200 hover:border-sand-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="mpesa"
                    checked={formData.paymentMethod === 'mpesa'}
                    onChange={handleInputChange}
                    className="mt-1 text-emerald-600 focus:ring-emerald-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-forest-900 flex items-center gap-2">
                        <Smartphone className="w-4 h-4 text-emerald-600" />
                        <span>M-Pesa Express (Safaricom Daraja API)</span>
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-200 text-emerald-900 uppercase">
                        Official API
                      </span>
                    </div>
                    <p className="text-xs text-charcoal-muted mt-1 leading-relaxed">
                      Safaricom will prompt your phone (<strong>{formData.phone}</strong>) for your PIN directly on the official SIM toolkit / Safaricom prompt.
                    </p>
                  </div>
                </label>

                {/* 2. Credit / Debit Card Option */}
                <label
                  className={`p-4 rounded-2xl border flex items-start gap-3.5 cursor-pointer transition-all ${
                    formData.paymentMethod === 'card'
                      ? 'bg-blue-50/70 border-blue-500 shadow-xs'
                      : 'bg-white border-sand-200 hover:border-sand-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={handleInputChange}
                    className="mt-1 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-forest-900 flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-blue-600" />
                        <span>Credit / Debit Card (Visa, Mastercard)</span>
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-200 text-blue-900 uppercase">
                        PCI Tokenized
                      </span>
                    </div>
                    <p className="text-xs text-charcoal-muted mt-1">
                      Processed securely via hosted payment tokenization. HKAYA never stores raw card numbers or CVVs.
                    </p>
                  </div>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-5 py-3.5 rounded-2xl border border-sand-300 hover:bg-sand-100 text-xs font-bold text-charcoal"
                >
                  Back
                </button>

                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className="flex-1 py-4 rounded-2xl bg-forest-800 hover:bg-forest-900 text-gold-200 font-bold text-sm shadow-soft transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-gold-200" />
                      <span>Creating Order & Connecting Gateway...</span>
                    </>
                  ) : (
                    <>
                      <span>Place Order & Pay (KSh {grandTotal.toLocaleString()})</span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Real Server Order Confirmation */}
          {step === 3 && orderReceipt && (
            <div className="space-y-6 text-center">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-forest-800 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-emerald-600" />
              </div>

              <div>
                <h4 className="text-2xl font-display font-bold text-forest-900">
                  {orderReceipt.paymentMode === 'mpesa_paid'
                    ? 'Payment Confirmed & Order Registered!'
                    : 'Order Successfully Placed!'}
                </h4>
                <p className="text-xs text-charcoal-muted mt-1">
                  Thank you, {orderReceipt.order.customer_name}. Your order has been registered in our database.
                </p>
                <div className="inline-block mt-3 px-3 py-1 rounded-full bg-forest-100 text-forest-900 text-xs font-mono font-bold">
                  Order ID: {orderReceipt.order.id}
                </div>
              </div>

              {/* Setup Mode Notice if applicable */}
              {orderReceipt.setupNotice && (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-left text-xs text-amber-900 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-amber-950">
                    <Info className="w-4 h-4" />
                    <span>Payment Integration Notice:</span>
                  </div>
                  <p>{orderReceipt.setupNotice}</p>
                  {orderReceipt.instructions && (
                    <p className="text-[11px] font-mono text-amber-800 pt-1">{orderReceipt.instructions}</p>
                  )}
                </div>
              )}

              {/* Receipt Summary Box */}
              <div className="p-5 rounded-2xl bg-white border border-sand-200 text-left text-xs space-y-3">
                <div className="border-b border-sand-200 pb-2 flex justify-between">
                  <span className="text-charcoal-muted">Customer:</span>
                  <span className="font-bold text-charcoal">
                    {orderReceipt.order.customer_name} ({orderReceipt.order.customer_phone})
                  </span>
                </div>
                <div className="border-b border-sand-200 pb-2 flex justify-between">
                  <span className="text-charcoal-muted">Delivery Address:</span>
                  <span className="font-bold text-charcoal">
                    {orderReceipt.order.delivery_address}, {orderReceipt.order.county}
                  </span>
                </div>
                <div className="border-b border-sand-200 pb-2 flex justify-between">
                  <span className="text-charcoal-muted">Payment Status:</span>
                  <span className={`font-bold uppercase ${orderReceipt.order.payment_status === 'paid' ? 'text-emerald-700' : 'text-amber-700'}`}>
                    {orderReceipt.order.payment_status} ({orderReceipt.order.payment_method})
                  </span>
                </div>
                {orderReceipt.receiptNumber && (
                  <div className="border-b border-sand-200 pb-2 flex justify-between">
                    <span className="text-charcoal-muted">M-Pesa Receipt Code:</span>
                    <span className="font-mono font-bold text-forest-900">{orderReceipt.receiptNumber}</span>
                  </div>
                )}

                <div className="pt-1">
                  <p className="font-bold text-forest-900 mb-1">Purchased Items:</p>
                  <ul className="space-y-1">
                    {orderReceipt.order.items.map((it) => (
                      <li key={it.productId || it.id} className="flex justify-between text-charcoal-muted">
                        <span>{it.quantity}x {it.name}</span>
                        <span>KSh {(it.price * it.quantity).toLocaleString()}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-sand-200 pt-2 flex justify-between font-extrabold text-sm text-[#C2410C]">
                  <span>Server-Calculated Total:</span>
                  <span>KSh {orderReceipt.order.total.toLocaleString()}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 justify-center pt-2">
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl border border-sand-300 hover:bg-sand-100 text-xs font-bold text-charcoal"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Receipt</span>
                </button>

                <button
                  onClick={handleClose}
                  className="px-7 py-3 rounded-2xl bg-terracotta-600 hover:bg-terracotta-700 text-white text-xs font-bold shadow-soft"
                >
                  Return to Store
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
