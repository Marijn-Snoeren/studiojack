import React from 'react';

export default function Gallery() {
  const row1 = [
    "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1620331311520-246422fd82f9?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop",
  ];

  const row2 = [
    "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1593702275687-f8b402bf1fb5?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=800&auto=format&fit=crop",
  ];

  return (
    <section id="gallery" className="py-24 md:py-40 bg-[#2A3233] overflow-hidden">
      <div className="max-w-[1140px] mx-auto px-6 mb-16 md:mb-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <h2 className="text-[30px] md:text-[36px] lg:text-[128px] font-montserrat-black uppercase leading-[0.9] text-[#F0FFA0]">
            LOOKS.
          </h2>
          
          <p className="max-w-xs text-[16px] font-raleway-regular uppercase leading-[1.6] text-[#F0FFA0] md:text-right md:ml-auto">
            Het resultaat spreekt voor zich.
          </p>
        </div>
      </div>
      
      {/* Scrollende rijen */}
      <div className="space-y-6 md:space-y-8">
        {/* Rij 1 */}
        <div className="flex whitespace-nowrap pointer-events-none">
          <div className="flex animate-scroll-left gap-6 md:gap-8 pr-8">
            {[...row1, ...row1, ...row1].map((img, idx) => (
              <div 
                key={idx} 
                className="w-[280px] md:w-[450px] aspect-4/5 md:aspect-video shrink-0 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl bg-[#1A1F20]"
              >
                <img 
                  src={img} 
                  alt="Resultaat" 
                  className="w-full h-full object-cover" 
                />
              </div>
            ))}
          </div>
        </div>

        {/* Rij 2 */}
        <div className="flex whitespace-nowrap pointer-events-none">
          <div className="flex animate-scroll-right gap-6 md:gap-8 pr-8">
            {[...row2, ...row2, ...row2].map((img, idx) => (
              <div 
                key={idx} 
                className="w-[280px] md:w-[450px] aspect-4/5 md:aspect-video shrink-0 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl bg-[#1A1F20]"
              >
                <img 
                  src={img} 
                  alt="Resultaat" 
                  className="w-full h-full object-cover" 
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}