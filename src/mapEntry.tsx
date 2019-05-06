import * as React from 'react';
import * as ReactDOM from 'react-dom';

import MapPage from './components/map/MapPage';
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<MapPage />, document.getElementById("demo"));

registerServiceWorker();
