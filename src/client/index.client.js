import React from 'react';
import { createRoot } from 'react-dom/client';

import StartPage from './pages/StartPage';
import App from './app/App';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <App>
    <StartPage />
  </App>
);