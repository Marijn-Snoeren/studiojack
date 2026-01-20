import React from 'react';
import { Star } from 'lucide-react';

export default function Reviews() {
  const reviews = [
    { t: "Jack verstaat zijn vak. Altijd tijd voor een praatje en een perfect resultaat.", n: "Klant uit Oisterwijk" },
    { t: "Fijne kapper met een moderne kijk op het vak. De neefjes komen nu ook graag.", n: "Lucas M." },
    { t: "Heel blij dat Jack hier in Oisterwijk zit. Zeer kundig en geduldig.", n: "Dhr. Janssen" },
    { t: "De sfeer in de salon is top. Je voelt je direct op je gemak bij Jack.", n: "Mevr. Pietersen" }
  ];

  return (
    <section id="reviews" className="py-24 md:py-40 px-6 bg-[#2A3233] text-white">
      <div className="max-w-[1140px] mx-auto">
        {/* Header: Exacte kopie van de Focus-layout voor visuele eenheid */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-20 gap-8">
          <h2 className="text-[40px] md:text-[80px] lg:text-[128px] font-montserrat-black uppercase leading-[0.9] text-[#F0FFA0]">
            REVIEWS.
          </h2>
          <p className="max-w-xs text-[16px] font-raleway-regular uppercase leading-[1.6] text-[#F0FFA0] md:text-right md:ml-auto">
            Klanten aan het woord.
          </p>
        </div>

        {/* Grid: Kaarten met dezelfde afronding en padding als de Focus-kaarten */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, idx) => (
            <div 
              key={idx} 
              className="bg-[#363f40] p-10 rounded-[2.5rem] flex flex-col justify-between items-center text-center border border-white/5 shadow-lg transition-transform hover:scale-[1.02] duration-300"
            >
              <div>
                {/* Sterren in de accentkleur */}
                <div className="flex justify-center gap-1 mb-6 text-[#F0FFA0]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" stroke="none" />
                  ))}
                </div>
                
                {/* Tekst in de strakke hoofdletter-stijl van de rest van de site */}
                <p className="text-[14px] md:text-[15px] font-raleway-regular uppercase leading-[1.6] text-white">
                  "{review.t}"
                </p>
              </div>

              {/* Naam/Label onderaan de kaart */}
              <p className="mt-8 text-[12px] font-montserrat-black uppercase text-[#F0FFA0] tracking-widest">
                — {review.n}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}