import * as React from 'react';
import * as ReactDOM from 'react-dom';

import registerServiceWorker from "./registerServiceWorker";
import Map from './components/map/Map';

ReactDOM.render(<Map />, document.getElementById("demo"));

registerServiceWorker();
