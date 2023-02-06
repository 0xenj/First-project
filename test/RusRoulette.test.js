const { expect } = require("chai");
const { ethers } = require("hardhat");
const Helper = require("./shared");
let contract;

describe("Roulette", function () {
  before(async function () {
    [provider, owner, user1, user2, user3] =
      await Helper.setupProviderAndAccount();
  });

  beforeEach(async function () {
    contract = await Helper.setupContract([user1.address, user2.address]);
  });

  it("Does jackpot is implemented ? (should be)", async function () {
    expect(await contract.balanceOfJackpot()).to.equal("");

    await contract.putBullet();

    expect(await contract.balanceOfJackpot()).to.equal("0.1");
  });
});
