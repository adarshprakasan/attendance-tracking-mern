import { useState } from "react";
import { QrReader } from "react-qr-reader";

let QRCodeScanner = () => {
  let [data, setData] = useState("No result");

  let handleScan = (result) => {
    if (result) {
      setData(result?.text || result);
    }
  };

  let handleError = (error) => {
    console.error(error);
  };

  return (
    <div>
      <h2>QR Code Scanner</h2>
      <QrReader
        onResult={(result, error) => {
          if (result) {
            handleScan(result);
          }
          if (error) {
            handleError(error);
          }
        }}
        style={{ width: "100%" }}
      />
      <p>Scanned Data: {data}</p>
    </div>
  );
};

export default QRCodeScanner;
