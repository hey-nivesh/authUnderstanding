import React from 'react';
import { AppwriteProvider } from './appwrite/AppWriteContext';
import { Router } from './routes/Router';

const App: React.FC = () => {
  return (
    <AppwriteProvider>
      <Router />
    </AppwriteProvider>
  );
};

export default App;