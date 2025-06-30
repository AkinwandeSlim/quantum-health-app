
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface SiteInfo {
  [key: string]: string;
}

export const useSiteInfo = () => {
  const [siteInfo, setSiteInfo] = useState<SiteInfo>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSiteInfo();
  }, []);

  const fetchSiteInfo = async () => {
    try {
      const { data, error } = await supabase
        .from('site_info')
        .select('key, value');

      if (error) throw error;

      const infoMap = data.reduce((acc, item) => {
        acc[item.key] = item.value;
        return acc;
      }, {} as SiteInfo);

      setSiteInfo(infoMap);
    } catch (error) {
      console.error('Error fetching site info:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateSiteInfo = async (key: string, value: string) => {
    try {
      const { error } = await supabase.rpc('update_site_info', {
        info_key: key,
        info_value: value
      });

      if (error) throw error;

      setSiteInfo(prev => ({ ...prev, [key]: value }));
    } catch (error) {
      console.error('Error updating site info:', error);
      throw error;
    }
  };

  return {
    siteInfo,
    loading,
    updateSiteInfo,
    refetch: fetchSiteInfo
  };
};
