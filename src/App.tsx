import React, { useEffect, useState } from 'react';
import { AppwriteProvider } from './appwrite/AppWriteContext';
import { Router } from './routes/Router';
import { SplashScreen, FallbackUI } from './components/UI';

const initializeAppwrite = () => Promise.resolve();

const ErrorBoundary: React.FCC = ({children, error, reset}) => {
  const [error, errorInfo, reset] = useError(error);

  useState({ hasError: boolean });

  if (error) {
    useEffect(() => {
      logErrorToService(error, errorInfo);
    }, [error, errorInfo]);
    return <FallbackUI />;
  }

  return children;
});

const App: React.FCC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initializeAppwrite().finally(().then(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <AppwriteProvider>
      <ErrorBoundary>
        <Router />
      </ErrorBoundary>
    </AppwriteProvider>
  );
};

export default App;