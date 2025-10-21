import { Card } from "@/components/ui/card";
import reportsIcon from "@/assets/reports-icon.png";
import imagesIcon from "@/assets/images-icon.png";
import audioIcon from "@/assets/audio-icon.png";
import { FileText, Image, AudioWaveform } from "lucide-react";

const DataStreams = () => {
  const streams = [
    {
      icon: reportsIcon,
      lucideIcon: FileText,
      title: "Medical Reports",
      description: "AI analysis of patient medical records, lab results, and clinical documentation for comprehensive health insights.",
      features: ["Patient History", "Lab Results", "Clinical Notes", "Prescriptions"]
    },
    {
      icon: imagesIcon,
      lucideIcon: Image,
      title: "Medical Imaging",
      description: "Advanced X-ray, CT scan, and diagnostic image analysis powered by deep learning models trained on Indian datasets.",
      features: ["X-Ray Analysis", "CT Scans", "MRI Processing", "Anomaly Detection"]
    },
    {
      icon: audioIcon,
      lucideIcon: AudioWaveform,
      title: "Audio Analysis",
      description: "Respiratory audio processing including cough analysis and breathing pattern recognition for early disease detection.",
      features: ["Cough Analysis", "Breathing Patterns", "Voice Diagnostics", "Sound Classification"]
    }
  ];

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold">
            Three Critical Data Streams
          </h2>
          <p className="text-lg text-muted-foreground">
            VEDA synthesizes multiple healthcare data sources into unified clinical intelligence, 
            enabling accurate and contextual predictions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {streams.map((stream, index) => (
            <Card 
              key={index}
              className="p-8 space-y-6 bg-card hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/50 group animate-slide-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Icon */}
              <div className="relative w-24 h-24 mx-auto">
                <img 
                  src={stream.icon} 
                  alt={stream.title}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl group-hover:bg-primary/20 transition-colors" />
              </div>
              
              {/* Content */}
              <div className="text-center space-y-3">
                <h3 className="text-2xl font-bold text-foreground">
                  {stream.title}
                </h3>
                <p className="text-muted-foreground">
                  {stream.description}
                </p>
              </div>
              
              {/* Features */}
              <ul className="space-y-2">
                {stream.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-foreground/80">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DataStreams;
