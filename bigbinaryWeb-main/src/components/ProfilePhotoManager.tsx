import React, { useState, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Camera, Upload, Trash2, Loader } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface ProfilePhotoManagerProps {
  userId: string;
  currentAvatarUrl?: string;
  onAvatarUpdate?: (newUrl: string | null) => void;
  className?: string;
}

export default function ProfilePhotoManager({ 
  userId, 
  currentAvatarUrl, 
  onAvatarUpdate,
  className = "" 
}: ProfilePhotoManagerProps) {
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
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

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast({
        title: "File too large",
        description: "Please select an image under 5MB.",
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
            action: 'upload_avatar',
            file_data: base64Data,
            mime_type: file.type,
            user_id: userId
          }
        });

        if (error) throw error;

        toast({
          title: "Upload successful",
          description: "Your profile photo has been updated.",
        });

        onAvatarUpdate?.(data.url);
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

  const handleDeletePhoto = async () => {
    if (!currentAvatarUrl) return;
    
    setDeleting(true);
    
    try {
      const { error } = await supabase.functions.invoke('storage-media', {
        body: {
          action: 'delete_avatar',
          user_id: userId
        }
      });

      if (error) throw error;

      toast({
        title: "Photo deleted",
        description: "Your profile photo has been removed.",
      });

      onAvatarUpdate?.(null);
      
    } catch (error) {
      console.error('Delete error:', error);
      toast({
        title: "Delete failed",
        description: "Failed to delete profile photo.",
        variant: "destructive",
      });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className={`flex flex-col items-center space-y-4 ${className}`}>
      <div className="relative">
        <Avatar className="h-24 w-24">
          <AvatarImage src={currentAvatarUrl} alt="Profile photo" />
          <AvatarFallback>
            <Camera className="h-8 w-8 text-muted-foreground" />
          </AvatarFallback>
        </Avatar>
        
        {(uploading || deleting) && (
          <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
            <Loader className="h-6 w-6 text-white animate-spin" />
          </div>
        )}
      </div>
      
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading || deleting}
        >
          <Upload className="h-4 w-4 mr-2" />
          {currentAvatarUrl ? 'Change Photo' : 'Upload Photo'}
        </Button>
        
        {currentAvatarUrl && (
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDeletePhoto}
            disabled={uploading || deleting}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        )}
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}