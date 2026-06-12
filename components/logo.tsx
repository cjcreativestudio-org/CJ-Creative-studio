"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export default function Logo({ className = "h-12", showText = true }: LogoProps) {
  const shouldReduceMotion = useReducedMotion();

  // Subtle path hover animation
  const facetVariants = {
    initial: { opacity: 0.95, scale: 1 },
    hover: { 
      opacity: 1, 
      scale: shouldReduceMotion ? 1 : 1.02,
      transition: { duration: 0.3, ease: "easeOut" } 
    }
  };

  return (
    <motion.div 
      className={`inline-flex items-center gap-3.5 select-none ${className}`}
      initial="initial"
      whileHover="hover"
    >
      {/* Prism Graphic Container */}
      <div className="relative h-full aspect-square">
        {/* Crisp Vector Prism SVG */}
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm"
        >
          <defs>
            {/* Core Brand Aurora Gradient */}
            <linearGradient id="logo-aurora" x1="15" y1="12" x2="85" y2="72" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ec4899" />    {/* Pink */}
              <stop offset="33%" stopColor="#8b5cf6" />   {/* Violet */}
              <stop offset="66%" stopColor="#3b82f6" />   {/* Blue */}
              <stop offset="100%" stopColor="#10b981" />  {/* Emerald */}
            </linearGradient>

            {/* Translucent overlay gradient to mimic structural depth refraction */}
            <linearGradient id="prism-refraction" x1="50" y1="12" x2="50" y2="72" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="white" stopOpacity="0.5" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Facet 1: The Left Splinter */}
          <motion.path
            d="M50 12L15 72H50V12Z"
            fill="url(#logo-aurora)"
            stroke="rgba(255, 255, 255, 0.7)"
            strokeWidth="0.75"
            strokeLinejoin="round"
            variants={facetVariants}
          />

          {/* Facet 2: The Right Splinter */}
          <motion.path
            d="M50 12L85 72H50V12Z"
            fill="url(#logo-aurora)"
            stroke="rgba(255, 255, 255, 0.7)"
            strokeWidth="0.75"
            strokeLinejoin="round"
            variants={facetVariants}
          />

          {/* Facet 3: Inner Geometric Refraction Core */}
          <motion.path
            d="M50 32L73 72H27L50 32Z"
            fill="url(#prism-refraction)"
            stroke="rgba(255, 255, 255, 0.85)"
            strokeWidth="1"
            strokeLinejoin="round"
            variants={facetVariants}
          />

          {/* Geometric Accent Line */}
          <line 
            x1="50" y1="12" x2="50" y2="32"
