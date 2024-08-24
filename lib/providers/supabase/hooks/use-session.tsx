import { useEffect } from 'react';
import useSupabase from './use-supabase';
import { useUserStore } from '@/lib/stores/user-store';

function useSession() {
  const { session, user, setSession, setUser } = useUserStore();
  const client = useSupabase();

  useEffect(() => {
    async function getSession() {
      const { data, error } = await client.auth.getSession();
      if (error) {
        console.error('Error fetching session:', error);
        return;
      }
      setSession(data.session);
      setUser(data.session?.user ?? null);
    }

    if (!session) {
      getSession();
    }

    const { data: authListener } = client.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      },
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [client.auth, session, setSession, setUser]);

  return { session, user };
}

export default useSession;
