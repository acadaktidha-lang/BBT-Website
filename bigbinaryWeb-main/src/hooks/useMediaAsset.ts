import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface MediaAsset {
  id: string;
  asset_key: string;
  asset_name: string;
  asset_url: string;
  alt_text?: string;
  description?: string;
}

export const useMediaAsset = (assetKey: string, fallbackUrl?: string) => {
  const [asset, setAsset] = useState<MediaAsset | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!assetKey) {
      setLoading(false);
      return;
    }

    const fetchAsset = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
          .from('media_assets')
          .select('*')
          .eq('asset_key', assetKey)
          .eq('is_active', true)
          .maybeSingle();

        if (error) throw error;

        setAsset(data);
      } catch (err) {
        console.error('Error fetching media asset:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch asset');
      } finally {
        setLoading(false);
      }
    };

    fetchAsset();
  }, [assetKey]);

  return {
    asset,
    loading,
    error,
    url: asset?.asset_url || fallbackUrl || '',
    altText: asset?.alt_text || '',
    description: asset?.description || ''
  };
};

export const useMediaAssets = (section?: string) => {
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        setLoading(true);
        setError(null);

        let query = supabase
          .from('media_assets')
          .select('*')
          .eq('is_active', true)
          .order('sort_order', { ascending: true });

        if (section) {
          query = query.eq('section', section);
        }

        const { data, error } = await query;

        if (error) throw error;

        setAssets(data || []);
      } catch (err) {
        console.error('Error fetching media assets:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch assets');
      } finally {
        setLoading(false);
      }
    };

    fetchAssets();
  }, [section]);

  return {
    assets,
    loading,
    error
  };
};