import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import dynamic from 'next/dynamic';

const InteractiveMap = dynamic(() => import('@/components/interactive-map'), {
  ssr: false,
});

const ARVRPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e3a8a] to-[#800020] text-white">
      <Navigation />
      <main>
      <section className="hero-section">
        <div className="hero-content">
        <h1 className="text-5xl md:text-7xl font-bold mb-4">
          Step into <span className="text-gold">Jharkhand's</span> Heritage
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8">
          Experience the vibrant culture and breathtaking landscapes of Jharkhand like never before. Our augmented and virtual reality features transport you to the heart of its most iconic destinations.
        </p>
        </div>
      </section>

        <div className="container mx-auto px-4 py-16 text-center">
          <div className="grid md:grid-cols-2 gap-8 w-full max-w-5xl mb-12 mx-auto">
            <div className="p-6 rounded-lg" style={{ background: 'linear-gradient(135deg, rgba(128, 0, 32, 0.95) 0%, rgba(30, 58, 138, 0.95) 100%)' }}>
              <h2 className="text-3xl font-bold mb-3 text-gold">Augmented Reality</h2>
              <p className="text-base" style={{ color: 'white' }}>
              Experience history like never before as artifacts and monuments come to life before your eyes. At each tourist spot, uncover hidden stories, fascinating facts, and rich details that reveal the true essence of the place.
              </p>
            </div>
            <div className="p-6 rounded-lg" style={{ background: 'linear-gradient(135deg, rgba(128, 0, 32, 0.95) 0%, rgba(30, 58, 138, 0.95) 100%)' }}>
              <h2 className="text-3xl font-bold mb-3 text-gold">Virtual Reality</h2>
              <p className="text-base" style={{ color: 'white' }}>
              Embark on a breathtaking virtual journey through Jharkhand’s enchanting landscapes — from the thundering waterfalls and lush green forests to the timeless charm of its ancient temples. Explore every corner in stunning 360°, uncover fascinating stories and legends, and feel as if you’re truly there, all from the comfort of your home.
              </p>
            </div>
          </div>

          <div className="w-full max-w-5xl my-16 mx-auto p-8 rounded-lg" style={{ background: 'linear-gradient(135deg, rgba(128, 0, 32, 0.2) 0%, rgba(30, 58, 138, 0.2) 100%)', backdropFilter: 'blur(15px)', border: '1px solid rgba(244, 208, 63, 0.3)' }}>
            <h2 className="text-4xl font-bold mb-8 text-center text-gold">Explore Jharkhand Interactively</h2>
            <InteractiveMap />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ARVRPage;
