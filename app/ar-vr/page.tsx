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
      <main className="container mx-auto px-4 py-16 flex flex-col items-center text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 text-[#f4d03f]">
          Step into Jharkhand's Heritage
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8">
          Experience the vibrant culture and breathtaking landscapes of Jharkhand like never before. Our augmented and virtual reality features transport you to the heart of its most iconic destinations.
        </p>

        <div className="grid md:grid-cols-2 gap-8 w-full max-w-5xl mb-12">
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/20">
            <h2 className="text-3xl font-bold mb-3 text-[#f4d03f]">Augmented Reality</h2>
            <p className="text-base">
              Bring historical artifacts and monuments to life right in front of you. Use your phone's camera to uncover hidden stories and details at various tourist spots.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/20">
            <h2 className="text-3xl font-bold mb-3 text-[#f4d03f]">Virtual Reality</h2>
            <p className="text-base">
              Take a virtual tour of Jharkhand's stunning waterfalls, dense forests, and ancient temples from the comfort of your home. A truly immersive 360° experience awaits.
            </p>
          </div>
        </div>

        <div className="w-full max-w-5xl my-16">
          <h2 className="text-4xl font-bold mb-8 text-center text-[#f4d03f]">Explore Jharkhand Interactively</h2>
          <InteractiveMap />
        </div>

        <div className="w-full max-w-lg">
          <h3 className="text-2xl font-semibold mb-4">Ready to Explore?</h3>
          <p className="mb-6">To get started, please download our dedicated mobile application. The AR/VR features are exclusively available on the app.</p>
          <div className="flex justify-center gap-4">
            <Button className="bg-[#f4d03f] text-[#1e3a8a] hover:bg-yellow-400 transition-colors duration-300 font-bold py-3 px-6 rounded-lg">
              Download for Android
            </Button>
            <Button className="bg-[#f4d03f] text-[#1e3a8a] hover:bg-yellow-400 transition-colors duration-300 font-bold py-3 px-6 rounded-lg">
              Download for iOS
            </Button>
          </div>
        </div>

        <div className="mt-16">
          <Link href="/ai-features">
            <Button variant="outline" className="text-white border-white hover:bg-white hover:text-[#1e3a8a] transition-colors duration-300">
              &larr; Back to AI Features
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ARVRPage;
