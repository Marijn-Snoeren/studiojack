"use client";
import React, { useState, useEffect } from 'react';

// Define the Service interface
interface Service {
  id: string;
  name: string;
  price: number;
  duration: number;
}

/**
 * Mock function om de 5 blokken te vullen
 * In een echte scenario komt dit uit je database/API
 */
const getServices = async (): Promise<Service[]> => {
  return [
    { id: '1', name: 'Wassen & Knippen', price: 35, duration: 30 },
    { id: '2', name: 'Baard Trimmen', price: 22, duration: 20 },
    { id: '3', name: 'Luxury Shave', price: 45, duration: 45 },
    { id: '4', name: 'Haar Kleuren', price: 65, duration: 60 },
    { id: '5', name: 'Totaal Pakket', price: 85, duration: 90 },
  ];
};

export default function MenuSection() {
  // Explicitly type the state as Service[]
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check of we op mobile zitten voor de inline styles
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    async function loadServices() {
      try {
        const data = await getServices();
        // We pakken precies de eerste 5 diensten
        setServices(data.slice(0, 5));
      } catch (error) {
        console.error("Fout bij laden van diensten:", error);
      } finally {
        setLoading(false);
      }
    }
    
    loadServices();
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section id="menu" className="py-24 md:py-32 px-6 bg-[#F0FFA0] text-[#2A3233] rounded-t-[3rem] md:rounded-t-[4rem]">
      <div className="max-w-[1140px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <h2 className="text-[30px] md:text-[36px] lg:text-[128px] font-montserrat-black uppercase leading-[0.9]">MENU.</h2>
          <p className="max-w-xs text-[16px] font-raleway-regular uppercase leading-[1.6] text-[#2A3233] md:text-right md:ml-auto">
            Haarverzorging op maat.
          </p>
        </div>

        <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-4">
          {loading ? (
            [...Array(5)].map((_, i) => (
              <div key={`skeleton-${i}`} className="h-[300px] md:h-[400px] bg-[#2A3233]/10 rounded-4xl animate-pulse" />
            ))
          ) : (
            services.map((service, i) => (
              <div 
                key={service.id} 
                className="sticky md:relative h-[350px] md:h-[400px] bg-[#2A3233] rounded-4xl p-8 flex flex-col justify-end group cursor-pointer overflow-hidden text-white transition-all shadow-xl md:shadow-none md:hover:-translate-y-2 md:hover:shadow-2xl"
                style={{ 
                  // Alleen top en z-index toepassen op mobile voor het 'stacking' effect
                  top: isMobile ? `calc(100px + ${i * 30}px)` : 'auto',
                  zIndex: isMobile ? i + 1 : 'auto'
                }}
              >
                {/* Full-card herhalend JACK patroon */}
                <div className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none select-none flex flex-col justify-around items-center rotate-[-20deg] scale-125">
                  {[...Array(6)].map((_, rowIdx) => (
                    <div key={`bg-row-${service.id}-${rowIdx}`} className="flex gap-4 whitespace-nowrap">
                      {[...Array(3)].map((_, colIdx) => (
                        <span 
                          key={`bg-span-${service.id}-${rowIdx}-${colIdx}`} 
                          className="text-[60px] font-montserrat-black uppercase tracking-tighter"
                        >
                          JACK
                        </span>
                      ))}
                    </div>
                  ))}
                </div>

                {/* Content Layer */}
                <div className="relative z-10">
                  <p className="text-[#F0FFA0] text-[12px] font-montserrat-black mb-2 uppercase tracking-widest">
                    0{i + 1}
                  </p>
                  
                  <h4 className="text-[24px] md:text-[20px] lg:text-[24px] font-montserrat-black uppercase text-white leading-tight mb-2">
                    {service.name}
                  </h4>

                  <div className="flex justify-between items-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex flex-col">
                      <p className="text-[11px] font-montserrat-black text-[#F0FFA0] uppercase italic">
                        Vanaf €{Math.round(service.price)}
                      </p>
                      <p className="text-[9px] text-white/60 uppercase font-bold">
                        {service.duration} MIN
                      </p>
                    </div>
                    <div className="w-10 h-10 md:w-8 md:h-8 rounded-full bg-[#F0FFA0] flex items-center justify-center text-[#2A3233]">
                      <span className="text-xl font-bold">+</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}