interface IProtectedLayoutProps {
  children: React.ReactNode;
}

async function ProtectedLayout({ children }: IProtectedLayoutProps) {
  const { isAuthenticated } = useAuth();
  
  return isAuthenticated ? children : <Redirect to="/login" />;
}