import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { FoodProvider } from './context';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <FoodProvider>
      <App />
    </FoodProvider>
  </BrowserRouter>
);
