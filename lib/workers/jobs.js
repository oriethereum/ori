/*!
 * jobs.js - worker jobs for ori
 * Copyright (c) 2023, Jonathan Gonzales (MIT License).
 * https://github.com/oriethereum/ori
 */

'use strict';

const secp256k1 = require('bcrypto/lib/secp256k1');
const packets = require('./packets');

/**
 * @exports workers/jobs
 */

const jobs = exports;

/**
 * Execute a job on the worker.
 * @param {String} cmd
 * @param {Array} args
 * @returns {Object}
 * @throws on unknown command
 */

jobs.execute = function execute(p) {
  try {
    return jobs.handle(p);
  } catch (e) {
    return new packets.ErrorResultPacket(e);
  }
};

/**
 * Execute a job on the worker.
 * @param {String} cmd
 * @param {Array} args
 * @returns {Object}
 * @throws on unknown command
 */

jobs.handle = function handle(p) {
  switch (p.cmd) {
    case packets.types.CHECK:
      return jobs.check(p.tx, p.view, p.flags);
    case packets.types.CHECKINPUT:
      return jobs.checkInput(p.tx, p.index, p.coin, p.flags);
    case packets.types.SIGN:
      return jobs.sign(p.tx, p.rings, p.type);
    case packets.types.SIGNINPUT:
      return jobs.signInput(p.tx, p.index, p.coin, p.ring, p.type);
    case packets.types.ECVERIFY:
      return jobs.ecVerify(p.msg, p.sig, p.key);
    case packets.types.ECSIGN:
      return jobs.ecSign(p.msg, p.key);
    default:
      throw new Error(`Unknown command: "${p.cmd}".`);
  }
};

/**
 * Execute tx.check() on worker.
 * @see TX#check
 * @param {TX} tx
 * @param {CoinView} view
 * @param {VerifyFlags} flags
 * @returns {CheckResultPacket}
 */

jobs.check = function check(tx, view, flags) {
  try {
    tx.check(view, flags);
  } catch (err) {
    if (err.type === 'ScriptError')
      return new packets.CheckResultPacket(err);
    throw err;
  }
  return new packets.CheckResultPacket();
};

/**
 * Execute tx.checkInput() on worker.
 * @see TX#checkInput
 * @param {TX} tx
 * @param {Number} index
 * @param {Output} coin
 * @param {VerifyFlags} flags
 * @returns {CheckInputResultPacket}
 */

jobs.checkInput = function checkInput(tx, index, coin, flags) {
  try {
    tx.checkInput(index, coin, flags);
  } catch (err) {
    if (err.type === 'ScriptError')
      return new packets.CheckInputResultPacket(err);
    throw err;
  }
  return new packets.CheckInputResultPacket();
};

/**
 * Execute tx.sign() on worker.
 * @see MTX#sign
 * @param {MTX} tx
 * @param {KeyRing[]} ring
 * @param {SighashType} type
 */

jobs.sign = function sign(tx, ring, type) {
  const total = tx.sign(ring, type);
  return packets.SignResultPacket.fromTX(tx, total);
};

/**
 * Execute tx.signInput() on worker.
 * @see MTX#signInput
 * @param {MTX} tx
 * @param {Number} index
 * @param {Output} coin
 * @param {KeyRing} ring
 * @param {SighashType} type
 */

jobs.signInput = function signInput(tx, index, coin, ring, type) {
  const result = tx.signInput(tx, index, coin, ring, type);
  return packets.SignInputResultPacket.fromTX(tx, index, result);
};

/**
 * Execute secp256k1.verify() on worker.
 * @see secp256k1.verify
 * @param {TX} tx
 * @param {VerifyFlags} flags
 * @returns {Boolean}
 */

jobs.ecVerify = function ecVerify(msg, sig, key) {
  const result = secp256k1.verifyDER(msg, sig, key);
  return new packets.ECVerifyResultPacket(result);
};

/**
 * Execute secp256k1.sign() on worker.
 * @see secp256k1.sign
 * @param {TX} tx
 * @param {Number} index
 * @param {VerifyFlags} flags
 * @returns {Boolean}
 */

jobs.ecSign = function ecSign(msg, key) {
  const sig = secp256k1.signDER(msg, key);
  return new packets.ECSignResultPacket(sig);
};

