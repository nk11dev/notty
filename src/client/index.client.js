import '@/styles/fonts.scss';
import '@/styles/common.scss';

import React from 'react';
import { createRoot } from 'react-dom/client';

import App from '@/app/App';
import ExamplePage from '@/pages/ExamplePage';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <App>
    <ExamplePage />
  </App>
);