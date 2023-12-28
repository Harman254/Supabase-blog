import { useEffect, useState } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types';

export default function AuthForm() {
  const supabase = createClientComponentClient<Database>();
  const [redirectTo, setRedirectTo] = useState('');

  useEffect(() => {
    // Access window.location only on the client side
    if (typeof window !== 'undefined') {
      setRedirectTo(`http://${window.location.host}/auth/callback`);
    }
  }, []);

  return (
    <div className="w-full max-w-200 mx-auto p-20 rounded-lg shadow-md">
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        theme="light"
        showLinks
        providers={['github', 'google', 'twitter']}
        redirectTo={redirectTo}
      />
    </div>
  );
}
