"use client";
import React, { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SignUp from "../SignUp/SignUp";

export const FloatingNav = ({ navItems, className, name }) => {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(true);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const router = useRouter();

  useMotionValueEvent(scrollY, "change", (current) => {
    if (typeof current === "number") {
      let scrollDirection = current - scrollY.getPrevious();
      setVisible(scrollDirection < 0);
    }
  });

  const handleNavItemClick = (link) => {
    const targetElement = document.querySelector(link);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSignupClick = () => {
    setShowSignupForm(true);
  };
  
  const handleCloseModal = () => {
    setShowSignupForm(false);
  };

  const handleSignupSuccess = () => {
    setShowSignupForm(false);
    router.push("/proff/page");
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 1, y: -100 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "flex max-w-fit fixed top-10 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 pl-8 py-2 items-center justify-center space-x-4",
          className
        )}
      >
        <div className="text-l font-bold dark:text-white mr-16">
          {name}
        </div>

        {navItems.map((navItem, idx) => (
          <Link
            key={`link=${idx}`}
            href="#"
            onClick={() => handleNavItemClick(navItem.link)}
            className={cn(
              "relative dark:text-neutral-60 items-center flex space-x-1 text-neutral-800 dark:hover:text-neutral-300 hover:text-neutral-500"
            )}
          >
            <span className="block sm:hidden">{navItem.icon}</span>
            <span className="hidden sm:block text-sm">{navItem.name}</span>
          </Link>
        ))}

        <button
          className="border text-sm font-medium relative border-neutral-200 bg-[#1A202C] dark:border-white/[0.2] text-white dark:text-white px-4 py-2 rounded-full"
          type="button"
          onClick={handleSignupClick}
        >
          <span>SignUp</span>
          <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
        </button>
      </motion.div>

      <AnimatePresence>
        {showSignupForm && (
          <SignUp 
            isOpen={showSignupForm} 
            onClose={handleCloseModal}
            onSuccess={handleSignupSuccess}
          />
        )}
      </AnimatePresence>
    </>
  );
};
