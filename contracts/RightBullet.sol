// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract RightBullet {
    address payable public _owner;
    address payable public winner;
    address public _lastWinner;
    uint256 public constant JACKPOT = 0.06 ether;
    uint256 private constant MAXCHANCE = 6;
    uint256 private constant CHANCE = 1;

    constructor() public payable {
        _owner = payable(msg.sender);
    }

    function putBullet() public payable {
        require(msg.value == 0.01 ether, "Il faut envoyer exactement 0,01 ETH.");
        _owner.transfer(msg.value);
        trigger();
    }

    function trigger() private {
        uint256 WhiteBullet = uint256(
            keccak256(abi.encodePacked(block.timestamp, block.difficulty))
        ) % MAXCHANCE;
        if (WhiteBullet == CHANCE) {
            winner = payable(msg.sender);
            winner.transfer(JACKPOT);
            _lastWinner = winner;
        }
    }

    function owner() public view virtual returns (address payable) {
        return _owner;
    }

    function lastWinner() public view virtual returns (address) {
        return _lastWinner;
    }

    function balanceOfJackpot() public view virtual returns (uint) {
        return JACKPOT;
    }

    function balanceOfContract() public view virtual returns (uint) {
        return address(this).balance;
    }
}
