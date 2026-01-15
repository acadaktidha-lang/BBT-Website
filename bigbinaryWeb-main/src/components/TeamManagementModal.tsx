import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface TeamMember {
  id?: string;
  name: string;
  position: string;
  bio: string;
  image_url: string;
  category: string;
  sort_order: number;
}

interface TeamManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  member?: TeamMember | null;
  onSuccess: () => void;
}

export default function TeamManagementModal({ isOpen, onClose, member, onSuccess }: TeamManagementModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<TeamMember>({
    name: '',
    position: '',
    bio: '',
    image_url: '',
    category: 'team',
    sort_order: 0,
  });

  // Populate form data when member prop changes
  useEffect(() => {
    if (member) {
      setFormData({
        name: member.name || '',
        position: member.position || '',
        bio: member.bio || '',
        image_url: member.image_url || '',
        category: member.category || 'team',
        sort_order: member.sort_order || 0,
      });
    } else {
      // Reset form for new member
      setFormData({
        name: '',
        position: '',
        bio: '',
        image_url: '',
        category: 'team',
        sort_order: 0,
      });
    }
  }, [member]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (member?.id) {
        // Update existing member
        const { data, error } = await supabase
          .from('team_members')
          .update({
            name: formData.name,
            position: formData.position,
            bio: formData.bio,
            image_url: formData.image_url,
            category: formData.category,
            sort_order: formData.sort_order,
          })
          .eq('id', member.id)
          .select();

        if (error) throw error;
        if (!data || data.length === 0) throw new Error('Not authorized or member not found.');

        if (error) throw error;

        toast({
          title: "Success",
          description: "Team member updated successfully.",
        });
      } else {
        // Create new member
        const { data, error } = await supabase
          .from('team_members')
          .insert([{
            name: formData.name,
            position: formData.position,
            bio: formData.bio,
            image_url: formData.image_url,
            category: formData.category,
            sort_order: formData.sort_order,
            is_active: true,
          }])
          .select();

        if (error) throw error;
        if (!data || data.length === 0) throw new Error('Not authorized to add member.');

        if (error) throw error;

        toast({
          title: "Success",
          description: "Team member added successfully.",
        });
      }

      onSuccess();
      onClose();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save team member.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof TeamMember, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">{/**ScrollableMOdal*/}
        <DialogHeader>
          <DialogTitle>
            {member?.id ? 'Edit Team Member' : 'Add Team Member'}
          </DialogTitle>
          <DialogDescription>
            {member?.id ? 'Update the team member information below.' : 'Add a new team member to your organization.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter full name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="position">Position</Label>
            <Input
              id="position"
              value={formData.position}
              onChange={(e) => handleInputChange('position', e.target.value)}
              placeholder="Enter job title/position"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="team">Team</SelectItem>
                <SelectItem value="leadership">Leadership</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              placeholder="Enter bio/description"
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
              {loading ? 'Saving...' : (member?.id ? 'Update' : 'Add')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}