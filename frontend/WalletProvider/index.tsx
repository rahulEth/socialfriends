"use client"

import '@rainbow-me/rainbowkit/styles.css';
import {

  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';

import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import React from 'react';

import wagmiConfig from '../Utils/WagmiConfig';

import merge from "lodash.merge";

import { darkTheme , Theme } from '@rainbow-me/rainbowkit';

const myTheme = merge(darkTheme() , {

    colors: {

        accentColor: "#6AB04A"

    }

} as Theme);



const queryClient = new QueryClient();
const WalletProvider = ({children}: Readonly<{children: React.ReactNode}>): React.JSX.Element => {

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider coolMode theme={myTheme}>
          
            {children}

        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default WalletProvider;