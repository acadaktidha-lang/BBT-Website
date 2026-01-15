import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/integrations/supabase/client';
import { useEnrollment } from '@/contexts/EnrollmentContext';
import { 
  ArrowLeft,
  Clock,
  Users,
  BookOpen,
  Download,
  ExternalLink,
  CheckCircle2,
  Play,
  Star
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useSEO } from '@/hooks/useSEO';

// Images come from backend/media assets
import defaultCourseBg from '@/assets/default-course-bg.jpg';
import { useMediaAssets } from '@/hooks/useMediaAsset';

interface Course {
  id: string;
  title: string;
  slug: string;
  summary: string;
  introduction: string;
  duration: string;
  price: number;
  image_url: string;
  brochure_url: string;
  admission_form_link: string;
  audience: string;
  modules: any;
  extra_fields: any;
  specialization_id: string;
}

interface Specialization {
  name: string;
  slug: string;
}

export default function CourseDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [specialization, setSpecialization] = useState<Specialization | null>(null);
  const [loading, setLoading] = useState(true);
  const { openEnrollmentSidebar } = useEnrollment();
  const { assets: courseAssets } = useMediaAssets('courses');

  useEffect(() => {
    if (slug) {
      fetchCourseDetails();
    }
  }, [slug]);

  const fetchCourseDetails = async () => {
    try {
      setLoading(true);
      
      // Fetch course
      const { data: courseData } = await supabase
        .from('courses')
        .select('*, specializations(name, slug)')
        .eq('slug', slug)
        .eq('is_active', true)
        .single();

      if (courseData) {
        setCourse(courseData);
        setSpecialization(courseData.specializations);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load course details. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Update SEO when course is loaded
  useSEO({
    title: course?.title,
    description: course ? `${course.summary || course.introduction || ''} - Enroll in ${course.title} at Big Binary Tech International Institute.` : undefined,
    keywords: course ? `Big Binary ${course.title}, Big Binary Tech ${course.title} course, ${course.title} training, Big Binary course, ${course.title} certification` : undefined,
    canonical: course ? `https://bigbinarytech.com/courses/${course.slug || slug}` : undefined,
  });

  const handleEnrollment = () => {
    openEnrollmentSidebar();
  };

  const handleBrochureDownload = () => {
    if (course?.brochure_url) {
      window.open(course.brochure_url, '_blank');
    } else {
      toast({
        title: "Not Available",
        description: "Brochure is not available for this course.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
          <p className="text-muted-foreground mb-6">The course you're looking for doesn't exist.</p>
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

  const courseImage = () => {
    if (!course) return defaultCourseBg;
    const found = courseAssets.find(a => a.asset_key === `course_${course.slug}`);
    return found?.asset_url || course.image_url || defaultCourseBg;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary via-blue-600 to-primary text-white overflow-hidden min-h-[60vh]">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${courseImage()})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-blue-600/90 to-primary/90"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
              <Link 
                to={specialization ? `/specializations/${specialization.slug}` : "/"} 
                className="inline-flex items-center text-white/80 hover:text-white transition-colors"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to {specialization?.name || 'Home'}
              </Link>
              {specialization && (
                <Badge variant="secondary" className="text-primary">
                  {specialization.name}
                </Badge>
              )}
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8 items-start">
              <div className="lg:col-span-2">
                <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                  {course.title}
                </h1>
                <p className="text-xl text-white/90 leading-relaxed mb-6">
                  {course.summary}
                </p>
                
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center space-x-2 bg-white/10 rounded-lg px-3 py-2">
                    <Clock className="h-5 w-5" />
                    <span className="text-sm font-medium">{course.duration}</span>
                  </div>
                  {course.price && (
                    <div className="flex items-center space-x-2 bg-white/10 rounded-lg px-3 py-2">
                      <span className="text-sm font-medium">PKR {course.price.toLocaleString()}</span>
                    </div>
                  )}
                  {course.audience && (
                    <div className="flex items-center space-x-2 bg-white/10 rounded-lg px-3 py-2">
                      <Users className="h-5 w-5" />
                      <span className="text-sm font-medium">{course.audience}</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Course Image */}
              <div className="lg:col-span-1">
                <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src={courseImage()} 
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Action Card */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-xl">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-6 items-center">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold">Ready to Begin Your Journey?</h3>
                    <p className="text-muted-foreground">
                      Join our comprehensive {course.title} program and advance your skills with expert guidance.
                    </p>
                    <div className="flex items-center space-x-1 mb-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-2 text-sm text-muted-foreground">Rated 5.0 by our students</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Button onClick={handleEnrollment} size="lg" className="w-full">
                      <Play className="mr-2 h-5 w-5" />
                      Enroll Now
                    </Button>
                    <Button 
                      onClick={handleBrochureDownload}
                      variant="outline" 
                      size="lg" 
                      className="w-full"
                    >
                      <Download className="mr-2 h-5 w-5" />
                      Download Brochure
                    </Button>
                    <Button 
                      variant="secondary" 
                      size="lg" 
                      className="w-full"
                      onClick={() => window.open('https://wa.me/923260188811', '_blank')}
                    >
                      <ExternalLink className="mr-2 h-5 w-5" />
                      Contact Us
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {/* Course Details Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-8">
                {/* Introduction */}
                <div>
                  <h2 className="text-2xl font-bold mb-4">Course Introduction</h2>
                  <div className="prose prose-lg max-w-none text-muted-foreground">
                    <p>{course.introduction}</p>
                  </div>
                </div>

                {/* Course Modules */}
                {course.modules && Object.keys(course.modules).length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Course Modules</h2>
                    <div className="space-y-2">
                      {Object.entries(course.modules).map(([moduleTitle, moduleData]: [string, any], index: number) => (
                        <div key={moduleTitle} className="border border-muted rounded-lg">
                          <details className="group">
                            <summary className="flex items-center justify-between cursor-pointer p-4 hover:bg-muted/50 rounded-lg">
                              <div className="flex items-center space-x-3">
                                <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">
                                  {index + 1}
                                </div>
                                <div>
                                  <h3 className="text-lg font-semibold">{moduleTitle}</h3>
                                  {moduleData.duration && (
                                    <p className="text-sm text-muted-foreground">Duration: {moduleData.duration}</p>
                                  )}
                                </div>
                              </div>
                              <svg className="w-5 h-5 text-muted-foreground group-open:rotate-180 transition-transform" 
                                   fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </summary>
                            <div className="px-4 pb-4">
                              {moduleData.topics && moduleData.topics.length > 0 && (
                                <div>
                                  <h4 className="font-semibold mb-3">Topics Covered:</h4>
                                  <ul className="grid sm:grid-cols-2 gap-2">
                                    {moduleData.topics.map((topic: string, topicIndex: number) => (
                                      <li key={topicIndex} className="flex items-center space-x-2 text-sm">
                                        <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                                        <span>{topic}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </details>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Extra Fields */}
                {course.extra_fields && Object.keys(course.extra_fields).length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Additional Information</h2>
                    <div className="space-y-6">
                      {Object.entries(course.extra_fields).map(([key, value]: [string, any]) => (
                        <div key={key}>
                          <h3 className="text-lg font-semibold mb-2 capitalize">
                            {key.replace(/_/g, ' ')}
                          </h3>
                          {Array.isArray(value) ? (
                            <ul className="space-y-1">
                              {value.map((item, index) => (
                                <li key={index} className="flex items-center space-x-2">
                                  <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                                  <span className="text-muted-foreground">{item}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-muted-foreground">{value}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-8 space-y-6">
                  {/* Course Features */}
                  <Card>
                    <CardHeader>
                      <CardTitle>What You'll Get</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <span className="text-sm">24/7 Access to Course Material</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <span className="text-sm">Dedicated Mentor Support</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <span className="text-sm">Industry-Recognized Certificate</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <span className="text-sm">Guaranteed Internship</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <span className="text-sm">Flexible Learning Schedule</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Contact Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Need Help?</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Have questions about this course? Our team is here to help.
                      </p>
                      <Button variant="outline" className="w-full">
                        Contact Us
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}