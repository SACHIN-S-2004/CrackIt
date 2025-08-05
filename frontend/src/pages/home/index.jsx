import React from 'react';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import Categories from './TestCategories';
import Testimonials from './Extras';
import Footer from './Footer';

const Index = () => {
  return (
    <div className="app-wrapper">
      <Navbar />
      <HeroSection />
      <Categories />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;
