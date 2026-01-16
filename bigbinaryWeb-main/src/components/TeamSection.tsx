import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';

interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  image_url: string;
  category: string;
}

export default function TeamSection() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const response = await fetch('/data/team_members.json');
      if (response.ok) {
        const data = await response.json();
        const teamData = data.filter((member: any) => member.category === 'team' && member.is_active);
        setTeamMembers(teamData);
      }
    } catch (error) {
      console.error('Error fetching team members:', error);
    } finally {
      setLoading(false);
    }
  };

  // Don't show section if loading or no team members
  if (loading || teamMembers.length === 0) {
    return null;
  }
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-primary border-primary">
            Our Team
          </Badge>
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Meet Our Team
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Dedicated professionals committed to your success
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member) => (
              <Card key={member.id} className="group bg-white hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border-0 shadow-lg">
                <CardContent className="p-8 text-center relative overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 left-0 text-6xl font-mono text-primary transform -rotate-12">01</div>
                    <div className="absolute bottom-0 right-0 text-6xl font-mono text-accent transform rotate-12">10</div>
                  </div>
                  
                  {/* Profile Square with Enhanced Design */}
                  <div className="relative w-full h-80 mx-auto mb-6">
                    <div className="w-full h-full rounded-xl bg-gradient-to-br from-purple-600 via-blue-600 to-orange-500 p-1 shadow-2xl">
                      <div className="w-full h-full rounded-lg bg-white flex items-center justify-center overflow-hidden">
                        {member.image_url ? (
                          <img 
                            src={member.image_url} 
                            alt={member.name}
                            className="w-full h-full object-cover object-top"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-purple-600 via-blue-600 to-orange-500 flex items-center justify-center">
                            <span className="text-5xl font-black text-white">
                              {member.name.split(' ').map(n => n[0]).join('').substring(0, 3)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative z-10">
                    <h3 className="text-2xl font-black text-gray-900 mb-2 group-hover:text-primary transition-colors">
                      {member.name}
                    </h3>
                    <div className="mb-4">
                      <span className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg">
                        {member.position}
                      </span>
                    </div>
                    {member.bio && (
                      <p className="text-gray-500 text-sm leading-relaxed">
                        {member.bio}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
          ))}
        </div>
      </div>
    </section>
  );
}