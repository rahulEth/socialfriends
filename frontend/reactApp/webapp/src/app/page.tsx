"use client";

import FileUpload from "@/components/ui/Fileupload";
import Hero from "@/components/ui/Hero";
import Home from "@/components/ui/Home";
import TableComponent from "@/components/ui/TableComponent";
import React, { useEffect } from "react";

import getContract from "../../Utilities/getContract";

import { useAccount } from "wagmi";

import { UseStateManagement } from "../../StateManagement";

const page = (): React.JSX.Element => {
  const { address } = useAccount();

  // const {test} = UseStateManagement();

  useEffect(() => {
    address && getContract();

    // console.log(test);
  });

  return (
    <div>
      <Hero />

      <FileUpload />
      <Home />

      <TableComponent />
    </div>
  );
};

export default page;
