import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./main.css";
import LoginPage from "./components/LoginPage.jsx";
import RegisterPage from "./components/RegisterPage.jsx";
import VerifyOTPPage from "./components/VerifyOTPPage.jsx";
import CourseList from "./components/CourseList.jsx";
import SignUp from "./components/SignUp.jsx";
import BatchCode from "./components/BatchCode.jsx";
import AddBatchCode from "./components/AddBatchCode.jsx";
import UploadImage from "./components/UploadImage.jsx";
import PlacementForm from "./components/PlacementForm.jsx";
// import QRCodeScanner from "./components/QRCodeScanner.jsx";

createRoot(document.getElementById("root")).render(
  <Router>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/verify-otp" element={<VerifyOTPPage />} />
      <Route path="/studentregistration" element={<SignUp />} />
      <Route path="/batchcode" element={<BatchCode />} />
      <Route path="/addbatchcode" element={<AddBatchCode />} />
      <Route path="/uploadimage" element={<UploadImage />} />
      <Route path="/placementform" element={<PlacementForm />} />
      <Route path="/courselist" element={<CourseList />} />
    </Routes>
  </Router>
  //<QRCodeScanner />
);
