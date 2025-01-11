import { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import {
  // AddCommentOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fn: "",
    ln: "",
    email: "",
    pwd: "",
    cPwd: "",
    number: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const updateEmpData = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = (formData) => {
    const errors = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/;
    const numberRegex = /^\d{10}$/;

    if (!formData.fn) errors.fn = "First Name is required.";
    if (!formData.ln) errors.ln = "Last Name is required.";
    if (!formData.email) {
      errors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Email is not valid.";
    }
    if (!formData.number) {
      errors.number = "Mobile number is required.";
    } else if (!numberRegex.test(formData.number)) {
      errors.number = "Number must be 10 digits.";
    }
    if (!formData.pwd) {
      errors.pwd = "Password is required.";
    } else if (!passwordRegex.test(formData.pwd)) {
      errors.pwd =
        "Password must include a capital letter, a small letter, a number, and be 8-32 characters long.";
    }
    if (!formData.cPwd) {
      errors.cPwd = "Confirm password is required.";
    } else if (formData.pwd !== formData.cPwd) {
      errors.cPwd = "Passwords do not match.";
    }

    return errors;
  };

  function generateCustomId() {
    const prefix = "STUDENT-";
    const randomPart = uuidv4().slice(0, 4); // You can choose any length here
    return prefix + randomPart;
  }

  let admno = generateCustomId();

  const formDataWithAdmno = {
    ...formData,
    admno, // add admno here
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      toast.error("Error! Please check your inputs.");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        "http://localhost:5000/api/auth/signup",
        formDataWithAdmno
      );
      toast.success("Success! Account created successfully.");
      setTimeout(() => navigate("/"), 3000);
      setFormData({
        admno: { admno },
        fn: "",
        ln: "",
        email: "",
        pwd: "",
        cPwd: "",
        number: "",
      });
      setErrors({});
    } catch (error) {
      toast.error("Error! Unable to create an account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundColor: "#0d1117",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          height: "150px",
          width: "350px",
          marginRight: "30px",
          backgroundColor: "#1A202C",
          borderRadius: "10px",
          padding: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          color: "white",
          transition: "transform 0.3s",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontSize: "30px", color: "green", mb: 2 }}
        >
          HRM_TECH
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "#D3D3D3" }}>
          Welcome to HRM
        </Typography>
      </Box>
      <Box
        sx={{
          height: "650px",
          width: "400px",
          backgroundColor: "#1A202C",
          borderRadius: "10px",
          padding: "25px",
          border: "1px solid #151b23",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h5"
          sx={{ color: "white", textAlign: "center", marginBottom: "15px" }}
        >
          Sign Up to HRM_TECH
        </Typography>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            flexGrow: 1,
            overflowY: "auto",
            paddingRight: "15px",
            marginTop: "15px",
          }}
        >
          <TextField
            label="First Name"
            name="fn"
            value={formData.fn}
            onChange={updateEmpData}
            error={!!errors.fn}
            helperText={errors.fn}
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
          <TextField
            label="Last Name"
            name="ln"
            value={formData.ln}
            onChange={updateEmpData}
            error={!!errors.ln}
            helperText={errors.ln}
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
          <TextField
            label="Mobile Number"
            name="number"
            value={formData.number}
            onChange={updateEmpData}
            error={!!errors.number}
            helperText={errors.number}
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
          <TextField
            label="Email Address"
            name="email"
            value={formData.email}
            onChange={updateEmpData}
            error={!!errors.email}
            helperText={errors.email}
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
          <TextField
            label="Password"
            name="pwd"
            type={showPassword ? "text" : "password"}
            value={formData.pwd}
            onChange={updateEmpData}
            error={!!errors.pwd}
            helperText={errors.pwd}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleTogglePasswordVisibility}
                    sx={{ color: "white" }}
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
          <TextField
            label="Confirm Password"
            name="cPwd"
            type={showPassword ? "text" : "password"}
            value={formData.cPwd}
            onChange={updateEmpData}
            error={!!errors.cPwd}
            helperText={errors.cPwd}
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
          <Button
            type="submit"
            variant="contained"
            sx={{
              mb: 2,
              bgcolor: "green",
              "&:hover": {
                bgcolor: "#004600",
                color: "white",
              },
            }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Register"}
          </Button>
        </form>
        <Typography
          variant="body2"
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
        >
          Already have an account? <Link to="/">Login</Link>
        </Typography>
      </Box>
      <ToastContainer position="top-right" autoClose={5000} />
    </Box>
  );
};

export default SignUp;
