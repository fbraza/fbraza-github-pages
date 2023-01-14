---
title: "What is Solana?"
date: "2023-01-14"
tags:
    - Bitcoin
---


Anatoly Yakavenko is the man behind the very first [whitepaper](https://solana.com/solana-whitepaper.pdf) that describe the technical foundation of the [Solana](https://solana.com/fr) blockchain. The main advantages of this blockchain is its speed that reduces cost. In blockchain, blocks syncrhonization delyas the process of transaction. This delay duration called "block time" is massively reduced on Solana. Indeed, Solana block time is of 800 milliseconds, which makes it very fast in comparison to Ethereum (10 seconds) or Bitcoin (10 minutes). Solana claims that their blockchain can handle 710000 transaction per seconds where VISA can only handle 23666 transactions per second

## What makes Solana fast and cheap?

The answer is simple: its consensus mechanism. It is an improved version of the *proof of stake* consensus mechanism that adds special variables of time. This approach, called *proof of history*  enables to integrate the notion of time in the blockchain data. In this regard, timestamps are used to place date & time into the blocks.

In Solana, leader nodes "timestamp" blocks with cryptographic proofs that some duration of time has passed since the last proof. All data hashed into the proof most certainly have occurred before the proof was generated. The node then shares the new block with validator nodes, which are able to verify those proofs. The blocks can arrive at validators in any order or even could be replayed years later. This technical approach allows for very fast sequencing of validators. Indeed, each validators knows its order without having to communicate back and forth.

> **_Note:_**  One big problem that other blockchains have is that they ha ve to agree on time. In some blockhain, nodes need to check back and forth until they agree on a time. And they do that before validating a block. Proof of history fixes this.

## The specifities of Solana

1. **Anyone can stake**. There is no requirement to be a validator and stake your Solana cryptos. For Ethereum you must stake 32 Ethereum whereas in Solana you only need a very small amount and pay some commission. Indeed, Validators incur costs by running and maintaining their systems, and this is passed on to delegators in the form of a fee collected as a percentage of rewards earned. This fee is known as a commission. Validators voting fees are quite expensive and may hold back people from becoming validators. Especially given the price of Solanan at the time of writing.

2. **SeaLevel**: This a particular aspect of the Solana blockchain. It enables the validators to run smart contract in a parallel way. Smart contrct are written in Rust.

## Tokenomics

The solana coin is called `SOL`. Know that `SOL` is:

- deflationary: because for a long time 100% fees transactions were burned. Now less than 50%.
- inflationary: they approved an inflationary schedule where staking reward can vary until hitting 1.5% in around 2031.

The total supply was around 500 millions at starting. During the initial coin offering around 36% of their total supply were sold at a very low pric (25 cents). Another 13% went to the founders of the project and 10% to the Solana foundation. Finally the remaining 39% is used to fund initiatives and communities.

## What is it used for?

Solana is designed to support Web3, the claimed next iteration of the internet, built around the idea of a diffuse / decentralized internet that anyone can support and control. It is used for payments, Non-Fungible Tokens (NFT), Decentralized Finance (DeFi) and gaming in the metaverse.

## Links

- [Solana](https://solana.com/fr)
- [Solana 101](https://solana.com/fr/learn/blockchain-basics)
- [Documentation](https://docs.solana.com/)
