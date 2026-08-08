'use client';

import { useEffect } from 'react';
import { useLandingContentStore } from '@/store/useLandingContentStore';

export const ClientStoreHydration = () => {
  const { fetchContentFromSupabase } = useLandingContentStore();
  
  useEffect(() => {
    fetchContentFromSupabase();
  }, [fetchContentFromSupabase]);

  return null;
};
