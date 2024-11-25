import { useState } from "react";
import courses from "../files/courseDetails.js";
import QRCode from "qrcode";
import "../css/courselist.css";

function CourseList() {
  //   let [url, setUrl] = useState("");
  let url = "12667/22-11-2024/student";
  let [qrcode, setQrcode] = useState("");
  let [showImage, setShowImage] = useState(false);

  let GenerateQRCode = () => {
    setShowImage(true);
    QRCode.toDataURL(url, (err, url) => {
      if (err) return console.log(err);
      console.log(url);
      setQrcode(url);
    });
  };

  let handleCloseImage = () => {
    setShowImage(false);
  };

  return (
    <div className="courseList">
      {courses.map((course) => {
        return (
          <div key={course.id} className="courseCard">
            Batch Code : {course.batchcode}
            <hr />
            Subject : {course.subject}
            <hr />
            Started at : {course.startedat}
            <hr />
            Class Timing : {course.Classtiming}
            <hr />
            Trainer : {course.trainer}
            <hr />
            Class Attended : {course.classattended}
            <hr />
            Total classes : {course.totalclass}
            <hr />
            <div>
              <button className="p-button" onClick={GenerateQRCode}>
                QR Code
              </button>
            </div>
          </div>
        );
      })}
      {showImage && (
        <div className="imageOverlay" onClick={handleCloseImage}>
          <img src={qrcode} alt="Overlay" />
        </div>
      )}
    </div>
  );
}

export default CourseList;
