import { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RegisterPage() {
  let [email, setEmail] = useState("");
  let [emailError, setEmailError] = useState("");
  let [loading, setLoading] = useState(false);
  let [apiError, setApiError] = useState("");
  let navigate = useNavigate();

  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  let handleRegister = async () => {
    setEmailError("");
    setApiError("");

    if (!email) {
      // setEmailError("Email is required.");
      toast.error("Email is required");
      return;
    }

    if (!emailRegex.test(email)) {
      toast.error("Enter a valid email address.");
      return;
    }

    try {
      setLoading(true);
      let response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      let data = await response.json();

      if (response.ok) {
        navigate("/verify-otp", { state: { email } });
      } else {
        // setApiError(data.message || "An error occurred.");
        toast.error(data.message || "An error occurred.");
      }
    } catch (error) {
      // setApiError("Network error, please try again.", error);
      toast.error("Network error, please try again.", error);
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
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          color: "white",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Register
        </Typography>
        {apiError && (
          <Typography color="error" align="center" sx={{ mb: 2 }}>
            {apiError}
          </Typography>
        )}
        <Box sx={{ mb: 2 }}>
          <TextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!emailError}
            helperText={emailError}
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
            onClick={handleRegister}
            disabled={loading}
            variant="contained"
            color="primary"
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
            {loading ? <CircularProgress size={24} /> : "Get OTP"}
          </Button>
        </Box>
      </Box>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    </Grid>
  );
}

export default RegisterPage;
