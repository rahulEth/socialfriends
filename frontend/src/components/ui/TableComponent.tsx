import { useEffect } from "react";

import { getTransactionsByUser } from "@/constants/readFunctions";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/extension/table-data";

import { UseStateManagement } from "../../../StateManagement";

import { TransactionData } from "@/interfaces";

import { useAccount } from "wagmi";

import Link from "next/link";

const TableComponent = (): React.JSX.Element => {
  const { address } = useAccount();

  const { transactions, setTransactions } = UseStateManagement();

  const getTransactions = async () => {
    try {
      const transactions = await getTransactionsByUser(address!);

      console.log(transactions);

      setTransactions(transactions);
    } catch (error) {
      console.log(error);
    }
  };

    useEffect(() => {
      address && getTransactions();
    }, [address]);

  return (
    <div>
      <Table className="mb-20 overflow-x-hidden max-w-[1100px] mx-auto text-[20px]">
        <TableCaption>A list of your recent activities.</TableCaption>
        <TableHeader className="overflow-x-hidden">
          <TableRow>
            <TableHead className="w-[100px]">Number</TableHead>
            <TableHead className="">ACTIVITY TYPE</TableHead>
            <TableHead className="text-center">FILE</TableHead>
            <TableHead className="text-center">EARNED TOKEN</TableHead>
            <TableHead className="text-center">TX HASH</TableHead>
            <TableHead className="text-center">STATUS</TableHead>
            <TableHead className="text-center">DATE</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction: TransactionData, index: number) => (
            <TableRow key={index}>
              <TableCell className="text-center">{index + 1}</TableCell>
              <TableCell className="font-medium text-center">
                {transaction.activityType}
              </TableCell>
              <TableCell className="text-center">
                {transaction.fileName}
              </TableCell>
              <TableCell className="text-center">{`${transaction.tokenAmount} EFRND`}</TableCell>
              {/* <TableCell className="text-center cursor-pointer"><Link href={`${transaction.subTxId}`} target="_blank"></Link>{`${transaction.subTxId.slice(30)}`}</TableCell> */}
              <Link
                className="flex items-center justify-center"
                href={`${transaction.subTxId}`}
                target="_blank"
              >
                <TableCell className="cursor-pointer">{`${transaction.subTxId.slice(
                  30
                )}`}</TableCell>
              </Link>
              <TableCell className="text-center">
                {transaction.status}
              </TableCell>
              <TableCell className="text-center">
                {transaction.date.toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableComponent;
