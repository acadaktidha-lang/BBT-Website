import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface Specialization {
  id?: string;
  name: string;
  description: string;
  slug: string;
  image_url: string;
  sort_order: number;
}

interface SpecializationManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  specialization?: Specialization | null;
  onSuccess: () => void;
}

export default function SpecializationManagementModal({ isOpen, onClose, specialization, onSuccess }: SpecializationManagementModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Specialization>({
    name: '',
    description: '',
    slug: '',
    image_url: '',
    sort_order: 0,
  });

  // Populate form data when specialization prop changes
  useEffect(() => {
    if (specialization) {
      setFormData({
        name: specialization.name || '',
        description: specialization.description || '',
        slug: specialization.slug || '',
        image_url: specialization.image_url || '',
        sort_order: specialization.sort_order || 0,
      });
    } else {
      // Reset form for new specialization
      setFormData({
        name: '',
        description: '',
        slug: '',
        image_url: '',
        sort_order: 0,
      });
    }
  }, [specialization]);

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleNameChange = (name: string) => {
    setFormData(prev => ({
      ...prev,
      name,
      slug: prev.slug || generateSlug(name)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (specialization?.id) {
        // Update existing specialization
        const { data, error } = await supabase
          .from('specializations')
          .update({
            name: formData.name,
            description: formData.description,
            slug: formData.slug,
            image_url: formData.image_url,
            sort_order: formData.sort_order,
          })
          .eq('id', specialization.id)
          .select();

        if (error) throw error;
        if (!data || data.length === 0) throw new Error('Not authorized or specialization not found.');

        if (error) throw error;

        toast({
          title: "Success",
          description: "Specialization updated successfully.",
        });
      } else {
        // Create new specialization
        const { data, error } = await supabase
          .from('specializations')
          .insert([{
            name: formData.name,
            description: formData.description,
            slug: formData.slug,
            image_url: formData.image_url,
            sort_order: formData.sort_order,
            is_active: true,
          }])
          .select();

        if (error) throw error;
        if (!data || data.length === 0) throw new Error('Not authorized to add specialization.');

        if (error) throw error;

        toast({
          title: "Success",
          description: "Specialization added successfully.",
        });
      }

      onSuccess();
      onClose();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save specialization.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof Specialization, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">{/**ScrollableMOdal*/}
        <DialogHeader>
          <DialogTitle>
            {specialization?.id ? 'Edit Specialization' : 'Add Specialization'}
          </DialogTitle>
          <DialogDescription>
            {specialization?.id ? 'Update the specialization information below.' : 'Add a new specialization to your offerings.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="Enter specialization name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              value={formData.slug}
              onChange={(e) => handleInputChange('slug', e.target.value)}
              placeholder="Enter URL slug"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Enter specialization description"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image_url">Image URL</Label>
            <Input
              id="image_url"
              value={formData.image_url}
              onChange={(e) => handleInputChange('image_url', e.target.value)}
              placeholder="Enter image URL (optional)"
              type="url"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sort_order">Sort Order</Label>
            <Input
              id="sort_order"
              type="number"
              value={formData.sort_order}
              onChange={(e) => handleInputChange('sort_order', parseInt(e.target.value) || 0)}
              placeholder="Enter sort order"
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : (specialization?.id ? 'Update' : 'Add')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}