"use client";

import React from 'react';
import { FloatingNav } from '../components/ui/floating-navbar';
import {FaHome,FaStar} from "react-icons/fa";
import { HeroParallax } from '@/components/ui/hero-parallax';
import { products } from '@/components/Products';
const HomePage = () => {
  return (
    <div>
         <HeroParallax products={products}/>
        <FloatingNav navItems={[
        {name: 'Home', link: '/', icon: <FaHome />},
        {name: 'Features', link: '#products-section', icon: <FaStar />}]}
        name="ProfXplore"  />

    </div>
  );
};

export default HomePage;
