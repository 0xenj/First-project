const { expect } = require("chai");

describe("Bullet", function () {
  before(async function () {
    contract = await ethers.getContractFactory("RightBullet");
  });

  beforeEach(async function () {
    bullet = await contract.deploy();
    await bullet.deployed();
  });

  it("Owner is msg.sender ? (should be)", async function () {
    expect(bullet.owner()).to.equal(owner.address);
  });
});
