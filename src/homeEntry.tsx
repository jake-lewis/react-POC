import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Home from './components/home/Home'
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<Home />, document.getElementById("demo"));

registerServiceWorker();
