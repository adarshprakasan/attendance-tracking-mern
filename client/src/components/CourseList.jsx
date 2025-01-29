import { useState, useEffect } from "react";
import courses from "../files/courseDetails.js";
import QRCode from "qrcode";
import "../css/courselist.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function CourseList() {
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}/${
    currentDate.getMonth() + 1
  }/${currentDate.getFullYear()}`;
  let [isUploaded, setIsUploaded] = useState(null);
  const [qrcode, setQrcode] = useState("");
  const [showImage, setShowImage] = useState(false);

  const token = localStorage.getItem("token");

  //^=====================================================================
  //! FETCHING ADMNO FROM DATABASE
  useEffect(() => {
    const fetchAdmno = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/update",
          {},
          {
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log("admno:", response.data.admno);
        setUrl(response.data.admno + "-" + formattedDate);
        setIsUploaded(response.data.photoUploaded);
        // console.log(url);
      } catch (error) {
        console.error(
          "Error fetching admno",
          error.response?.data?.message || error.message
        );
      }
    };

    if (token) {
      fetchAdmno();
    } else {
      navigate("/");
      // console.error("Token is missing!");
    }
  }, []);

  let GenerateQRCode = () => {
    // console.log(isUploaded);
    if (isUploaded) {
      setShowImage(true);
      QRCode.toDataURL(url, (err, url) => {
        if (err) return console.log(err);
        // console.log(url);
        setQrcode(url);
      });
    } else {
      navigate("/uploadimage");
    }
  };

  let handleCloseImage = () => {
    setShowImage(false);
  };

  const handleLogout = () => {
    toast.success("Logged out successfully.");
    localStorage.removeItem("token");
    setTimeout(() => {
      navigate("/", { replace: true });
      window.location.reload();
    }, 1000);
  };

  return (
    <div className="mainBody">
      <div className="navbar">
        <div className="navbar-left">
          <span className="navbar-logo">HRM TECH</span>
        </div>
        <div className="navbar-right">
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

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
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
}

export default CourseList;
