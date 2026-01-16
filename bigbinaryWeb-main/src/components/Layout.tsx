import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Phone, 
  Mail, 
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ArrowRight,
  ChevronDown,
  Menu,
  X,
  ChevronUp
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useMediaAsset } from '@/hooks/useMediaAsset';
import { EnrollmentProvider, useEnrollment } from '@/contexts/EnrollmentContext';
import EnrollmentSidebar from '@/components/EnrollmentSidebar';


function LayoutContent() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [specializations, setSpecializations] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { isEnrollmentSidebarOpen, openEnrollmentSidebar, closeEnrollmentSidebar } = useEnrollment();

  // Media-managed assets
  const { url: navbarLogoUrl } = useMediaAsset('navbar_logo');
  const { url: footerLogoUrl } = useMediaAsset('footer_logo');
  const { url: faviconUrl } = useMediaAsset('favicon');

  // Explicit override for navbar logo (signed URL)
  const NAVBAR_LOGO_OVERRIDE = '/fav.png';
  const resolvedNavbarLogo = NAVBAR_LOGO_OVERRIDE || navbarLogoUrl;

  // Explicit override for footer logo (signed URL)
  const FOOTER_LOGO_OVERRIDE = '/fav.png';
  const resolvedFooterLogo = FOOTER_LOGO_OVERRIDE || footerLogoUrl;

  useEffect(() => {
    fetchSpecializations();
  }, []);

  // Favicon is set statically in index.html to use /fav.png
  // Dynamic favicon override disabled to ensure consistent favicon display
  // useEffect(() => {
  //   if (!faviconUrl) return;
  //   const link: HTMLLinkElement = document.querySelector("link[rel='icon']") || document.createElement('link');
  //   link.rel = 'icon';
  //   link.href = faviconUrl;
  //   if (!link.parentNode) document.head.appendChild(link);
  // }, [faviconUrl]);

  // Ensure we start at the top on initial load and on route changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname]);

  // Global scroll-to-top visibility
  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const fetchSpecializations = async () => {
    const { data } = await supabase
      .from('specializations')
      .select('*')
      .eq('is_active', true)
      .order('sort_order');
    setSpecializations(data || []);
  };

  

  return (
    <div className="min-h-screen bg-background">
      <EnrollmentSidebar 
        isOpen={isEnrollmentSidebarOpen} 
        onClose={closeEnrollmentSidebar} 
      />
      {/* Enhanced Navigation with Animated Gradient */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl shadow-xl relative overflow-visible">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-blue-900 to-black animate-gradient-x"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-blue-800/30 via-transparent to-black/40"></div>
        
        {/* Floating Gradient Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '0s', animationDuration: '4s'}}></div>
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s', animationDuration: '6s'}}></div>
          <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-blue-400/25 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s', animationDuration: '5s'}}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-between h-24">
            <Link to="/" className="flex items-center">
              <img
                src={resolvedNavbarLogo}
                alt="Big Binary Tech International Institute"
                className="h-16 md:h-20 w-auto"
              />
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-white hover:text-orange-300 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>

            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <Link 
                to="/" 
                className={`text-sm font-semibold transition-all duration-300 hover:text-orange-300 relative px-2 py-1 ${
                  isHomePage ? 'text-orange-300' : 'text-white/90'
                } after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-orange-300 after:bottom-0 after:left-0 ${
                  isHomePage ? 'after:scale-x-100' : 'after:scale-x-0'
                } after:transition-transform after:duration-300 hover:after:scale-x-100`}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className={`text-sm font-semibold transition-all duration-300 hover:text-orange-300 relative px-2 py-1 ${
                  location.pathname === '/about' ? 'text-orange-300' : 'text-white/90'
                } after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-orange-300 after:bottom-0 after:left-0 ${
                  location.pathname === '/about' ? 'after:scale-x-100' : 'after:scale-x-0'
                } after:transition-transform after:duration-300 hover:after:scale-x-100`}
              >
                About
              </Link>
              <div 
                className="relative group"
                onMouseEnter={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
              >
                <button className="text-sm font-semibold text-white/90 transition-all duration-300 hover:text-orange-300 relative px-2 py-1 after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-orange-300 after:bottom-0 after:left-0 after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100 flex items-center">
                  Specializations
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                {showDropdown && (
                  <div className="absolute top-full left-0 mt-0 w-64 bg-white rounded-lg shadow-xl border z-[1001] group-hover:block backdrop-blur-sm">
                    <div className="py-2">
                      {specializations.map((spec) => (
                        <Link
                          key={spec.id}
                          to={`/specializations/${spec.slug}`}
                          onClick={() => setShowDropdown(false)}
                          className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 transition-all duration-200 hover:text-orange-600 font-medium"
                        >
                          {spec.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <Link 
                to="/co-working" 
                className={`text-sm font-semibold transition-all duration-300 hover:text-orange-300 relative px-2 py-1 ${
                  location.pathname === '/co-working' ? 'text-orange-300' : 'text-white/90'
                } after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-orange-300 after:bottom-0 after:left-0 ${
                  location.pathname === '/co-working' ? 'after:scale-x-100' : 'after:scale-x-0'
                } after:transition-transform after:duration-300 hover:after:scale-x-100`}
              >
                Co-Working
              </Link>
              <Link 
                to="/careers"
                className={`text-sm font-semibold transition-all duration-300 hover:text-orange-300 relative px-2 py-1 ${
                  location.pathname === '/careers' ? 'text-orange-300' : 'text-white/90'
                } after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-orange-300 after:bottom-0 after:left-0 ${
                  location.pathname === '/careers' ? 'after:scale-x-100' : 'after:scale-x-0'
                } after:transition-transform after:duration-300 hover:after:scale-x-100`}
              >
                Careers
              </Link>
              <button 
                onClick={() => window.open('https://wa.me/923260188811', '_blank')}
                className="text-sm font-semibold text-white/90 transition-all duration-300 hover:text-orange-300 relative px-2 py-1 after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-orange-300 after:bottom-0 after:left-0 after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                Contact
              </button>
              <Button 
                onClick={openEnrollmentSidebar}
                className="ml-6 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-bold px-8 py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm"
              >
                Enroll Now
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden backdrop-blur-xl border-t border-black/50 relative overflow-hidden">
              {/* Mobile Menu Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-blue-900/95 to-black/95"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-800/30 via-transparent to-blue-700/30"></div>
              
              <div className="px-4 py-6 space-y-4 relative z-10">
                <Link 
                  to="/" 
                  className={`block text-sm font-semibold transition-all duration-300 hover:text-orange-300 py-3 px-4 rounded-lg ${
                    isHomePage ? 'text-orange-300 bg-orange-300/10' : 'text-white/90 hover:bg-white/10'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  to="/about" 
                  className={`block text-sm font-semibold transition-all duration-300 hover:text-orange-300 py-3 px-4 rounded-lg ${
                    location.pathname === '/about' ? 'text-orange-300 bg-orange-300/10' : 'text-white/90 hover:bg-white/10'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>
                <div className="space-y-2">
                  <div className="text-sm font-semibold text-white/90 py-3 px-4">
                    Specializations
                  </div>
                  <div className="pl-4 space-y-2">
                    {specializations.map((spec) => (
                      <Link
                        key={spec.id}
                        to={`/specializations/${spec.slug}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block text-sm text-white/70 hover:text-orange-300 py-2 px-4 rounded-lg hover:bg-white/10 transition-all duration-200"
                      >
                        {spec.name}
                      </Link>
                    ))}
                  </div>
                </div>
                <Link 
                  to="/co-working" 
                  className={`block text-sm font-semibold transition-all duration-300 hover:text-orange-300 py-3 px-4 rounded-lg ${
                    location.pathname === '/co-working' ? 'text-orange-300 bg-orange-300/10' : 'text-white/90 hover:bg-white/10'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Co-Working
                </Link>
                <Link 
                  to="/careers"
                  className={`block text-sm font-semibold transition-all duration-300 hover:text-orange-300 py-3 px-4 rounded-lg ${
                    location.pathname === '/careers' ? 'text-orange-300 bg-orange-300/10' : 'text-white/90 hover:bg-white/10'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Careers
                </Link>
                <button 
                  onClick={() => {
                    window.open('https://wa.me/923260188811', '_blank');
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left text-sm font-semibold text-white/90 hover:text-orange-300 py-3 px-4 rounded-lg hover:bg-white/10 transition-all duration-300"
                >
                  Contact
                </button>
                <Button 
                  onClick={() => {
                    openEnrollmentSidebar();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm"
                >
                  Enroll Now
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Modern Footer with Animated Gradient */}
      <footer className="text-white relative overflow-hidden mt-32">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-blue-900 to-black animate-gradient-y"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-blue-800/40 via-transparent to-black/50"></div>
        
        {/* Floating Gradient Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/25 rounded-full blur-3xl animate-pulse" style={{animationDelay: '0s', animationDuration: '8s'}}></div>
          <div className="absolute top-40 right-20 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '3s', animationDuration: '10s'}}></div>
          <div className="absolute bottom-40 left-1/3 w-72 h-72 bg-blue-400/30 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s', animationDuration: '6s'}}></div>
          <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s', animationDuration: '12s'}}></div>
        </div>

        {/* Radial Gradient Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(249,115,22,0.05)_0%,transparent_70%)]"></div>

        <div className="relative z-10">
          {/* Main Footer Content */}
          <div className="container mx-auto px-4 py-24">
            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
              {/* Company Info */}
              <div className="lg:col-span-2 space-y-8">
                <div className="slide-up">
                  <div className="flex items-center space-x-4 mb-6">
                    <img 
                      src={resolvedFooterLogo} 
                      alt="Big Binary Tech International Institute" 
                      className="h-24 md:h-28 lg:h-32 w-auto" 
                    />
                
                  </div>
                  <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
                    Empowering the next generation of tech leaders through innovative education, 
                    cutting-edge curriculum, and industry-focused training programs.
                  </p>
                </div>

                {/* Modern Achievement Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                  <div className="text-center p-6 rounded-2xl bg-accent/10 backdrop-blur-md border border-accent/20 hover:bg-accent/15 transition-all duration-300">
                    <div className="text-4xl font-black text-accent mb-2">10K+</div>
                    <div className="text-white/80 font-medium">Graduates</div>
                  </div>
                  <div className="text-center p-6 rounded-2xl bg-accent/10 backdrop-blur-md border border-accent/20 hover:bg-accent/15 transition-all duration-300">
                    <div className="text-4xl font-black text-accent mb-2">98%</div>
                    <div className="text-white/80 font-medium">Success Rate</div>
                  </div>
                  <div className="text-center p-6 rounded-2xl bg-accent/10 backdrop-blur-md border border-accent/20 hover:bg-accent/15 transition-all duration-300">
                    <div className="text-4xl font-black text-accent mb-2">50+</div>
                    <div className="text-white/80 font-medium">Countries</div>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="space-y-8">
                <h3 className="text-2xl font-black text-white mb-8 relative">
                  Quick Links
                  <div className="absolute bottom-0 left-0 w-12 h-1 bg-accent rounded"></div>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-1 gap-4">
                  {[
                    { name: 'Home', path: '/' },
                    { name: 'About Us', path: '/about' },
                    { name: 'Specializations', path: '/specializations' },
                    { name: 'Franchise', path: '/franchise' },
                    { name: 'Admissions', path: '/admissions' },
                    { name: 'Contact', path: '/contact' },
                    { name: 'Careers', path: '/careers' }
                  ].map((link) => (
                    <Link 
                      key={link.name} 
                      to={link.path} 
                      className="text-white/90 hover:text-accent transition-all duration-300 hover:translate-x-1 transform font-medium text-base group"
                    >
                      <span className="flex items-center">
                        <ArrowRight className="w-3 h-3 mr-2 group-hover:mr-3 transition-all duration-300" />
                        {link.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

            </div>

            {/* Newsletter Signup */}
            <div className="mt-20 pt-16 border-t border-white/10">
              <div className="max-w-5xl mx-auto text-center">
                <h3 className="text-4xl font-black mb-4 text-white">
                  Stay Updated with Latest Tech Trends
                </h3>
                <p className="text-white/80 text-xl mb-12 leading-relaxed">
                  Get exclusive insights, course updates, and industry news delivered to your inbox.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 max-w-3xl mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="flex-1 px-8 py-5 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent backdrop-blur-md text-lg"
                  />
                  <button className="btn-3d px-10 py-5 bg-accent hover:bg-accent/90 text-white font-bold rounded-2xl transition-all duration-300 hover:scale-105 shadow-2xl text-lg">
                    <span className="flex items-center justify-center">
                      <Mail className="mr-3 h-6 w-6" />
                      Subscribe Now
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 bg-black/20 backdrop-blur-md">
            <div className="container mx-auto px-4 py-8">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div className="text-white/90 text-center md:text-left">
                  <p className="font-semibold text-lg">&copy; 2024 Big Binary Tech International Institute. All rights reserved.</p>
                  <p className="text-sm mt-1 text-white/70">Transforming futures through technology education.</p>
                </div>
                <div className="flex space-x-8 text-sm">
                  <button className="text-white/70 hover:text-accent transition-colors font-medium hover:underline">Privacy Policy</button>
                  <button className="text-white/70 hover:text-accent transition-colors font-medium hover:underline">Terms of Service</button>
                  <button className="text-white/70 hover:text-accent transition-colors font-medium hover:underline">Cookie Policy</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* Scroll to Top Button (global) */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-[1100] w-12 h-12 bg-white hover:bg-gray-100 text-blue-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center"
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}

export default function Layout() {
  return (
    <EnrollmentProvider>
      <LayoutContent />
    </EnrollmentProvider>
  );
}