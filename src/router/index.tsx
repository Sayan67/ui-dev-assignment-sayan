import { createBrowserRouter, Navigate, useParams } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { ScreenMap } from '@/components/layout/screenMap';
import { ErrorBoundary } from 'react-error-boundary';

// Create route configuration
const routes = [
  {
    path: '/',
    element: <Navigate to="/dashboards/default" replace />,
  },
  {
    path: '/dashboards',
    element: <Navigate to="/dashboards/default" replace />,
  },
  {
    path: '/pages',
    element: <Navigate to="/pages/user-profile/overview" replace />,
  },
  {
    path: '/dashboards/:type/:subtype?',
    element: (
      <ErrorBoundary fallback={<p>⚠️Something went wrong</p>}>
        <Layout>
          <DashboardRouter />
        </Layout>
      </ErrorBoundary>
    ),
  },
  {
    path: '/pages/:section/:subsection?',
    element: (
      <ErrorBoundary fallback={<p>⚠️Something went wrong</p>}>
        <Layout>
          <PageRouter />
        </Layout>
      </ErrorBoundary>
    ),
  },
  {
    path: '/favorites/:page',
    element: (
      <ErrorBoundary fallback={<p>⚠️Something went wrong</p>}>
        <Layout>
          <FavoritesRouter />
        </Layout>
      </ErrorBoundary>
    ),
  },
];

// Component to handle dashboard routing
function DashboardRouter() {
  const { type, subtype } = useParams<{ type: string; subtype?: string }>();
  
  // Use subtype if available, otherwise use type
  const componentKey = (subtype || type) as keyof typeof ScreenMap;
  const Component = ScreenMap[componentKey];
  
  if (!Component) {
    return (
      <div className="h-full w-full flex items-center justify-center text-muted-foreground">
        Dashboard "{subtype || type}" not available yet :)
      </div>
    );
  }
  
  return <>{Component}</>;
}

// Component to handle page routing
function PageRouter() {
  const { section, subsection } = useParams<{ section: string; subsection?: string }>();
  
  const componentKey = subsection || section;
  const Component = ScreenMap[componentKey as keyof typeof ScreenMap];
  
  if (!Component) {
    return (
      <div className="h-full w-full flex items-center justify-center text-muted-foreground">
        Page "{componentKey}" not available yet :)
      </div>
    );
  }
  
  return <>{Component}</>;
}

// Component to handle favorites routing
function FavoritesRouter() {
  const { page } = useParams<{ page: string }>();
  const Component = ScreenMap[page as keyof typeof ScreenMap];
  
  if (!Component) {
    return (
      <div className="h-full w-full flex items-center justify-center text-muted-foreground">
        Page "{page}" not available yet :)
      </div>
    );
  }
  
  return <>{Component}</>;
}

export const router = createBrowserRouter(routes);