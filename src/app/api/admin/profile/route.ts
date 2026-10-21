import { NextResponse } from 'next/server';
import { getServerSupabaseClient, isServerSupabaseConfigured } from '@/lib/supabase/server';
import { readServerProfileFile, writeServerProfileFile } from '@/lib/server-profile';
import { INITIAL_PROFILE } from '@/lib/initial-data';
import { ProfileSettings } from '@/lib/types';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const headers = {
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
  };

  try {
    if (isServerSupabaseConfigured()) {
      const supabase = getServerSupabaseClient();
      if (supabase) {
        const { data, error } = await supabase
          .from('profile_settings')
          .select('*')
          .eq('id', 'main')
          .single();

        if (!error && data) {
          return NextResponse.json({ success: true, data, source: 'supabase' }, { headers });
        }
      }
    }

    const fileProfile = readServerProfileFile();
    if (fileProfile) {
      return NextResponse.json({ success: true, data: fileProfile, source: 'file' }, { headers });
    }

    return NextResponse.json({ success: true, data: INITIAL_PROFILE, source: 'default' }, { headers });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message, data: INITIAL_PROFILE },
      { status: 500, headers }
    );
  }
}

export async function POST(req: Request) {
  try {
    const profile: ProfileSettings = await req.json();

    if (!profile || typeof profile !== 'object') {
      return NextResponse.json({ success: false, error: 'Invalid profile data' }, { status: 400 });
    }

    // 1. Always persist to server-side file (ensures local dev & incognito sync instantly)
    writeServerProfileFile(profile);

    // 2. Persist to Supabase if configured
    if (isServerSupabaseConfigured()) {
      const supabase = getServerSupabaseClient();
      if (supabase) {
        const dbPayload: any = {
          id: profile.id || 'main',
          full_name: profile.fullName || INITIAL_PROFILE.fullName,
          role_title: profile.roleTitle || INITIAL_PROFILE.roleTitle,
          intro: profile.intro,
          about_bio: profile.aboutBio,
          email: profile.email || INITIAL_PROFILE.email,
          phone: profile.phone,
          location: profile.location,
          social_instagram: profile.socialInstagram,
          social_behance: profile.socialBehance,
          social_linkedin: profile.socialLinkedin,
          social_whatsapp: profile.socialWhatsapp,
          social_website: profile.socialWebsite,
          resume_url: profile.resumeUrl,
          theme_mode: profile.themeMode || 'system',
          categories: profile.categories,
          theme_config: profile.themeConfig,
          updated_at: new Date().toISOString(),
        };

        let { data, error } = await supabase
          .from('profile_settings')
          .upsert(dbPayload, { onConflict: 'id' })
          .select()
          .single();

        // Fallback if theme_config or theme_mode columns are missing in Supabase schema
        if (
          error &&
          (error.message?.includes('theme_mode') ||
            error.message?.includes('categories') ||
            error.message?.includes('theme_config') ||
            error.message?.includes('column'))
        ) {
          console.warn('Supabase profile schema column missing, retrying without theme columns:', error.message);
          const fallbackPayload = { ...dbPayload };
          delete fallbackPayload.theme_mode;
          delete fallbackPayload.categories;
          delete fallbackPayload.theme_config;

          const retry = await supabase
            .from('profile_settings')
            .upsert(fallbackPayload, { onConflict: 'id' })
            .select()
            .single();

          if (!retry.error) {
            return NextResponse.json({
              success: true,
              data: profile,
              source: 'supabase_partial',
              warning:
                'Settings saved, but your Supabase table is missing the theme_config column. Please run the SQL migration in Admin > Database Setup to enable persistent theme saving.',
            });
          }
        }

        if (error) {
          console.error('Supabase profile upsert error:', error);
          return NextResponse.json({
            success: false,
            data: profile,
            error: error.message,
            savedLocally: true,
          });
        }

        return NextResponse.json({
          success: true,
          data: profile,
          source: 'supabase',
        });
      }
    }

    return NextResponse.json({
      success: true,
      data: profile,
      source: 'server_file',
    });
  } catch (err: any) {
    console.error('Error in POST /api/admin/profile:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
