import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { pushToDataLayer } from './dataLayer';

function App() {
  useEffect(() => {
    pushToDataLayer({
      event: 'page_view',
      pageCategory: 'home',
      pageTitle: document.title,
      userType: 'guest', // replace with real user data if available
    });
  }, []);

  return (
    <div>
      <h1>Welcome to ShikhunBD Ebook Store</h1>
    </div>
  );
}

export default App;

// Mounting App
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
