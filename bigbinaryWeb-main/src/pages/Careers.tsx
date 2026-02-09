import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Users, Globe, Lightbulb, TrendingUp, Send, GraduationCap, Briefcase, ShieldCheck, ServerCog, UserCog, Code2, ClipboardList } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';

// Import images for career benefits
import innovationImage from '/assets/innovation.jpg';
import globalStandardsImage from '/assets/global-standards.jpg';
import marketReadyImage from '/assets/market-ready.jpg';
import partnershipsImage from '/assets/partnerships.jpg';

// Job positions removed per request; accepting open applications only

const careerBenefits = [
  {
    icon: TrendingUp,
    title: 'Career Growth',
    description: 'Accelerate your career with continuous learning opportunities and clear advancement paths.',
    image: marketReadyImage
  },
  {
    icon: Globe,
    title: 'Global Impact',
    description: 'Make a difference in students\' lives across 50+ countries with our international reach.',
    image: globalStandardsImage
  },
  {
    icon: Lightbulb,
    title: 'Innovation Culture',
    description: 'Work with cutting-edge technologies and contribute to educational innovation.',
    image: innovationImage
  },
  {
    icon: Users,
    title: 'Collaborative Team',
    description: 'Join a diverse team of passionate educators and industry experts.',
    image: partnershipsImage
  }
];

const talentPoolRoles = [
  {
    title: 'Admission Officers',
    icon: GraduationCap,
    summary: 'Be the first human touchpoint for learners and guide them toward the right program.',
    highlights: ['Counseling and conversion', 'Program fit assessment']
  },
  {
    title: 'Career Counselors',
    icon: Briefcase,
    summary: 'Help learners map their strengths into real-world career paths and placements.',
    highlights: ['Career roadmaps', 'Interview readiness']
  },
  {
    title: 'Trainers',
    icon: Users,
    summary: 'Deliver hands-on, industry-aligned training that makes learners job-ready.',
    highlights: ['Project-based delivery', 'Mentorship and feedback']
  },
  {
    title: 'Cyber & DevOps Experts',
    icon: ShieldCheck,
    summary: 'Bring modern security and infrastructure practices into the classroom.',
    highlights: ['Real-world labs', 'Cloud and automation']
  },
  {
    title: 'HR',
    icon: UserCog,
    summary: 'Build a people-first culture and support fast, healthy team growth.',
    highlights: ['Recruitment ops', 'Culture and engagement']
  },
  {
    title: 'Admin',
    icon: ClipboardList,
    summary: 'Keep operations smooth so teams can focus on students and outcomes.',
    highlights: ['Process excellence', 'Daily coordination']
  },
  {
    title: 'Developers',
    icon: Code2,
    summary: 'Create tools and experiences that scale learning and student success.',
    highlights: ['Product-driven builds', 'Impact-focused delivery']
  },
  {
    title: 'Coordinator',
    icon: ServerCog,
    summary: 'Connect teams, timelines, and learners to deliver seamless programs.',
    highlights: ['Cross-team alignment', 'Program execution']
  }
];

export default function Careers() {
  useSEO({
    title: 'Careers',
    description: 'Join Big Binary Tech team. Explore career opportunities in technology education, teaching, and administration. Make a global impact with Big Binary.',
    keywords: 'Big Binary careers, Big Binary Tech jobs, education careers, teaching jobs, Big Binary employment, technology education jobs',
    canonical: 'https://bigbinarytech.com/careers',
  });

  const contactEmail = 'hiring@bigbinarytech.com';
  const buildMailto = (role: string) =>
    `mailto:${contactEmail}?subject=${encodeURIComponent(`Talent Pool - ${role}`)}&body=${encodeURIComponent('Hi Big Binary Tech team,\n\nI am interested in joining your talent pool. Please find my details below:\n\nName:\nRole of Interest:\nLinkedIn/Portfolio:\nNotes:\n')}`;
  const [selectedRole, setSelectedRole] = useState<(typeof talentPoolRoles)[number] | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const generalMailto = buildMailto('General Inquiry');
  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-primary via-primary/95 to-accent overflow-hidden">
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-3xl floating blur-2xl"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-white/15 rounded-full floating blur-xl" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-white/10 rounded-2xl floating blur-xl" style={{animationDelay: '4s'}}></div>
        </div>

        <div className="relative container mx-auto px-4 text-center">
          <div className="slide-up">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 text-white leading-tight">
              Join Our Mission to
              <span className="block text-accent">Transform Education</span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-white/90 max-w-4xl mx-auto leading-relaxed text-center">
              Be part of a team that's shaping the future of technology education across the globe. 
              Build your career while empowering the next generation of tech leaders.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Card className="bg-white/10 border-white/20">
                <CardContent className="p-6 text-white text-xl font-semibold">
                  No current openings.
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Why Work With Us Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="slide-up">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-primary">
                Why Choose Big Binary Tech as Your Career?
              </h2>
              <div className="w-24 h-1 bg-accent rounded mx-auto mb-6"></div>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-center">
                Join a forward-thinking organization that values innovation, growth, and making a real impact in education.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {careerBenefits.map((benefit, index) => (
              <div key={index} className="fade-in-scale" style={{animationDelay: `${index * 0.1}s`}}>
                <Card className="card-modern group h-full overflow-hidden">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={benefit.image} 
                      alt={benefit.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-primary/20 group-hover:bg-accent/30 transition-all duration-300"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 bg-white/90 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                        <benefit.icon className="h-10 w-10 text-primary" />
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-8">
                    <h3 className="text-lg md:text-xl lg:text-2xl font-black text-primary mb-4 group-hover:text-accent transition-colors text-justify line-clamp-2 min-h-[3rem]">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-justify">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Talent Pool Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-primary">
              Join Our Talent Pool
            </h2>
            <div className="w-24 h-1 bg-accent rounded mx-auto mb-6"></div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-center">
              We are always happy to connect with great talent. Click a role to contact HR and tell us how you can contribute.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {talentPoolRoles.map((role, index) => (
              <button
                key={role.title}
                onClick={() => setSelectedRole(role)}
                className="fade-in-scale text-left"
                style={{animationDelay: `${index * 0.06}s`}}
                type="button"
              >
                <Card className="card-modern group h-full border border-primary/10 hover:border-accent/50 transition-all duration-300">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-accent/15 group-hover:text-accent transition-colors">
                      <role.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-primary group-hover:text-accent transition-colors">
                        {role.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Learn more
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </button>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-center gap-3">
            <Button
              size="lg"
              className="bg-accent text-white hover:bg-accent/90"
              onClick={() => setIsContactOpen(true)}
            >
              Contact HR
            </Button>
            <p className="text-sm text-muted-foreground text-center">
              If your email client doesn’t open, email us at <a className="text-primary underline underline-offset-4" href={`mailto:${contactEmail}`}>{contactEmail}</a>.
            </p>
          </div>
        </div>
      </section>

      <Dialog open={!!selectedRole} onOpenChange={(open) => !open && setSelectedRole(null)}>
        {selectedRole && (
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <selectedRole.icon className="h-6 w-6" />
                </div>
                <div>
                  <DialogTitle className="text-2xl font-black text-primary">
                    {selectedRole.title}
                  </DialogTitle>
                  <DialogDescription className="text-muted-foreground">
                    We are building a high-impact team for the next wave of education.
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <div className="space-y-4">
              <p className="text-base text-muted-foreground">
                {selectedRole.summary}
              </p>
              <div className="rounded-2xl border border-primary/10 bg-muted/40 p-4">
                <p className="text-sm font-semibold text-primary mb-2">Why this matters</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {selectedRole.highlights.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
              <p className="text-sm text-muted-foreground">
                If this sounds like you, we would love to hear your story and see your work.
              </p>
            </div>

            <DialogFooter className="sm:justify-between gap-3">
              <Button
                variant="outline"
                onClick={() => setSelectedRole(null)}
              >
                Maybe Later
              </Button>
              <Button
                asChild
                className="bg-accent text-white hover:bg-accent/90"
              >
                <a href={buildMailto(selectedRole.title)}>
                  Contact HR for {selectedRole.title}
                </a>
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>

      <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-primary">
              Contact HR
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Reach out and tell us about your background, strengths, and the role you’re interested in.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <a
              href={generalMailto}
              className="block rounded-lg border border-primary/10 bg-muted/40 px-4 py-3 text-sm font-semibold text-primary hover:border-accent/50 hover:text-accent transition-colors"
            >
              Open email to {contactEmail}
            </a>
            <Button
              variant="outline"
              className="w-full"
              onClick={handleCopyEmail}
            >
              {copied ? 'Email copied' : 'Copy email address'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Contact Info Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-black mb-4">
            Have Questions About Career Opportunities?
          </h3>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto text-center">
            Our HR team is here to help. Reach out to us for any career-related inquiries.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a 
              href="mailto:hiring@bigbinarytech.com"
              className="flex items-center text-lg font-semibold text-accent hover:text-white transition-colors"
            >
              <Send className="mr-3 h-6 w-6" />
              hiring@bigbinarytech.com
            </a>
            <span className="hidden sm:block text-white/60">|</span>
            <a 
              href="tel:+923260188811"
              className="flex items-center text-lg font-semibold text-accent hover:text-white transition-colors"
            >
              <Users className="mr-3 h-6 w-6" />
              +92 326 0188811
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
