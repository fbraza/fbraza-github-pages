---
title: "What is Solana?"
date: "2023-01-14"
tags:
    - Bitcoin
---


Anatoly Yakavenko is the man behind the very first [whitepaper](https://solana.com/solana-whitepaper.pdf) that describe the technical foundation of the [Solana](https://solana.com/fr) blockchain. The main advantages of this blockchain is its speed that reduces cost. In blockchain, blocks synchronization delays the process of transaction. This delay duration called "block time" is massively reduced on Solana. Indeed, Solana block time is of 800 milliseconds, which makes it very fast in comparison to Ethereum (10 seconds) or Bitcoin (10 minutes). Solana claims that their blockchain can handle 710000 transaction per seconds where VISA can only handle 23666 transactions per second

## What makes Solana fast and cheap?

The answer is simple: its consensus mechanism. It is an improved version of the *proof of stake* consensus mechanism that adds special variables of time. This approach, called *proof of history*  enables to integrate the notion of time in the blockchain data. In this regard, timestamps are used to place date & time into the blocks.

In Solana, leader nodes "timestamp" blocks with cryptographic proofs that some duration of time has passed since the last proof. All data hashed into the proof most certainly have occurred before the proof was generated. The node then shares the new block with validator nodes, which are able to verify those proofs. The blocks can arrive at validators in any order or even could be replayed years later. This technical approach allows for very fast sequencing of validators. Indeed, each validators knows its order without having to communicate back and forth.

> **_Note:_**  One big problem that other blockchains have is that they ha ve to agree on time. In some blockhain, nodes need to check back and forth until they agree on a time. And they do that before validating a block. Proof of history fixes this.

## The specifities of Solana

1. **Anyone can stake**: There is no requirement to be a validator and stake your Solana cryptos. For Ethereum you must stake 32 Ethereum whereas in Solana you only need a very small amount and pay some commission. Indeed, Validators incur costs by running and maintaining their systems, and this is passed on to delegators in the form of a fee collected as a percentage of rewards earned. This fee is known as a commission. Validators voting fees are quite expensive and may hold back people from becoming validators. Especially given the price of Solanan at the time of writing.
2. **SeaLevel**: A processing engine that helps Solana scaling horizontally across GPUs and SSDs. With This a particular aspect of the Solana enables the validators to run smart contract in a parallel way.
3. **Pipeline, Cloudbreak and Archiver**: These are additional technicalities that Solana leverage to (i) scale transactions processing, (ii) optimize validation on the network and (iii) distribute storage on its ledger.

## Tokenomics

The solana coin is called `SOL`. Know that `SOL` is:

- deflationary: because for a long time 100% fees transactions were burned. Now less than 50%.
- inflationary: This referred to "pico-inflation" and means that SOL should inflate at an annual rate of 0.1% only. This approved inflationary schedule has the consequence that staking reward will vary until hitting 1.5% in around 2031.

The total supply was around 500 millions at starting. During the initial coin offering around 36% of their total supply were sold at a very low pric (25 cents). Another 13% went to the founders of the project and 10% to the Solana foundation. Finally the remaining 39% is used to fund initiatives and communities.

## Links

- [Solana](https://solana.com/fr)
- [Solana 101](https://solana.com/fr/learn/blockchain-basics)
- [Documentation](https://docs.solana.com/)
