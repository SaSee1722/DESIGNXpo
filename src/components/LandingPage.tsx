import React, { Suspense, lazy } from 'react';
import { LazyMotion, domAnimation } from 'framer-motion';
import FuturisticBackground from './FuturisticBackground';
import Nav from './sections/Nav';
import Hero from './sections/Hero';
import DynamicShowcase from './sections/DynamicShowcase';

// Lazy load sections below the fold
const About = lazy(() => import('./sections/About'));
const Format = lazy(() => import('./sections/Format'));
const Tools = lazy(() => import('./sections/Tools'));
const Judging = lazy(() => import('./sections/Judging'));
const PrizePool = lazy(() => import('./sections/PrizePool'));
const Details = lazy(() => import('./sections/Details'));
const Footer = lazy(() => import('./sections/Footer'));

const SectionLoader = () => (
  <div className="h-40 flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-sky-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

const LandingPage = () => {
  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen relative selection:bg-sky-500/30 font-inter">
        <FuturisticBackground />
        <Nav />
        <main className="relative z-10">
          <Hero />
          <DynamicShowcase />
          <Suspense fallback={<SectionLoader />}>
            <About />
            <Format />
            <Tools />
            <Judging />
            <PrizePool />
            <Details />
          </Suspense>
        </main>
        <Suspense fallback={<SectionLoader />}>
          <Footer />
        </Suspense>
      </div>
    </LazyMotion>
  );
};

export default LandingPage;
