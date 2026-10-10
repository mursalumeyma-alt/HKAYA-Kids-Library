import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import {
  Download,
  FileText,
  Printer,
  Sparkles,
  ShoppingBag,
  CheckCircle,
  Eye,
  FileCheck
} from 'lucide-react';

export default function DigitalResourcesView() {
  const { openProductModal } = useStore();
  const { addToCart } = useCart();
  const [downloadSuccessModal, setDownloadSuccessModal] = useState(null);

  const digitalProducts = PRODUCTS.filter(p => p.isDigital);

  const handleSimulateDownload = (product) => {
    setDownloadSuccessModal(product);
  };

  return (
    <div className="py-10 sm:py-16 bg-cream-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Download className="w-3.5 h-3.5 text-sky-600" />
            <span>Instant Educational Downloads</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-display font-semibold text-forest-900 tracking-tight">
            Learning Beyond the Bookshelf
          </h1>

          <p className="text-sm sm:text-base text-charcoal-muted mt-3 leading-relaxed font-light">
            Printable worksheets, Islamic activity packs, Arabic learning resources, coloring pages, and educational flashcard packs ready for immediate home printing.
          </p>
        </div>

        {/* Value Prop Banner */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-sand-200 shadow-soft mb-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-700 flex items-center justify-center shrink-0">
              <Download className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-forest-900">Instant Access</h4>
              <p className="text-xs text-charcoal-muted mt-0.5">Download immediately upon order completion.</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <Printer className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-forest-900">Print Unlimited Times</h4>
              <p className="text-xs text-charcoal-muted mt-0.5">Perfect for repeat practice and siblings.</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
              <FileCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-forest-900">High-Res A4 & Letter</h4>
              <p className="text-xs text-charcoal-muted mt-0.5">Crisp typography designed for standard printers.</p>
            </div>
          </div>
        </div>

        {/* Digital Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {digitalProducts.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl bg-white border border-sand-200 overflow-hidden shadow-soft hover:shadow-soft-hover transition-all flex flex-col justify-between"
            >
              <div
                className="relative aspect-[4/3] bg-sand-100 overflow-hidden cursor-pointer"
                onClick={() => openProductModal(item)}
              >
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-sky-700 text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-xl shadow-xs">
                  DIGITAL DOWNLOAD
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-charcoal-muted mb-1.5">
                    <span className="font-bold text-sky-800">Printable PDF</span>
                    <span className="px-2 py-0.5 rounded bg-sand-200 font-medium">{item.ageRange}</span>
                  </div>

                  <h3
                    onClick={() => openProductModal(item)}
                    className="font-bold text-lg text-forest-900 hover:text-terracotta-600 transition-colors cursor-pointer"
                  >
                    {item.name}
                  </h3>

                  <p className="text-xs text-charcoal-muted mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-sand-200 flex items-center justify-between gap-3">
                  <span className="text-xl font-extrabold text-forest-900 font-sans">
                    KSh {item.price.toLocaleString()}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleSimulateDownload(item)}
                      className="px-3.5 py-2.5 rounded-xl border border-sand-300 hover:bg-sand-100 text-xs font-bold text-charcoal flex items-center gap-1.5"
                      title="Sample preview download"
                    >
                      <Eye className="w-3.5 h-3.5 text-sky-600" />
                      <span>Preview</span>
                    </button>

                    <button
                      onClick={() => addToCart(item, 1)}
                      className="px-4 py-2.5 rounded-xl bg-terracotta-600 hover:bg-terracotta-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-soft"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Get PDF</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Download Sample Simulator Modal */}
      {downloadSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-charcoal/60 backdrop-blur-xs"
            onClick={() => setDownloadSuccessModal(null)}
          />
          <div className="relative bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl z-10 text-center">
            <div className="w-14 h-14 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center mx-auto mb-3">
              <Download className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-lg text-forest-900">
              Sample Preview Ready!
            </h3>
            <p className="text-xs text-charcoal-muted mt-1">
              "{downloadSuccessModal.name}"
            </p>
            <div className="p-4 rounded-2xl bg-cream-50 border border-sand-200 my-4 text-xs text-charcoal-light leading-relaxed">
              In this prototype demonstration, digital packs deliver high-resolution printable PDFs immediately after checkout.
            </div>
            <button
              onClick={() => setDownloadSuccessModal(null)}
              className="w-full py-3 rounded-2xl bg-forest-800 text-white text-xs font-bold hover:bg-forest-900"
            >
              Close Preview
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
