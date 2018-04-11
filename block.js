import SHA256 from 'crypto-js/sha256';

export default class Block {
    constructor(transaction, previouseHash = '') {
        this.timestamp = this.getTimeStamp();
        this.transaction = transaction;
        this.previouseHash = previouseHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash(){
        return SHA256(this.previouseHash + this.timestamp + JSON.stringify(this.transaction) + this.nonce).toString();
    }

    mineBlock(difficulty){
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
            // console.log(`nonce = ${this.nonce} left = ${this.hash.substring(0, difficulty)}`);
            // console.log(`nonce = ${this.nonce} right = ${Array(difficulty + 1).join('0')}`);
            this.nonce ++;
            this.hash = this.calculateHash();
        }

        console.log(`Block mined: ${this.hash}`);
    }

    getTimeStamp(){
        return window.performance && window.performance.now && window.performance.timing && window.performance.timing.navigationStart ? window.performance.now() + window.performance.timing.navigationStart : Date.now();

    }
}
