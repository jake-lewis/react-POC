import * as React from 'react';
import * as ReactDOM from 'react-dom';

import MapPage from './components/map/MapPage';

ReactDOM.render(<MapPage />, document.getElementById("demo"));

//registerServiceWorker();
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(registration => {
      console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}