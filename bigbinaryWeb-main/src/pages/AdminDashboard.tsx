import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { 
  Users, 
  BookOpen, 
  GraduationCap,
  Settings,
  LogOut,
  Plus,
  Edit,
  Trash2,
  Eye,
  BarChart3
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import TeamManagementModal from '@/components/TeamManagementModal';
import SpecializationManagementModal from '@/components/SpecializationManagementModal';
import CourseManagementModal from '@/components/CourseManagementModal';
import MediaManager from '@/components/MediaManager';

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    specializations: 0,
    courses: 0,
    teamMembers: 0,
    faqs: 0
  });
  const [specializations, setSpecializations] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [faqs, setFaqs] = useState<any[]>([]);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [showSpecModal, setShowSpecModal] = useState(false);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthAndLoadData();
  }, []);

  const checkAuthAndLoadData = async () => {
    try {
      setLoading(true);
      
      // Check authentication
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/auth');
        return;
      }

      // Ensure user is registered as admin
      const { data: adminUser } = await supabase
        .from('admin_users')
        .select('id')
        .eq('user_id', session.user.id)
        .maybeSingle();

      if (!adminUser) {
        // Create admin record if it doesn't exist
        const { error: insertError } = await supabase
          .from('admin_users')
          .insert([{ user_id: session.user.id, role: 'admin' }]);
        
        if (insertError) {
          console.error('Failed to create admin record:', insertError);
        }
      }

      setUser(session.user);
      
      // Load dashboard data
      await Promise.all([loadStats(), loadLists()]);
      
    } catch (error) {
      console.error('Auth check failed:', error);
      navigate('/auth');
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const [specCount, courseCount, teamCount, faqCount] = await Promise.all([
        supabase.from('specializations').select('id', { count: 'exact' }),
        supabase.from('courses').select('id', { count: 'exact' }),
        supabase.from('team_members').select('id', { count: 'exact' }),
        supabase.from('faqs').select('id', { count: 'exact' })
      ]);

      setStats({
        specializations: specCount.count || 0,
        courses: courseCount.count || 0,
        teamMembers: teamCount.count || 0,
        faqs: faqCount.count || 0
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load dashboard statistics.",
        variant: "destructive",
      });
    }
  };

  const loadLists = async () => {
    try {
      const [
        { data: specData, error: specError },
        { data: courseData, error: courseError },
        { data: teamData, error: teamError },
        { data: faqData, error: faqError },
      ] = await Promise.all([
        supabase
          .from('specializations')
          .select('id, name, slug, image_url, is_active, sort_order')
          .order('sort_order', { ascending: true }),
        supabase
          .from('courses')
          .select('*')
          .order('sort_order', { ascending: true }),
        supabase
          .from('team_members')
          .select('*')
          .order('sort_order', { ascending: true }),
        supabase
          .from('faqs')
          .select('id, question, answer, is_active, sort_order')
          .order('sort_order', { ascending: true }),
      ]);

      if (specError || courseError || teamError || faqError) {
        throw specError || courseError || teamError || faqError;
      }

      setSpecializations((specData || []).filter(s => s.is_active));
      setCourses((courseData || []).filter(c => c.is_active));
      setTeamMembers((teamData || []).filter(t => t.is_active));
      setFaqs((faqData || []).filter(f => f.is_active));
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load dashboard data.",
        variant: "destructive",
      });
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/auth');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleAddTeam = () => {
    setEditingItem(null);
    setShowTeamModal(true);
  };

  const handleEditTeam = (member: any) => {
    setEditingItem(member);
    setShowTeamModal(true);
  };

  const handleDeleteTeam = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('team_members')
        .delete()
        .eq('id', id)
        .select();

      if (error) throw error;
      if (!data || data.length === 0) throw new Error('Not authorized or member not found.');

      toast({
        title: "Success",
        description: "Team member deleted successfully.",
      });

      await Promise.all([loadLists(), loadStats()]);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete team member.",
        variant: "destructive",
      });
    }
  };

  const handleAddSpecialization = () => {
    setEditingItem(null);
    setShowSpecModal(true);
  };

  const handleEditSpecialization = (spec: any) => {
    setEditingItem(spec);
    setShowSpecModal(true);
  };

  const handleDeleteSpecialization = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('specializations')
        .delete()
        .eq('id', id)
        .select();

      if (error) throw error;
      if (!data || data.length === 0) throw new Error('Not authorized or specialization not found.');

      toast({
        title: "Success",
        description: "Specialization deleted successfully.",
      });

      await Promise.all([loadLists(), loadStats()]);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete specialization.",
        variant: "destructive",
      });
    }
  };

  const handleAddCourse = () => {
    setEditingItem(null);
    setShowCourseModal(true);
  };

  const handleEditCourse = (course: any) => {
    setEditingItem(course);
    setShowCourseModal(true);
  };

  const handleDeleteCourse = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .delete()
        .eq('id', id)
        .select();

      if (error) throw error;
      if (!data || data.length === 0) throw new Error('Not authorized or course not found.');

      toast({
        title: "Success",
        description: "Course deleted successfully.",
      });

      await Promise.all([loadLists(), loadStats()]);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete course.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-background border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <GraduationCap className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <p className="text-sm text-muted-foreground">Big Binary Tech Institute</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                Welcome, {user?.email}
              </span>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Specializations</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.specializations}</div>
              <p className="text-xs text-muted-foreground">
                Active specializations
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.courses}</div>
              <p className="text-xs text-muted-foreground">
                Total courses available
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Team Members</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.teamMembers}</div>
              <p className="text-xs text-muted-foreground">
                Active team members
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">FAQs</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.faqs}</div>
              <p className="text-xs text-muted-foreground">
                Published FAQs
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Management Tabs */}
        <Tabs defaultValue="specializations" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="specializations">Specializations</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Specializations Management */}
          <TabsContent value="specializations">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Manage Specializations</CardTitle>
                    <CardDescription>
                      Add, edit, or remove specializations offered by the institute
                    </CardDescription>
                  </div>
                  <Button onClick={handleAddSpecialization}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Specialization
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {specializations.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    No active specializations found.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {specializations.map((s) => (
                      <div key={s.id} className="flex items-center justify-between border rounded-md p-3">
                        <div>
                          <div className="font-medium">{s.name}</div>
                          <div className="text-xs text-muted-foreground">/{s.slug}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-xs text-muted-foreground">Sort: {s.sort_order ?? 0}</div>
                          <Button size="sm" variant="outline" onClick={() => handleEditSpecialization(s)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleDeleteSpecialization(s.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Courses Management */}
          <TabsContent value="courses">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Manage Courses</CardTitle>
                    <CardDescription>
                      Add, edit, or remove courses for each specialization
                    </CardDescription>
                  </div>
                  <Button onClick={handleAddCourse}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Course
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {courses.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    No active courses found.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {courses.map((c) => (
                      <div key={c.id} className="flex items-center justify-between border rounded-md p-3">
                        <div>
                          <div className="font-medium">{c.title}</div>
                          <div className="text-xs text-muted-foreground">/{c.slug}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-xs text-muted-foreground">Sort: {c.sort_order ?? 0}</div>
                          <Button size="sm" variant="outline" onClick={() => handleEditCourse(c)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleDeleteCourse(c.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Team Management */}
          <TabsContent value="team">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Manage Team</CardTitle>
                    <CardDescription>
                      Add, edit, or remove team members and leadership
                    </CardDescription>
                  </div>
                  <Button onClick={handleAddTeam}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Team Member
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {teamMembers.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    No active team members found.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {teamMembers.map((m) => (
                      <div key={m.id} className="flex items-center justify-between border rounded-md p-3">
                        <div>
                          <div className="font-medium">{m.name}</div>
                          <div className="text-xs text-muted-foreground">{m.position} • {m.category}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-xs text-muted-foreground">Sort: {m.sort_order ?? 0}</div>
                          <Button size="sm" variant="outline" onClick={() => handleEditTeam(m)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleDeleteTeam(m.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Management */}
          <TabsContent value="content">
            <Card>
              <CardHeader>
                <CardTitle>Website Content</CardTitle>
                <CardDescription>
                  Manage dynamic website content, FAQs, and other text
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <Settings className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-semibold mb-2">Content Management</h3>
                  <p className="mb-4">Interface for editing website content, FAQs, and other dynamic content will be implemented here.</p>
                  <Button variant="outline">
                    Manage Content
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>
                  Configure system settings and admin permissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="border rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-2">Admin Management</h3>
                    <p className="text-muted-foreground mb-4">
                      Manage admin users and their permissions
                    </p>
                    <Button variant="outline">
                      Manage Admins
                    </Button>
                  </div>
                  
                  <div className="border rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-2">Database Backup</h3>
                    <p className="text-muted-foreground mb-4">
                      Export and backup your data
                    </p>
                    <Button variant="outline">
                      Backup Data
                    </Button>
                  </div>

                  <div className="border rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-2">System Information</h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Version:</span> 1.0.0</p>
                      <p><span className="font-medium">Last Updated:</span> {new Date().toLocaleDateString()}</p>
                      <p><span className="font-medium">Database:</span> Connected</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="media">
          <MediaManager />
        </TabsContent>
      </Tabs>

        {/* Quick Actions */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Frequently used administrative tasks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Button variant="outline" className="h-auto flex flex-col items-center p-6">
                  <Eye className="h-8 w-8 mb-2" />
                  <span className="font-medium">Preview Website</span>
                  <span className="text-xs text-muted-foreground mt-1">View live site</span>
                </Button>
                
                <Button variant="outline" className="h-auto flex flex-col items-center p-6">
                  <BarChart3 className="h-8 w-8 mb-2" />
                  <span className="font-medium">Analytics</span>
                  <span className="text-xs text-muted-foreground mt-1">View site statistics</span>
                </Button>
                
                <Button variant="outline" className="h-auto flex flex-col items-center p-6">
                  <Settings className="h-8 w-8 mb-2" />
                  <span className="font-medium">System Settings</span>
                  <span className="text-xs text-muted-foreground mt-1">Configure system</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modals */}
      <TeamManagementModal
        isOpen={showTeamModal}
        onClose={() => {
          setShowTeamModal(false);
          setEditingItem(null);
        }}
        member={editingItem}
        onSuccess={() => {
          loadLists();
          loadStats();
        }}
      />

      <SpecializationManagementModal
        isOpen={showSpecModal}
        onClose={() => {
          setShowSpecModal(false);
          setEditingItem(null);
        }}
        specialization={editingItem}
        onSuccess={() => {
          loadLists();
          loadStats();
        }}
      />

      <CourseManagementModal
        isOpen={showCourseModal}
        onClose={() => {
          setShowCourseModal(false);
          setEditingItem(null);
        }}
        course={editingItem}
        onSuccess={() => {
          loadLists();
          loadStats();
        }}
      />
    </div>
  );
}