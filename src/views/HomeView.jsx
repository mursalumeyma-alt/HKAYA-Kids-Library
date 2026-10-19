import React from 'react';
import Hero from '../components/Hero';
import ShopByCategory from '../components/ShopByCategory';
import AboutHikayaSpotlight from '../components/AboutHikayaSpotlight';

/**
 * Hikaya Kids Library - Homepage
 * 
 * Accurately structured according to the reference homepage mockup:
 * 1. Hero Section (Hero.jsx)
 *    - "Welcome to Hikaya Kids Library"
 *    - "Little Minds. Big Dreams."
 *    - Supporting copy & "Shop Now →" button
 *    - Real hero photo of children reading
 * 2. Shop by Category Section (ShopByCategory.jsx)
 *    - 7 clean category cards with genuine product photos & orange circular arrow buttons
 * 3. About Hikaya Spotlight Section (AboutHikayaSpotlight.jsx)
 *    - 3-part layout: Read/Learn/Grow books photo, About Hikaya story & Learn More button, Better Readers Brighter Futures badge
 */
export default function HomeView() {
  return (
    <div className="space-y-0">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Shop by Category Grid (7 Main Categories) */}
      <ShopByCategory />

      {/* 3. About Hikaya Spotlight Banner */}
      <AboutHikayaSpotlight />
    </div>
  );
}
