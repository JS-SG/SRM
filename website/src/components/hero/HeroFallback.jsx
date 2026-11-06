import React from "react";
import { BookOpen, Star, Sparkles, GraduationCap } from "lucide-react";

const HeroFallback = () => {
  return (
    <div className="hero-fallback-wrapper" role="img" aria-label="Stylized illustration of K K Kumaran school entrance with open gate and welcoming children">
      <svg
        className="fallback-school-scene"
        viewBox="0 0 600 450"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#bae6fd" />
            <stop offset="100%" stop-color="#f0f9ff" />
          </linearGradient>
          <linearGradient id="grassGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#86efac" />
            <stop offset="100%" stop-color="#22c55e" />
          </linearGradient>
          <linearGradient id="schoolWall" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#ffffff" />
            <stop offset="100%" stop-color="#f1f5f9" />
          </linearGradient>
          <linearGradient id="roofGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#0284c7" />
            <stop offset="100%" stop-color="#1e3a8a" />
          </linearGradient>
          <linearGradient id="goldArch" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#f59e0b" />
            <stop offset="100%" stop-color="#fbbf24" />
          </linearGradient>
          <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="8" stdDeviation="6" flood-color="#0f172a" flood-opacity="0.12" />
          </filter>
        </defs>

        {/* Sky Background */}
        <rect width="600" height="450" rx="20" fill="url(#skyGrad)" />

        {/* Clouds */}
        <g opacity="0.8">
          <ellipse cx="120" cy="80" rx="45" ry="22" fill="#ffffff" />
          <ellipse cx="150" cy="70" rx="35" ry="25" fill="#ffffff" />
          <ellipse cx="480" cy="110" rx="55" ry="25" fill="#ffffff" />
          <ellipse cx="450" cy="120" rx="40" ry="20" fill="#ffffff" />
        </g>

        {/* Sun */}
        <circle cx="510" cy="70" r="32" fill="url(#goldArch)" opacity="0.9" filter="url(#softShadow)" />
        <circle cx="510" cy="70" r="42" stroke="#fef08a" stroke-width="2" stroke-dasharray="6 6" opacity="0.7" />

        {/* Trees in Background */}
        <g filter="url(#softShadow)">
          <rect x="75" y="210" width="16" height="50" rx="4" fill="#854d0e" />
          <circle cx="83" cy="190" r="38" fill="#15803d" />
          <circle cx="70" cy="180" r="28" fill="#22c55e" />

          <rect x="505" y="210" width="16" height="50" rx="4" fill="#854d0e" />
          <circle cx="513" cy="190" r="38" fill="#15803d" />
          <circle cx="525" cy="180" r="28" fill="#22c55e" />
        </g>

        {/* School Building */}
        <g filter="url(#softShadow)">
          {/* Main Building Block */}
          <rect x="150" y="140" width="300" height="150" rx="8" fill="url(#schoolWall)" stroke="#cbd5e1" stroke-width="2" />
          
          {/* Sloped Roof */}
          <polygon points="135,140 300,60 465,140" fill="url(#roofGrad)" />
          
          {/* Clock Tower / Emblem Section */}
          <rect x="260" y="70" width="80" height="70" fill="#ffffff" stroke="#cbd5e1" stroke-width="2" />
          <polygon points="250,70 300,30 350,70" fill="url(#goldArch)" />
          <circle cx="300" cy="105" r="18" fill="#f8fafc" stroke="#1e3a8a" stroke-width="2" />
          <line x1="300" y1="105" x2="300" y2="95" stroke="#1e3a8a" stroke-width="2" stroke-linecap="round" />
          <line x1="300" y1="105" x2="308" y2="105" stroke="#1e3a8a" stroke-width="2" stroke-linecap="round" />

          {/* School Name Arch Header */}
          <rect x="160" y="150" width="280" height="30" rx="6" fill="#0f2b5c" stroke="#f59e0b" stroke-width="2" />
          <text x="300" y="170" font-family="'Outfit', sans-serif" font-size="14" font-weight="800" fill="#ffffff" text-anchor="middle" letter-spacing="1.5">
            KKK SCHOOL
          </text>

          {/* Windows */}
          <rect x="180" y="195" width="45" height="40" rx="4" fill="#e0f2fe" stroke="#0284c7" stroke-width="2" />
          <line x1="202.5" y1="195" x2="202.5" y2="235" stroke="#0284c7" stroke-width="1.5" />
          <line x1="180" y1="215" x2="225" y2="215" stroke="#0284c7" stroke-width="1.5" />

          <rect x="375" y="195" width="45" height="40" rx="4" fill="#e0f2fe" stroke="#0284c7" stroke-width="2" />
          <line x1="397.5" y1="195" x2="397.5" y2="235" stroke="#0284c7" stroke-width="1.5" />
          <line x1="375" y1="215" x2="420" y2="215" stroke="#0284c7" stroke-width="1.5" />

          {/* School Main Entrance Door */}
          <path d="M265 290 L265 210 C265 190 335 190 335 210 L335 290 Z" fill="#1e3a8a" />
          <path d="M272 290 L272 215 C272 200 328 200 328 215 L328 290 Z" fill="#0284c7" />
        </g>

        {/* Grass Lawn */}
        <path d="M0 280 C150 270 450 270 600 280 L600 450 L0 450 Z" fill="url(#grassGrad)" />

        {/* Cobblestone Pathway */}
        <polygon points="260,285 340,285 410,450 190,450" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="2" />
        <ellipse cx="300" cy="360" rx="60" ry="8" fill="#e2e8f0" opacity="0.6" />

        {/* Large Open School Gate with Overhead Welcome Arch */}
        <g filter="url(#softShadow)">
          {/* Overhead Welcome Arch across Gate */}
          <rect x="170" y="222" width="260" height="26" rx="5" fill="#1e3a8a" stroke="#f59e0b" stroke-width="1.5" />
          <text x="300" y="239" font-family="'Outfit', sans-serif" font-size="11" font-weight="700" fill="#fef08a" text-anchor="middle" letter-spacing="1">
            ★ WELCOME TO KKK SCHOOL ★
          </text>

          {/* Left Gate Pillar */}
          <rect x="180" y="240" width="22" height="110" rx="3" fill="#cbd5e1" stroke="#94a3b8" stroke-width="2" />
          <circle cx="191" cy="235" r="10" fill="url(#goldArch)" />
          
          {/* Right Gate Pillar */}
          <rect x="398" y="240" width="22" height="110" rx="3" fill="#cbd5e1" stroke="#94a3b8" stroke-width="2" />
          <circle cx="409" cy="235" r="10" fill="url(#goldArch)" />

          {/* Open Left Gate Leaf (Swung wide outward) */}
          <g transform="rotate(-35 190 280)">
            <rect x="110" y="255" width="80" height="70" rx="4" fill="none" stroke="#1e3a8a" stroke-width="3" />
            <line x1="130" y1="255" x2="130" y2="325" stroke="#1e3a8a" stroke-width="2" />
            <line x1="150" y1="255" x2="150" y2="325" stroke="#1e3a8a" stroke-width="2" />
            <line x1="170" y1="255" x2="170" y2="325" stroke="#1e3a8a" stroke-width="2" />
            <polygon points="120,255 125,245 130,255" fill="url(#goldArch)" />
            <polygon points="145,255 150,245 155,255" fill="url(#goldArch)" />
            <polygon points="165,255 170,245 175,255" fill="url(#goldArch)" />
          </g>

          {/* Open Right Gate Leaf (Swung wide outward) */}
          <g transform="rotate(35 410 280)">
            <rect x="410" y="255" width="80" height="70" rx="4" fill="none" stroke="#1e3a8a" stroke-width="3" />
            <line x1="430" y1="255" x2="430" y2="325" stroke="#1e3a8a" stroke-width="2" />
            <line x1="450" y1="255" x2="450" y2="325" stroke="#1e3a8a" stroke-width="2" />
            <line x1="470" y1="255" x2="470" y2="325" stroke="#1e3a8a" stroke-width="2" />
            <polygon points="425,255 430,245 435,255" fill="url(#goldArch)" />
            <polygon points="445,255 450,245 455,255" fill="url(#goldArch)" />
            <polygon points="465,255 470,245 475,255" fill="url(#goldArch)" />
          </g>
        </g>

        {/* Two Children Characters Entering Through The Gate */}
        <g filter="url(#softShadow)">
          {/* Boy Character (Left) */}
          <g transform="translate(245, 305)">
            {/* Shadow */}
            <ellipse cx="20" cy="100" rx="16" ry="5" fill="#0f172a" opacity="0.25" />
            {/* Backpack */}
            <rect x="3" y="38" width="14" height="26" rx="4" fill="#0284c7" />
            {/* Legs / Navy shorts */}
            <rect x="10" y="65" width="7" height="24" rx="3" fill="#1e3a8a" />
            <rect x="23" y="65" width="7" height="22" rx="3" fill="#1e3a8a" />
            {/* Shoes */}
            <rect x="8" y="89" width="11" height="8" rx="3" fill="#0f172a" />
            <rect x="22" y="87" width="11" height="8" rx="3" fill="#0f172a" />
            {/* Torso / Uniform White Shirt & Blue Tie */}
            <rect x="8" y="32" width="24" height="34" rx="4" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5" />
            <polygon points="19,34 21,34 22,50 20,53 18,50" fill="#1e3a8a" />
            {/* Head & Hair */}
            <circle cx="20" cy="20" r="14" fill="#fcd34d" />
            <path d="M7 18 C7 8 33 8 33 18 C33 12 25 8 20 8 C14 8 7 12 7 18 Z" fill="#1e293b" />
            {/* Friendly Smile & Eyes */}
            <circle cx="16" cy="18" r="1.8" fill="#0f172a" />
            <circle cx="24" cy="18" r="1.8" fill="#0f172a" />
            <path d="M17 25 C19 28 21 28 23 25" stroke="#b45309" stroke-width="1.5" stroke-linecap="round" fill="none" />
            {/* Waving Arm */}
            <path d="M30 40 L42 28" stroke="#fcd34d" stroke-width="4" stroke-linecap="round" />
          </g>

          {/* Girl Character (Right) */}
          <g transform="translate(305, 310)">
            {/* Shadow */}
            <ellipse cx="20" cy="95" rx="16" ry="5" fill="#0f172a" opacity="0.25" />
            {/* Backpack */}
            <rect x="23" y="36" width="13" height="24" rx="4" fill="#ec4899" />
            {/* Legs */}
            <rect x="12" y="65" width="6" height="20" rx="3" fill="#fed7aa" />
            <rect x="22" y="65" width="6" height="22" rx="3" fill="#fed7aa" />
            {/* Shoes with white socks */}
            <rect x="10" y="85" width="10" height="7" rx="3" fill="#0f172a" />
            <rect x="21" y="87" width="10" height="7" rx="3" fill="#0f172a" />
            {/* Pleated Navy Skirt */}
            <polygon points="9,66 31,66 35,52 5,52" fill="#1e3a8a" />
            {/* Torso / White Uniform Shirt */}
            <rect x="8" y="30" width="24" height="24" rx="4" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5" />
            <circle cx="20" cy="36" r="3" fill="#dc2626" />
            {/* Head & Cute Pigtails */}
            <circle cx="20" cy="18" r="13" fill="#fcd34d" />
            {/* Pigtails */}
            <circle cx="6" cy="14" r="6" fill="#451a03" />
            <circle cx="34" cy="14" r="6" fill="#451a03" />
            <path d="M7 16 C7 7 33 7 33 16 C31 10 24 8 20 8 C16 8 9 10 7 16 Z" fill="#451a03" />
            {/* Friendly Face */}
            <circle cx="16" cy="17" r="1.8" fill="#0f172a" />
            <circle cx="24" cy="17" r="1.8" fill="#0f172a" />
            <path d="M17 23 C19 26 21 26 23 23" stroke="#b45309" stroke-width="1.5" stroke-linecap="round" fill="none" />
            {/* Holding Book / Arm */}
            <rect x="2" y="36" width="9" height="12" rx="2" fill="#f59e0b" />
          </g>
        </g>
      </svg>
    </div>
  );
};

export default HeroFallback;
