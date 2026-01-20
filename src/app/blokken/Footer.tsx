"use client";
import React from 'react';
import { Instagram, Facebook } from 'lucide-react';

// Define the interface for a single navigation link
interface NavLink {
  name: string;
  href: string;
}

// Define the props interface for the Footer component
interface FooterProps {
  navLinks: NavLink[];
}

export default function Footer({ navLinks }: FooterProps) {
  const openingHours = [
    { d: "Ma", h: "09:00-14:00" }, 
    { d: "Di", h: "Gesloten" }, 
    { d: "Wo", h: "09:00-18:00" },
    { d: "Do", h: "09:00-18:00" }, 
    { d: "Vr", h: "08:30-18:00" }, 
    { d: "Za", h: "09:00-15:00" }, 
    { d: "Zo", h: "Gesloten" },
  ];

  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#2A3233] flex flex-col px-6 md:px-12 py-10 md:py-16 text-white relative z-0">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-10 md:gap-16 items-end mt-auto">
        <div className="space-y-10 md:space-y-16">
          <div className="flex gap-12 md:gap-24">
            <div>
              <p className="text-[12px] font-montserrat-black uppercase text-[#F0FFA0] mb-4 md:mb-8 tracking-widest">Sitemap</p>
              <div className="flex flex-col gap-3 md:gap-4 text-[14px] font-montserrat-black uppercase text-white">
                {navLinks.map((link: NavLink) => (
                  <button 
                    key={link.name} 
                    onClick={() => handleScroll(link.href)} 
                    className="hover:text-[#F0FFA0] text-left uppercase transition-colors text-[14px]"
                  >
                    {link.name}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[12px] font-montserrat-black uppercase text-[#F0FFA0] mb-4 md:mb-8 tracking-widest">Connect</p>
              <div className="flex flex-col gap-3 md:gap-4 text-[14px] font-montserrat-black uppercase text-white">
                <a href="#" className="flex items-center gap-2 hover:text-[#F0FFA0] transition-colors">
                  <Instagram size={14}/> Instagram
                </a>
                <a href="#" className="flex items-center gap-2 hover:text-[#F0FFA0] transition-colors">
                  <Facebook size={14}/> Facebook
                </a>
              </div>
            </div>
          </div>
          <div>
            <p className="text-[12px] font-montserrat-black uppercase text-[#F0FFA0] mb-4 md:mb-8 tracking-widest">Openingstijden</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-y-4 gap-x-6 text-[12px]">
              {openingHours.map((item, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="font-montserrat-black uppercase text-white">{item.d}</span>
                  <span className="font-raleway-regular uppercase text-white">{item.h}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start md:items-end text-left md:text-right border-t border-white/10 pt-8 md:border-none md:pt-0">
          <h2 className="text-[30px] md:text-[36px] lg:text-[16vw] font-montserrat-black text-[#F0FFA0] leading-[0.8] mb-6 md:mb-12 uppercase italic">JACK.</h2>
          <div className="text-[14px] md:text-[16px] uppercase tracking-widest font-montserrat-black text-white">
            <p>Vloeiweg 85, Oisterwijk</p>
            <a href="tel:0135211789" className="text-[#F0FFA0] block mt-2 hover:underline">013 521 1789</a>
            <p className="mt-4 md:mt-8 text-[12px] text-white/50 uppercase italic">© 2026 Kapsalon Jack Studio</p>
          </div>
        </div>
      </div>
    </footer>
  );
}