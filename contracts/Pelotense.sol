pragma solidity ^0.4.21;

/**
 * @author Gustavo Fernandes dos Santos <gfdsantos@inf.ufpel.edu.br>
 *
 * First design of Pelotense digital identity in form of a Ethereum
 * smart contract.
 */

contract Pelotense {
  address deployer;
  string pubKey;
  string hashAttributes;
  
  // list of all addresses that interact with this contract
  address[] requesters;

  // quantity of coins of this person
  uint pelCoins;

  constructor(string storageHashAttributes, string userPubKey) public {
    deployer = msg.sender;
    hashAttributes = storageHashAttributes;
    pubKey = userPubKey;
    pelCoins = 0;
  }

  /*******************  MONETARY FUNCTIONS  *******************/
  function ballance() public returns (uint) {
    requesters.push(msg.sender);
    return pelCoins;
  }

  /******************* ATTRIBUTES FUNCTIONS *******************/
  function getHashAttributes() public returns (string) {
    requesters.push(msg.sender);
    return hashAttributes;
  }

  function getLengthRequestersArray() public returns (uint) {
    requesters.push(msg.sender);
    return requesters.length;
  }

  function getAddressRequesterByIndex(uint index) public returns (address) {
    requesters.push(msg.sender);
    return requesters[index];
  }

  function changePublicKey(string newPubKey) public returns (bool) {
    if (msg.sender == deployer) {
      pubKey = newPubKey;
      requesters.push(msg.sender);
      return true;
    } else {
      return false;
    }
  }
}