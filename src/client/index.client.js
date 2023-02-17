import '../assets/styles/common.scss';

import React from 'react';
import { createRoot } from 'react-dom/client';

import ExamplePage from './pages/ExamplePage';
import App from './app/App';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <App>
    <ExamplePage />
  </App>
);