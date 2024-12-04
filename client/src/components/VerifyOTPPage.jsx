import { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function VerifyOTPPage() {
  let location = useLocation();
  let { email } = location.state || {};
  let [otp, setOtp] = useState("");
  let [otpError, setOtpError] = useState("");
  let [loading, setLoading] = useState(false);
  let [apiError, setApiError] = useState("");
  let [apiSuccess, setApiSuccess] = useState("");

  let handleVerifyOTP = async () => {
    setOtpError("");
    setApiError("");
    setApiSuccess("");

    if (!otp) {
      // setOtpError("OTP is required.");
      toast.error("OTP is required.");
      return;
    }

    try {
      setLoading(true);
      let response = await fetch("http://localhost:5000/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      let data = await response.json();

      if (response.ok) {
        // setApiSuccess(data.message);
        toast.success(data.message);
        setTimeout(() => {
          window.location.href = "/studentregistration";
        }, 2000);
      } else {
        setApiError(data.message);
      }
    } catch (error) {
      // setApiError("Network error, please try again.", error);
      toast.error("Network error, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh", backgroundColor: "#0d1117" }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 400,
          bgcolor: "#151b23",
          color: "white",
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4">Verify OTP</Typography>
        <Box sx={{ mb: 2 }}>
          {apiError && <Typography color="error">{apiError}</Typography>}
          {apiSuccess && <Typography color="success">{apiSuccess}</Typography>}
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            label="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            error={!!otpError}
            helperText={otpError}
            fullWidth
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white",
                },
              },
              "& .MuiInputBase-input": {
                color: "white",
              },
              "& .MuiFormLabel-root": {
                color: "white",
              },
              "& .MuiFormHelperText-root": {
                color: "white",
              },
            }}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <Button
            onClick={handleVerifyOTP}
            disabled={loading}
            variant="contained"
            fullWidth
            sx={{
              mb: 2,
              bgcolor: "green",
              "&:hover": {
                bgcolor: "#004600",
                color: "white",
              },
            }}
          >
            {loading ? <CircularProgress size={24} /> : "Verify OTP"}
          </Button>
        </Box>
      </Box>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    </Grid>
  );
}

export default VerifyOTPPage;
