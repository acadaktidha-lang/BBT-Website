import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Briefcase, Users, Award, Globe, Zap } from 'lucide-react';
import digitalLiteracyImg from '/assets/digital-literacy.jpg';
import marketReadyImg from '/assets/market-ready.jpg';
import internshipImg from '/assets/internship.jpg';
import partnershipsImg from '/assets/partnerships.jpg';
import globalStandardsImg from '@/assets/global-standards.jpg';
import innovationImg from '@/assets/innovation.jpg';

const features = [
  {
    icon: BookOpen,
    title: "Digital Literacy",
    description: "Comprehensive digital skills training preparing students for the modern workforce with cutting-edge technology education.",
    image: digitalLiteracyImg
  },
  {
    icon: Award,
    title: "Proven Market Ready",
    description: "Industry-validated curriculum designed with employers' needs in mind, ensuring graduates are immediately employable.",
    image: marketReadyImg
  },
  {
    icon: Briefcase,
    title: "Internship Opportunities",
    description: "Guaranteed internships at Big Binary Software House and our partner companies for hands-on experience.",
    image: internshipImg
  },
  {
    icon: Users,
    title: "Industry Partnerships",
    description: "Strong network of partner companies providing real-world experience and career opportunities.",
    image: partnershipsImg
  },
  {
    icon: Globe,
    title: "Global Standards",
    description: "International quality education with certifications recognized worldwide in the tech industry.",
    image: globalStandardsImg
  },
  {
    icon: Zap,
    title: "Innovation Focus",
    description: "Emphasis on emerging technologies and innovation to stay ahead of industry trends and demands.",
    image: innovationImg
  }
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-background to-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-primary border-primary">
            About Us
          </Badge>
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Why Choose Big Binary Tech
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We provide world-class tech education with guaranteed internships at Big Binary Software House 
            and partner companies, ensuring our graduates are market-ready professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-2 overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={feature.image} 
                  alt={feature.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <div className="p-3 rounded-full bg-white/90 backdrop-blur-sm">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}