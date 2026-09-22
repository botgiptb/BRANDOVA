"use client";
import { useState } from "react";
import Intro from "@/components/Intro";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import About from "@/components/About";
import Team from "@/components/Team";
import Portfolio from "@/components/Portfolio";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";

export default function Home() {
  const [ready, setReady] = useState(false);

  return (
    <>
      <Intro onDone={() => setReady(true)} />
      {ready && (
        <main className="relative">
          <Navbar />
          <Hero />
          <Stats />
          <Services />
          <About />
          <Team />
          <Portfolio />
          <Process />
          <Testimonials />
          <Pricing />
          <Contact />
          <Footer />
          <FloatingButtons />
        </main>
      )}
    </>
  );
}
