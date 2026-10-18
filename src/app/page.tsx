'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ExperienceSection from '@/components/ExperienceSection';
import ProjectsSection from '@/components/ProjectsSection';
import SkillsSection from '@/components/SkillsSection';
import EducationAchievements from '@/components/EducationAchievements';
import InteractiveTerminal from '@/components/InteractiveTerminal';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import BackgroundCanvas3D from '@/components/3d/BackgroundCanvas3D';

export default function PersonalShowcasePage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-amber-400 selection:text-zinc-950 font-body relative overflow-x-hidden">
      {/* 3D Global Space Parallax Background */}
      <BackgroundCanvas3D />

      {/* Top Navbar */}
      <Navbar />

      {/* Main Sections */}
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <EducationAchievements />
        <InteractiveTerminal />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
