const {Wallet } = require("ethers");

async function createWallet() {
    // ✅ Generate a new wallet
    const wallet = Wallet.createRandom();

    console.log("✅ New Wallet Created!");
    console.log("Address:", wallet.address);
    console.log("Private Key:", wallet.privateKey);
    console.log("Mnemonic:", wallet.mnemonic?.phrase || "No mnemonic available");

    // ✅ Save wallet as JSON keystore (Optional)
}

createWallet().catch(console.error);

// Address: 0xe6551c9Ddf937940Eb2209124B307e4717c6d80c
// Private Key: 0xfa0c7e153fddaad627c84169df9d20847a5307b7c051bb1a5e286972ef84cd13
// Mnemonic: damp heavy story saddle ugly lumber now awake alpha nominee autumn olive
