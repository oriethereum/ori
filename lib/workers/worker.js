/*!
 * worker.js - worker thread/process for ori
 * Copyright (c) 2023, Jonathan Gonzales (MIT License).
 * https://github.com/oriethereum/ori
 */

'use strict';

const Master = require('./master');
const server = new Master();

process.title = 'eth-worker';

server.listen();
