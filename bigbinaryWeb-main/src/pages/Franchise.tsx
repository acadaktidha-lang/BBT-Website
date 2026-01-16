import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Download, Phone, Mail, MapPin, Globe } from "lucide-react";
import businessSupportImg from "/assets/business-support.jpg";
import financialModelImg from "/assets/financial-model.jpg";
import businessBoostImg from "/assets/business-boost.jpg";
import comprehensiveTrainingImg from "/assets/comprehensive-training.jpg";
import provenModelImg from "/assets/proven-model.jpg";
import { useSEO } from '@/hooks/useSEO';

const Franchise = () => {
  useSEO({
    title: 'Franchise Opportunity',
    description: 'Become a Big Binary Tech International Institute franchise partner. Join our network and bring world-class technology education to your city. Download franchise brochure and learn about partnership opportunities.',
    keywords: 'Big Binary franchise, Big Binary Tech franchise opportunity, education franchise, technology training franchise, Big Binary partnership',
    canonical: 'https://bigbinarytech.com/franchise',
  });
  const BROCHURE_URL = '/assets/sample-brochure.pdf';
  const HERO_BG_URL = '/assets/default-course-bg.jpg';
  const handleDownloadBrochure = () => {
    // Create a link element
    const link = document.createElement('a');
    link.href = BROCHURE_URL;
    link.download = 'Big Binary Tech Franchise Brochure.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleWhatsAppContact = () => {
    window.open("https://wa.me/923260188811?text=Hi,%20I'm%20interested%20in%20the%20Big%20Binary%20Tech%20International%20Institute%20franchise%20opportunity.", "_blank");
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center py-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${HERO_BG_URL})` }}
      >
        {/* Subtle blur overlay for readability without heavy tint */}
        <div className="absolute inset-0 backdrop-blur-sm bg-black/5"></div>
        
        {/* Content */}
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white">
            Become a Big Binary Tech International Institute
            <span className="text-accent bg-gradient-to-r from-accent to-yellow-400 bg-clip-text text-transparent"> Franchise Partner</span>
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-gray-100">
            Shape the future of technology and education in your city.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={handleDownloadBrochure}
              className="text-lg px-8 py-4 bg-accent hover:bg-accent/90 text-primary font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border-0"
            >
              <Download className="mr-2 h-5 w-5" />
              Download Brochure
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={handleWhatsAppContact}
              className="text-lg px-8 py-4 bg-primary/20 border-primary/40 text-white hover:bg-primary/30 hover:border-primary/60 backdrop-blur-sm transition-all duration-300"
            >
              <Phone className="mr-2 h-5 w-5" />
              Contact Us
            </Button>
          </div>
        </div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Who We Are</h2>
            <p className="text-lg text-muted-foreground leading-relaxed text-justify">
              Big Binary Tech International Institute is a global leader in AI, technology, marketing, and language education, 
              offering cutting-edge training for professionals, children, and organizations.
            </p>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What You Get as a Franchisee</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Full Business Support",
                description: "From setup to daily operations, we guide you every step of the way.",
                image: businessSupportImg
              },
              {
                title: "Proven Financial Model",
                description: "A clear, transparent revenue structure with strong return potential.",
                image: financialModelImg
              },
              {
                title: "Boosting Your Business",
                description: "Centralized marketing, sales strategies, and lead generation to accelerate growth.",
                image: businessBoostImg
              },
              {
                title: "Comprehensive Training",
                description: "One-month master training plus ongoing staff development.",
                image: comprehensiveTrainingImg
              },
              {
                title: "Proven Business Model",
                description: "Delivering high-demand courses in technology, marketing, and languages.",
                image: provenModelImg
              }
            ].map((item, index) => (
              <Card key={index} className="h-full group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <div className="p-3 rounded-full bg-white/90 backdrop-blur-sm">
                      <CheckCircle className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Courses You'll Offer</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            
            {/* School of AI */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-4 text-[#262261]">School of AI</h3>
                <ul className="space-y-2">
                  {[
                    "AI for Professionals, Managers, and Children",
                    "Data Science, Generative AI, Advanced Agentic AI",
                    "Big Data, Data Analyst, Data Engineering, AI/ML Core",
                    "Web Development 3.0, Blockchain, Databases",
                    "Robotics"
                  ].map((course, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-[#262261] mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-sm">{course}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* School of Marketing */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-4 text-[#262261]">School of Marketing</h3>
                <ul className="space-y-2">
                  {[
                    "Shopify",
                    "Digital Media Marketing",
                    "YouTube Automation",
                    "Video Editing",
                    "Graphic Designing"
                  ].map((course, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-[#262261] mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-sm">{course}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Center of Linguistics */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-4 text-[#262261]">Center of Linguistics & Student Consultancy</h3>
                <ul className="space-y-2">
                  {[
                    "German, English, French, Chinese",
                    "IELTS Preparation"
                  ].map((course, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-[#262261] mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-sm">{course}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Investment & Earnings */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Investment & Earnings</h2>
            <Card>
              <CardContent className="p-8">
                <div className="grid grid-cols-2 md:grid-cols-2 gap-6 md:gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Investment Details</h3>
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-[#262261] mr-3" />
                        <span><strong>Franchise Fee:</strong> PKR 700,000 (One-time, non-refundable)</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-[#262261] mr-3" />
                        <span><strong>Royalty:</strong> 7% of monthly product profit</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-[#262261] mr-3" />
                        <span><strong>Software Fee:</strong> PKR 100 per admission</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Additional Revenue</h3>
                    <p className="text-muted-foreground">
                      <strong>Government Projects:</strong> Additional revenue opportunities through NAVTTC and similar initiatives
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Partner With Us */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Partner With Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              "Full Business Support for smooth operations and long-term success",
              "Financial Model designed for profitability and scalability",
              "Business Growth Strategies through marketing, promotions, and lead generation",
              "Centralized marketing and social media management",
              "Access to government and institutional projects",
              "Internship and job placement opportunities for students",
              "Strong operational and technical support"
            ].map((benefit, index) => (
              <div key={index} className="flex items-start p-4">
                <CheckCircle className="h-6 w-6 text-[#262261] mt-1 mr-4 flex-shrink-0" />
                <span className="text-muted-foreground">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Get Started Today</h2>
            <p className="text-xl mb-8 opacity-90 text-justify">
              Ready to transform education in your city? Contact us to learn more about our franchise opportunities.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="flex flex-col items-center">
                <MapPin className="h-8 w-8 mb-2" />
                <p className="text-sm opacity-80">2nd Floor, 444Q DHA Phase 2, Ghazi Road Opposite to avenue mall</p>
              </div>
              <div className="flex flex-col items-center">
                <Mail className="h-8 w-8 mb-2" />
                <p className="text-sm opacity-80">info@bbti.edu.pk</p>
              </div>
              <div className="flex flex-col items-center">
                <Globe className="h-8 w-8 mb-2" />
                <p className="text-sm opacity-80">bbti.edu.pk</p>
              </div>
              <div className="flex flex-col items-center">
                <Phone className="h-8 w-8 mb-2" />
                <p className="text-sm opacity-80">+92 326 0188811</p>
              </div>
            </div>

            <Button 
              size="lg" 
              variant="secondary" 
              onClick={handleWhatsAppContact}
              className="text-lg px-8 py-4"
            >
              <Phone className="mr-2 h-5 w-5" />
              Start Your Franchise Journey
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Franchise;