import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { supabase } from '@/integrations/supabase/client';
import { useEnrollment } from '@/contexts/EnrollmentContext';
import { 
  ArrowRight, 
  Users, 
  Award, 
  Briefcase,
  Clock,
  BookOpen,
  Globe,
  Laptop,
  UserCheck,
  Target,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Star,
  Sparkles,
  Zap,
  TrendingUp,
  Shield,
  Rocket,
  Wifi,
  Monitor,
  ChevronUp
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useMediaAssets } from '@/hooks/useMediaAsset';

// Local images for highlight cards; hero uses remote URL
import globalStandardsImage from '/assets/global-standards.jpg';
import marketReadyImage from '/assets/market-ready.jpg';
import innovationImage from '/assets/innovation.jpg';
import internshipImage from '/assets/internship.jpg';
import partnershipsImage from '/assets/partnerships.jpg';
import digitalLiteracyImage from '/assets/digital-literacy.jpg';

interface Course {
  id: string;
  title: string;
  slug: string;
  summary: string | null;
  audience: string | null;
  duration: string | null;
  specialization_id: string;
}

interface Specialization {
  id: string;
  name: string;
  description: string;
  image_url: string;
  slug: string;
}

interface WebsiteContent {
  hero: {
    title: string;
    subtitle: string;
  };
  highlights: {
    items: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
  };
  why_choose_us: {
    items: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
  };
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  commitment: {
    title: string;
    description: string;
    features: string[];
  };
}

interface FAQ {
  question: string;
  answer: string;
}

export default function Home() {
  const [specializations, setSpecializations] = useState<Specialization[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [content, setContent] = useState<WebsiteContent | null>(null);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { openEnrollmentSidebar } = useEnrollment();
  const { assets: specAssets } = useMediaAssets('specializations');
  const { assets: courseAssets } = useMediaAssets('courses');
  const HERO_BG_URL = '/assets/default-course-bg.jpg';

  useEffect(() => {
    fetchData();
  }, []);

  // Scroll to top functionality
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch specializations
      const specResponse = await fetch('/data/specializations.json');
      if (specResponse.ok) {
        const specData = await specResponse.json();
        setSpecializations(specData);
      }

      // Fetch all courses
      const coursesResponse = await fetch('/data/courses.json');
      if (coursesResponse.ok) {
        const coursesData = await coursesResponse.json();
        setCourses(coursesData);
      }

      // Fetch website content
      const contentResponse = await fetch('/data/website_content.json');
      if (contentResponse.ok) {
        const contentData = await contentResponse.json();
        setContent(contentData as WebsiteContent);
      }

      // Fetch FAQs
      const faqResponse = await fetch('/data/faqs.json');
      if (faqResponse.ok) {
        const faqData = await faqResponse.json();
        const modesFaq: FAQ = {
          question: 'What are the modes of classes?',
          answer:
            'We offer onsite, online, one-on-one, and customer premises classes. Prices may vary for one-on-one and customer premises.'
        };
        setFaqs([...faqData, modesFaq]);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (slug: string, imageUrl?: string) => {
    // Return database image if exists
    if (imageUrl) return imageUrl;

    // Try media asset by convention key
    const specKey = `specialization_${slug}`;
    const foundSpec = specAssets.find(a => a.asset_key === specKey);
    if (foundSpec?.asset_url) return foundSpec.asset_url;
    // No local fallback
    return '';
  };

  const getIconComponent = (iconString: string) => {
    const iconMap: { [key: string]: any } = {
      '🤝': Users,
      '🌐': Globe,
      '💼': Briefcase,
      '🎓': Award,
      '👨‍🏫': UserCheck,
      '💻': Laptop,
      '🎯': Target,
      '⚡': Zap,
      '🚀': Rocket,
      '🛡️': Shield,
      '📈': TrendingUp,
      '✨': Sparkles,
    };
    
    const IconComponent = iconMap[iconString] || BookOpen;
    return <IconComponent className="h-8 w-8 text-primary" />;
  };

  const getCardImage = (title: string, description: string) => {
    const titleLower = title.toLowerCase();
    const descriptionLower = description.toLowerCase();

    const imagePool = [
      globalStandardsImage,
      marketReadyImage,
      innovationImage,
      internshipImage,
      partnershipsImage,
      digitalLiteracyImage
    ];

    if (titleLower.includes('global') || titleLower.includes('standard') || titleLower.includes('international') || titleLower.includes('world')) {
      return globalStandardsImage;
    }
    if (titleLower.includes('market') || titleLower.includes('ready') || titleLower.includes('job') || titleLower.includes('career') || titleLower.includes('employment')) {
      return marketReadyImage;
    }
    if (titleLower.includes('innovation') || titleLower.includes('cutting') || titleLower.includes('technology') || titleLower.includes('tech') || titleLower.includes('modern')) {
      return innovationImage;
    }
    if (titleLower.includes('internship') || titleLower.includes('hands') || titleLower.includes('practical') || titleLower.includes('experience') || titleLower.includes('training')) {
      return internshipImage;
    }
    if (titleLower.includes('partnership') || titleLower.includes('industry') || titleLower.includes('network') || titleLower.includes('connection') || titleLower.includes('collaboration')) {
      return partnershipsImage;
    }
    if (titleLower.includes('digital') || titleLower.includes('literacy') || titleLower.includes('skill') || titleLower.includes('expert') || titleLower.includes('learn')) {
      return digitalLiteracyImage;
    }

    if (descriptionLower.includes('industry') || descriptionLower.includes('partnership') || descriptionLower.includes('business')) {
      return partnershipsImage;
    }
    if (descriptionLower.includes('job') || descriptionLower.includes('career') || descriptionLower.includes('employment') || descriptionLower.includes('graduate')) {
      return internshipImage;
    }
    if (descriptionLower.includes('innovation') || descriptionLower.includes('technology') || descriptionLower.includes('cutting-edge')) {
      return digitalLiteracyImage;
    }
    if (descriptionLower.includes('practical') || descriptionLower.includes('hands') || descriptionLower.includes('experience')) {
      return marketReadyImage;
    }
    if (descriptionLower.includes('global') || descriptionLower.includes('international') || descriptionLower.includes('world')) {
      return innovationImage;
    }

    const hashCode = (str: string) => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
      }
      return Math.abs(hash);
    };

    const imageIndex = hashCode(title + description) % imagePool.length;
    return imagePool[imageIndex];
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Modern Hero Section with Background Image */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${HERO_BG_URL})`,
          }}
        >
          <div className="absolute inset-0 bg-primary/50"></div>
        </div>

        {/* Floating 3D Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-accent/20 rounded-3xl floating blur-2xl"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-accent/30 rounded-full floating blur-xl" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-accent/25 rounded-2xl floating blur-xl" style={{animationDelay: '4s'}}></div>
          <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-accent/20 rounded-full floating blur-lg" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="relative container mx-auto px-4 py-20 lg:py-32 text-center z-10">
          <div className="max-w-6xl mx-auto perspective-1000">
            {/* Main Title */}
            <div className="slide-up">
              <h1 className="text-5xl md:text-6xl lg:text-8xl font-black mb-8 text-white leading-tight tracking-tight">
                <span className="block mb-4">Big Binary Tech</span>
                <span className="block text-accent text-6xl md:text-7xl lg:text-8xl font-black">
                 International
                </span>
              </h1>
            </div>
            
            {/* Subtitle */}
            <div className="slide-up" style={{animationDelay: '0.2s'}}>
              <p className="text-xl md:text-2xl lg:text-3xl mb-16 text-white/90 leading-relaxed max-w-4xl mx-auto font-light text-justify">
                {content?.hero?.subtitle || "Transform Your Future with Cutting-Edge Technology Education"}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="slide-up flex flex-col sm:flex-row gap-6 justify-center mb-20" style={{animationDelay: '0.4s'}}>
              <button className="btn-3d bg-accent hover:bg-accent/90 text-white font-bold text-lg px-10 py-5 rounded-2xl shadow-2xl">
                <div className="flex items-center justify-center">
                  <Sparkles className="mr-3 h-6 w-6" />
                  Learn More
                  <ArrowRight className="ml-3 h-6 w-6" />
                </div>
              </button>
              <button 
                onClick={() => window.open('https://wa.me/923260188811', '_blank')}
                className="btn-3d glass-card text-white hover:bg-white/20 font-bold text-lg px-10 py-5 rounded-2xl"
              >
                <div className="flex items-center justify-center">
                  <Phone className="mr-3 h-6 w-6" />
                  Get Started Today
                </div>
              </button>
            </div>

            {/* Modern Stats Cards */}
            <div className="fade-in-scale grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 lg:justify-items-center gap-4 md:gap-6 lg:gap-1 max-w-6xl mx-auto" style={{animationDelay: '0.6s'}}>
              <div className="glass-card p-6 text-center transform hover:scale-105 transition-all duration-300">
                <div className="text-4xl font-black text-accent mb-3">1000+</div>
                <div className="text-white/80 font-medium text-justify">Students Graduated</div>
                <div className="w-12 h-1 bg-accent rounded mx-auto mt-3"></div>
              </div>
              <div className="glass-card p-6 text-center transform hover:scale-105 transition-all duration-300">
                <div className="text-4xl font-black text-accent mb-3">95%</div>
                <div className="text-white/80 font-medium text-justify">Job Placement Rate</div>
                <div className="w-12 h-1 bg-accent rounded mx-auto mt-3"></div>
              </div>
              <div className="glass-card p-6 text-center transform hover:scale-105 transition-all duration-300">
                <div className="text-4xl font-black text-accent mb-3">50+</div>
                <div className="text-white/80 font-medium text-justify">Expert Instructors</div>
                <div className="w-12 h-1 bg-accent rounded mx-auto mt-3"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Modern Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-8 h-12 border-2 border-white/30 rounded-full flex justify-center items-end pb-2">
            <div className="w-1 h-3 bg-accent rounded-full floating"></div>
          </div>
        </div>
      </section>

      {/* Modern Highlights Section */}
      {content?.highlights && (
        <section className="py-24 bg-muted/30">
          {/* ... unchanged ... */}
        </section>
      )}

      {/* Modern Why Choose Us Section */}
      {content?.why_choose_us && (
        <section className="py-24 bg-background">
          {/* ... unchanged ... */}
        </section>
      )}

      {/* Modern Classroom Infrastructure Section */}
      <section className="py-24 bg-muted/30 relative overflow-hidden">
        {/* ... unchanged ... */}
      </section>

      {/* Modes of Classes Section */}
      <section className="py-24 bg-background">
        {/* ... unchanged ... */}
      </section>

      {/* Modern Specializations Section */}
      <section className="py-24 bg-muted/30">
        {/* ... unchanged ... */}
      </section>
      
      {/* Modern Course Slider Section */}
      {courses.length > 0 && (
        <section className="py-24 bg-background relative overflow-hidden">
          {/* ... unchanged ... */}
        </section>
      )}

      {/* Modern Commitment Section */}
      {content?.commitment && (
        <section className="py-24 bg-muted/30">
          {/* ... unchanged ... */}
        </section>
      )}

      {/* Modern FAQ Section */}
      {faqs.length > 0 && (
        <section className="py-24 bg-background">
          {/* ... unchanged ... */}
        </section>
      )}

      {/* Modern Contact CTA Section */}
      {content?.contact && (
        <section className="py-32 bg-primary text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>

          <div className="container mx-auto px-4 text-center relative z-10">
            {/* ... unchanged ... */}
            <div className="fade-in-scale grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto" style={{animationDelay: '0.4s'}}>
              <div className="glass-card p-8 text-center group hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/30 transition-colors">
                  <Phone className="h-8 w-8 text-accent" />
                </div>
                <h4 className="text-xl font-black text-white mb-3">Call Us</h4>
                <p className="text-white/80 font-medium">+92 326 0188811</p>
              </div>
              <div className="glass-card p-8 text-center group hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/30 transition-colors">
                  <Mail className="h-8 w-8 text-accent" />
                </div>
                <h4 className="text-xl font-black text-white mb-3">Email Us</h4>
                <p className="text-white/80 font-medium">info@bigbinarytech.com</p>
              </div>
              <div className="glass-card p-8 text-center group hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/30 transition-colors">
                  <MapPin className="h-8 w-8 text-accent" />
                </div>
                <h4 className="text-xl font-black text-white mb-3">Visit Us</h4>
                <p className="text-white/80 font-medium text-sm leading-relaxed">2nd Floor, {content.contact.address}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 w-12 h-12 bg-white hover:bg-gray-100 text-blue-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center"
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}
