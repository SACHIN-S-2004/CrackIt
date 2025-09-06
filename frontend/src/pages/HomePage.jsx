import React from 'react';
import Navbar from '../components/common/Navbar';
import HeroSection from '../components/home/HeroSection';
import Categories from '../components/home/TestCategories';
import Testimonials from '../components/home/Extras';
import Footer from '../components/common/Footer';

const HomePage = () => {
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

export default HomePage;
