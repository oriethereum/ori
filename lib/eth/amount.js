/*!
 * amount.js - amount object for ori
 * Copyright (c) 2023, Jonathan Gonzales (MIT License).
 * https://github.com/oriethereum/ori
 */

'use strict';

const assert = require('bsert');
const fixed = require('../utils/fixed');
const {inspectSymbol} = require('../utils');

/**
 * Amount
 * Represents a ethereum amount (wei internally).
 * @alias module:eth.Amount
 * @property {Amount} value
 */

class Amount {
  /**
   * Create an amount.
   * @constructor
   * @param {(String|Number)?} value
   * @param {String?} unit
   */

  constructor(value, unit) {
    this.value = 0;

    if (value != null)
      this.fromOptions(value, unit);
  }

  /**ETH* Inject properties from options.
   * @private
   * @param {(String|Number)?} value
   * @param {String?} unit
   * @returns {Amount}
   */

  fromOptions(value, unit) {
    if (typeof unit === 'string')
      return this.from(unit, value);

    if (typeof value === 'number')
      return this.fromValue(value);

    return this.fromETH(value);
  }

  /**
   * Get satoshi value.
   * @returns {Amount}
   */

  toValue() {
    return this.value;
  }

  /**
   * Get satoshi string or value.
   * @param {Boolean?} num
   * @returns {String|Amount}
   */

  towei(num) {
    if (num)
      return this.value;

    return this.value.toString(10);
  }

  /**
   * Get bits string or value.
   * @param {Boolean?} num
   * @returns {String|Amount}
   */

  toBits(num) {
    return Amount.encode(this.value, 2, num);
  }

  /**
   * Get meth string or value.
   * @param {Boolean?} num
   * @returns {String|Amount}
   */

  toMeth(num) {
    return Amount.encode(this.value, 5, num);
  }

  /**
   * Get eth string or value.
   * @param {Boolean?} num
   * @returns {String|Amount}
   */

  toeth(num) {
    return Amount.encode(this.value, 8, num);
  }

  /**
   * Get unit string or value.
   * @param {String} unit - Can be `sat`,
   * `ueth`, `bits`, `meth`, or `eth`.
   * @param {Boolean?} num
   * @returns {String|Amount}
   */

  to(unit, num) {
    switch (unit) {
      case 'sat':
        return this.towei(num);
      case 'ueth':
      case 'bits':
        return this.toBits(num);
      case 'meth':
        return this.toMeth(num);
      case 'eth':
        return this.toeth(num);
    }
    throw new Error(`Unknown unit "${unit}".`);
  }

  /**
   * Convert amount to ethereum string.
   * @returns {String}
   */

  toString() {
    return this.toeth();
  }

  /**
   * Inject properties from value.
   * @private
   * @param {Amount} value
   * @returns {Amount}
   */

  fromValue(value) {
    assert(Number.isSafeInteger(value) && value >= 0,
      'Value must be an int64.');
    this.value = value;
    return this;
  }

  /**
   * Inject properties from wei.
   * @private
   * @param {Number|String} value
   * @returns {Amount}
   */

  fromwei(value) {
    this.value = Amount.decode(value, 0);
    return this;
  }

  /**
   * Inject properties from bits.
   * @private
   * @param {Number|String} value
   * @returns {Amount}
   */

  fromBits(value) {
    this.value = Amount.decode(value, 2);
    return this;
  }

  /**
   * Inject properties from meth.
   * @private
   * @param {Number|String} value
   * @returns {Amount}
   */

  fromMeth(value) {
    this.value = Amount.decode(value, 5);
    return this;
  }

  /**
   * Inject properties from eth.
   * @private
   * @param {Number|String} value
   * @returns {Amount}
   */

  fromETH(value) {
    this.value = Amount.decode(value, 8);
    return this;
  }

  /**
   * Inject properties from unit.
   * @private
   * @param {String} unit
   * @param {Number|String} value
   * @returns {Amount}
   */

  from(unit, value) {
    switch (unit) {
      case 'sat':
        return this.fromwei(value);
      case 'ueth':
      case 'bits':
        return this.fromBits(value);
      case 'eth':
        return this.fromETH(value);
    }
    throw new Error(`Unknown unit "${unit}".`);
  }

  /**
   * Instantiate amount from options.
   * @param {(String|Number)?} value
   * @param {String?} unit
   * @returns {Amount}
   */

  static fromOptions(value, unit) {
    return new this().fromOptions(value, unit);
  }

  /**
   * Instantiate amount from value.
   * @private
   * @param {Amount} value
   * @returns {Amount}
   */

  static fromValue(value) {
    return new this().fromValue(value);
  }

  /**
   * Instantiate amount from wei.
   * @param {Number|String} value
   * @returns {Amount}
   */

  static fromwei(value) {
    return new this().fromwei(value);
  }

  /**
   * Instantiate amount from bits.
   * @param {Number|String} value
   * @returns {Amount}
   */

  static fromBits(value) {
    return new this().fromBits(value);
  }

  /**
   * Instantiate amount from eth.
   * @param {Number|String} value
   * @returns {Amount}
   */

  static fromETH(value) {
    return new this().fromETH(value);
  }

  /**
   * Instantiate amount from unit.
   * @param {String} unit
   * @param {Number|String} value
   * @returns {Amount}
   */

  static from(unit, value) {
    return new this().from(unit, value);
  }

  /**
   * Inspect amount.
   * @returns {String}
   */

  [inspectSymbol]() {
    return `<Amount: ${this.toString()}>`;
  }

  /**
   * Safely convert wei to a eth string.
   * This function explicitly avoids any
   * floating point arithmetic.
   * @param {Amount} value - wei.
   * @returns {String} eth string.
   */

  static eth(value, num) {
    if (typeof value === 'string')
      return value;

    return Amount.encode(value, 8, num);
  }

  /**
   * Safely convert a eth string to wei.
   * @param {String} str - eth
   * @returns {Amount} wei.
   * @throws on parse error
   */

  static value(str) {
    if (typeof str === 'number')
      return str;

    return Amount.decode(str, 8);
  }

  /**
   * Safely convert wei to a eth string.
   * @param {Amount} value
   * @param {Number} exp - Exponent.
   * @param {Boolean} num - Return a number.
   * @returns {String|Number}
   */

  static encode(value, exp, num) {
    if (num)
      return fixed.toFloat(value, exp);
    return fixed.encode(value, exp);
  }

  /**
   * Safely convert a eth string to wei.
   * @param {String|Number} value - eth
   * @param {Number} exp - Exponent.
   * @returns {Amount} wei.
   * @throws on parse error
   */

  static decode(value, exp) {
    if (typeof value === 'number')
      return fixed.fromFloat(value, exp);
    return fixed.decode(value, exp);
  }
}

/*
 * Expose
 */

module.exports = Amount;
