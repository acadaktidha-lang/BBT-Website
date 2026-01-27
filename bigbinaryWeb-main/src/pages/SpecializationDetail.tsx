import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { 
  ArrowRight, 
  Clock,
  Users,
  BookOpen,
  Download,
  ExternalLink,
  ArrowLeft,
  Star
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useSEO } from '@/hooks/useSEO';

// Images come from backend/media assets
import { useMediaAssets } from '@/hooks/useMediaAsset';
import defaultCourseBg from '/assets/default-course-bg.jpg';

interface Course {
  id: string;
  title: string;
  slug: string;
  summary?: string;
  image_url?: string;
  specialization_slug?: string;
  duration?: string;
  price?: number;
  audience?: string;
}


interface Specialization {
  id: string;
  name: string;
  slug: string;
  description: string;
  image_url?: string;
}
export default function SpecializationDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [specialization, setSpecialization] = useState<Specialization | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const { assets: specAssets } = useMediaAssets('specializations');

  // Resolve image from backend/media assets or DB field
  const getSpecializationImage = (name: string, imageUrl?: string) => {
    // Try media asset key specialization_<slug>
    const slugSafe = (name || '').toLowerCase().replace(/\s+/g, '-');
    const found = specAssets.find(a => a.asset_key === `specialization_${slugSafe}`);
    if (found?.asset_url) return found.asset_url;
    if (imageUrl) return imageUrl;
    return '';
  };

  useEffect(() => {
    if (slug) {
      fetchSpecializationAndCourses();
    }
  }, [slug]);

  const fetchSpecializationAndCourses = async () => {
    try {
      setLoading(true);
      
      // Fetch specialization
      const specResponse = await fetch('/data/specializations.json');
      if (specResponse.ok) {
        const specsData = await specResponse.json();
        const specData = specsData.find((s: any) => s.slug === slug);
        if (specData) {
          setSpecialization(specData);

          // Fetch courses for this specialization (mock all courses)
         const coursesResponse = await fetch('/data/courses.json');
if (coursesResponse.ok) {
  const coursesData: Course[] = await coursesResponse.json();
  const filtered = coursesData.filter(c => c.specialization_slug === slug);
  setCourses(filtered);
}

        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load specialization details. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Update SEO when specialization is loaded
  useSEO({
    title: specialization?.name,
    description: specialization ? `${specialization.description} - Explore ${specialization.name} courses at Big Binary Tech International Institute.` : undefined,
    keywords: specialization ? `Big Binary ${specialization.name}, Big Binary Tech ${specialization.name} courses, ${specialization.name} training, Big Binary specialization` : undefined,
    canonical: specialization ? `https://bigbinarytech.com/specializations/${specialization.slug || slug}` : undefined,
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!specialization) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Specialization Not Found</h1>
          <p className="text-muted-foreground mb-6">The specialization you're looking for doesn't exist.</p>
          <Link to="/">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="relative bg-gradient-to-r from-primary to-blue-600 text-white py-20 min-h-[60vh] flex items-center overflow-hidden">
        {/* Background Image - Always show */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${getSpecializationImage(specialization.name, specialization.image_url)})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-blue-600/90"></div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl lg:text-5xl font-bold">
                  {specialization.name}
                </h1>
                <p className="text-xl text-white/90 leading-relaxed">
                  {specialization.description}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Badge variant="secondary" className="text-primary px-4 py-2">
                    <BookOpen className="w-4 h-4 mr-2" />
                    {courses.length} Course{courses.length !== 1 ? 's' : ''} Available
                  </Badge>
                  <Badge variant="secondary" className="text-primary px-4 py-2">
                    <Star className="w-4 h-4 mr-2 fill-yellow-400 text-yellow-400" />
                    Expert Instructors
                  </Badge>
                </div>
              </div>
              
              {/* Specialization Image - Always show fallback */}
              <div className="relative">
                <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                  <img 
                    src={getSpecializationImage(specialization.name, specialization.image_url)} 
                    alt={specialization.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Floating accent elements */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent/20 rounded-full blur-xl"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/10 rounded-lg rotate-12"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 text-primary border-primary">
              Available Courses
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Our {specialization.name} Programs</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our comprehensive courses designed to equip you with industry-relevant skills and international opportunities.
            </p>
          </div>

          {courses.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-6 bg-muted rounded-2xl flex items-center justify-center">
                <BookOpen className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">New Courses Coming Soon</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                We're developing exciting new programs for this specialization. Please check back soon or contact us for updates.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {courses.map((course) => (
                <Card key={course.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="aspect-video bg-gradient-to-br from-primary/10 to-blue-500/10 relative overflow-hidden">
                    <img 
                      src={course.image_url || defaultCourseBg} 
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        // Fallback if course image fails to load
                        e.currentTarget.src = defaultCourseBg;
                      }}
                    />
                  </div>

                  <CardHeader>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2">
                      {course.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {course.summary}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="text-xs">
                        <Clock className="w-3 h-3 mr-1" />
                        {course.duration}
                      </Badge>
                      {course.price && (
                        <Badge variant="outline" className="text-xs">
                          PKR {course.price.toLocaleString()}
                        </Badge>
                      )}
                      {course.audience && (
                        <Badge variant="outline" className="text-xs">
                          <Users className="w-3 h-3 mr-1" />
                          {course.audience}
                        </Badge>
                      )}
                    </div>

                    <Link to={`/courses/${course.slug}`} className="block">
                      <Button className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/5 to-blue-500/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">Ready to Start Your Journey?</h2>
                <p className="text-lg text-muted-foreground">
                  Join thousands of students who have transformed their careers through our {specialization.name.toLowerCase()} programs. 
                  Get expert guidance, hands-on experience, and industry recognition.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground">Expert-led curriculum designed by industry professionals</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground">Flexible learning schedules to fit your lifestyle</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground">International certification and job placement assistance</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="flex-1">
                    Explore All Courses
                  </Button>
                  <Button variant="outline" size="lg" className="flex-1">
                    Download Brochure
                  </Button>
                </div>
              </div>
              
              {/* Image - Always show */}
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src={getSpecializationImage(specialization.name, specialization.image_url)} 
                    alt={`${specialization.name} Programs`}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Decorative elements */}
                <div className="absolute -z-10 top-8 left-8 w-full h-full bg-primary/10 rounded-2xl"></div>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-full blur-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}