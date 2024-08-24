import { redirect } from 'next/navigation';
import { getSession } from '@/lib/providers/supabase/actions';
import { useUserStore } from '@/lib/stores/user-store';

interface IProtectedLayoutProps {
  readonly children: React.ReactNode;
}

async function ProtectedLayout({ children }: IProtectedLayoutProps) {
  const session = await getSession();

  if (!session) {
    return redirect('/login');
  }

  // Hydrate the Zustand store on the server
  useUserStore.setState({ session, user: session.user });

  return <>{children}</>;
}

export default ProtectedLayout;
