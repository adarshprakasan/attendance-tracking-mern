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
      setOtpError("OTP is required.");
      return;
    }

    try {
      setLoading(true);
      let response = await fetch("http://localhost:5000/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      let data = await response.json();

      if (response.ok) {
        setApiSuccess(data.message);
        setTimeout(() => {
          window.location.href = "/courselist";
        }, 2000);
      } else {
        setApiError(data.message);
      }
    } catch (error) {
      setApiError("Network error, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 400,
          bgcolor: "white",
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
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <Button
            onClick={handleVerifyOTP}
            disabled={loading}
            variant="contained"
            fullWidth
          >
            {loading ? <CircularProgress size={24} /> : "Verify OTP"}
          </Button>
        </Box>
      </Box>
    </Grid>
  );
}

export default VerifyOTPPage;
