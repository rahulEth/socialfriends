 // We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;
  const lockedAmount = hre.ethers.parseEther("0.01");

  const lock = await hre.ethers.deployContract("SocialAuditor", ["0xe6551c9Ddf937940Eb2209124B307e4717c6d80c", "0x0DcE86D5D4cf0f5DDE110802620Cb84312dBe67c", 1]);
  const addr = await lock.getAddress()
  console.log('contract address: ', addr)
  console.log(
    `SocialAuditor with ${ethers.formatEther(
      lockedAmount
    )}ETH and unlock timestamp ${unlockTime} deployed to ${lock.target}`
  );

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error('-----------',error);
  process.exitCode = 1;
});


const verifyContract = async ()=>{
  console.log("Verifying EarthFriends...")
  await hre.run("verify:verify", {
    address: '0xA7A5B7e2E0EC51f7D7f9d66Bf085e948cac4B690',   //lock.address
    constructorArguments: ["0xe6551c9Ddf937940Eb2209124B307e4717c6d80c", "0x0DcE86D5D4cf0f5DDE110802620Cb84312dBe67c", 1]
  })
}
// verifyContract()


// https://sepolia.etherscan.io/address/0xA7A5B7e2E0EC51f7D7f9d66Bf085e948cac4B690#code