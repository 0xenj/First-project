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

  it("Game logic works with 0.01 ether ? (should be)", async function () {
    await contract.depositEther({ value: ethers.utils.parseEther("1") });
    const balancePlayer = await provider.getBalance(user2.address);
    console.log(
      "balance of user2 is ",
      ethers.utils.formatEther(balancePlayer.toString())
    );
    await contract
      .connect(user2)
      .putBullet({ value: ethers.utils.parseEther("0.01") });
    const balancePlayer_finale = await provider.getBalance(user2.address);
    console.log(
      "balance of user2 is ",
      ethers.utils.formatEther(balancePlayer_finale.toString())
    );
    const treasury = await contract.balanceOfContract();
    assert.equal(
      ethers.utils.formatEther(treasury.toString()),
      1.01,
      "Balance is not 1.01 ether"
    );
    const jackpot = await contract.balanceOfJackpot();
    assert.equal(
      ethers.utils.formatEther(jackpot.toString()),
      0.06,
      "Jackpot balance is not 0.06 ether"
    );
  });

  it("Game logic works with 0 ETH ? (should not)", async function () {
    await contract.depositEther({ value: ethers.utils.parseEther("1") });
    const balancePlayer = await provider.getBalance(user2.address);
    assert.equal(
      ethers.utils.formatEther(balancePlayer.toString()),
      10000,
      "balance of user2 is not 10000 ETH"
    );
    await contract
      .connect(user2)
      .putBullet({ value: ethers.utils.parseEther("0") });
    const balancePlayer_finale = await provider.getBalance(user2.address);
    assert.equal(
      ethers.utils.formatEther(balancePlayer_finale.toString()),
      10000,
      "balance of user2 is not 10000 ETH"
    );
    const treasury = await contract.balanceOfContract();
    assert.equal(
      ethers.utils.formatEther(treasury.toString()),
      1,
      "Balance is not 1 ether"
    );
  });

  it.only("view functions works with much bullet ? (should be)", async function () {
    await contract.depositEther({ value: ethers.utils.parseEther("1") });
    await contract
      .connect(user2)
      .putBullet({ value: ethers.utils.parseEther("0.01") });
    await contract
      .connect(user2)
      .putBullet({ value: ethers.utils.parseEther("0.01") });
    await contract
      .connect(user2)
      .putBullet({ value: ethers.utils.parseEther("0.01") });
    await contract
      .connect(user2)
      .putBullet({ value: ethers.utils.parseEther("0.01") });
    await contract
      .connect(user2)
      .putBullet({ value: ethers.utils.parseEther("0.01") });
    await contract
      .connect(user2)
      .putBullet({ value: ethers.utils.parseEther("0.01") });
    await contract
      .connect(user2)
      .putBullet({ value: ethers.utils.parseEther("0.01") });
    await contract
      .connect(user2)
      .putBullet({ value: ethers.utils.parseEther("0.01") });
    await contract
      .connect(user2)
      .putBullet({ value: ethers.utils.parseEther("0.01") });
    await contract
      .connect(user2)
      .putBullet({ value: ethers.utils.parseEther("0.01") });

    const lastWinner = contract.lastWinner();
    console.log("lastWinner is ", lastWinner);

    const treasury = await contract.balanceOfContract();
    console.log("balance of contract is ", treasury);
  });
});
