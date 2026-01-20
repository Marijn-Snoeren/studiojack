import React from 'react';
import { Calendar } from 'lucide-react';

// Define the shape of the component props
interface CTAProps {
  setIsBookingOpen: (isOpen: boolean) => void;
}

export default function CTA({ setIsBookingOpen }: CTAProps) {
  return (
    <section className="py-24 md:py-40 px-6 bg-[#F0FFA0] rounded-b-[3rem] md:rounded-b-[4rem]">
      <div className="max-w-[1140px] mx-auto text-center">
        <h2 className="text-[30px] md:text-[36px] lg:text-[128px] font-montserrat-black uppercase text-[#2A3233] mb-12 leading-none">
          Afspraak?
        </h2>
        <button 
          onClick={() => setIsBookingOpen(true)}
          className="bg-[#2A3233] text-[#F0FFA0] px-10 md:px-16 py-5 md:py-6 rounded-2xl text-[14px] md:text-[16px] font-montserrat-black uppercase hover:italic hover:bg-white hover:text-[#2A3233] transition-colors duration-200 inline-flex items-center gap-4 shadow-2xl active:scale-95 cursor-pointer"
        >
          <Calendar size={20} /> Boek je stoel
        </button>
      </div>
    </section>
  );
}