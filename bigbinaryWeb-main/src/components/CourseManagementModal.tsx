import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface Course {
  id?: string;
  title: string;
  slug: string;
  summary: string;
  introduction: string;
  duration: string;
  price: number;
  audience: string;
  image_url: string;
  brochure_url: string;
  admission_form_link: string;
  specialization_id: string;
  modules: Array<{
    title: string;
    description: string;
    topics: string[];
  }>;
  extra_fields: Record<string, any>;
  sort_order: number;
}

interface CourseManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  course?: Course | null;
  onSuccess: () => void;
}

export default function CourseManagementModal({ isOpen, onClose, course, onSuccess }: CourseManagementModalProps) {
  const [loading, setLoading] = useState(false);
  const [specializations, setSpecializations] = useState<any[]>([]);
  const [formData, setFormData] = useState<Course>({
    title: '',
    slug: '',
    summary: '',
    introduction: '',
    duration: '3 months',
    price: 0,
    audience: '',
    image_url: '',
    brochure_url: '',
    admission_form_link: '',
    specialization_id: '',
    modules: [],
    extra_fields: { 
      learning_outcomes: [], 
      prerequisites: [], 
      what_you_get: [],
      additional_info: ''
    },
    sort_order: 0,
  });

  // Populate form data when course prop changes
  useEffect(() => {
    if (course) {
      setFormData({
        title: course.title || '',
        slug: course.slug || '',
        summary: course.summary || '',
        introduction: course.introduction || '',
        duration: course.duration || '3 months',
        price: course.price || 0,
        audience: course.audience || '',
        image_url: course.image_url || '',
        brochure_url: course.brochure_url || '',
        admission_form_link: course.admission_form_link || '',
        specialization_id: course.specialization_id || '',
        modules: Array.isArray(course.modules)
          ? course.modules.map((m: any) => ({
              title: m?.title || '',
              description: m?.description || '',
              topics: Array.isArray(m?.topics) ? m.topics : []
            }))
          : [],
        extra_fields: course.extra_fields || { 
          learning_outcomes: [], 
          prerequisites: [], 
          what_you_get: [],
          additional_info: ''
        },
        sort_order: course.sort_order || 0,
      });
    } else {
      // Reset form for new course
      setFormData({
        title: '',
        slug: '',
        summary: '',
        introduction: '',
        duration: '3 months',
        price: 0,
        audience: '',
        image_url: '',
        brochure_url: '',
        admission_form_link: '',
        specialization_id: '',
        modules: [],
        extra_fields: { 
          learning_outcomes: [], 
          prerequisites: [], 
          what_you_get: [],
          additional_info: ''
        },
        sort_order: 0,
      });
    }
  }, [course]);

  useEffect(() => {
    fetchSpecializations();
  }, []);

  const fetchSpecializations = async () => {
    const { data } = await supabase
      .from('specializations')
      .select('id, name')
      .eq('is_active', true)
      .order('name');
    
    setSpecializations(data || []);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title)
    }));
  };

  const addModule = () => {
    setFormData(prev => ({
      ...prev,
      modules: [...prev.modules, { title: '', description: '', topics: [] }]
    }));
  };

  const updateModule = (index: number, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      modules: prev.modules.map((module, i) => 
        i === index ? { ...module, [field]: value } : module
      )
    }));
  };

  const removeModule = (index: number) => {
    setFormData(prev => ({
      ...prev,
      modules: prev.modules.filter((_, i) => i !== index)
    }));
  };

  const addTopic = (moduleIndex: number) => {
    const currentTopics = formData.modules[moduleIndex]?.topics || [];
    updateModule(moduleIndex, 'topics', [...currentTopics, '']);
  };

  const updateTopic = (moduleIndex: number, topicIndex: number, value: string) => {
    const base = formData.modules[moduleIndex]?.topics || [];
    const updatedTopics = [...base];
    updatedTopics[topicIndex] = value;
    updateModule(moduleIndex, 'topics', updatedTopics);
  };

  const removeTopic = (moduleIndex: number, topicIndex: number) => {
    const base = formData.modules[moduleIndex]?.topics || [];
    const updatedTopics = base.filter((_, i) => i !== topicIndex);
    updateModule(moduleIndex, 'topics', updatedTopics);
  };

  const updateLearningOutcome = (index: number, value: string) => {
    const outcomes = [...(formData.extra_fields.learning_outcomes || [])];
    outcomes[index] = value;
    setFormData(prev => ({
      ...prev,
      extra_fields: { ...prev.extra_fields, learning_outcomes: outcomes }
    }));
  };

  const addLearningOutcome = () => {
    const outcomes = [...(formData.extra_fields.learning_outcomes || []), ''];
    setFormData(prev => ({
      ...prev,
      extra_fields: { ...prev.extra_fields, learning_outcomes: outcomes }
    }));
  };

  const removeLearningOutcome = (index: number) => {
    const outcomes = (formData.extra_fields.learning_outcomes || []).filter((_: any, i: number) => i !== index);
    setFormData(prev => ({
      ...prev,
      extra_fields: { ...prev.extra_fields, learning_outcomes: outcomes }
    }));
  };

  // Prerequisites management
  const updatePrerequisite = (index: number, value: string) => {
    const prerequisites = [...(formData.extra_fields.prerequisites || [])];
    prerequisites[index] = value;
    setFormData(prev => ({
      ...prev,
      extra_fields: { ...prev.extra_fields, prerequisites }
    }));
  };

  const addPrerequisite = () => {
    const prerequisites = [...(formData.extra_fields.prerequisites || []), ''];
    setFormData(prev => ({
      ...prev,
      extra_fields: { ...prev.extra_fields, prerequisites }
    }));
  };

  const removePrerequisite = (index: number) => {
    const prerequisites = (formData.extra_fields.prerequisites || []).filter((_: any, i: number) => i !== index);
    setFormData(prev => ({
      ...prev,
      extra_fields: { ...prev.extra_fields, prerequisites }
    }));
  };

  // What you get management
  const updateWhatYouGet = (index: number, value: string) => {
    const whatYouGet = [...(formData.extra_fields.what_you_get || [])];
    whatYouGet[index] = value;
    setFormData(prev => ({
      ...prev,
      extra_fields: { ...prev.extra_fields, what_you_get: whatYouGet }
    }));
  };

  const addWhatYouGet = () => {
    const whatYouGet = [...(formData.extra_fields.what_you_get || []), ''];
    setFormData(prev => ({
      ...prev,
      extra_fields: { ...prev.extra_fields, what_you_get: whatYouGet }
    }));
  };

  const removeWhatYouGet = (index: number) => {
    const whatYouGet = (formData.extra_fields.what_you_get || []).filter((_: any, i: number) => i !== index);
    setFormData(prev => ({
      ...prev,
      extra_fields: { ...prev.extra_fields, what_you_get: whatYouGet }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const courseData = {
        title: formData.title,
        slug: formData.slug,
        summary: formData.summary,
        introduction: formData.introduction,
        duration: formData.duration,
        price: formData.price,
        audience: formData.audience,
        image_url: formData.image_url,
        brochure_url: formData.brochure_url,
        admission_form_link: formData.admission_form_link,
        specialization_id: formData.specialization_id,
        modules: formData.modules,
        extra_fields: formData.extra_fields,
        sort_order: formData.sort_order,
      };

      if (course?.id) {
        // Update existing course
        const { data, error } = await supabase
          .from('courses')
          .update(courseData)
          .eq('id', course.id)
          .select();

        if (error) throw error;
        if (!data || data.length === 0) throw new Error('Not authorized or course not found.');

        toast({
          title: "Success",
          description: "Course updated successfully.",
        });
      } else {
        // Create new course
        const { data, error } = await supabase
          .from('courses')
          .insert([{ ...courseData, is_active: true }])
          .select();

        if (error) throw error;
        if (!data || data.length === 0) throw new Error('Not authorized to add course.');

        toast({
          title: "Success",
          description: "Course added successfully.",
        });
      }

      onSuccess();
      onClose();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save course.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">{/**ScrollableMOdal*/}
        <DialogHeader>
          <DialogTitle>
            {course?.id ? 'Edit Course' : 'Add Course'}
          </DialogTitle>
          <DialogDescription>
            {course?.id ? 'Update the course information below.' : 'Add a new course to your specialization.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Course Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Enter course title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                placeholder="Enter URL slug"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialization">Specialization</Label>
            <Select 
              value={formData.specialization_id} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, specialization_id: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select specialization" />
              </SelectTrigger>
              <SelectContent>
                {specializations.map((spec) => (
                  <SelectItem key={spec.id} value={spec.id}>
                    {spec.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="summary">Summary</Label>
            <Textarea
              id="summary"
              value={formData.summary}
              onChange={(e) => setFormData(prev => ({ ...prev, summary: e.target.value }))}
              placeholder="Enter course summary"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="introduction">Introduction</Label>
            <Textarea
              id="introduction"
              value={formData.introduction}
              onChange={(e) => setFormData(prev => ({ ...prev, introduction: e.target.value }))}
              placeholder="Enter course introduction"
              rows={4}
            />
          </div>

          {/* Course Details */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                placeholder="e.g., 3 months"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price (PKR)</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: parseInt(e.target.value) || 0 }))}
                placeholder="Enter price"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sort_order">Sort Order</Label>
              <Input
                id="sort_order"
                type="number"
                value={formData.sort_order}
                onChange={(e) => setFormData(prev => ({ ...prev, sort_order: parseInt(e.target.value) || 0 }))}
                placeholder="Sort order"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="audience">Target Audience</Label>
            <Input
              id="audience"
              value={formData.audience}
              onChange={(e) => setFormData(prev => ({ ...prev, audience: e.target.value }))}
              placeholder="e.g., Beginners, Professionals"
            />
          </div>

          {/* URLs */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="image_url">Image URL</Label>
              <Input
                id="image_url"
                value={formData.image_url}
                onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                placeholder="Enter image URL"
                type="url"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="brochure_url">Brochure URL</Label>
              <Input
                id="brochure_url"
                value={formData.brochure_url}
                onChange={(e) => setFormData(prev => ({ ...prev, brochure_url: e.target.value }))}
                placeholder="Enter brochure download URL"
                type="url"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="admission_form_link">Admission Form Link</Label>
              <Input
                id="admission_form_link"
                value={formData.admission_form_link}
                onChange={(e) => setFormData(prev => ({ ...prev, admission_form_link: e.target.value }))}
                placeholder="Enter admission form URL"
                type="url"
              />
            </div>
          </div>

          {/* Prerequisites */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Prerequisites
                <Button type="button" size="sm" onClick={addPrerequisite}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add Prerequisite
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {(formData.extra_fields.prerequisites || []).map((prerequisite: string, index: number) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={prerequisite}
                    onChange={(e) => updatePrerequisite(index, e.target.value)}
                    placeholder="Enter prerequisite"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removePrerequisite(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Learning Outcomes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Learning Outcomes
                <Button type="button" size="sm" onClick={addLearningOutcome}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add Outcome
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {(formData.extra_fields.learning_outcomes || []).map((outcome: string, index: number) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={outcome}
                    onChange={(e) => updateLearningOutcome(index, e.target.value)}
                    placeholder="Enter learning outcome"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeLearningOutcome(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* What You'll Get */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                What You'll Get
                <Button type="button" size="sm" onClick={addWhatYouGet}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add Benefit
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {(formData.extra_fields.what_you_get || []).map((benefit: string, index: number) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={benefit}
                    onChange={(e) => updateWhatYouGet(index, e.target.value)}
                    placeholder="Enter what students will get"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeWhatYouGet(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={formData.extra_fields.additional_info || ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  extra_fields: { ...prev.extra_fields, additional_info: e.target.value }
                }))}
                placeholder="Enter any additional course information"
                rows={4}
              />
            </CardContent>
          </Card>

          {/* Course Modules */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Course Modules
                <Button type="button" size="sm" onClick={addModule}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add Module
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {(Array.isArray(formData.modules) ? formData.modules : []).map((module, moduleIndex) => (
                <Card key={moduleIndex} className="border border-muted">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Module {moduleIndex + 1}</CardTitle>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeModule(moduleIndex)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Module Title</Label>
                      <Input
                        value={module.title}
                        onChange={(e) => updateModule(moduleIndex, 'title', e.target.value)}
                        placeholder="Enter module title"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Module Description</Label>
                      <Textarea
                        value={module.description}
                        onChange={(e) => updateModule(moduleIndex, 'description', e.target.value)}
                        placeholder="Enter module description"
                        rows={2}
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>Topics</Label>
                        <Button type="button" size="sm" onClick={() => addTopic(moduleIndex)}>
                          <Plus className="h-4 w-4 mr-1" />
                          Add Topic
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {(module.topics || []).map((topic, topicIndex) => (
                          <div key={topicIndex} className="flex gap-2">
                            <Input
                              value={topic}
                              onChange={(e) => updateTopic(moduleIndex, topicIndex, e.target.value)}
                              placeholder="Enter topic"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => removeTopic(moduleIndex, topicIndex)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : (course?.id ? 'Update' : 'Add')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}