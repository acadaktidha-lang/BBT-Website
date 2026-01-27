import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Award, 
  Users, 
  Briefcase, 
  Target,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Shield
} from 'lucide-react';
import AboutSection from '@/components/AboutSection';
import LeadershipSection from '@/components/LeadershipSection';
import { useSEO } from '@/hooks/useSEO';

export default function About() {
  useSEO({
    title: 'About Us',
    description: 'Learn about Big Binary Tech International Institute - our mission, vision, leadership team, and commitment to providing world-class technology education and training programs.',
    keywords: 'Big Binary about, Big Binary Tech team, Big Binary leadership, Big Binary mission, technology education institute',
    canonical: 'https://bigbinarytech.com/about',
  });
  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section with Background Image */}
      <section className="relative py-24 text-white overflow-hidden">
        {/* Hero Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url('/assets/default-course-bg.jpg')`
          }}
        />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
            About Big Binary Tech
          </h1>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed mb-8 text-justify">
            Leading the future of technology education with innovative programs and industry expertise
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-white/80">
            <div className="text-center">
              <div className="text-3xl font-black">1000+</div>
              <div className="text-sm">Students</div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-white/30"></div>
            <div className="text-center">
              <div className="text-3xl font-black">50+</div>
              <div className="text-sm">Courses</div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-white/30"></div>
            <div className="text-center">
              <div className="text-3xl font-black">95%</div>
              <div className="text-sm">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <AboutSection />

      {/* Leadership Section */}
      <LeadershipSection />

      {/* Enhanced Mission & Vision with Binary Theme */}
      <section className="py-24 bg-muted/30 relative overflow-hidden">
        {/* Binary Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 text-9xl font-mono text-primary">010110</div>
          <div className="absolute bottom-0 right-0 text-9xl font-mono text-accent">101001</div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-primary mb-6">
              Our Mission & Vision
            </h2>
            <div className="w-24 h-1 bg-accent rounded mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="card-modern p-8 group hover:shadow-2xl transition-all duration-500">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/70 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Target className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-3xl font-black text-primary mb-6">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                To empower individuals with cutting-edge technology skills and knowledge, 
                preparing them for successful careers in the digital age through innovative 
                education and hands-on training that bridges the gap between academic learning 
                and industry requirements.
              </p>
              <div className="mt-6 flex items-center space-x-4">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">Industry-Aligned Curriculum</span>
              </div>
            </div>
            
            <div className="card-modern p-8 group hover:shadow-2xl transition-all duration-500">
              <div className="w-20 h-20 bg-gradient-to-br from-accent to-accent/70 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Sparkles className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-3xl font-black text-primary mb-6">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                To be the global leader in technology education, creating a world where 
                everyone has access to quality tech training and the opportunity to thrive 
                in the digital economy, fostering innovation and technological advancement 
                across communities worldwide.
              </p>
              <div className="mt-6 flex items-center space-x-4">
                <TrendingUp className="h-5 w-5 text-accent" />
                <span className="text-sm text-muted-foreground">Global Impact & Excellence</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* New Values Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-primary mb-6">
              Our Core Values
            </h2>
            <div className="w-24 h-1 bg-accent rounded mx-auto mb-6"></div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-justify">
              The principles that guide our approach to technology education
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">Excellence</h3>
              <p className="text-muted-foreground text-sm text-justify">Delivering the highest quality education and training</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                <Users className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">Community</h3>
              <p className="text-muted-foreground text-sm text-justify">Building supportive learning environments</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <Briefcase className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">Innovation</h3>
              <p className="text-muted-foreground text-sm text-justify">Embracing cutting-edge technologies and methods</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                <Shield className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">Integrity</h3>
              <p className="text-muted-foreground text-sm text-justify">Maintaining transparency and ethical practices</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
