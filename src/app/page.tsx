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
import FloatingTechArtifacts from '@/components/3d/FloatingTechArtifacts';
import CustomCursor from '@/components/3d/CustomCursor';
import CompanionBot3D from '@/components/3d/CompanionBot3D';
import TechMarquee from '@/components/TechMarquee';

export default function PersonalShowcasePage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-amber-400 selection:text-zinc-950 font-body relative overflow-x-hidden">
      {/* Precision Magnetic Cursor & Cyber Trail */}
      <CustomCursor />

      {/* 3D Global Space Parallax Background Waves */}
      <BackgroundCanvas3D />

      {/* 3D Ambient Floating Tech Artifacts */}
      <FloatingTechArtifacts />

      {/* Top Navbar */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <HeroSection />
        <TechMarquee />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <EducationAchievements />
        <InteractiveTerminal />
        <ContactSection />
      </main>

      {/* Interactive 3D Tech Drone Companion (Nexus-01) */}
      <CompanionBot3D />

      {/* Footer */}
      <Footer />
    </div>
  );
}
