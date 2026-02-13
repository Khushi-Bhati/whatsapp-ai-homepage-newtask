import React from 'react';
import ReactDOM from 'react-dom/client';
import Homepage from './Homepage';
import './style.css';

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <React.StrictMode>
    <Homepage />
  </React.StrictMode>,
);

