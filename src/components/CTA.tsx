import { Button } from "@/components/ui/button";
import { Mail, ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-primary/10 via-secondary/20 to-accent/10">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold">
            Ready to Transform Healthcare?
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Join the future of AI-powered clinical intelligence designed specifically for Indian healthcare.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Button variant="hero" size="xl" className="group">
              Request Demo
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline-hero" size="xl" className="group">
              <Mail className="w-5 h-5" />
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
