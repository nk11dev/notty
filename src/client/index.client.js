import '@/styles/fonts.scss';
import '@/styles/bootstrap/index.scss';

import React from 'react';
import { createRoot } from 'react-dom/client';

import App from '@/app/App';

console.log('\n--- index.client.js');
console.log('process.env', JSON.stringify(process.env, null, 4));

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<App />);