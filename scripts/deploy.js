async function main() {
  const contract = await ethers.getContractFactory("RightBullet");
  console.log("Deploying contract...");
  const rightBullet = await contract.deploy();
  await rightBullet.deployed();
  console.log("contract deployed to:", rightBullet.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
