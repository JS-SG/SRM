import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// CSS Stylesheets
import './styles/main.css';
import './styles/navbar.css';
import './styles/hero.css';
import './styles/announcement.css';
import './styles/cards.css';
import './styles/drawer.css';
import './styles/about.css';
import './styles/gallery.css';

import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
