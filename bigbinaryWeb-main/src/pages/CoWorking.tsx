import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Wifi,
  Zap,
  Car,
  MapPin,
  Phone,
  Mail,
  Users,
  Clock,
  Monitor,
  Shield,
  Coffee,
  BookOpen
} from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
// Classroom images from storage
const classroomImage1 = '/assets/calssroom.png.jpeg';
const classroomImage2 = '/assets/calssroom.png.jpeg';

export default function CoWorking() {
  useSEO({
    title: 'Co-Working Space',
    description: 'Premium co-working space at Big Binary Tech International Institute in DHA Phase 2. Modern facilities, high-speed internet, and productive environment for professionals and teams.',
    keywords: 'Big Binary co-working, Big Binary Tech workspace, DHA Phase 2 co-working, professional workspace, Big Binary office space',
    canonical: 'https://bigbinarytech.com/co-working',
  });
  const handleContactClick = () => {
    window.open('https://wa.me/923260188811', '_blank');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-blue-600 text-white py-20 min-h-[70vh] flex items-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${classroomImage1})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-blue-600/90"></div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge variant="secondary" className="text-primary px-6 py-2 text-lg">
              Professional Co-Working Space
            </Badge>
            <h1 className="text-5xl lg:text-7xl font-black">
              Your Next Office Awaits
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto">
              Premium co-working space in the heart of DHA Phase 2. Modern facilities, high-speed internet, and a productive environment for professionals and teams.
            </p>
            <Button 
              onClick={handleContactClick}
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 font-bold text-lg px-8 py-6 mt-4"
            >
              Contact Us Now
              <Phone className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black mb-6 text-primary">
              Flexible Pricing Plans
            </h2>
            <div className="w-24 h-1 bg-accent rounded mx-auto mb-6"></div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose the plan that fits your work style
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Dedicated Seat */}
            <Card className="card-modern hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary">
              <CardHeader className="text-center pb-8">
                <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Users className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-3xl font-black mb-4">Dedicated Seat</CardTitle>
                <CardDescription className="text-lg">Your personal workspace</CardDescription>
                <div className="mt-6">
                  <div className="text-5xl font-black text-primary">PKR 20,000</div>
                  <div className="text-muted-foreground mt-2">per month</div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>24/7 Access</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Dedicated Desk Space</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>High-Speed Internet</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Power Backup</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Free Parking</span>
                </div>
                <Button onClick={handleContactClick} className="w-full mt-6" size="lg">
                  Get Started
                </Button>
              </CardContent>
            </Card>

            {/* Meeting Room */}
            <Card className="card-modern hover:shadow-2xl transition-all duration-300 border-2 hover:border-accent">
              <CardHeader className="text-center pb-8">
                <div className="w-20 h-20 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="h-10 w-10 text-accent" />
                </div>
                <CardTitle className="text-3xl font-black mb-4">Meeting Room</CardTitle>
                <CardDescription className="text-lg">Professional meeting space</CardDescription>
                <div className="mt-6">
                  <div className="text-5xl font-black text-accent">PKR 2,000</div>
                  <div className="text-muted-foreground mt-2">per hour</div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>Fully Equipped Room</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>Projector & Screen</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>Whiteboard & Markers</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>High-Speed Internet</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>AC & Comfortable Seating</span>
                </div>
                <Button onClick={handleContactClick} className="w-full mt-6" size="lg">
                  Book Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black mb-6 text-primary">
              World-Class Facilities
            </h2>
            <div className="w-24 h-1 bg-accent rounded mx-auto mb-6"></div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to work at your best
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <Card className="card-modern p-8 text-center group">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                <Monitor className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-black text-primary mb-4">Premium PCs</h3>
              <p className="text-muted-foreground leading-relaxed">MacBook and high-performance Windows PCs available</p>
            </Card>

            <Card className="card-modern p-8 text-center group">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                <Wifi className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-black text-primary mb-4">High-Speed Internet</h3>
              <p className="text-muted-foreground leading-relaxed">Ultra-fast fiber optic connection for seamless work</p>
            </Card>

            <Card className="card-modern p-8 text-center group">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-black text-primary mb-4">Power Backup</h3>
              <p className="text-muted-foreground leading-relaxed">Uninterrupted power supply with backup generators</p>
            </Card>

            <Card className="card-modern p-8 text-center group">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                <Car className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-black text-primary mb-4">Free Parking</h3>
              <p className="text-muted-foreground leading-relaxed">Secure parking space for all members</p>
            </Card>

            <Card className="card-modern p-8 text-center group">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-black text-primary mb-4">24/7 Security</h3>
              <p className="text-muted-foreground leading-relaxed">Safe and secure environment with CCTV monitoring</p>
            </Card>

            <Card className="card-modern p-8 text-center group">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                <Coffee className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-black text-primary mb-4">Training Center</h3>
              <p className="text-muted-foreground leading-relaxed">Access to professional training facilities</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Location & Gallery Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Location Details */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl lg:text-5xl font-black mb-6 text-primary">
                  Prime Location
                </h2>
                <div className="w-24 h-1 bg-accent rounded mb-6"></div>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Located in the heart of DHA Phase 2, our co-working space offers easy accessibility and a professional environment.
                </p>
              </div>

              <Card className="card-modern p-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">Address</h3>
                      <p className="text-muted-foreground">2nd Floor, Opposite Avenue Mall<br />DHA Phase 2, Islamabad</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">Phone</h3>
                      <p className="text-muted-foreground">+92 326 0188811</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">Hours</h3>
                      <p className="text-muted-foreground">24/7 Access for Members</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Button onClick={handleContactClick} size="lg" className="w-full sm:w-auto">
                Schedule a Visit
                <Phone className="ml-2 h-5 w-5" />
              </Button>
            </div>

            {/* Image Gallery */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-xl">
                  <img 
                    src={classroomImage1} 
                    alt="Co-working space classroom"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square rounded-2xl overflow-hidden shadow-xl">
                  <img 
                    src={classroomImage2} 
                    alt="Computer lab workspace"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-xl">
                  <img 
                    src={classroomImage1} 
                    alt="Modern work desks"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center p-8">
                  <div className="text-center">
                    <div className="text-4xl font-black text-primary mb-2">50+</div>
                    <div className="text-sm text-muted-foreground">Workstations Available</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-4xl lg:text-5xl font-black">
              Ready to Join Our Community?
            </h2>
            <p className="text-xl text-white/90 leading-relaxed">
              Contact us today to schedule a tour and experience our world-class facilities firsthand.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button 
                onClick={handleContactClick}
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 font-bold text-lg px-8"
              >
                Contact Us
                <Phone className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                onClick={handleContactClick}
                size="lg" 
                variant="outline"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary font-bold text-lg px-8"
              >
                WhatsApp Us
                <Mail className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}