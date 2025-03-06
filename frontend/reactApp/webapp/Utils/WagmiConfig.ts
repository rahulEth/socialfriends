import { connectorsForWallets } from "@rainbow-me/rainbowkit";

import { rainbowWallet , walletConnectWallet , metaMaskWallet , coinbaseWallet , injectedWallet } from "@rainbow-me/rainbowkit/wallets";
import { holesky, mainnet , taikoHekla , taiko } from "viem/chains";

import { createConfig, http } from "wagmi";


const connectors = connectorsForWallets(

    [

        {

            groupName: "Trusted",

            wallets: [metaMaskWallet , rainbowWallet],


        },

        {

            groupName: "Recommended",

            wallets: [injectedWallet , walletConnectWallet , coinbaseWallet],


        }


    ],

    {


        appName: "Earth Friends",

        projectId: "e39f8f6b47ff15394a5093b78b2a333b",

    }



)


const wagmiConfig = createConfig({

    chains:[taikoHekla],
    connectors: [...connectors],
    multiInjectedProviderDiscovery: true,
    transports: {

        [taikoHekla.id]: http(),
        [taiko.id]: http(),

    },
    ssr: true,


})

export default wagmiConfig;