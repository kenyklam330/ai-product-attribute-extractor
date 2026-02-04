import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Find the 'root' div from your index.html
const rootElement = document.getElementById('root');

// Initialize the React 18 root
const root = ReactDOM.createRoot(rootElement);

// Render your App within StrictMode (helps catch common AI-component bugs)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);