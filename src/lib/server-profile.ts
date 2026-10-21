import fs from 'fs';
import path from 'path';
import { ProfileSettings } from './types';
import { INITIAL_PROFILE } from './initial-data';

const DATA_DIR = path.join(process.cwd(), '.data');
const PROFILE_FILE = path.join(DATA_DIR, 'profile_settings.json');

export function readServerProfileFile(): ProfileSettings | null {
  try {
    if (!fs.existsSync(PROFILE_FILE)) {
      return null;
    }
    const raw = fs.readFileSync(PROFILE_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') {
      return {
        ...INITIAL_PROFILE,
        ...parsed,
      };
    }
    return null;
  } catch (err) {
    console.warn('Error reading server profile fallback:', err);
    return null;
  }
}

export function writeServerProfileFile(profile: ProfileSettings): boolean {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(PROFILE_FILE, JSON.stringify(profile, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.warn('Error writing server profile fallback:', err);
    return false;
  }
}
