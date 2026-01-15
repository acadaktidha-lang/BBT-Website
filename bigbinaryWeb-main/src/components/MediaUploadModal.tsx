import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload, X, Loader } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface MediaAsset {
  id: string;
  asset_key: string;
  asset_name: string;
  asset_url: string;
  storage_path?: string;
  section: string;
  description?: string;
  alt_text?: string;
  sort_order: number;
  file_size?: number;
  mime_type?: string;
}

interface MediaUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  asset?: MediaAsset;
  onSuccess?: () => void;
}

export default function MediaUploadModal({ isOpen, onClose, asset, onSuccess }: MediaUploadModalProps) {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string>(asset?.asset_url || '');
  const [formData, setFormData] = useState({
    asset_name: asset?.asset_name || '',
    alt_text: asset?.alt_text || '',
    description: asset?.description || '',
    sort_order: asset?.sort_order || 0
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file.",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast({
        title: "File too large",
        description: "Please select an image under 10MB.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    
    try {
      // Convert file to base64
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64String = e.target?.result as string;
        const base64Data = base64String.split(',')[1]; // Remove data:image/jpeg;base64, prefix

        const { data, error } = await supabase.functions.invoke('storage-media', {
          body: {
            action: 'upload_file',
            file_data: base64Data,
            file_name: file.name,
            asset_key: asset?.asset_key || 'new_asset',
            section: asset?.section || 'general',
            mime_type: file.type,
            asset_name: formData.asset_name || asset?.asset_key || 'new_asset',
            alt_text: formData.alt_text
          }
        });

        if (error) throw error;

        setPreview(data.url);
        
        toast({
          title: "Upload successful",
          description: "Image uploaded to storage successfully.",
        });

        onSuccess?.();
        onClose();
      };
      
      reader.readAsDataURL(file);

    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Failed to upload image.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const updateMediaAsset = async () => {
    if (!asset) return;
    
    setLoading(true);
    
    try {
      const { error } = await supabase.functions.invoke('storage-media', {
        body: {
          action: 'update_media_asset',
          asset_key: asset.asset_key,
          asset_name: formData.asset_name,
          alt_text: formData.alt_text,
          description: formData.description
        }
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Media asset updated successfully.",
      });

      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Update error:', error);
      toast({
        title: "Update failed",
        description: error instanceof Error ? error.message : "Failed to update media asset.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    await updateMediaAsset();
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDeleteImage = async () => {
    if (!asset?.storage_path) return;
    
    setLoading(true);
    
    try {
      const { error } = await supabase.functions.invoke('storage-media', {
        body: {
          action: 'delete_file',
          storage_path: asset.storage_path,
          asset_key: asset.asset_key
        }
      });

      if (error) throw error;

      // Reset preview
      setPreview('');
      
      toast({
        title: "Delete successful",
        description: "Image deleted successfully.",
      });

      onSuccess?.();
      onClose();
      
    } catch (error) {
      console.error('Delete error:', error);
      toast({
        title: "Delete failed",
        description: "Failed to delete image from storage.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {asset ? `Edit ${asset.asset_name}` : 'Upload New Media'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Image Preview and Upload */}
          <div className="space-y-4">
            <Label>Image</Label>
            
            {preview ? (
              <div className="relative">
                <img 
                  src={preview} 
                  alt="Preview" 
                  className="w-full h-48 object-cover rounded-lg border"
                />
                <div className="absolute top-2 right-2 space-x-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                  >
                    {uploading ? <Loader className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                    Replace
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={handleDeleteImage}
                    disabled={loading}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div 
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600">Click to upload an image</p>
                <p className="text-sm text-gray-400 mt-2">Supports JPG, PNG, WebP up to 10MB</p>
              </div>
            )}
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="asset_name">Asset Name</Label>
              <Input
                id="asset_name"
                value={formData.asset_name}
                onChange={(e) => handleInputChange('asset_name', e.target.value)}
                placeholder="Enter asset name"
              />
            </div>
            <div>
              <Label htmlFor="sort_order">Sort Order</Label>
              <Input
                id="sort_order"
                type="number"
                value={formData.sort_order}
                onChange={(e) => handleInputChange('sort_order', parseInt(e.target.value) || 0)}
                placeholder="0"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="alt_text">Alt Text</Label>
            <Input
              id="alt_text"
              value={formData.alt_text}
              onChange={(e) => handleInputChange('alt_text', e.target.value)}
              placeholder="Describe the image for accessibility"
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Optional description"
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={loading || uploading}
          >
            {loading ? <Loader className="h-4 w-4 animate-spin mr-2" /> : null}
            {asset ? 'Update' : 'Save'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}