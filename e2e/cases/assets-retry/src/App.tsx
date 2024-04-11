import React from 'react';
import './App.css';
import { ErrorBoundary } from './ErrorBoundary';

const Hello = React.lazy(() => import('./Hello'));

const App = () => {
  return (
    <div className="content">
      <h1>Rsbuild with React</h1>
      <p>Start building amazing things with Rsbuild.</p>
      <div style={{ border: '1px solid white', padding: 20 }}>
        <ErrorBoundary>
          <Hello />
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default App;
