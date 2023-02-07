// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract RightBullet {
    address payable public owner;
    address public lastWinner;
    uint256 public constant JACKPOT = 0.06 ether;
    uint256 private constant MAXCHANCE = 6;
    uint256 private constant CHANCE = 1;

    constructor() public {
        msg.sender.transfer(1 ether);
        owner = msg.sender;
    }

    function putBullet() public payable {
        require(msg.value == 0.01 ether, "Il faut envoyer exactement 0,01 ETH.");
        owner.transfer(msg.value);
        trigger();
    }

    function trigger() private {
        uint256 WhiteBullet = uint256(
            keccak256(abi.encodePacked(block.timestamp, block.prevrandao))
        ) % MAXCHANCE;
        if (WhiteBullet == CHANCE) {
            address payable winner = address(msg.sender);
            winner.transfer(JACKPOT);
            lastWinner = winner;
        }
    }

    function _owner() public view virtual returns (address payable) {
        return owner;
    }

    function _lastWinner() public view virtual returns (address payable) {
        return lastWinner;
    }

    function balanceOfJackpot() public view virtual returns (uint) {
        return JACKPOT;
    }

    function balanceOfContract() public view virtual returns (uint) {
        return address(this).balance;
    }
}
