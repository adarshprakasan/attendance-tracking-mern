import React, { useState } from "react";
import QRCode from "qrcode";

let QRCodeGenerator = () => {
  let [url, setUrl] = useState("");
  let [qrcode, setQrcode] = useState("");

  let GenerateQRCode = () => {
    QRCode.toDataURL(url, (err, url) => {
      if (err) return console.log(err);
      console.log(url);
      setQrcode(url);
    });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>QR Code Generator</h2>
      <div>
        <input
          type="text"
          placeholder="enter url"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
          }}
        />
        <button onClick={GenerateQRCode}>Generate</button>
      </div>
      <div>
        <img src={qrcode} />
      </div>
    </div>
  );
};

export default QRCodeGenerator;
