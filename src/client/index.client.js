import React from 'react';
import { createRoot } from 'react-dom/client';

import StartPage from './pages/StartPage';


console.log('index.client.js');

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<StartPage />);