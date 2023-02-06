// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract RusRoulette {
    address public owner;
    address public lastWinner;
    uint256 public jackpot;
    uint256 public maxChance;
    uint256 private constant CHANCE = 1;

    constructor() public {
        owner = msg.sender;
        jackpot = 2 ether;
        maxChance = 10;
    }

    function putBullet() public payable {
        require(msg.value == 0.1 ether, "Il faut envoyer exactement 0,1 ETH.");
        jackpot += msg.value;
        trigger();
    }

    function trigger() external {
        uint256 WhiteBullet = uint256(
            keccak256(abi.encodePacked(block.timestamp, block.difficulty))
        ) % maxChance;
        if (WhiteBullet == CHANCE) {
            address winner = msg.sender;
            winner.transfer(jackpot - 1 ether);
            jackpot = 1 ether;
            maxChance = 10;
            lastWinner = winner;
        } else {
            maxChance++;
        }
    }

    function owner() public view virtual returns (address) {
        return owner;
    }

    function lastWinner() public view virtual returns (address) {
        return lastWinner;
    }

    function balanceOfJackpot() public view virtual returns (uint) {
        return jackpot;
    }
}
