const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("Bullet", function () {
  async function deployContractFixture() {
    const contract = await ethers.getContractFactory("Bullet");
    const [owner, addr1, addr2] = await ethers.getSigners();
    const bullet = await contract.deploy();

    await bullet.deployed();

    return { contract, bullet, owner, addr1, addr2 };
  }

  it("Owner is msg.sender ? (should be)", async function () {
    const { bullet, owner } = await loadFixture(deployContractFixture);
    expect(await bullet.owner()).to.equal(owner);
  });
});
