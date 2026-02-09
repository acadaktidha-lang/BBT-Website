import React from 'react';
import { Globe, Award, BookMarked, Languages, Check } from 'lucide-react';
import langBg from '@/assets/lang.jpg';
import { useEnrollment } from '@/contexts/EnrollmentContext';

interface LanguageCard {
  id: string;
  badge?: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: string | number }>;
  features: string[];
}

const LanguagesPage: React.FC = () => {
  const languages: LanguageCard[] = [
    {
      id: 'spoken-english',
      badge: 'Most Popular',
      title: 'Spoken English',
      description: 'Master conversational English with expert instructors. Build confidence in daily communication and professional settings.',
      icon: Globe,
      features: [
        'Conversational practice & roleplays',
        'Pronunciation workshops',
        'Small-group sessions',
      ],
    },
    {
      id: 'ielts-pte',
      badge: 'Exam Prep',
      title: 'IELTS / PTE Prep',
      description: 'Targeted strategies, full-length mocks and band-focused feedback to help you reach your score goals.',
      icon: Award,
      features: [
        'Mock tests & performance review',
        'Band-improvement plan',
        'Expert exam trainers',
      ],
    },
    {
      id: 'german-language',
      badge: 'Beginner → Advanced',
      title: 'German Language',
      description: 'Structured curriculum from A1 to C1 levels with focus on speaking, writing and cultural context.',
      icon: BookMarked,
      features: [
        'Grammar & conversation classes',
        'Cultural immersion sessions',
        'Certification guidance',
      ],
    },
    {
      id: 'chinese-language',
      badge: 'Intensive',
      title: 'Mandarin Chinese',
      description: 'Practical Mandarin training with native instructors, focusing on speaking and listening fluency.',
      icon: Languages,
      features: [
        'Tone & pronunciation labs',
        'Everyday conversation practice',
        'Reading & writing basics',
      ],
    },
  ];

  const { openEnrollmentSidebar } = useEnrollment();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <div className="relative px-4 sm:px-6 lg:px-8 text-white min-h-[80vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${langBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-blue-600/90"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="mb-4">
            <button className="btn-3d glass-card inline-flex items-center px-4 py-2 rounded-full bg-white/10 text-white border border-white/20 text-sm font-medium">Language Courses</button>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight tracking-tight text-white">
            Master a New Language
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed max-w-4xl mx-auto font-light">
            Professional language training in English, IELTS/PTE, German, and Chinese. Unlock global opportunities with Big Binary Tech.
          </p>
          <div>
            <button onClick={openEnrollmentSidebar} className="btn-3d bg-accent text-white font-bold text-lg px-8 py-4 rounded-2xl shadow-2xl">Enroll Now</button>
          </div>
        </div>
      </div>

      {/* Languages Grid */}
      <div className="max-w-7xl mx-auto py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {languages.map((language) => {
            const IconComponent = language.icon;
            return (
              <div
                key={language.id}
                className="card-modern hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary"
              >
                <div className="p-8 text-center">
                  {language.badge && (
                    <div className="inline-block bg-primary/10 text-primary text-xs font-medium py-2 px-4 rounded-full mb-6">
                      {language.badge}
                    </div>
                  )}
                  <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <IconComponent className="h-10 w-10 text-primary" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-3xl font-black mb-4 text-slate-900">{language.title}</h3>
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">{language.description}</p>
                </div>

                {/* Features */}
                <div className="px-8 pb-8 flex-1">
                  <ul className="space-y-4">
                    {language.features.map((f, i) => (
                      <li key={i} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-slate-700">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="px-8 pb-8">
                  <button className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary/90 transition-colors duration-200">
                    Inquire Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Language Programs?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 text-xl font-bold">✓</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Expert Instructors</h3>
              <p className="text-gray-600">
                Learn from native speakers and certified language professionals with years of teaching experience.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 text-xl font-bold">✓</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Flexible Learning</h3>
              <p className="text-gray-600">
                Learn at your own pace with both online and offline options tailored to your schedule.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 text-xl font-bold">✓</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Practical Skills</h3>
              <p className="text-gray-600">
                Focus on real-world communication skills applicable in academic, professional, and social settings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguagesPage;
