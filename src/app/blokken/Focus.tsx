import React, { useEffect, useState, useRef } from 'react';
import { animate, useInView } from 'framer-motion';

// Interface for the RollingNumber props
interface RollingNumberProps {
  value: string;
}

// Interface for the Stat object
interface Stat {
  l: string;
  v: string;
}

// Component voor het tellen
function RollingNumber({ value }: RollingNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [displayValue, setDisplayValue] = useState("0");
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      // Haal het getal uit de string (bijv. "100+" wordt 100)
      const numericValue = parseInt(value.replace(/\D/g, ''), 10);
      // Haal het symbool uit de string (bijv. "+" of "%")
      const suffix = value.replace(/[0-9]/g, '');

      const controls = animate(0, numericValue, {
        duration: 1, // Snelheid: 1 seconde
        ease: "easeOut",
        onUpdate: (latest) => {
          setDisplayValue(Math.floor(latest) + suffix);
        },
      });
      return () => controls.stop();
    }
  }, [isInView, value]);

  return <span ref={ref}>{displayValue}</span>;
}

export default function Focus() {
  const stats: Stat[] = [
    { l: "Jaar Ervaring", v: "7+" },
    { l: "Tevreden Klanten", v: "100+" },
    { l: "Passie", v: "100%" }
  ];

  return (
    <section id="focus" className="py-24 md:py-40 px-6 bg-[#F0FFA0] text-[#2A3233]">
      <div className="max-w-[1140px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-20 gap-8">
          <h2 className="text-[30px] md:text-[36px] lg:text-[128px] font-montserrat-black uppercase leading-[0.9]">
            FOCUS.
          </h2>
          <p className="max-w-xs text-[16px] font-raleway-regular uppercase leading-[1.6] text-[#2A3233] md:text-right md:ml-auto">
            Passie en ambitie gecombineerd.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, idx) => (
            <div 
              key={idx} 
              className="bg-[#2A3233] p-10 rounded-[2.5rem] flex flex-col justify-center items-center text-center shadow-xl"
            >
              <p className="text-[12px] font-montserrat-black uppercase text-[#F0FFA0] mb-6 tracking-widest">
                {stat.l}
              </p>
              <p className="text-[48px] md:text-[64px] lg:text-[90px] font-montserrat-black text-white leading-none tracking-tighter">
                <RollingNumber value={stat.v} />
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}