const { expect } = require("chai");
const { assert } = require("chai");
const { ethers } = require("hardhat");
const Helper = require("./shared/setup");

describe("RightBullet", function () {
  before(async function () {
    [provider, owner, user1, user2, user3] =
      await Helper.setupProviderAndAccount();
  });

  beforeEach(async function () {
    contract = await Helper.setupContract([user1.address, user2.address]);
  });

  it("Should initialize the contract correctly ? (should be)", async function () {
    await contract.depositEther({ value: ethers.utils.parseEther("1") });
    assert.equal(
      await contract.owner(),
      owner.address,
      "Owner is not set correctly"
    );
    const treasury = await contract.balanceOfContract();
    assert.equal(
      ethers.utils.formatEther(treasury.toString()),
      1,
      "Balance is not 1 ether"
    );
    const jackpot = await contract.balanceOfJackpot();
    assert.equal(
      ethers.utils.formatEther(jackpot.toString()),
      0.06,
      "Jackpot balance is not 0.06 ether"
    );
  });
});
