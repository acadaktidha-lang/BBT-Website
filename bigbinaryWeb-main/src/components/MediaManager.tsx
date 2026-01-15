import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Plus, RefreshCcw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import MediaUploadModal from '@/components/MediaUploadModal';

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

const sections = [
  { value: 'general', label: 'General' },
  { value: 'hero', label: 'Hero' },
  { value: 'highlights', label: 'Highlights' },
  { value: 'why', label: 'Why Choose Us' },
  { value: 'specializations', label: 'Specializations' },
  { value: 'courses', label: 'Courses' },
  { value: 'avatars', label: 'Avatars' },
];

export default function MediaManager() {
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [section, setSection] = useState<string>('all');
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const fetchAssets = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('storage-media', {
        body: {
          action: 'get_media_assets',
          section: section === 'all' ? undefined : section,
        }
      });

      if (error) throw error;
      setAssets(data.data || []);
    } catch (e) {
      console.error('Failed to load media assets', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, [section]);

  const filtered = assets.filter(a =>
    (a.asset_name?.toLowerCase().includes(query.toLowerCase()) || a.asset_key?.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-justify">Media Manager</CardTitle>
        <CardDescription className="text-justify">
          Store and fetch images from Supabase Storage (S3-compatible).
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-4 items-center flex-wrap">
          <Input
            placeholder="Search by name or key"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="max-w-xs"
          />
          <Select value={section} onValueChange={setSection}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="All sections" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All sections</SelectItem>
              {sections.map(s => (
                <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={fetchAssets} variant="outline">
            {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <RefreshCcw className="h-4 w-4 mr-2" />}
            Refresh
          </Button>
          <Button onClick={() => setIsUploadOpen(true)} className="ml-auto">
            <Plus className="h-4 w-4 mr-2" /> Upload
          </Button>
        </div>

        {loading ? (
          <div className="py-10 text-center text-muted-foreground">Loading...</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map(asset => (
              <div key={asset.id} className="rounded-lg border overflow-hidden">
                <div className="aspect-video bg-muted overflow-hidden">
                  {asset.asset_url ? (
                    <img src={asset.asset_url} alt={asset.alt_text || asset.asset_name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">No image</div>
                  )}
                </div>
                <div className="p-3 text-sm">
                  <div className="font-medium truncate text-justify" title={asset.asset_name}>{asset.asset_name}</div>
                  <div className="text-muted-foreground truncate text-justify" title={asset.asset_key}>{asset.asset_key}</div>
                  <div className="text-muted-foreground text-justify">Section: {asset.section}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        <MediaUploadModal
          isOpen={isUploadOpen}
          onClose={() => setIsUploadOpen(false)}
          onSuccess={fetchAssets}
        />
      </CardContent>
    </Card>
  );
}