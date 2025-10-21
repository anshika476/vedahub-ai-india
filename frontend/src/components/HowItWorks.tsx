import { ArrowRight } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Data Collection",
      description: "Upload medical reports, diagnostic images (X-rays, scans), and audio files (cough recordings, breathing sounds)"
    },
    {
      number: "02",
      title: "AI Processing",
      description: "Advanced AI models analyze and synthesize all data streams simultaneously for comprehensive insights"
    },
    {
      number: "03",
      title: "Unified Intelligence",
      description: "Receive contextual predictions and actionable clinical insights tailored to Indian healthcare scenarios"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-secondary/30 via-accent/20 to-background">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold">
            How VEDA Works
          </h2>
          <p className="text-lg text-muted-foreground">
            Simple, efficient, and powerful healthcare intelligence in three steps
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative animate-slide-up" style={{ animationDelay: `${index * 200}ms` }}>
                {/* Connecting arrow for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/4 -right-8 z-0">
                    <ArrowRight className="w-6 h-6 text-primary/40" />
                  </div>
                )}
                
                <div className="relative z-10 space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground text-2xl font-bold shadow-lg">
                    {step.number}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-foreground">
                    {step.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
