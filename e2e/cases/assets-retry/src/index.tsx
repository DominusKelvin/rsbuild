import React from 'react';
import App from './App';

async function main() {
  const ReactDOM = await import('react-dom/client');

  const root = ReactDOM.createRoot(document.getElementById('root')!);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}

main()