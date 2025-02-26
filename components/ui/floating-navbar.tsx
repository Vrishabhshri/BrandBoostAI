"use client";

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  link: string;
  icon?: React.ReactNode;
}

interface FloatingNavProps {
  navItems: NavItem[];
  className?: string;
}

export const FloatingNavDemo = ({
  navItems,
  className,
}: FloatingNavProps) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const direction = current - scrollYProgress.getPrevious()!;
      
      if (scrollYProgress.get() < 0.05) {
        setVisible(false);
        return;
      }
      
      setVisible(direction < 0);
    }
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      (e.target as HTMLElement).click();
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className={cn(
          "flex max-w-fit fixed top-10 inset-x-0 mx-auto",
          "border border-transparent dark:border-white/[0.2] rounded-full",
          "dark:bg-black/80 bg-white/80 backdrop-blur-md",
          "shadow-lg dark:shadow-2xl",
          "z-[5000] pr-2 pl-8 py-2 items-center justify-center space-x-4",
          className
        )}
        role="navigation"
        aria-label="Main navigation"
      >
        {navItems.map((navItem: NavItem, idx: number) => (
          <Link
            key={`nav-link-${idx}`}
            href={navItem.link}
            className={cn(
              "relative dark:text-neutral-50 items-center flex space-x-1",
              "text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500",
              "transition-colors duration-200",
              "focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
            )}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            aria-label={navItem.name}
          >
            {navItem.icon && (
              <span className="block sm:hidden" aria-hidden="true">
                {navItem.icon}
              </span>
            )}
            <span className="hidden sm:block text-sm font-medium">
              {navItem.name}
            </span>
          </Link>
        ))}
        
        <Link 
          href="/dashboard"
          className={cn(
            "relative group",
            "focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
          )}
          tabIndex={0}
          aria-label="Login to dashboard"
        >
          <Button
            className={cn(
              "relative px-6 py-2 rounded-full",
              "bg-gradient-to-r from-blue-600 to-blue-700",
              "hover:from-blue-700 hover:to-blue-800",
              "text-white font-medium",
              "transition-all duration-200 ease-in-out",
              "shadow-[0_2px_10px_rgba(0,0,0,0.1)]",
              "dark:shadow-[0_2px_10px_rgba(0,0,0,0.3)]"
            )}
          >
            Login
          </Button>
          <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px h-px opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
        </Link>
      </motion.div>
    </AnimatePresence>
  );
};

