// src/app/page.tsx (if using the App Router in Next.js)
// or src/pages/index.tsx (if using the Pages Router in Next.js)

"use client";

import React from 'react';
import { FloatingNav } from '../components/ui/floating-navbar';
import {FaHome} from "react-icons/fa";
import { HeroParallax } from '@/components/ui/hero-parallax';
import { products } from '@/components/Products';
const HomePage = () => {
  return (
    <div>
      {/* You can add other components or content here */}
{/* <      h1 className='text-black text-center py-40 '>Elevate Your Learning Experience with Smarter Professor Insights</h1> */}
         <HeroParallax products={products}/>
          <FloatingNav navItems={[
        {name: 'Home', link: '/', icon: <FaHome />},
        {name: 'Features', link: '/features', icon: <FaHome />}]}
        name="ProfXplore"  />

    </div>
  );
};

export default HomePage;
