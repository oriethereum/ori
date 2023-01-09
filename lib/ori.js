/*!
 * ori.js - a javascript ethereum library.
 * Copyright (c) 2014-2015, Jonathan Gonzales (MIT License).
 * https://github.com/oriethereum/ori
 */

/* eslint prefer-arrow-callback: "off" */

'use strict';

/**
 * A ori "environment" which exposes all
 * constructors for primitives, the blockchain,
 * mempool, wallet, etc. It also exposes a
 * global worker pool.
 *
 * @exports ori
 * @type {Object}
 */

const ori = exports;

/**
 * Define a module for lazy loading.
 * @param {String} name
 * @param {String} path
 */

ori.define = function define(name, path) {
  let cache = null;
  Object.defineProperty(ori, name, {
    enumerable: true,
    get() {
      if (!cache)
        cache = require(path);
      return cache;
    }
  });
};

/**
 * Set the default network.
 * @param {String} network
 */

ori.set = function set(network) {
  ori.Network.set(network);
  return ori;
};

/*
 * Expose
 */

// Blockchain
ori.define('blockchain', './blockchain');
ori.define('blockstore', './blockstore');
ori.define('Chain', './blockchain/chain');
ori.define('ChainEntry', './blockchain/chainentry');

//ETH
ori.define('ETH', './eth');
ori.define('Amount', './eth/amount');
ori.define('URI', './eth/uri');

// Client
ori.define('client', './client');
ori.define('NodeClient', './client/node');
ori.define('WalletClient', './client/wallet');

// HD
ori.define('hd', './hd');
ori.define('HDPrivateKey', './hd/private');
ori.define('HDPublicKey', './hd/public');
ori.define('Mnemonic', './hd/mnemonic');

// Index
ori.define('indexer', './indexer');
ori.define('Indexer', './indexer/indexer');
ori.define('TXIndexer', './indexer/txindexer');
ori.define('AddrIndexer', './indexer/addrindexer');

// Mempool
ori.define('mempool', './mempool');
ori.define('Fees', './mempool/fees');
ori.define('Mempool', './mempool/mempool');
ori.define('MempoolEntry', './mempool/mempoolentry');

// Miner
ori.define('mining', './mining');
ori.define('Miner', './mining/miner');

// Net
ori.define('net', './net');
ori.define('packets', './net/packets');
ori.define('Peer', './net/peer');
ori.define('Pool', './net/pool');

// Node
ori.define('node', './node');
ori.define('Node', './node/node');
ori.define('FullNode', './node/fullnode');
ori.define('SPVNode', './node/spvnode');

// Primitives
ori.define('primitives', './primitives');
ori.define('Address', './primitives/address');
ori.define('Block', './primitives/block');
ori.define('Headers', './primitives/headers');
ori.define('Input', './primitives/input');
ori.define('InvItem', './primitives/invitem');
ori.define('KeyRing', './primitives/keyring');
ori.define('MerkleBlock', './primitives/merkleblock');
ori.define('MTX', './primitives/mtx');
ori.define('Outpoint', './primitives/outpoint');
ori.define('Output', './primitives/output');
ori.define('TX', './primitives/tx');

// Protocol
ori.define('protocol', './protocol');
ori.define('consensus', './protocol/consensus');
ori.define('Network', './protocol/network');
ori.define('networks', './protocol/networks');
ori.define('policy', './protocol/policy');

// Utils
ori.define('utils', './utils');
ori.define('util', './utils/util');

// Wallet
ori.define('wallet', './wallet');
ori.define('Path', './wallet/path');
ori.define('WalletKey', './wallet/walletkey');
ori.define('WalletDB', './wallet/walletdb');

// Workers
ori.define('workers', './workers');
ori.define('WorkerPool', './workers/workerpool');

// Package Info
ori.define('pkg', './pkg');
