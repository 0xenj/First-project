const { expect } = require("chai");
const { ethers } = require("hardhat");
const { Helper } = require("./shared/setup");

describe("RightBullet", function () {
  before(async function () {
    [provider, owner, user1, user2, user3] =
      await Helper.setupProviderAndAccount();
  });

  beforeEach(async function () {
    contract = await Helper.setupContract([user1.address, user2.address]);
  });

  it("Owner is msg.sender ? (should be)", async function () {
    const ownerAddress = await contract.owner();
    expect(ownerAddress).to.equal(owner.address);
  });
});
