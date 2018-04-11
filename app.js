import Blockchain from './block-chain.js';
import Block from './block.js';
import Transaction from './transaction.js';

// let tigerCoin = new Blockchain();

// console.log('Mining block 1');
// tigerCoin.addBlock(new Block(new Transaction(123456, 234567, 120)));

// console.log('Mining block 2');
// tigerCoin.addBlock(new Block(new Transaction(123456, 234567, 180)));

// console.log('Mining block 3');
// tigerCoin.addBlock(new Block(new Transaction(123456, 234567, 200)));

// console.log(tigerCoin);

// console.log(`Is valid = ${tigerCoin.isChainValid()}`)

function outputResult(){
    console.log(`Balance of Tiger address is ${tigerCoin.getBalanceOfAddress('tigerAddress')}`);
    console.log(`Balance of Cherie address is ${tigerCoin.getBalanceOfAddress('cherieAddress')}`);
    console.log(`Balance of Emma address is ${tigerCoin.getBalanceOfAddress('emmaAddress')}`);
    console.log(`Balance of Natalie address is ${tigerCoin.getBalanceOfAddress('natalieAddress')}`);
    console.log(tigerCoin.chain);
}

let tigerCoin = new Blockchain();

tigerCoin.createTransaction(new Transaction('cherieAddress', 'tigerAddress', 100));
tigerCoin.createTransaction(new Transaction('cherieAddress', 'tigerAddress', 50));
tigerCoin.createTransaction(new Transaction('emmaAddress', 'cherieAddress', 50));

console.log('Natalie starts mining');
tigerCoin.minePendingTransactions('natalieAddress');
outputResult();

tigerCoin.createTransaction(new Transaction('tigerAddress', 'emmaAddress', 100));
tigerCoin.createTransaction(new Transaction('tigerAddress', 'natalieAddress', 50));

console.log('Cherie starts mining')
tigerCoin.minePendingTransactions('cherieAddress')
outputResult();
