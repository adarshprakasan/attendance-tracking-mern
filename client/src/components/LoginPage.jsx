import { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Grid,
  Typography,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [pwd, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    setApiError("");
    let isValid = true;

    if (!email) {
      setEmailError("Email is required.");
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Enter a valid email address.");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!pwd) {
      setPasswordError("Password is required.");
      isValid = false;
    } else if (pwd.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (isValid) {
      try {
        setLoading(true);
        let response = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, pwd }),
        });
        const data = await response.json();

        if (response.ok) {
          localStorage.setItem("token", data.token);
          if (data) {
            console.log("Login successful:", data);
            navigate("/courselist");
          } else {
            navigate("/batchcode");
          }
        } else {
          setApiError(data.message || "Failed to login.");
        }
      } catch (error) {
        setApiError("Network error. Please try again.", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh", backgroundColor: "#0d1117" }}
    >
      <Box
        component="form"
        sx={{
          p: 4,
          bgcolor: "#151b23",
          color: "white",
          borderRadius: 2,
          boxShadow: 3,
          width: "100%",
          maxWidth: 400,
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        {apiError && (
          <Typography color="error" align="center" gutterBottom>
            {apiError}
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
            sx={{
              marginBottom: "20px",
              input: { color: "white" },
              label: { color: "white" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "#4caf50",
                },
              },
            }}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            id="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            fullWidth
            value={pwd}
            onChange={(e) => setPassword(e.target.value)}
            error={!!passwordError}
            helperText={passwordError}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleTogglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              marginBottom: "20px",
              input: { color: "white" },
              label: { color: "white" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "#4caf50",
                },
              },
            }}
          />
        </Box>
        <Button
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
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Login"}
        </Button>
        <Box sx={{ mb: 2 }}>
          <hr />
        </Box>
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          onClick={() => navigate("/register")}
          sx={{
            mb: 2,
            bgcolor: "none",
            border: "1px solid green",
            color: "green",
            "&:hover": {
              bgcolor: "green",
              color: "white",
            },
          }}
        >
          Register
        </Button>
      </Box>
    </Grid>
  );
}

export default LoginPage;
