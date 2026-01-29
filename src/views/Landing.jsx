"use client";
import Hero from "./components/Hero";
import OurServices from "./components/OurServices";
import WhyChooseUs from "./components/WhyChooseUs";
import HowItWorks from "./components/HowItWorks";
import FAQ from "./components/FAQ";
import Testimonials from "./components/Testimonials";
import GlobalReach from "./components/GlobalReach";
import LastSection from "./components/LastSection";
import Partners from "./components/Partners";

function Landing() {
  return (
    <>
      <Hero />
      <OurServices />
      <WhyChooseUs />
      <HowItWorks />
      <GlobalReach />
      <Testimonials />
      <FAQ />
      {/* <LastSection /> */}
      <Partners />
      <LastSection />
    </>
  );
}

export default Landing;
