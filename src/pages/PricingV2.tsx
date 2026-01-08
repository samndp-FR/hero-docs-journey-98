import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PricingSectionV2 from '@/components/PricingSectionV2';

const PricingV2 = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <PricingSectionV2 />
      </main>
      <Footer />
    </div>
  );
};

export default PricingV2;
