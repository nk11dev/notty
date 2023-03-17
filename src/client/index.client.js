import '@/styles/fonts.scss';
import '@/styles/bootstrap/index.scss';

import React from 'react';
import { createRoot } from 'react-dom/client';

import App from '@/app/App';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<App />);