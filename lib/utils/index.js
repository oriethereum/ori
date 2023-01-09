/*!
 * utils/index.js - utils for ori
 * Copyright (c) 2014-2017, Christopher Jeffrey (MIT License).
 * https://github.com/oriethereum/ori
 */

'use strict';

/**
 * @module utils
 */

exports.binary = require('./binary');
exports.fixed = require('./fixed');
exports.util = require('./util');
exports.message = require('./message');

const {inspect: {custom}} = require('util');
exports.inspectSymbol = custom || 'inspect';
