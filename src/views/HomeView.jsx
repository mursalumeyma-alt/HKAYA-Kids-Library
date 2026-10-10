import React from 'react';
import Hero from '../components/Hero';
import ShopByAge from '../components/ShopByAge';
import ShopByCategory from '../components/ShopByCategory';
import NewArrivalsSection from '../components/NewArrivalsSection';
import BestSellersSection from '../components/BestSellersSection';
import FeaturedCollections from '../components/FeaturedCollections';
import CustomerCareSection from '../components/CustomerCareSection';
import WhyHkaya from '../components/WhyHkaya';
import LearningStages from '../components/LearningStages';
import ReadingCorner from '../components/ReadingCorner';
import CustomerReviews from '../components/CustomerReviews';
import OrderReadyCTA from '../components/OrderReadyCTA';
import Newsletter from '../components/Newsletter';

export default function HomeView() {
  return (
    <div className="space-y-0">
      {/* 1. Hero Section with Prominent Children Reading Visuals */}
      <Hero />

      {/* 2. Shop by Age Cards (0-2, 3-5, 6-8, 9-12, 13+) */}
      <ShopByAge />

      {/* 3. Shop by Category Grid (All 11 Categories with dedicated products) */}
      <ShopByCategory />

      {/* 4. New Arrivals Showcase */}
      <NewArrivalsSection />

      {/* 5. Best Sellers Showcase */}
      <BestSellersSection />

      {/* 6. Featured Editorial Collections (Islamic Learning & Hands-on Discovery) */}
      <FeaturedCollections />

      {/* 7. Customer Care Section (Secure Payments & Shop With Confidence) */}
      <CustomerCareSection />

      {/* 8. Why HKAYA Trust Pillars */}
      <WhyHkaya />

      {/* 9. Quick Learning Stage Discovery Pills */}
      <LearningStages />

      {/* 10. Reading Corner / Parenting Articles Preview */}
      <ReadingCorner />

      {/* 11. Customer Reviews (Transparently labeled demo / honest state) */}
      <CustomerReviews />

      {/* 12. Strong Order-Ready CTA */}
      <OrderReadyCTA />

      {/* 13. Family Newsletter */}
      <Newsletter />
    </div>
  );
}
