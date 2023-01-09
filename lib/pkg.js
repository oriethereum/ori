/*!
 * pkg.js - package constants
 * Copyright (c) 2023, Jonathan Gonzales (MIT License).
 * https://github.com/oriethereum/ori
 */

'use strict';

const pkg = exports;

/**
 * Package Name
 * @const {String}
 * @default
 */

pkg.name = require('../package.json').name;

/**
 * Project Name
 * @const {String}
 * @default
 */

pkg.core = 'bcoin';

/**
 * Organization Name
 * @const {String}
 * @default
 */

pkg.organization = 'oriethereum';

/**
 * Currency Name
 * @const {String}
 * @default
 */

pkg.currency = 'ethereum';

/**
 * Currency Unit
 * @const {String}
 * @default
 */

pkg.unit = 'eth';

/**
 * Base Unit
 * @const {String}
 * @default
 */

pkg.base = 'wei';

/**
 * Config file name.
 * @const {String}
 * @default
 */

pkg.cfg = `${pkg.core}.conf`;

/**
 * Repository URL.
 * @const {String}
 * @default
 */

pkg.url = `https://github.com/${pkg.organization}/${pkg.name}`;

/**
 * Current version string.
 * @const {String}
 */

pkg.version = require('../package.json').version;
