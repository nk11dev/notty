/* import '@/styles/theme/fonts.scss';
import '@/styles/bootstrap/index.scss';
import '@/styles/common/common.scss';

import React from 'react';
import { createRoot } from 'react-dom/client';

import App from '@/app/App';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<App />); */

import React from 'react';
import { createRoot } from 'react-dom/client';

import Demo from '@/app/__demo';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<Demo />);