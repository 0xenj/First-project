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

  it("Does deployer is owner ? (should be)", async function () {
    expect(await contract._owner()).to.equal("");
  });
})
