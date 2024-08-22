"use client";

import React, { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";
import { SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export const FloatingNav = ({ navItems, className, name }) => {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollY, "change", (current) => {
    if (typeof current === "number") {
      let scrollDirection = current - scrollY.getPrevious();
      setVisible(scrollDirection < 0);
    }
  });

  const handleNavItemClick = (link) => {
    const targetElement = document.querySelector(link);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 1, y: -100 }}
      animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "flex max-w-fit fixed top-10 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black bg-white shadow-md z-[5000] pr-2 pl-8 py-2 items-center justify-center space-x-4",
        className
      )}
    >
      <div className="text-l font-bold dark:text-white mr-16">{name}</div>

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

      <SignedOut>
        <SignUpButton mode="modal" afterSignUpUrl="/proff">
          <button
            className="border text-sm font-medium relative border-neutral-200 bg-[#1A202C] text-white px-4 py-2 rounded-full"
            type="button"
          >
            Sign Up
          </button>
        </SignUpButton>
      </SignedOut>

      <SignedIn>
        <UserButton
          afterSignOutUrl="/"
          userProfileMode="modal"
          appearance={{
            elements: {
              userButtonAvatarBox: "w-8 h-8",
            },
          }}
        />
      </SignedIn>
    </motion.div>
  );
};
