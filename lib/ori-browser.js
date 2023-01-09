/*!
 * ori.js - a javascript ethereum library.
 * Copyright (c) 2023, Jonathan Gonzales (MIT License).
 * https://github.com/oriethereum/ori
 */

'use strict';

process.env.NODE_BACKEND = 'js';

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
ori.blockchain = require('./blockchain');
ori.Chain = require('./blockchain/chain');
ori.ChainEntry = require('./blockchain/chainentry');

// ETH
ori.eth = require('./eth');
ori.Amount = require('./eth/amount');
ori.URI = require('./eth/uri');

// Client
ori.client = require('./client');
ori.NodeClient = require('./client/node');
ori.WalletClient = require('./client/wallet');

// HD
ori.hd = require('./hd');
ori.HDPrivateKey = require('./hd/private');
ori.HDPublicKey = require('./hd/public');
ori.Mnemonic = require('./hd/mnemonic');

// Index
ori.indexer = require('./indexer');
ori.Indexer = require('./indexer/indexer');
ori.TXIndexer = require('./indexer/txindexer');
ori.AddrIndexer = require('./indexer/addrindexer');

// Mempool
ori.mempool = require('./mempool');
ori.Fees = require('./mempool/fees');
ori.Mempool = require('./mempool/mempool');
ori.MempoolEntry = require('./mempool/mempoolentry');

// Miner
ori.mining = require('./mining');
ori.Miner = require('./mining/miner');

// Net
ori.net = require('./net');
ori.packets = require('./net/packets');
ori.Peer = require('./net/peer');
ori.Pool = require('./net/pool');

// Node
ori.node = require('./node');
ori.Node = require('./node/node');
ori.FullNode = require('./node/fullnode');
ori.SPVNode = require('./node/spvnode');

// Primitives
ori.primitives = require('./primitives');
ori.Address = require('./primitives/address');
ori.Block = require('./primitives/block');
ori.Headers = require('./primitives/headers');
ori.Input = require('./primitives/input');
ori.InvItem = require('./primitives/invitem');
ori.KeyRing = require('./primitives/keyring');
ori.MerkleBlock = require('./primitives/merkleblock');
ori.MTX = require('./primitives/mtx');
ori.Outpoint = require('./primitives/outpoint');
ori.Output = require('./primitives/output');
ori.TX = require('./primitives/tx');

// Protocol
ori.protocol = require('./protocol');
ori.consensus = require('./protocol/consensus');
ori.Network = require('./protocol/network');
ori.networks = require('./protocol/networks');
ori.policy = require('./protocol/policy');

// EVM
ori.evm = require('./evm');
ori.Opcode = require('./evm/opcode');
ori.Program = require('./evm/program');
ori.Compiler = require('./evm/compiler');

// Utils
ori.utils = require('./utils');
ori.util = require('./utils/util');

// Wallet
ori.wallet = require('./wallet');
ori.WalletDB = require('./wallet/walletdb');

// Workers
ori.workers = require('./workers');
ori.WorkerPool = require('./workers/workerpool');

// Package Info
ori.pkg = require('./pkg');
