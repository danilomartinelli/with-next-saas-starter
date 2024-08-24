interface IRootLayoutProps {
  readonly children: React.ReactNode;
}

// The layout component should be a simple component that receives the children and returns them.
// This is necessary because the `global-error.tsx` component is rendered in the root of the app, and we need to wrap it with a layout component.
// We need to use the `global-error.tsx` component to capture errors and send them to Sentry.
function RootLayout({ children }: IRootLayoutProps) {
  return children;
}

export default RootLayout;
