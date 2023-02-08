const { expect } = require("chai");
const { ethers } = require("hardhat");
const { Helper } = require("./shared");

describe("RightBullet", function () {
  let contract, bullet, owner;

  before(async function () {
    contract = await ethers.getContractFactory("RightBullet");
    bullet = await contract.deploy({ value: ethers.utils.parseEther("1") });
    [provider, owner, user1, user2, user3] =
      await Helper.setupProviderAndAccount();
  });

  it("Owner is msg.sender ? (should be)", async function () {
    const ownerAddress = await bullet.owner();
    expect(ownerAddress).to.equal(owner.address);
  });
});
