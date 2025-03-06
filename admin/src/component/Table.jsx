import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { Worker, Viewer } from "@react-pdf-viewer/core"; // Import PDF Viewer components
import "@react-pdf-viewer/core/lib/styles/index.css"; // PDF Viewer styles
import pf from "./Aman.pdf"; // Sample PDF file
import axios from "axios";
import getContract from "../utils/getContract";

const DataTableWithModals = () => {
  const [pdfOpen, setPdfOpen] = useState(false);
  const [txOpen, setTxOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from API
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/getAllTransaction"
        );
        setTransactions(response.data); // Assuming the response is an array of transactions
        console.log(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  // Open PDF modal
  const handleProfileClick = (user) => {
    setSelectedUser(user);
    setPdfOpen(true);
  };

  // Open Transaction modal
  const handleTxClick = (user) => {
    setSelectedUser(user);
    setTxOpen(true);
  };

  const [loading1, serLoading1] = useState(false);

  const uploadDataToSmartContract = async (IndId) => {
    try {
      serLoading1(true);
      const contract = await getContract();

      const estimatedGas = await contract?.executeTransaction.estimateGas(
        IndId
      );

      console.log("The estimated gas is", estimatedGas?.toString());

      const transaction = await contract?.executeTransaction(IndId, {
        gasLimit: estimatedGas?.toString(),
      });

      console.log("The transaction hash is", transaction?.hash);

      return transaction?.hash;
    } catch (error) {
      console.log(error);
    }
  };

  // Handle accept/reject actions with mock backend call
  const handleTxActionAccept = async () => {
    try {
      console.log("transistion id", selectedUser.txIndexId);
      const transactionHash = await uploadDataToSmartContract(
        selectedUser.txIndexId
      );

      const res = await axios.post(
        "http://localhost:3001/api/execTransaction",
        {
          userAddr: selectedUser.userAddr,
          txIndexId: selectedUser.txIndexId,
          txId: `https://hekla.taikoexplorer.com/token/${transactionHash}`,
          status: "success",
        }
      );
      console.log("accept button", res.data);
      if (res.status === 200) {
        serLoading1(false);
        alert("Transition Approved Successfully !");
      }
      const fetchTransactions = async () => {
        try {
          const response = await axios.get(
            "http://localhost:3001/api/getAllTransaction"
          );
          setTransactions(response.data); // Assuming the response is an array of transactions
          console.log(response.data);
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      };

      fetchTransactions();
      // setTransactions(res.data);
      // console.log(res.data);
    } catch (error) {
      console.error("Request failed", error);
    }
    setTxOpen(false);
  };
  const handleTxActionReject = async () => {
    try {
      // Simulate a backend call
      const res = await axios.post(
        "http://localhost:3001/api/execTransaction",
        {
          userAddr: selectedUser.userAddr,
          txIndexId: selectedUser.txIndexId,
          txId: `https://hekla.taikoexplorer.com/token/0x9814bbe6bfd4cbefad4c423735429cbd0f1922d0b847f70b2242ea359fbccac2`,
          status: "Failed",
        }
      );
      console.log("Action sent for reject", res.data);
      // alert(`action sent for ${selectedUser?.userAddr}`);
    } catch (error) {
      console.error("Request failed", error);
    }
    setTxOpen(false);
  };

  const columns = [
    {
      field: "userAddr",
      headerName: "User Address",
      width: 150,
    },
    {
      field: "activityType",
      headerName: "Activity",
      width: 150,
    },
    {
      field: "proofs",
      headerName: "Proofs",
      width: 120,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleProfileClick(params.row)}
        >
          View PDF
        </Button>
      ),
    },
    {
      field: "transaction",
      headerName: "Transaction",
      width: 200,
      renderCell: (params) => {
        if (params.row.status === "success" || params.row.status === "Failed") {
          return params.row.exeTxId;
        } else {
          return (
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleTxClick(params.row)}
            >
              Approve/Reject
            </Button>
          );
        }
      },
      // params.row.status === "success" ? (
      //   params.row.exeTxId
      // ) : (
      //     <Button
      //       variant="contained"
      //       color="secondary"
      //       onClick={() => handleTxClick(params.row)}
      //     >
      //       Approve/Reject
      //     </Button>
      //   ) || params.row.status === "Failed" ? (
      //   params.row.exeTxId
      // ) : (
      //   // "0x9814bbe6bfd4cbefad4c423735429cbd0f1922d0b847f70b2242ea359fbccac2"
      //   <Button
      //     variant="contained"
      //     color="secondary"
      //     onClick={() => handleTxClick(params.row)}
      //   >
      //     Approve/Reject
      //   </Button>
      // ),
    },
    {
      field: "tokenAmount",
      headerName: "Token Amount",
      width: 150,
    },
    {
      field: "date",
      headerName: "Date",
      width: 150,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
    },
  ];

  return (
    <>
      {loading1 ? (
        <div className=" h-screen block bg-[#00000075] absolute z-[99999999999999]">
          Loading
        </div>
      ) : (
        <div
          style={{
            padding: "2rem",
            // backgroundColor: "#a5d6a7",
            // minHeight: "100vh",
            color: "#fff",
          }}
          className="max-w-[1190px] mx-auto"
        >
          <div
          // className="table"
          // style={{ height: 400, width: "50%", color: "#1b5e20" }}
          >
            <div className="overflow-x-auto  border-collapse border">
              <DataGrid
                rows={transactions}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5, 10]}
                checkboxSelection
                getRowId={(row) => row._id}
              />
            </div>
            {/* <div className="overflow-x-auto  max-w-[1090px]">
          <table className=" w-[50%] border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              <tr className="text-[#000]">
                <th className="border border-gray-300 px-4 py-2">userAddres</th>
                <th className="border border-gray-300 px-4 py-2">Activity</th>
                <th className="border border-gray-300 px-4 py-2">Proofs</th>
                <th className="border border-gray-300 px-4 py-2">
                  transaction
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  tokenAmount
                </th>
                <th className="border border-gray-300 px-4 py-2">date</th>
                <th className="border border-gray-300 px-4 py-2">status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction._id}>
                  <td className="border text-wrap border-gray-300 w-[90px] px-4 py-2">
                    {transaction.userAddr}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {transaction.activityType}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleProfileClick(transaction)}
                    >
                      View PDF
                    </Button>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {transaction.status === "success" ? (
                      transaction.exeTxId
                    ) : (
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleTxClick(transaction)}
                      >
                        Approve/Reject
                      </Button>
                    )}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {transaction.tokenAmount}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {transaction.date}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {transaction.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div> */}
          </div>

          {/* PDF Preview Modal */}
          <Dialog
            open={pdfOpen}
            onClose={() => setPdfOpen(false)}
            maxWidth="md"
            fullWidth
            style={{ zIndex: 9999999999999999 }}
          >
            <DialogTitle>PDF Preview</DialogTitle>
            <DialogContent dividers>
              {selectedUser && selectedUser.ipfsPath ? (
                <Worker
                  workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
                >
                  <Viewer fileUrl={selectedUser.ipfsPath} />
                </Worker>
              ) : (
                <Typography>No PDF available</Typography>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setPdfOpen(false)} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>

          {/* Transaction Modal */}
          <Dialog
            style={{ zIndex: 9999999999999999 }}
            open={txOpen}
            onClose={() => setTxOpen(false)}
          >
            <DialogTitle>Transaction Approval</DialogTitle>
            <DialogContent>
              <Typography>
                Approve or Reject the transaction for {selectedUser?.name}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => handleTxActionAccept("Accepted")}
                color="primary"
              >
                Accept
              </Button>
              <Button
                onClick={() => handleTxActionReject("Rejected")}
                color="secondary"
              >
                Reject
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </>
  );
};

export default DataTableWithModals;
