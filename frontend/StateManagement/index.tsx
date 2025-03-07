"use client"

import React , {createContext, useContext, useState} from 'react'

import { TransactionData } from '@/interfaces';

const StateManagement = createContext<any>({});


export const StateManagementProvider = ({children}: Readonly<{children: React.ReactNode}>): React.JSX.Element => {

    let test: string = "GoodBye World";

    const [selectedItem, setSelectedItem] = useState<string>('');

    const [tokenAmount , setTokenAmount] = useState<string>("0");

    const [loading , setLoading] = useState<boolean>(false);

    const [txIndexId , setTxIndexId] = useState<string>("");

    const [transactionData, setTransactionData] = useState<TransactionData | undefined>();

    const [transactions , setTransactions] = useState<TransactionData[]>([]);

  

  return (

    <StateManagement.Provider value={{test , selectedItem , setSelectedItem , tokenAmount , setTokenAmount , loading , setLoading, txIndexId , setTxIndexId, setTransactionData , transactions  , setTransactions}}>

            {children}

    </StateManagement.Provider>

  )
}

export const UseStateManagement = () => useContext(StateManagement);

