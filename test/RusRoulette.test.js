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
    assert.equal(
      await contract.owner(),
      owner.address,
      "Owner is not set correctly"
    );
    assert.equal(
      await contract.balanceOfContract(),
      1,
      "Balance is not 1 ether"
    );
    assert.equal(
      await contract.balanceOfJackpot(),
      0.06,
      "Jackpot balance is not 0.06 ether"
    );
  });
});
