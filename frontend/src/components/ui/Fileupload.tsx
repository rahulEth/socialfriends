"use client";

import { useEffect, useState } from "react";
import {
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
  FileInput,
} from "@/components/ui/extension/file-upload";
import { Paperclip } from "lucide-react";
import Dropdown from "./Dropdown";
import { PDFDocument } from "pdf-lib";

import { useAccount } from "wagmi";

// import { saveAs } from "file-saver";

import html2canvas from "html2canvas";
import { uploadFileToIpfs } from "../../../Utilities/uploadFileToIpfs";
import {
  errorNotification,
  submitTransaction,
  successNotification,
  uploadDataToSmartContract,
} from "@/constants/writeFunctions";
import { ethers } from "ethers";

import { readEventSubmitTransaction } from "@/constants/readFunctions";

import { UseStateManagement } from "../../../StateManagement";

import Loader from "../shared/Loader";

const FileSvgDraw = (): React.JSX.Element => {
  return (
    <>
      <svg
        className="w-20 h-20 mb-3 text-gray-500 dark:text-gray-400"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 16"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
        />
      </svg>
      <p className="mb-1 text-xl text-gray-500 dark:text-gray-400">
        <span className="font-semibold">Click to upload</span>
        &nbsp; or drag and drop
      </p>
      <p className="text-lg text-gray-500 dark:text-gray-400">
        SVG, PNG, JPG or GIF
      </p>
    </>
  );
};

const FileUploaderTest = (): React.JSX.Element => {
  const [files, setFiles] = useState<File[] | null>(null);

  const [filename, setFileName] = useState<string>("");

  const [transactionurl, setTransactionUrl] = useState<string>("");

  const [ipfspath, setIpfsPath] = useState<string>("");

  // const { selectedItem, tokenAmount, loading, setLoading, txIndexId , setTxIndexId , fileName, setFileName , trasanctionUrl , setTransactionUrl , ipfsPath , setIpfsPath } = UseStateManagement();
  const {
    selectedItem,
    tokenAmount,
    loading,
    setLoading,
    txIndexId,
    setTxIndexId,
    setTransactionData,
  } = UseStateManagement();

  // const [blobData , setBlobData] = useState<Blob>();

  const { address } = useAccount();

  let fileName: string;
  let ipfsPath: string;
  let transactionUrl: string;

  const uploadFiles = async () => {
    setLoading(true);

    try {
      const blob = await generatePdf(files!);

      console.log("The generated blob is", blob);

      const ipfsDetails = await uploadFileToIpfs(blob!, address!);

      const ipfsHash = ipfsDetails?.ipfsHash;

      // console.log('ipfs hash', `https://gateway.pinata.cloud/ipfs/${ipfsHash}`);

      ipfsPath = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
      setIpfsPath(`https://gateway.pinata.cloud/ipfs/${ipfsHash}`);

      fileName = ipfsDetails?.fileName!;
      setFileName(ipfsDetails?.fileName!);
      // console.log(ipfsDetails?.fileName!);

      console.log(String(ipfsHash));

      console.log(tokenAmount);

      console.log(selectedItem);

      // const receipt = await uploadDataToSmartContract(address! , Number(ethers.parseEther("0.0000000002")) , String(ipfsHash) , `${selectedItem}`);
      const receipt = await uploadDataToSmartContract(
        address!,
        Number(tokenAmount),
        String(ipfsHash),
        `${selectedItem}`
      );

      console.log("The transaction receipt is ", receipt);

      transactionUrl = `https://hekla.taikoscan.io/tx/${receipt}`;
      setTransactionUrl(`https://hekla.taikoscan.io/tx/${receipt}`);

      setFiles(null);

      setLoading(false);

      if (receipt!) {
        const resp = await submitTransaction(
          address!,
          fileName,
          ipfsPath,
          selectedItem,
          transactionUrl,
          tokenAmount,
          txIndexId
        );

        console.log("Response getting from submit transaction", resp);

        setTransactionData(resp);

        successNotification("Transaction Completed Successfully");
      } else {
        errorNotification("Couldnt upload the file");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const dropZoneConfig = {
    maxFiles: 3,
    maxSize: 1024 * 1024 * 4,
    multiple: true,
  };

  const generatePdf = async (images: File[]) => {
    try {
      if (images.length === 0) {
        alert("Please upload at least one image");
        return;
      }

      const pdfDoc = await PDFDocument.create();

      for (const image of images) {
        const imageBytes = await readFileAsArrayBuffer(image);

        let imageEmbed;
        try {
          // Check the image file type and embed accordingly
          const isJpg = image.type === "image/jpeg";
          const isPng = image.type === "image/png";
          const isGif = image.type === "image/gif";
          const isBmp = image.type === "image/bmp";

          if (isJpg) {
            imageEmbed = await pdfDoc.embedJpg(imageBytes); // Embed as JPG
          } else if (isPng) {
            imageEmbed = await pdfDoc.embedPng(imageBytes); // Embed as PNG
          } else if (isGif || isBmp) {
            // For unsupported types, convert to PNG using html2canvas
            const imageUrl = URL.createObjectURL(image);
            const canvas = await convertImageToCanvas(imageUrl);
            const pngImageBytes = await canvasToPngArrayBuffer(canvas);
            imageEmbed = await pdfDoc.embedPng(pngImageBytes); // Embed as PNG
          } else {
            throw new Error("Unsupported image format");
          }
        } catch (error) {
          console.error("Error embedding image:", error);
          alert("Error processing one of the images. Please check the format.");
          return;
        }

        const page = pdfDoc.addPage();
        const { width, height } = page.getSize();

        const scaleFactor = 0.8;
        const imageWidth = width * scaleFactor;
        const imageHeight = (imageEmbed.height / imageEmbed.width) * imageWidth;

        const x = (width - imageWidth) / 2;
        const y = (height - imageHeight) / 2;

        page.drawImage(imageEmbed, {
          x,
          y,
          width: imageWidth,
          height: imageHeight,
        });
      }

      const pdfBytes = await pdfDoc.save();

      console.log(pdfBytes);

      const blob: Blob = new Blob([pdfBytes], { type: "application/pdf" });

      return blob;

      // setBlobData(blob);

      // console.log(blob);

      // console.log(blobData);
      // saveAs(blob, 'images.pdf');
    } catch (error) {
      console.log(error);
    }
  };

  // Utility function to read the image file as an ArrayBuffer
  const readFileAsArrayBuffer = (file: File): Promise<ArrayBuffer> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as ArrayBuffer);
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  };

  // Convert an image to a canvas using html2canvas
  const convertImageToCanvas = (
    imageUrl: string
  ): Promise<HTMLCanvasElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = imageUrl;
      img.onload = () => {
        html2canvas(img)
          .then((canvas) => resolve(canvas))
          .catch(reject);
      };
      img.onerror = reject;
    });
  };

  // Convert a canvas to PNG ArrayBuffer
  const canvasToPngArrayBuffer = (
    canvas: HTMLCanvasElement
  ): Promise<ArrayBuffer> => {
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as ArrayBuffer);
          reader.onerror = reject;
          reader.readAsArrayBuffer(blob);
        } else {
          reject(new Error("Failed to convert canvas to PNG"));
        }
      }, "image/png");
    });
  };

  useEffect(() => {
    const readData = async () => {
      const id = await readEventSubmitTransaction();

      console.log(id);

      setTxIndexId(id);
    };

    address && readData();
  }, [address]);

  return (
    <>
      {loading && <Loader />}

      <div className="flex items-center h-[300px] py-20 justify-center flex-col mb-5 w-auto">
        <span className="flex items-center justify-center text-[20px]">
          Uploard Your Proof Of Activity
        </span>
        <FileUploader
          value={files}
          onValueChange={setFiles}
          dropzoneOptions={dropZoneConfig}
          className="relative h-[40rem]  rounded-lg p-2"
        >
          <FileInput className="outline-dashed outline-1 outline-white">
            <div className="flex items-center justify-center flex-col pt-3 pb-4 w-full">
              <FileSvgDraw />
            </div>
          </FileInput>

          {files && (
            <FileUploaderContent>
              {files &&
                files.length > 0 &&
                files.map((file, i) => (
                  <FileUploaderItem key={i} index={i}>
                    <Paperclip
                      height={50}
                      width={50}
                      className="h-[5rem] w-[5rem] stroke-current"
                    />
                    <span className="text-2xl">{file.name}</span>
                  </FileUploaderItem>
                ))}
            </FileUploaderContent>
          )}
        </FileUploader>

        {files && files?.length > 0 && (
          <div className="flex items-center justify-center flex-row flex-wrap gap-5 pb-10 mb-10">
            <Dropdown />

            <button
              className="flex items-center justify-center text-white text-xl bg-green-500 border border-white rounded-xl h-[3rem] w-[14rem] cursor-pointer"
              onClick={uploadFiles}
              disabled={!selectedItem}
            >
              Upload Files
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default FileUploaderTest;
