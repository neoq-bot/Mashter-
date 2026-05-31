// Strict admin access control - non-negotiable
export interface Profile {
  id: string;
  email: string;
  plan: 'free' | 'pro';
  subscription_status: 'active' | 'inactive';
  is_admin: boolean;
  is_whitelisted: boolean;
  created_at: string;
}

// CRITICAL: This is the ONLY valid way to check admin access
export const isAdminUser = (profile: Profile | null): boolean => {
  if (!profile) return false;
  const isAdmin = 
    profile.email === 'nmdakane860@gmail.com' &&
    profile.is_admin === true;
  
  return isAdmin;
};

// Global access control
export const hasAccess = (profile: Profile | null): boolean => {
  if (!profile) return false;

  return (
    profile.email === 'nmdakane860@gmail.com' ||
    profile.is_whitelisted === true ||
    profile.subscription_status === 'active' ||
    profile.plan === 'pro'
  );
};

// Get user profile
export const getProfile = async (email: string, supabaseClient: any) => {
  const { data, error } = await supabaseClient
    .from('profiles')
    .select('*')
    .eq('email', email)
    .single();

  if (error) {
    console.error('Error fetching profile:', error);
    return null;
  }

  return data as Profile;
};

// Create or update profile
export const upsertProfile = async (email: string, supabaseClient: any) => {
  const { data, error } = await supabaseClient
    .from('profiles')
    .upsert([
      {
        email,
        created_at: new Date().toISOString(),
      },
    ])
    .select()
    .single();

  if (error) {
    console.error('Error upserting profile:', error);
    return null;
  }

  return data as Profile;
};