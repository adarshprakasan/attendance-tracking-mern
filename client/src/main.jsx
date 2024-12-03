import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./main.css";
import LoginPage from "./components/LoginPage.jsx";
import RegisterPage from "./components/RegisterPage.jsx";
import VerifyOTPPage from "./components/VerifyOTPPage.jsx";
import CourseList from "./components/CourseList.jsx";
// import QRCodeScanner from "./components/QRCodeScanner.jsx";

createRoot(document.getElementById("root")).render(
  <Router>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/verify-otp" element={<VerifyOTPPage />} />
      <Route path="/courselist" element={<CourseList />} />
    </Routes>
  </Router>
  //<QRCodeScanner />
);
