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
  const HERO_BG_URL = 'https://clucdoviijndyduaufbp.supabase.co/storage/v1/object/sign/bbti/About%20Backgroun.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mN2JhYmU5ZS0wMDIwLTQ5YmItYjg2MC01MTUwOGI4MDNlZTAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJiYnRpL0Fib3V0IEJhY2tncm91bi5qcGciLCJpYXQiOjE3NTYxMjk5NzYsImV4cCI6MTc4NzY2NTk3Nn0.LP8iE9VSsD4kuDctnrln74TzUR24U8J_8vwXDfN6_gY';

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
      const { data: specData } = await supabase
        .from('specializations')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');

      if (specData) {
        setSpecializations(specData);
      }

      // Fetch all courses
      const { data: coursesData } = await supabase
        .from('courses')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');

      if (coursesData) {
        setCourses(coursesData);
      }

      // Fetch website content
      const { data: contentData } = await supabase
        .from('website_content')
        .select('*');

      if (contentData) {
        const contentMap: any = {};
        contentData.forEach(item => {
          contentMap[item.section] = item.content;
        });
        setContent(contentMap as WebsiteContent);
      }

      // Fetch FAQs
      const { data: faqData } = await supabase
        .from('faqs')
        .select('question, answer')
        .eq('is_active', true)
        .order('sort_order');

      if (faqData) {
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
                  International Institute
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
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 perspective-1000">
              <div className="slide-up">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-primary">
                  Our Highlights
                </h2>
                <div className="w-24 h-1 bg-accent rounded mx-auto mb-6"></div>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-center">
                  What makes us stand out in technology education
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 perspective-1000">
              {content.highlights.items.map((highlight, index) => (
                <div key={index} className="fade-in-scale" style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="card-modern text-center group h-full overflow-hidden">
                    {/* Image Container */}
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={getCardImage(highlight.title, highlight.description)} 
                        alt={highlight.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-primary/20 group-hover:bg-accent/30 transition-all duration-300"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/90 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                          {getIconComponent(highlight.icon)}
                        </div>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-8">
                                             <h3 className="text-lg md:text-xl lg:text-2xl font-black text-primary mb-4 group-hover:text-accent transition-colors text-justify line-clamp-2 min-h-[3rem]">
                        {highlight.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-justify">
                        {highlight.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Modern Why Choose Us Section */}
      {content?.why_choose_us && (
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 perspective-1000">
              <div className="slide-up">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-primary">
                  Why Choose Us
                </h2>
                <div className="w-24 h-1 bg-accent rounded mx-auto mb-6"></div>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-center">
                  Experience the Big Binary Tech difference in technology education
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 perspective-1000">
              {content.why_choose_us.items.map((item, index) => (
                <div key={index} className="fade-in-scale" style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="card-modern group h-full overflow-hidden">
                    {/* Image Container */}
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={getCardImage(item.title, item.description)} 
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-primary/20 group-hover:bg-accent/30 transition-all duration-300"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/90 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                          {getIconComponent(item.icon)}
                        </div>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-8">
                                             <h3 className="text-lg md:text-xl font-black text-primary mb-4 group-hover:text-accent transition-colors text-justify line-clamp-2 min-h-[3rem]">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-justify">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Modern Classroom Infrastructure Section */}
      <section className="py-24 bg-muted/30 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary to-accent"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 perspective-1000">
            <div className="slide-up">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-primary">
                State-of-the-Art
                <span className="block text-accent">Classroom Infrastructure</span>
              </h2>
              <div className="w-24 h-1 bg-accent rounded mx-auto mb-6"></div>
                             <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-center">
                Experience learning in our modern, fully-equipped computer labs with cutting-edge technology
              </p>
            </div>
          </div>

          {/* Classroom Images Collage */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 mb-16">
            {/* Main Large Image */}
            <div className="lg:col-span-8 fade-in-scale" style={{animationDelay: '0.1s'}}>
              <div className="card-modern group overflow-hidden h-full">
                <div className="relative h-96 md:h-[500px] overflow-hidden">
                  <img 
                    src="https://clucdoviijndyduaufbp.supabase.co/storage/v1/object/sign/bbti/classroom.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mN2JhYmU5ZS0wMDIwLTQ5YmItYjg2MC01MTUwOGI4MDNlZTAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJiYnRpL2NsYXNzcm9vbS5qcGciLCJpYXQiOjE3NTYxNDAyOTQsImV4cCI6MTc4NzY3NjI5NH0.zDgA1093SoeSqmLbAbBh4kE2T7TqO21CBrPXa9Y1E6c" 
                    alt="Modern Computer Lab with Windows PCs"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-2xl font-black mb-2">Apple iMac Lab</h3>
                    <p className="text-white/90">Fully equipped with latest hardware and software</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Side Images Stack */}
            <div className="lg:col-span-4 space-y-6">
              {/* Apple iMac Lab */}
              <div className="fade-in-scale" style={{animationDelay: '0.2s'}}>
                <div className="card-modern group overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src="https://clucdoviijndyduaufbp.supabase.co/storage/v1/object/sign/bbti/classroom.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mN2JhYmU5ZS0wMDIwLTQ5YmItYjg2MC01MTUwOGI4MDNlZTAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJiYnRpL2NsYXNzcm9vbS5qcGciLCJpYXQiOjE3NTYxNDAzNjYsImV4cCI6MTc4NzY3NjM2Nn0.30m7x-1mW4rVhVTn8Yef-rC2vo1yVqpGLQvnIzH0yCM" 
                      alt="Apple iMac Computer Lab"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h4 className="text-lg font-black">Apple iMac Lab</h4>
                      <p className="text-white/90 text-sm">Creative design & development</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mixed Technology Lab */}
              <div className="fade-in-scale" style={{animationDelay: '0.3s'}}>
                <div className="card-modern group overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src="https://clucdoviijndyduaufbp.supabase.co/storage/v1/object/sign/bbti/classroom.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mN2JhYmU5ZS0wMDIwLTQ5YmItYjg2MC01MTUwOGI4MDNlZTAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJiYnRpL2NsYXNzcm9vbS5qcGciLCJpYXQiOjE3NTYxNDAyOTQsImV4cCI6MTc4NzY3NjI5NH0.zDgA1093SoeSqmLbAbBh4kE2T7TqO21CBrPXa9Y1E6c" 
                      alt="Mixed Technology Computer Lab"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h4 className="text-lg font-black">Computer Lab</h4>
                      <p className="text-white/90 text-sm">Versatile learning environment</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Infrastructure Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <div className="fade-in-scale text-center" style={{animationDelay: '0.4s'}}>
              <div className="card-modern p-8 group hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors">
                  <Laptop className="h-8 w-8 text-accent" />
                </div>
                                  <h3 className="text-lg md:text-xl font-black text-primary mb-4 text-justify line-clamp-2 min-h-[2.5rem]">Latest Hardware</h3>
                  <p className="text-muted-foreground leading-relaxed text-justify">
                  High-performance computers with the latest processors and graphics cards
                </p>
              </div>
            </div>

            <div className="fade-in-scale text-center" style={{animationDelay: '0.5s'}}>
              <div className="card-modern p-8 group hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors">
                  <Wifi className="h-8 w-8 text-accent" />
                </div>
                                 <h3 className="text-lg md:text-xl font-black text-primary mb-4 text-justify line-clamp-2 min-h-[2.5rem]">High-Speed Internet</h3>
                 <p className="text-muted-foreground leading-relaxed text-justify">
                  Fiber-optic internet connection for seamless online learning and research
                </p>
              </div>
            </div>

            <div className="fade-in-scale text-center" style={{animationDelay: '0.6s'}}>
              <div className="card-modern p-8 group hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors">
                  <Monitor className="h-8 w-8 text-accent" />
                </div>
                                 <h3 className="text-lg md:text-xl font-black text-primary mb-4 text-justify line-clamp-2 min-h-[2.5rem]">Professional Software</h3>
                 <p className="text-muted-foreground leading-relaxed text-justify">
                  Industry-standard software licenses for all major development tools
                </p>
              </div>
            </div>

            <div className="fade-in-scale text-center" style={{animationDelay: '0.7s'}}>
              <div className="card-modern p-8 group hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors">
                  <Users className="h-8 w-8 text-accent" />
                </div>
                                 <h3 className="text-lg md:text-xl font-black text-primary mb-4 text-justify line-clamp-2 min-h-[2.5rem]">Collaborative Space</h3>
                 <p className="text-muted-foreground leading-relaxed text-justify">
                  Designed for team projects and interactive learning experiences
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modes of Classes Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 perspective-1000">
            <div className="slide-up">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-primary">
                Modes of Classes
              </h2>
              <div className="w-24 h-1 bg-accent rounded mx-auto mb-6"></div>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-center">
                Learn in the way that suits you best
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <div className="card-modern p-8 text-center group">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors">
                <Users className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-lg md:text-xl font-black text-primary mb-4">Onsite</h3>
              <p className="text-muted-foreground leading-relaxed">In-person classes at our campus.</p>
            </div>

            <div className="card-modern p-8 text-center group">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors">
                <Laptop className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-lg md:text-xl font-black text-primary mb-4">Online</h3>
              <p className="text-muted-foreground leading-relaxed">Live virtual classes from anywhere.</p>
            </div>

            <div className="card-modern p-8 text-center group">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors">
                <UserCheck className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-lg md:text-xl font-black text-primary mb-4">One-on-One</h3>
              <p className="text-muted-foreground leading-relaxed">Personalized coaching. Pricing varies.</p>
            </div>

            <div className="card-modern p-8 text-center group">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors">
                <MapPin className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-lg md:text-xl font-black text-primary mb-4">Customer Premises</h3>
              <p className="text-muted-foreground leading-relaxed">Training at your location. Pricing varies.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Specializations Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 perspective-1000">
            <div className="slide-up">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-primary">
                Our Specializations
              </h2>
              <div className="w-24 h-1 bg-accent rounded mx-auto mb-6"></div>
                             <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-center">
                Each program is crafted with industry expertise and designed for maximum career impact
              </p>
            </div>
          </div>
          
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
            {specializations.map((specialization, index) => (
              <div key={specialization.id} className="fade-in-scale" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="card-modern group overflow-hidden cursor-pointer h-full flex flex-col">
                  {/* Image Container - Always show image */}
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={getImageUrl(specialization.slug, specialization.image_url)} 
                      alt={specialization.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        // If image fails, clear src to avoid broken image icon
                        e.currentTarget.src = '';
                      }}
                    />
                    <div className="absolute inset-0 bg-primary/20 group-hover:bg-accent/30 transition-all duration-300"></div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-8 flex flex-col flex-grow">
                                         <h3 className="text-lg md:text-xl lg:text-2xl font-black text-primary mb-4 group-hover:text-accent transition-colors duration-300 text-justify line-clamp-2 min-h-[3rem]">
                      {specialization.name}
                    </h3>
                     <p className="text-muted-foreground mb-6 leading-relaxed flex-grow text-justify">
                      {specialization.description}
                    </p>
                    
                    <div className="mt-auto pt-4">
                      <Link to={`/specializations/${specialization.slug}`}>
                        <button className="btn-3d w-full bg-primary hover:bg-accent text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                          <span className="flex items-center justify-center">
                            View Courses
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </span>
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Modern Course Slider Section */}
      {courses.length > 0 && (
        <section className="py-24 bg-background relative overflow-hidden">
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary to-accent"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16 perspective-1000">
              <div className="slide-up">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-primary">
                  Featured Programs
                </h2>
                <div className="w-24 h-1 bg-accent rounded mx-auto mb-6"></div>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-center">
                  Discover our industry-leading programs designed to accelerate your tech career
                </p>
              </div>
            </div>
            
            <div className="fade-in-scale relative" style={{animationDelay: '0.2s'}}>
              <Carousel 
                className="max-w-7xl mx-auto perspective-1000" 
                opts={{ 
                  align: "start", 
                  loop: true
                }}
              >
                <CarouselContent className="-ml-3 sm:-ml-4 md:-ml-6">
                  {courses.map((course) => (
                    <CarouselItem key={course.id} className="pl-3 sm:pl-4 md:pl-6 sm:basis-1/2 lg:basis-1/3">
                      <div className="card-modern h-full group cursor-pointer overflow-hidden flex flex-col transform hover:scale-105 transition-all duration-500 hover:shadow-2xl border-0 shadow-lg">
                        {/* Course Header with Gradient Accent */}
                        <div className="relative">
                          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-primary"></div>
                          <div className="p-8 pb-6">
                            <div className="flex items-center justify-between mb-6">
                              <span className="px-4 py-2 bg-accent/10 text-accent text-sm font-bold rounded-full backdrop-blur-sm border border-accent/20">
                                {course.audience || 'All Levels'}
                              </span>
                              <div className="flex text-accent">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className="h-4 w-4 fill-current drop-shadow-sm" />
                                ))}
                              </div>
                            </div>
                            
                            <h3 className="text-lg md:text-xl lg:text-2xl font-black text-primary mb-4 group-hover:text-accent transition-colors duration-300 text-justify line-clamp-2 min-h-[3rem]">
                              {course.title}
                            </h3>
                            
                            <p className="text-muted-foreground mb-6 line-clamp-3 leading-relaxed text-justify">
                              {course.summary || 'Transform your skills with our comprehensive, industry-focused curriculum designed for real-world success'}
                            </p>
                          </div>
                        </div>
                        
                        {/* Course Footer with Consistent Button */}
                        <div className="p-8 pt-0 border-t border-border/10 mt-auto">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2 text-muted-foreground">
                              <Clock className="w-4 h-4" />
                              <span className="text-sm font-medium">{course.duration || '3 Months'}</span>
                            </div>
                            <Link to={`/courses/${course.slug}`}>
                              <button className="btn-3d bg-primary hover:bg-accent text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
                                <span className="flex items-center justify-center">
                                  Learn More
                                  <ArrowRight className="ml-2 h-4 w-4" />
                                </span>
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                
                {/* Enhanced Navigation Buttons */}
                <CarouselPrevious className="left-4 bg-white/90 backdrop-blur-md border-white/20 shadow-2xl hover:bg-white hover:shadow-3xl transition-all duration-300 text-primary hover:text-accent w-12 h-12 rounded-full" />
                <CarouselNext className="right-4 bg-white/90 backdrop-blur-md border-white/20 shadow-2xl hover:bg-white hover:shadow-3xl transition-all duration-300 text-primary hover:text-accent w-12 h-12 rounded-full" />
                
                {/* Auto-play Indicator */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <div className="flex space-x-2">
                    {courses.map((_, index) => (
                      <div 
                        key={index} 
                        className="w-2 h-2 rounded-full bg-white/30 transition-all duration-300"
                      />
                    ))}
                  </div>
                </div>
              </Carousel>
            </div>
          </div>
        </section>
      )}

      {/* Modern Commitment Section */}
      {content?.commitment && (
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center">
              <div className="slide-up">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-primary">
                  {content.commitment.title}
                </h2>
                <div className="w-24 h-1 bg-accent rounded mx-auto mb-8"></div>
                                 <p className="text-xl text-muted-foreground mb-16 leading-relaxed max-w-3xl mx-auto text-justify">
                  {content.commitment.description}
                </p>
              </div>
              
              <div className="fade-in-scale grid sm:grid-cols-2 lg:grid-cols-3 gap-6" style={{animationDelay: '0.2s'}}>
                {content.commitment.features.map((feature, index) => (
                  <div key={index} className="card-modern p-6 text-left group">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                        <CheckCircle2 className="h-5 w-5 text-accent" />
                      </div>
                      <span className="text-primary font-semibold">{feature}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Modern FAQ Section */}
      {faqs.length > 0 && (
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 perspective-1000">
              <div className="slide-up">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-primary">
                  Frequently Asked Questions
                </h2>
                <div className="w-24 h-1 bg-accent rounded mx-auto mb-6"></div>
                                 <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-center">
                  Get answers to the most common questions about our programs
                </p>
              </div>
            </div>

            <div className="max-w-5xl mx-auto">
              <Accordion type="single" collapsible className="w-full space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="rounded-2xl border border-border/60 bg-white shadow-sm hover:shadow-md transition-shadow"
                  >
                    <AccordionTrigger className="px-6 py-5 text-left text-primary font-extrabold text-xl md:text-2xl">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 bg-muted/20">
                      <p className="text-muted-foreground leading-relaxed text-lg">
                        {faq.answer}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      )}

      {/* Modern Contact CTA Section */}
      {content?.contact && (
        <section className="py-32 bg-primary text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          
          {/* Floating Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-10 right-20 w-24 h-24 bg-accent/20 rounded-full floating blur-xl"></div>
            <div className="absolute bottom-20 left-32 w-16 h-16 bg-accent/30 rounded-2xl floating blur-lg" style={{animationDelay: '2s'}}></div>
          </div>
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="slide-up">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 text-white">
                Ready to Start Your 
                <span className="block text-accent">Journey?</span>
              </h2>
                             <p className="text-xl lg:text-2xl mb-16 text-white/90 max-w-4xl mx-auto font-light leading-relaxed text-justify">
                Join thousands of students who have transformed their careers with cutting-edge technology education
              </p>
            </div>
            
            <div className="fade-in-scale flex flex-col sm:flex-row gap-6 justify-center mb-20" style={{animationDelay: '0.2s'}}>
              <button 
                onClick={openEnrollmentSidebar}
                className="btn-3d bg-accent hover:bg-accent/90 text-white font-bold text-lg px-10 py-5 rounded-2xl shadow-2xl"
              >
                <div className="flex items-center justify-center">
                  <Sparkles className="mr-3 h-6 w-6" />
                  Enroll Now
                </div>
              </button>
              <button className="btn-3d glass-card text-white hover:bg-white/20 font-bold text-lg px-10 py-5 rounded-2xl">
                <div className="flex items-center justify-center">
                  <Phone className="mr-3 h-6 w-6" />
                  Schedule a Call
                </div>
              </button>
            </div>
            
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
                <p className="text-white/80 font-medium">info@bbti.edu.pk</p>
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