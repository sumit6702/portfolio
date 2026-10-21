import { NextResponse } from 'next/server';
import { getServerSupabaseClient, isServerSupabaseConfigured } from '@/lib/supabase/server';
import { readServerProfileFile, writeServerProfileFile } from '@/lib/server-profile';
import { INITIAL_PROFILE } from '@/lib/initial-data';
import { DEFAULT_THEME_CONFIG } from '@/config/theme-presets';
import { ThemeConfig, ThemeMode } from '@/lib/types';

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
          .select('theme_mode, theme_config')
          .eq('id', 'main')
          .single();

        if (!error && data) {
          return NextResponse.json(
            {
              success: true,
              themeMode: data.theme_mode || 'system',
              themeConfig: data.theme_config || DEFAULT_THEME_CONFIG,
              source: 'supabase',
            },
            { headers }
          );
        }
      }
    }

    const fileProfile = readServerProfileFile();
    if (fileProfile) {
      return NextResponse.json(
        {
          success: true,
          themeMode: fileProfile.themeMode || 'system',
          themeConfig: fileProfile.themeConfig || DEFAULT_THEME_CONFIG,
          source: 'file',
        },
        { headers }
      );
    }

    return NextResponse.json(
      {
        success: true,
        themeMode: INITIAL_PROFILE.themeMode || 'system',
        themeConfig: INITIAL_PROFILE.themeConfig || DEFAULT_THEME_CONFIG,
        source: 'default',
      },
      { headers }
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        error: err.message,
        themeMode: 'system',
        themeConfig: DEFAULT_THEME_CONFIG,
      },
      { status: 500, headers }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { themeConfig, themeMode }: { themeConfig?: ThemeConfig; themeMode?: ThemeMode } = body;

    // Read current profile to update
    let currentProfile = readServerProfileFile() || { ...INITIAL_PROFILE };

    if (isServerSupabaseConfigured()) {
      const supabase = getServerSupabaseClient();
      if (supabase) {
        const { data } = await supabase
          .from('profile_settings')
          .select('*')
          .eq('id', 'main')
          .single();
        if (data) {
          currentProfile = {
            ...currentProfile,
            ...data,
          };
        }
      }
    }

    const updatedProfile = {
      ...currentProfile,
      ...(themeConfig ? { themeConfig } : {}),
      ...(themeMode ? { themeMode } : {}),
    };

    // Save to server file
    writeServerProfileFile(updatedProfile);

    // Save to Supabase
    if (isServerSupabaseConfigured()) {
      const supabase = getServerSupabaseClient();
      if (supabase) {
        const { error } = await supabase
          .from('profile_settings')
          .upsert(
            {
              id: 'main',
              ...(themeConfig ? { theme_config: themeConfig } : {}),
              ...(themeMode ? { theme_mode: themeMode } : {}),
              updated_at: new Date().toISOString(),
            },
            { onConflict: 'id' }
          );

        if (error) {
          console.error('Appearance Supabase update error:', error);
          return NextResponse.json({
            success: false,
            error: error.message,
            savedLocally: true,
          });
        }

        return NextResponse.json({
          success: true,
          themeConfig: updatedProfile.themeConfig,
          themeMode: updatedProfile.themeMode,
          source: 'supabase',
        });
      }
    }

    return NextResponse.json({
      success: true,
      themeConfig: updatedProfile.themeConfig,
      themeMode: updatedProfile.themeMode,
      source: 'server_file',
    });
  } catch (err: any) {
    console.error('Error in POST /api/admin/appearance:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
