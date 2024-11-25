import { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Grid,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [apiSuccess, setApiSuccess] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleGetOTP = async () => {
    setEmailError("");
    setApiError("");
    setApiSuccess("");

    if (!email) {
      setEmailError("Email is required.");
      return;
    } else if (!validateEmail(email)) {
      setEmailError("Enter a valid email address.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("https://mock-api.com/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (response.ok) {
        setApiSuccess("OTP sent successfully! Check your email.");
        console.log("OTP sent successfully:", data);
      } else {
        setApiError(data.message || "Failed to send OTP.");
      }
    } catch (error) {
      setApiError("Network error. Please try again.");
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
        component="form"
        sx={{
          p: 4,
          backgroundColor: "white",
          borderRadius: 2,
          boxShadow: 3,
          width: "100%",
          maxWidth: 400,
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Register
        </Typography>
        {apiError && (
          <Typography color="error" align="center" gutterBottom>
            {apiError}
          </Typography>
        )}
        {apiSuccess && (
          <Typography color="success" align="center" gutterBottom>
            {apiSuccess}
          </Typography>
        )}
        <Box sx={{ mb: 2 }}>
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!emailError}
            helperText={emailError}
          />
        </Box>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleGetOTP}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Get OTP"}
        </Button>
        <Button
          variant="text"
          color="secondary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={() => navigate("/login")}
        >
          Back to Login
        </Button>
      </Box>
    </Grid>
  );
}

export default RegisterPage;
