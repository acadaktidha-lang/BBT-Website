import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Download, Phone, Mail, MapPin, Globe } from "lucide-react";
import businessSupportImg from "/assets/business-support.jpg";
import financialModelImg from "/assets/financial-model.jpg";
import businessBoostImg from "/assets/business-boost.jpg";
import comprehensiveTrainingImg from "/assets/comprehensive-training.jpg";
import provenModelImg from "/assets/proven-model.jpg";
import { useSEO } from '@/hooks/useSEO';
import franchiseApplicationFormPdf from "@/components/Franchise Application Form (3).pdf";

const Franchise = () => {
  useSEO({
    title: 'Franchise Opportunity',
    description: 'Become a Big Binary Tech franchise partner. Join our network and bring world-class technology education to your city. Download franchise brochure and learn about partnership opportunities.',
    keywords: 'Big Binary franchise, Big Binary Tech franchise opportunity, education franchise, technology training franchise, Big Binary partnership',
    canonical: 'https://bigbinarytech.com/franchise',
  });

  const FRANCHISE_FORM_URL = franchiseApplicationFormPdf;
  const HERO_BG_URL = '/assets/default-course-bg.jpg';

  const handleDownloadFranchiseForm = () => {
    const link = document.createElement('a');
    link.href = FRANCHISE_FORM_URL;
    link.download = 'Big Binary Tech Franchise Application Form.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleWhatsAppContact = () => {
    window.open(
      "https://wa.me/923260188811?text=Hi,%20I'm%20interested%20in%20the%20Big%20Binary%20Tech%20franchise%20opportunity.",
      "_blank"
    );
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center py-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${HERO_BG_URL})` }}
      >
        <div className="absolute inset-0 backdrop-blur-sm bg-black/5"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white">
            Become a Big Binary Tech
            <span className="text-accent bg-gradient-to-r from-accent to-yellow-400 bg-clip-text text-transparent"> Franchise Partner</span>
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-gray-100">
            Shape the future of technology and education in your city.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={handleDownloadFranchiseForm}
              className="text-lg px-8 py-4 bg-accent hover:bg-accent/90 text-primary font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border-0"
            >
              <Download className="mr-2 h-5 w-5" />
              Download Franchise Form
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
              Big Binary Tech is a global leader in AI, technology, marketing, and language education, 
              offering cutting-edge training for professionals, children, and organizations.
            </p>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-16 bg-muted/30">
        {/* ... unchanged ... */}
      </section>

      {/* Courses Section */}
      <section className="py-16 bg-background">
        {/* ... unchanged ... */}
      </section>

      {/* Investment & Earnings */}
      <section className="py-16 bg-muted/30">
        {/* ... unchanged ... */}
      </section>

      {/* Why Partner With Us */}
      <section className="py-16 bg-background">
        {/* ... unchanged ... */}
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
                <p className="text-sm opacity-80">info@bigbinarytech.com</p>
              </div>
              <div className="flex flex-col items-center">
                <Globe className="h-8 w-8 mb-2" />
                <p className="text-sm opacity-80">bigbinarytech.com</p>
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
