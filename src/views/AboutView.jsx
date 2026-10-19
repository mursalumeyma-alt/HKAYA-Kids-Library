import React from 'react';
import { useStore } from '../context/StoreContext';
import { STORE_CONFIG } from '../config/storeConfig';
import {
  BookOpen,
  Sparkles,
  HeartHandshake,
  Palette,
  Puzzle,
  ArrowRight,
  ChevronRight,
  Home,
  MessageCircle,
  Backpack,
  Utensils,
  Gift,
  School,
  Heart,
  Compass,
  CheckCircle2,
  Mail
} from 'lucide-react';

export default function AboutView() {
  const { navigateTo } = useStore();

  // 6 Core Shop Departments requested in Section 6
  const discoveryCategories = [
    {
      id: 'books-reading',
      name: "Books & Reading",
      arabic: "الكتب والقراءة",
      desc: "Storybooks, Islamic literature, early readers, activity books & bookmarks.",
      image: "/images/categories/books-reading.jpg",
      icon: BookOpen,
      color: "text-terracotta-700",
      bg: "bg-terracotta-50",
      border: "border-terracotta-200"
    },
    {
      id: 'stationery',
      name: "Stationery & Art Supplies",
      arabic: "الأدوات المدرسية ومستلزمات الرسم",
      desc: "Notebooks, ergonomic pens & pencils, pencil cases, crayons & art supplies.",
      image: "/images/categories/stationery.jpg",
      icon: Palette,
      color: "text-blue-700",
      bg: "bg-blue-50",
      border: "border-blue-200"
    },
    {
      id: 'school-bags',
      name: "School Bags",
      arabic: "الحقائب المدرسية",
      desc: "Preschool backpacks, primary school bags, book bags & pencil pouches.",
      image: "/images/categories/school-bags.jpg",
      icon: Backpack,
      color: "text-emerald-700",
      bg: "bg-emerald-50",
      border: "border-emerald-200"
    },
    {
      id: 'lunch-boxes-bottles',
      name: "Lunch Boxes & Bottles",
      arabic: "علب الطعام وزجاجات الماء",
      desc: "Bento lunch boxes, insulated lunch bags, snack cups & water bottles.",
      image: "/images/categories/lunch-boxes-bottles.jpg",
      icon: Utensils,
      color: "text-amber-700",
      bg: "bg-amber-50",
      border: "border-amber-200"
    },
    {
      id: 'educational-toys',
      name: "Educational Toys",
      arabic: "ألعاب تعليمية هادفة",
      desc: "Alphabet & number toys, puzzles, flashcards, building blocks & STEM sets.",
      image: "/images/categories/educational-toys.jpg",
      icon: Puzzle,
      color: "text-teal-700",
      bg: "bg-teal-50",
      border: "border-teal-200"
    },
    {
      id: 'gifts-accessories',
      name: "Gifts & Accessories",
      arabic: "هدايا وباقات مميزة",
      desc: "Children's gift sets, birthday hampers, Eid gifts & reading reward packs.",
      image: "/images/categories/gifts-accessories.jpg",
      icon: Gift,
      color: "text-purple-700",
      bg: "bg-purple-50",
      border: "border-purple-200"
    }
  ];

  // 4 Core Beliefs requested in Section 5
  const beliefs = [
    {
      title: "A Love of Reading",
      desc: "Encouraging children's curiosity and imagination through books and stories.",
      icon: BookOpen,
      accent: "bg-terracotta-100 text-terracotta-700 border-terracotta-200"
    },
    {
      title: "Learning Through Play",
      desc: "Supporting discovery and creativity with engaging educational materials.",
      icon: Puzzle,
      accent: "bg-sage-100 text-forest-800 border-sage-200"
    },
    {
      title: "Creativity Every Day",
      desc: "Bringing together stationery and art supplies that help children express their ideas.",
      icon: Palette,
      accent: "bg-amber-100 text-amber-800 border-amber-200"
    },
    {
      title: "Thoughtful Choices",
      desc: "Making it easier for parents, caregivers, and teachers to explore useful products for children.",
      icon: HeartHandshake,
      accent: "bg-teal-100 text-teal-800 border-teal-200"
    }
  ];

  // WhatsApp click handler
  const handleWhatsAppClick = () => {
    const phone = STORE_CONFIG.contacts.whatsapp.targetNumber.replace(/[^0-9]/g, '');
    const text = encodeURIComponent(STORE_CONFIG.contacts.whatsapp.helpPrompt || "Hi Hikaya, I would like to learn more about your books and learning essentials.");
    if (phone) {
      window.open(`https://wa.me/${phone}?text=${text}`, '_blank', 'noopener,noreferrer');
    } else {
      navigateTo('contact');
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF9F1] text-charcoal pb-16 sm:pb-24">
      {/* Breadcrumb Navigation */}
      <div className="bg-sand-100/70 border-b border-sand-200/80 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-charcoal-muted" aria-label="Breadcrumb">
            <button
              onClick={() => navigateTo('home')}
              className="flex items-center gap-1 hover:text-terracotta-600 transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
            <ChevronRight className="w-3 h-3 text-sand-300" />
            <span className="text-forest-900 font-bold">About Us</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 space-y-16 sm:space-y-24">
        
        {/* ========================================================================= */}
        {/* SECTION 2: HERO SECTION                                                   */}
        {/* ========================================================================= */}
        <section className="relative" aria-labelledby="about-hero-heading">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Headings & Intro */}
            <div className="lg:col-span-7 space-y-5 text-left">
              {/* Small Heading Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-terracotta-100/90 border border-terracotta-200/70 text-terracotta-800 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-terracotta-600" />
                <span>GET TO KNOW HIKAYA</span>
              </div>

              {/* Main Heading */}
              <h1
                id="about-hero-heading"
                className="text-3xl sm:text-5xl lg:text-5xl font-display font-semibold text-forest-900 tracking-tight leading-tight"
              >
                Little Minds.{' '}
                <span className="text-terracotta-600 block sm:inline">
                  Big Dreams.
                </span>
              </h1>

              {/* Sub-identity tag */}
              <p className="text-sm font-semibold text-forest-800 flex items-center gap-2">
                <span>{STORE_CONFIG.brand.name} {STORE_CONFIG.brand.subName}</span>
                <span className="px-2 py-0.5 rounded-md bg-sand-200 text-charcoal text-xs font-bold">
                  {STORE_CONFIG.brand.arabicName}
                </span>
                <span className="text-sand-300">•</span>
                <span className="text-charcoal-muted font-normal text-xs">Kenya</span>
              </p>

              {/* Description */}
              <p className="text-base sm:text-lg text-charcoal-light leading-relaxed max-w-2xl font-normal">
                “At Hikaya, we believe that every book opened, every idea explored, and every creative moment can inspire a child's journey of learning and discovery.”
              </p>

              {/* Action Button: Explore Our Categories */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => navigateTo('categories')}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-terracotta-600 hover:bg-terracotta-700 text-white font-bold text-sm shadow-sm hover:shadow-md transition-all active:scale-95 group"
                >
                  <span>Explore Our Categories</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => {
                    const el = document.getElementById('our-story-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-cream-100 hover:bg-sand-200/80 text-forest-900 font-bold text-sm border border-sand-200 transition-colors"
                >
                  <span>Read Our Story</span>
                </button>
              </div>
            </div>

            {/* Right Column: Hero Photograph with Modern Web Guidance LCP Fetchpriority */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-lg border border-sand-200 bg-sand-100 aspect-[4/3] group">
                <img
                  src="/images/about/about-hero.jpg"
                  alt="Children's books, stationery, and educational learning materials"
                  fetchPriority="high"
                  width="1200"
                  height="900"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Subtle Overlay Reassurance Chip */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-3 border border-sand-200/80 shadow-md flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-terracotta-600 animate-pulse" />
                    <span className="font-bold text-forest-900">Books & Learning Essentials</span>
                  </div>
                  <span className="text-charcoal-muted hidden sm:inline">Thoughtfully Selected</span>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* ========================================================================= */}
        {/* SECTION 3: OUR STORY                                                      */}
        {/* ========================================================================= */}
        <section id="our-story-section" className="scroll-mt-24" aria-labelledby="our-story-heading">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Visual Frame */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative rounded-3xl overflow-hidden shadow-md border border-sand-200 bg-sand-100 aspect-[4/3] group">
                <img
                  src="/images/about/about-story.jpg"
                  alt="Storytelling, reading, and childhood imagination with Hikaya"
                  loading="lazy"
                  width="1000"
                  height="750"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Decorative Pill */}
                <div className="absolute top-4 left-4 bg-forest-900/90 text-white backdrop-blur-md px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-xs">
                  <Heart className="w-3.5 h-3.5 text-terracotta-400" />
                  <span>The Story Behind Hikaya</span>
                </div>
              </div>

              {/* Meaning of Hikaya Accent Callout */}
              <div className="mt-4 p-4 rounded-2xl bg-sand-100 border border-sand-200/80 flex items-start gap-3 text-xs text-charcoal-muted">
                <div className="w-7 h-7 rounded-lg bg-terracotta-100 text-terracotta-700 flex items-center justify-center shrink-0 font-bold">
                  ح
                </div>
                <div>
                  <span className="font-bold text-forest-900 block mb-0.5">حكاية (Hikaya)</span>
                  <span>An Arabic word meaning story — celebrating the narratives, questions, and memories that shape growing minds.</span>
                </div>
              </div>
            </div>

            {/* Story Content */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-5">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-terracotta-700">
                <span className="w-1.5 h-1.5 rounded-full bg-terracotta-600" />
                <span>Our Heritage & Purpose</span>
              </div>

              <h2
                id="our-story-heading"
                className="text-2xl sm:text-4xl font-display font-bold text-forest-900 leading-tight"
              >
                The Story Behind Hikaya
              </h2>

              <div className="space-y-4 text-sm sm:text-base text-charcoal-light leading-relaxed">
                <p>
                  Hikaya, meaning ‘story’ in Arabic, reflects our love for stories, learning, and the imagination of young minds.
                </p>

                <p>
                  Hikaya Kids Library brings together children's books, stationery, school essentials, educational toys, and thoughtful gifts in one convenient place. We aim to make discovering useful and inspiring products easier for families and educators in Kenya.
                </p>

                <p>
                  From a child's first storybook to the tools they need for school, we want to help make learning feel exciting, creative, and full of possibility.
                </p>
              </div>

              {/* Supporting reassurance points without unverified claims */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-charcoal">
                <div className="p-3.5 rounded-2xl bg-white border border-sand-200/80 flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-forest-700 shrink-0" />
                  <span className="font-semibold text-forest-900">Thoughtfully selected items</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-sand-200/80 flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-terracotta-600 shrink-0" />
                  <span className="font-semibold text-forest-900">Convenient shopping for Kenya</span>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* ========================================================================= */}
        {/* SECTION 4: OUR MISSION                                                    */}
        {/* ========================================================================= */}
        <section aria-labelledby="our-mission-heading">
          <div className="rounded-3xl bg-gradient-to-br from-sage-50 via-cream-100 to-sage-50/70 border border-sage-200/90 p-8 sm:p-12 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Mission Text */}
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-900/10 text-forest-900 text-xs font-bold uppercase tracking-wider">
                  <Compass className="w-3.5 h-3.5 text-forest-700" />
                  <span>Our Guiding Purpose</span>
                </div>

                <h2
                  id="our-mission-heading"
                  className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-forest-900 leading-tight"
                >
                  Our Mission
                </h2>

                <blockquote className="text-lg sm:text-xl lg:text-2xl font-serif text-forest-900 italic font-medium leading-relaxed border-l-4 border-terracotta-600 pl-4 py-1">
                  “To make discovering children's books and learning essentials simple, enjoyable, and accessible for families and educators.”
                </blockquote>

                <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed pt-2">
                  We believe that parents and teachers should spend less time searching fragmented stores and more time nurturing a child's natural curiosity. Every collection at Hikaya is organized to make browsing easy, enjoyable, and rewarding.
                </p>
              </div>

              {/* Mission Photograph */}
              <div className="lg:col-span-5">
                <div className="rounded-2xl overflow-hidden shadow-md border border-sage-200 aspect-[4/3] bg-white group">
                  <img
                    src="/images/about/about-mission.jpg"
                    alt="Children discovering books and learning essentials"
                    loading="lazy"
                    width="1000"
                    height="750"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* ========================================================================= */}
        {/* SECTION 5: WHAT WE BELIEVE IN                                             */}
        {/* ========================================================================= */}
        <section aria-labelledby="beliefs-heading">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-terracotta-100 text-terracotta-800 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-terracotta-600" />
              <span>Core Principles</span>
            </div>

            <h2
              id="beliefs-heading"
              className="text-2xl sm:text-4xl font-display font-bold text-forest-900"
            >
              What We Believe In
            </h2>

            <p className="text-xs sm:text-sm text-charcoal-muted mt-2">
              Simple values that shape how we choose every storybook, pencil, backpack, and toy.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {beliefs.map((b, idx) => {
              const IconComponent = b.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-white border border-sand-200 shadow-soft hover:shadow-md transition-all flex flex-col justify-between group hover:-translate-y-1 duration-300"
                >
                  <div>
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 border ${b.accent} shadow-2xs`}>
                      <IconComponent className="w-6 h-6" />
                    </div>

                    <h3 className="font-bold text-base sm:text-lg text-forest-900 mb-2">
                      {b.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
                      {b.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>


        {/* ========================================================================= */}
        {/* SECTION 6: WHAT YOU CAN DISCOVER AT HIKAYA (6 IMAGE CARDS)                */}
        {/* ========================================================================= */}
        <section aria-labelledby="discover-heading">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sand-200 text-forest-900 text-xs font-bold uppercase tracking-wider mb-2">
                <Compass className="w-3.5 h-3.5 text-terracotta-600" />
                <span>Shop By Department</span>
              </div>

              <h2
                id="discover-heading"
                className="text-2xl sm:text-4xl font-display font-bold text-forest-900"
              >
                What You Can Discover at Hikaya
              </h2>

              <p className="text-xs sm:text-sm text-charcoal-muted mt-1.5 max-w-xl">
                Explore our main shopping categories designed to support every milestone of a child's learning journey.
              </p>
            </div>

            <button
              onClick={() => navigateTo('categories')}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-terracotta-700 hover:text-terracotta-800 transition-colors self-start md:self-end"
            >
              <span>View All Categories & Subcategories</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 6 Category Image Cards (Clickable, no prices or product grids) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {discoveryCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.id}
                  onClick={() => navigateTo('shop', { category: cat.id })}
                  className="group cursor-pointer rounded-3xl bg-white border border-sand-200/90 shadow-soft hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col hover:-translate-y-1"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      navigateTo('shop', { category: cat.id });
                    }
                  }}
                  aria-label={`Explore ${cat.name} category`}
                >
                  {/* Category Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-sand-100">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      loading="lazy"
                      width="600"
                      height="375"
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    />

                    {/* Gradient & Arabic Pill */}
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-xl text-[11px] font-bold text-forest-900 border border-sand-200/80 shadow-2xs">
                      {cat.arabic}
                    </div>

                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white text-xs font-bold drop-shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-terracotta-500" />
                      <span>Explore Department</span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-8 h-8 rounded-xl ${cat.bg} ${cat.color} flex items-center justify-center shrink-0`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-forest-900 group-hover:text-terracotta-600 transition-colors">
                          {cat.name}
                        </h3>
                      </div>

                      <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
                        {cat.desc}
                      </p>
                    </div>

                    {/* Footer link */}
                    <div className="pt-4 mt-4 border-t border-sand-100 flex items-center justify-between text-xs font-bold text-terracotta-600 group-hover:text-terracotta-700">
                      <span>Browse Products</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>


        {/* ========================================================================= */}
        {/* SECTION 7: WHO WE SERVE                                                   */}
        {/* ========================================================================= */}
        <section aria-labelledby="who-we-serve-heading">
          <div className="rounded-3xl bg-cream-100/90 border border-sand-200/90 p-8 sm:p-12 shadow-soft">
            <div className="max-w-3xl mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sand-200 text-charcoal-light text-xs font-bold uppercase tracking-wider mb-3">
                <Heart className="w-3.5 h-3.5 text-terracotta-600" />
                <span>Our Community</span>
              </div>

              <h2
                id="who-we-serve-heading"
                className="text-2xl sm:text-4xl font-display font-bold text-forest-900 leading-tight"
              >
                For Little Learners and the People Who Support Them
              </h2>

              <p className="text-sm sm:text-base text-charcoal-light leading-relaxed mt-4">
                “Whether you're a parent preparing for a new school term, a teacher looking for classroom essentials, or someone choosing a thoughtful gift, Hikaya is here to help you discover products that support children's learning, creativity, and everyday adventures.”
              </p>
            </div>

            {/* Three supportive audience cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="p-6 rounded-2xl bg-white border border-sand-200/80 shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-terracotta-100 text-terracotta-700 flex items-center justify-center mb-3">
                  <Heart className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-forest-900 mb-1.5">Parents & Caregivers</h3>
                <p className="text-xs text-charcoal-muted leading-relaxed">
                  Supporting everyday bedtime stories, early reading routines, and back-to-school preparation with trusted items.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-sand-200/80 shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-forest-100 text-forest-800 flex items-center justify-center mb-3">
                  <School className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-forest-900 mb-1.5">Teachers & Educators</h3>
                <p className="text-xs text-charcoal-muted leading-relaxed">
                  Equipping classrooms and early years centers with inspiring books, durable stationery, and hands-on learning resources.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-sand-200/80 shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-3">
                  <Gift className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-forest-900 mb-1.5">Thoughtful Gift Givers</h3>
                <p className="text-xs text-charcoal-muted leading-relaxed">
                  Choosing meaningful birthday presents, Eid gifts, and reading milestones that inspire curiosity long after the wrapping is opened.
                </p>
              </div>
            </div>
          </div>
        </section>


        {/* ========================================================================= */}
        {/* SECTION 8: A WARM CALL TO ACTION                                          */}
        {/* ========================================================================= */}
        <section aria-labelledby="cta-heading">
          <div className="rounded-3xl bg-forest-900 text-white p-8 sm:p-14 text-center max-w-5xl mx-auto border border-forest-800 shadow-xl relative overflow-hidden">
            {/* Subtle decorative background rings */}
            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-forest-800/40 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-terracotta-600/20 blur-2xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-800 text-gold-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                <span>Start Exploring</span>
              </div>

              <h2
                id="cta-heading"
                className="text-2xl sm:text-4xl font-display font-semibold text-white tracking-tight"
              >
                Every Little Discovery Begins Somewhere.
              </h2>

              <p className="text-sm sm:text-base text-cream-200/90 leading-relaxed font-normal">
                Explore books, creative supplies, and learning essentials thoughtfully gathered for growing minds.
              </p>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => navigateTo('categories')}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-terracotta-600 hover:bg-terracotta-700 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all active:scale-95 inline-flex items-center justify-center gap-2"
                >
                  <Compass className="w-4 h-4" />
                  <span>Explore Shop Categories</span>
                </button>

                <button
                  onClick={handleWhatsAppClick}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all active:scale-95 inline-flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </button>

                <button
                  onClick={() => navigateTo('contact')}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-forest-800 hover:bg-forest-700 text-sand-100 font-bold text-xs sm:text-sm border border-forest-700 transition-colors inline-flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>Get in Touch</span>
                </button>
              </div>

              <div className="pt-4 text-xs text-cream-200/60 flex items-center justify-center gap-4">
                <span>Hikaya حكاية</span>
                <span>•</span>
                <span>Little minds. Big dreams.</span>
                <span>•</span>
                <span>Nairobi, Kenya</span>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
