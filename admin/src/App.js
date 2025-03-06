import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";
import { Worker, Viewer } from "@react-pdf-viewer/core"; // Import PDF Viewer components
import "@react-pdf-viewer/core/lib/styles/index.css"; // PDF Viewer styles

import pf from "./component/Aman.pdf";
import Table2 from "./component/Table";
import DataTableWithModals from "./component/Table";
import Header from "./component/Navbar";
import Statistics from "./component/Statistics";
import TransactionChart from "./component/Chart";
import Footer from "./component/Footer";
import "./App.css";
// Sample data with PDF file paths

// Main App Component
const App = () => {
  return (
    <div
      style={
        {
          // padding: "2rem",
          // backgroundColor: "#a5d6a7",
          // minHeight: "100vh",
          // color: "#1b5e20",
        }
      }
      className="bgimg"
    >
      {/* <Table2 /> */}

      <div className="z-[99090999] relative">
        <Header />

        <Statistics />
        <TransactionChart />
        <DataTableWithModals />
        <Footer />
      </div>
    </div>
  );
};

export default App;
