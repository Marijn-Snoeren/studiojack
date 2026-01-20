"use client";
import React, { useState, useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

// Importeer alle blokken
import Header from './blokken/Header';
import Hero from './blokken/Hero';
import MenuSection from './blokken/Menu';
import Gallery from './blokken/Gallery';
import Focus from './blokken/Focus';
import Reviews from './blokken/Reviews';
import CTA from './blokken/CTA';
import Footer from './blokken/Footer';

export default function KapsalonJackFinal() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [footerHeight, setFooterHeight] = useState(0);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [isHeroHidden, setIsHeroHidden] = useState(false);
  
  const footerRef = useRef<HTMLElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);

  // --- Smooth Momentum Scroll (Lenis) ---
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    } as any);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Meet de hoogte van de footer voor het reveal effect
  useEffect(() => {
    const updateFooterHeight = () => {
      if (footerRef.current) {
        setFooterHeight(footerRef.current.offsetHeight);
      }
    };

    updateFooterHeight();
    const timer = setTimeout(updateFooterHeight, 800);

    window.addEventListener("resize", updateFooterHeight);
    return () => {
      window.removeEventListener("resize", updateFooterHeight);
      clearTimeout(timer);
    };
  }, []);

  // Scroll detectie
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);

      // Verberg Hero als we voorbij de eerste viewport zijn om conflicten met footer te voorkomen
      setIsHeroHidden(scrollY > window.innerHeight * 1.5);

      if (mainContentRef.current) {
        const rect = mainContentRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        // Check of we bij de footer zijn
        setIsFooterVisible(rect.bottom <= windowHeight + 100);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Diensten", href: "#menu" },
    { name: "Gallerij", href: "#gallery" },
    { name: "Over Jack", href: "#focus" },
    { name: "Reviews", href: "#reviews" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <div className="bg-[#2A3233] text-white min-h-dvh selection:bg-[#F0FFA0] selection:text-[#2A3233] font-raleway-regular antialiased overflow-x-clip">      
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@900&family=Raleway:wght@400&display=swap');
        .font-montserrat-black { font-family: 'Montserrat', sans-serif; font-weight: 900; }
        .font-raleway-regular { font-family: 'Raleway', sans-serif; font-weight: 400; }
        
        button, a, .cursor-pointer { cursor: pointer !important; }
        html, body { overscroll-behavior: none; }
        html.lenis { height: auto; }
        .lenis.lenis-smooth { scroll-behavior: auto !important; }
        html { scrollbar-width: none; }
        ::-webkit-scrollbar { display: none; }
        
        @keyframes scroll-left { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes scroll-right { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
        .animate-scroll-left { animation: scroll-left 50s linear infinite; }
        .animate-scroll-right { animation: scroll-right 50s linear infinite; }
      `}</style>

      <Header 
        isScrolled={isScrolled} 
        navLinks={navLinks} 
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen} 
        setIsBookingOpen={setIsBookingOpen}
        hide={isFooterVisible}
      />

      {/* 1. STICKY HERO (Z-index 5: tussen footer en main content) */}
      <div 
        className={`fixed top-0 left-0 w-full h-dvh z-[5] transition-opacity duration-300 ${isHeroHidden ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <Hero />
      </div>

      {/* 2. MAIN CONTENT (Z-index 20: bovenop alles) */}
      <div 
        ref={mainContentRef}
        className="relative z-[20] bg-[#2A3233]" 
        style={{ 
          marginTop: '100dvh',
          marginBottom: `${footerHeight}px`
        }}
      >
        <main>
          <section id="menu"><MenuSection /></section>
          <section id="gallery"><Gallery /></section>
          <section id="focus"><Focus /></section>
          <section id="reviews"><Reviews /></section>
          <section id="contact">
            <CTA setIsBookingOpen={setIsBookingOpen} />
          </section>
        </main>
      </div>

      {/* 3. FIXED FOOTER (Z-index 0: Helemaal onderop) */}
      <footer 
        ref={footerRef}
        className="fixed bottom-0 left-0 w-full z-0"
      >
        <Footer navLinks={navLinks} />
      </footer>
    </div>
  );
}