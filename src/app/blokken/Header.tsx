"use client";
import React from 'react';
import { Phone, Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

// --- Interfaces ---
interface NavLink {
  name: string;
  href: string;
}

interface HeaderProps {
  isScrolled: boolean;
  navLinks: NavLink[];
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  setIsBookingOpen: (open: boolean) => void;
  hide: boolean;
}

export default function Header({ 
  isScrolled, 
  navLinks, 
  mobileMenuOpen, 
  setMobileMenuOpen, 
  setIsBookingOpen,
  hide 
}: HeaderProps) {
  
  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);

    if (href === '#afspraak') {
      setIsBookingOpen(true);
      return;
    }

    const element = document.querySelector(href);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const menuLinkVariants: Variants = {
    hidden: { x: -20, opacity: 0 },
    visible: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: 0.1 + i * 0.1,
        duration: 0.5,
        ease: [0.215, 0.61, 0.355, 1],
      },
    }),
  };

  return (
    <>
      <header className={`fixed left-0 w-full z-110 transition-all duration-700 ease-in-out flex justify-center 
        ${isScrolled ? "top-3 md:top-6 px-4" : "top-0 px-0"}
        ${hide ? "-translate-y-full opacity-0 pointer-events-none" : "translate-y-0 opacity-100"}`}>
        
        <motion.nav 
          layout
          initial={{ y: "-100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ 
            duration: 1.5, 
            delay: 1.5,
            ease: [0.16, 1, 0.3, 1] 
          }}
          className={`transition-all duration-700 ease-in-out flex justify-between items-center ${
            isScrolled 
              ? "w-full max-w-[1280px] px-5 md:px-8 py-2.5 md:py-4 bg-[#2A3233]/95 backdrop-blur-md border border-[#F0FFA0]/20 rounded-3xl md:rounded-4xl shadow-2xl" 
              : "w-full max-w-full px-6 md:px-8 py-5 md:py-8 bg-transparent border-b border-white/10"
          }`}
        >
          
          <div className="flex items-center gap-16">
            <motion.div 
              whileHover={{ color: "#ffffff" }}
              className="text-[20px] md:text-[28px] font-montserrat-black uppercase text-[#F0FFA0] tracking-tighter cursor-pointer leading-none transition-colors" 
              onClick={() => window.scrollTo({top:0, behavior:'smooth'})}
            >
              JACK.
            </motion.div>
            
            <div className="hidden lg:flex gap-10">
              {navLinks.map((link) => (
                <button 
                  key={link.name} 
                  onClick={() => handleNavClick(link.href)} 
                  className="text-white hover:text-[#F0FFA0] hover:italic transition-all text-[13px] font-montserrat-black uppercase tracking-widest cursor-pointer"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-3 md:gap-4">
            <div className="hidden lg:flex items-center gap-3">
              <a 
                href="tel:0135211789" 
                className="p-3.5 bg-[#363F40] rounded-2xl text-white hover:bg-[#F0FFA0] hover:text-[#2A3233] transition-colors shadow-lg"
              >
                <Phone size={20} />
              </a>
              
              <button 
                onClick={() => setIsBookingOpen(true)}
                className="bg-[#F0FFA0] text-[#2A3233] px-8 py-3.5 rounded-2xl text-[13px] font-montserrat-black uppercase hover:italic hover:bg-white transition-all shadow-lg cursor-pointer"
              >
                Afspraak
              </button>
            </div>

            <button 
              className="lg:hidden relative z-120 w-[44px] h-[44px] md:w-[56px] md:h-[56px] flex items-center justify-end transition-all active:scale-90 cursor-pointer"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={28} className="text-[#F0FFA0]" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={28} className="text-[#F0FFA0]" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </motion.nav>
      </header>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.6, ease: [0.85, 0, 0.15, 1] }}
            className="fixed inset-0 z-100 bg-[#2A3233] lg:hidden flex flex-col p-8 pt-20"
          >
            <div className="grow flex flex-col justify-center items-center space-y-8">
              {navLinks.map((link, i) => (
                <motion.button 
                  key={link.name} 
                  custom={i}
                  variants={menuLinkVariants}
                  initial="hidden"
                  animate="visible"
                  onClick={() => handleNavClick(link.href)}
                  className="text-center group cursor-pointer"
                >
                  <span className="text-[38px] sm:text-[54px] md:text-[72px] font-montserrat-black uppercase leading-none text-white group-hover:text-[#F0FFA0] group-hover:italic transition-all">
                    {link.name}.
                  </span>
                </motion.button>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-auto pb-10 flex items-center gap-3"
            >
              <a 
                href="tel:0135211789" 
                className="w-[50px] h-[50px] flex items-center justify-center bg-[#363F40] rounded-xl text-white hover:bg-[#F0FFA0] hover:text-[#2A3233] transition-all shadow-xl"
              >
                <Phone size={22} />
              </a>
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsBookingOpen(true);
                }}
                className="grow h-[50px] bg-[#F0FFA0] text-[#2A3233] rounded-xl font-montserrat-black uppercase text-[13px] shadow-2xl transition-all flex items-center justify-center gap-2 hover:italic hover:bg-white cursor-pointer"
              >
                Boek Afspraak <ArrowRight size={16} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}