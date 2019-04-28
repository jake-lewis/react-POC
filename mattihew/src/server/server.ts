import * as express from 'express';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import Demo from '../components/Demo';

import * as replacestream from 'replacestream';
import * as fs from 'fs';
import * as path from 'path';

const port = 3000;
const server = express();

server.use('js', express.static('dist/js'));

server.get('/*', (req, res) => {
    const body = renderToString(React.createElement(Demo));
    fs.createReadStream(path.join(process.cwd(), 'dist/index.html'))
        .pipe(replacestream('<div id="demo"></div>', `<div id="demo">${body}</div>`))
        .pipe(res);
});

server.listen(port, () => console.log(`listening on port ${port}`));
