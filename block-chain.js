import Block from './block.js';
import Transaction from './transaction.js';

export default class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 3;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }

    createGenesisBlock() {
        return new Block('Genesis block', '0');
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    createTransaction(transaction){
        this.pendingTransactions.push(transaction);
    }

    addBlock(newBlock) {
        var previouseBlock = this.getLatestBlock();
        newBlock.previouseHash = this.getLatestBlock().hash;
        // newBlock.hash = newBlock.calculateHash();
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    minePendingTransactions(miningRewardAddress) {
        let block = new Block(this.pendingTransactions);
        block.mineBlock(this.difficulty);
        this.chain.push(block);

        // Reset the pending transactions and send the mining reward. The mining address will be rewarded in next mine
        this.pendingTransactions = [new Transaction(null, miningRewardAddress, this.miningReward)];
    }

    getBalanceOfAddress(address){
        let balance = 0;
        for(const block of this.chain){
            for(const trans of block.transaction){
                if(trans.fromAddress === address){
                    balance -= trans.amount;
                }

                if(trans.toAddress === address){
                    balance += trans.amount;
                }
            }
        }

        return balance;
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previouseBlock = this.chain[i - 1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previouseHash !== previouseBlock.hash){
                return false;
            }
        }
        return true;
    }
}
