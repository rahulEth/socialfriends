
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
// const { Provider, Wallet, types } = require('zksync-ethers');
dotenv.config();
const { connectToDatabase} = require("./db.js");
const cors = require("cors");
let db;
connectToDatabase().then((result)=>{
  db = result
})
// index.js

const express = require("express");
const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' })); // Set limit to 50MB
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
const corsOptions = require("./config/corsOptions.js");
// Use CORS middleware
app.use(cors(corsOptions));

// Middleware to parse JSON bodies
app.use(express.json());
// Set the port number to listen on
const PORT = process.env.PORT || 3001;

// Define a simple route
app.post("/api/submitTransaction", async (req, res) => {
  // Encrypt the message with the public key
  // const type = req.body.type || "personal";
  if (!req.body.userAddr || !req.body.fileName || !req.body.ipfsPath) {
    return res
      .status(403)
      .send({ message: "userAddr, fileName or streamedData is missing" });
  }

  if (  
    !req.body.activityType &&
    (req.body.activityType != 'environment-campaign' ||
    req.body.activityType != 'garbage-cleaning' ||
    req.body.activityType != 'eco-product' ||
    req.body.activityType != 'eco-farming' ||
    req.body.activityType != 're-forestration' ||
    req.body.activityType != 'eco-transport') 

  ) {
    return res.status(403).send({
      message:
        "activity type is missing, only environment-campaign, garbage-cleaning, eco-farming, eco-product,re-forestration, eco-transport valuues are accepted",
    });
  }

  if (
    !req.body.txId ||
    !req.body.tokenAmount || 
    !req.body.txIndexId 
  ) {
    return res.status(403).send({
      message:
        "txId or tokenAmount txIndexId is missing",
    });
  }

    const collection = db.collection("socialfriends-collection");
    const date = new Date();
    const {userAddr, fileName, ipfsPath, activityType, txId, tokenAmount, txIndexId } = req.body;
    console.log({userAddr, fileName, ipfsPath, activityType, txId, tokenAmount} )
    try{
        const result = await collection.insertOne({
            userAddr,
            fileName,
            ipfsPath,
            activityType,
            subTxId: txId,
            txIndexId,
            tokenAmount,
            date,
            status: 'pending',
            exeTxId: 'pending'
        });

        return res.status(200).send({
            userAddr,
            fileName,
            subTxId: txId,
            txIndexId,
            tokenAmount,
            date,
            status: 'pending'
          });
    }catch(err){
         return res.status(500).send({
            success: false,
            error : {
                message: 'error while saving data to db',
                details: err.message
            }    

         })
    }
});


// Define a simple route
app.post("/api/execTransaction", async (req, res) => {
    // Encrypt the message with the public key
    // const type = req.body.type || "personal";
    if (!req.body.userAddr || !req.body.txIndexId || !req.body.txId) {
      return res
        .status(403)
        .send({ stauts: false, error: {message: "userAddr, txIndexId or txIndexId is missing" }});
    }
  
      const collection = db.collection("socialfriends-collection");
      const date = new Date();
      const {userAddr, txIndexId, txId, status} = req.body;
      console.log({userAddr, txIndexId, txId, status})
      try{
            const result = await collection.updateOne(
                {userAddr, txIndexId},
                {$set: {status: status, exeTxId: txId}},
                {  new: true}
            );

            return res.status(200).send({
                userAddr,
                txIndexId,
                txId,
                status
            });
        }catch(err){
           return res.status(500).send({
              success: false,
              error : {
                  message: 'error while saving data to db',
                  details: err.message
              }    
  
           })
        }
  });

app.get("/api/getTransactionsByUser", async (req, res) => {
    // console.log("req.query.appLink ------ ", req.query.appLink, req.query.address)
    if (!req.query.userAddr) {
        return res.status(403).send({ status: false,  error: {message: "userAddr is missing" }});
    }
    // const db = await connectToDatabase();
    const collection = db.collection("socialfriends-collection");
    try {
        const result = await collection.find({userAddr: req.query.userAddr});
        if (result) {
            const finalResult = await result.toArray();
            JSON.stringify(finalResult, null, 2);
            return res.status(200).send(finalResult);
        }
        return res.status(404).send({ status: false, error: {message: "no matching transactions found" }});
    } catch (err) {
        return res.status(500).send({
            success: false,
            error : {
                message: 'internal server error',
                details: err.message
            }    
        });
    }
});


app.get("/api/getAllTransaction", async (req, res) => {
  // console.log("req.query.appLink ------ ", req.query.appLink, req.query.address)
  // const db = await connectToDatabase();
  const collection = db.collection("socialfriends-collection");
  try {
      const result = await collection.find().sort({["date"]: -1});
      if (result) {
          const finalResult = await result.toArray();
          JSON.stringify(finalResult, null, 2);
          return res.status(200).send(finalResult);
      }
      return res.status(404).send({ status: false, error: {message: "no matching transactions found" }});
  } catch (err) {
      return res.status(500).send({
          success: false,
          error : {
              message: 'internal server error',
              details: err.message
          }    
      });
  }
});


// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
