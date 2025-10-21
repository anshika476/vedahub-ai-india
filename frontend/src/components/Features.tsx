import { Card } from "@/components/ui/card";
import { Brain, Zap, Shield, TrendingUp, Users, Globe } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Driven Insights",
      description: "Advanced machine learning models trained on diverse Indian healthcare data for accurate predictions."
    },
    {
      icon: Zap,
      title: "Real-Time Analysis",
      description: "Instant processing and analysis of medical data for quick clinical decision-making."
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Healthcare data protected with enterprise-grade encryption and compliance standards."
    },
    {
      icon: TrendingUp,
      title: "Predictive Analytics",
      description: "Early disease detection and risk assessment tailored to Indian population patterns."
    },
    {
      icon: Users,
      title: "Patient-Centric",
      description: "Designed with Indian healthcare workflows and patient demographics in mind."
    },
    {
      icon: Globe,
      title: "Multi-Lingual Support",
      description: "Supporting regional languages for seamless healthcare accessibility across India."
    }
  ];

  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold">
            Why Choose VEDA?
          </h2>
          <p className="text-lg text-muted-foreground">
            Built specifically for Indian healthcare needs with cutting-edge AI technology
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index}
                className="p-6 space-y-4 bg-card hover:shadow-lg transition-all duration-300 hover:border-primary/50 group animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                
                <h3 className="text-xl font-semibold text-foreground">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
