import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Globe, Lightbulb, TrendingUp, Send } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';

// Import images for career benefits
import innovationImage from '/assets/innovation.jpg';
import globalStandardsImage from '/assets/global-standards.jpg';
import marketReadyImage from '/assets/market-ready.jpg';
import partnershipsImage from '/assets/partnerships.jpg';

// Job positions removed per request; accepting open applications only

const careerBenefits = [
  {
    icon: TrendingUp,
    title: 'Career Growth',
    description: 'Accelerate your career with continuous learning opportunities and clear advancement paths.',
    image: marketReadyImage
  },
  {
    icon: Globe,
    title: 'Global Impact',
    description: 'Make a difference in students\' lives across 50+ countries with our international reach.',
    image: globalStandardsImage
  },
  {
    icon: Lightbulb,
    title: 'Innovation Culture',
    description: 'Work with cutting-edge technologies and contribute to educational innovation.',
    image: innovationImage
  },
  {
    icon: Users,
    title: 'Collaborative Team',
    description: 'Join a diverse team of passionate educators and industry experts.',
    image: partnershipsImage
  }
];

export default function Careers() {
  useSEO({
    title: 'Careers',
    description: 'Join Big Binary Tech team. Explore career opportunities in technology education, teaching, and administration. Make a global impact with Big Binary.',
    keywords: 'Big Binary careers, Big Binary Tech jobs, education careers, teaching jobs, Big Binary employment, technology education jobs',
    canonical: 'https://bigbinarytech.com/careers',
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-primary via-primary/95 to-accent overflow-hidden">
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-3xl floating blur-2xl"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-white/15 rounded-full floating blur-xl" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-white/10 rounded-2xl floating blur-xl" style={{animationDelay: '4s'}}></div>
        </div>

        <div className="relative container mx-auto px-4 text-center">
          <div className="slide-up">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 text-white leading-tight">
              Join Our Mission to
              <span className="block text-accent">Transform Education</span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-white/90 max-w-4xl mx-auto leading-relaxed text-center">
              Be part of a team that's shaping the future of technology education across the globe. 
              Build your career while empowering the next generation of tech leaders.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Card className="bg-white/10 border-white/20">
                <CardContent className="p-6 text-white text-xl font-semibold">
                  No current openings.
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Why Work With Us Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="slide-up">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-primary">
                Why Choose Big Binary Tech as Your Career?
              </h2>
              <div className="w-24 h-1 bg-accent rounded mx-auto mb-6"></div>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-center">
                Join a forward-thinking organization that values innovation, growth, and making a real impact in education.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {careerBenefits.map((benefit, index) => (
              <div key={index} className="fade-in-scale" style={{animationDelay: `${index * 0.1}s`}}>
                <Card className="card-modern group h-full overflow-hidden">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={benefit.image} 
                      alt={benefit.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-primary/20 group-hover:bg-accent/30 transition-all duration-300"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 bg-white/90 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                        <benefit.icon className="h-10 w-10 text-primary" />
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-8">
                    <h3 className="text-lg md:text-xl lg:text-2xl font-black text-primary mb-4 group-hover:text-accent transition-colors text-justify line-clamp-2 min-h-[3rem]">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-justify">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-black mb-4">
            Have Questions About Career Opportunities?
          </h3>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto text-center">
            Our HR team is here to help. Reach out to us for any career-related inquiries.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a 
              href="mailto:hiring@bigbinarytech.com"
              className="flex items-center text-lg font-semibold text-accent hover:text-white transition-colors"
            >
              <Send className="mr-3 h-6 w-6" />
              hiring@bigbinarytech.com
            </a>
            <span className="hidden sm:block text-white/60">|</span>
            <a 
              href="tel:+923260188811"
              className="flex items-center text-lg font-semibold text-accent hover:text-white transition-colors"
            >
              <Users className="mr-3 h-6 w-6" />
              +92 326 0188811
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
