import { getSupabaseClient } from './supabase/client';

export interface UploadResult {
  url: string | null;
  error: string | null;
}

/**
 * Uploads an image file to Supabase Storage bucket 'portfolio-assets'
 */
export async function uploadPortfolioImage(file: File): Promise<UploadResult> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return {
      url: null,
      error: 'Supabase is not configured. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment.',
    };
  }

  try {
    const fileExt = file.name.split('.').pop();
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}-${cleanFileName}`;
    const filePath = `images/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('portfolio-assets')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      return { url: null, error: uploadError.message };
    }

    const { data: publicUrlData } = supabase.storage
      .from('portfolio-assets')
      .getPublicUrl(filePath);

    return { url: publicUrlData.publicUrl, error: null };
  } catch (err: any) {
    return { url: null, error: err.message || 'Failed to upload image' };
  }
}

/**
 * Uploads a resume PDF file to Supabase Storage bucket 'resumes'
 */
export async function uploadResumeFile(file: File): Promise<UploadResult> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return {
      url: null,
      error: 'Supabase is not configured. Please connect Supabase first.',
    };
  }

  try {
    const fileExt = file.name.split('.').pop()?.toLowerCase();
    if (fileExt !== 'pdf') {
      return { url: null, error: 'Only PDF files are allowed for resume upload.' };
    }

    const fileName = `sumit-kumar-resume-${Date.now()}.pdf`;
    const filePath = `documents/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('resumes')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (uploadError) {
      return { url: null, error: uploadError.message };
    }

    const { data: publicUrlData } = supabase.storage
      .from('resumes')
      .getPublicUrl(filePath);

    return { url: publicUrlData.publicUrl, error: null };
  } catch (err: any) {
    return { url: null, error: err.message || 'Failed to upload resume' };
  }
}
