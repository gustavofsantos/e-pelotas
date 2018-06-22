const ganache = require('ganache-cli');
const mocha = require('mocha');
const Web3 = require('web3');

const Pelotense = require('../src/e-pelotense');

const web3 = new Web3(ganache.provider);


const epel = new Pelotense({
  name: 'Gustavo Santos'
}, web3);

const account = web3.eth.getAccounts()[0];

epel.deploy(
  account, 
  res => console.log('done: ', res), 
  err => console.log('error', err)
);