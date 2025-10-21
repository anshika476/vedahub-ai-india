import Hero from "@/components/Hero";
import DataStreams from "@/components/DataStreams";
import DataInputSection from "@/components/DataInputSection";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <DataInputSection />
      <DataStreams />
      <HowItWorks />
      <Features />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
