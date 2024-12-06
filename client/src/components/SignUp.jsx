import { useState } from "react";
// import Style2 from "../css/SignUp.module.css";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { TextField, Button, Box, Grid, Typography } from "@mui/material";
// import { Visibility, VisibilityOff } from "@mui/icons-material";

const SignUp = () => {
  let [formData, setFormData] = useState({
    fn: "",
    ln: "",
    email: "",
    pwd: "",
    cPwd: "",
    number: "",
  });
  let [errors, setError] = useState({});
  let handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.fn == "" ||
      formData.ln == "" ||
      formData.email == "" ||
      formData.number == "" ||
      formData.pwd == "" ||
      formData.cPwd == ""
    ) {
      toast.error("Error! Something went wrong.");
    } else if (formData.pwd !== formData.cPwd) {
      toast.info("Error! password does not matched");
    } else {
      await axios.post("http://localhost:3000/employees", formData);
      toast.success("Success! account created successfully.");
    }
    setFormData({ fn: "", ln: "", email: "", pwd: "", cPwd: "", number: "" });
    setError(validForm(formData));
  };

  let updateEmpData = (e) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //  ! Validation for email
  let IsemailValid = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // ! Validation for password
  let IsPasswordValid = (pwd) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/;
    return passwordRegex.test(pwd);
  };

  // ! Validation for number
  let isValidNumber = (number) => {
    let numberRegx = /^\d{10}$/;
    return numberRegx.test(number);
  };

  let validForm = (formData) => {
    // console.log(formData);
    let errors = {};
    if (!formData.fn) {
      errors.fn = "FirstName is required";
    }

    if (!formData.ln) {
      errors.ln = "LastName is required";
    }

    if (!formData.number) {
      errors.number = "Number is required";
    } else if (!isValidNumber(formData.number)) {
      errors.number = "Number must be 10digit";
    }

    if (!formData.email) {
      errors.email = "email is required";
    } else if (!IsemailValid(formData.email)) {
      errors.email = "Email is not valid";
    }

    if (!formData.pwd) {
      errors.pwd = "password is required";
    } else if (!IsPasswordValid(formData.pwd)) {
      errors.pwd =
        "password should have one cap letter, small leter, number and must 10digit";
    }

    if (!formData.cPwd) {
      errors.cPwd = "confirm password is required";
    } else if (!IsPasswordValid(formData.cPwd)) {
      errors.cPwd = "password is not valid";
    } else if (formData.pwd !== formData.cPwd) {
      errors.cPwd = "Password does not matched";
    }

    return errors;
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
          p: 4,
          bgcolor: "#151b23",
          color: "white",
          borderRadius: 2,
          boxShadow: 3,
          width: "100%",
          maxWidth: 400,
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Registration Form
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Box sx={{ mb: 2 }}>
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              name="fn"
              value={formData.fn}
              onChange={updateEmpData}
              error={!!errors.fn}
              helperText={errors.fn}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "white" },
                  "&:hover fieldset": { borderColor: "white" },
                  "&.Mui-focused fieldset": { borderColor: "white" },
                },
                "& .MuiInputBase-input": { color: "white" },
                "& .MuiFormLabel-root": { color: "white" },
                "& .MuiFormHelperText-root": { color: "white" },
              }}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              name="ln"
              value={formData.ln}
              onChange={updateEmpData}
              error={!!errors.ln}
              helperText={errors.ln}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "white" },
                  "&:hover fieldset": { borderColor: "white" },
                  "&.Mui-focused fieldset": { borderColor: "white" },
                },
                "& .MuiInputBase-input": { color: "white" },
                "& .MuiFormLabel-root": { color: "white" },
                "& .MuiFormHelperText-root": { color: "white" },
              }}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              label="Mobile Number"
              variant="outlined"
              fullWidth
              name="number"
              value={formData.number}
              onChange={updateEmpData}
              error={!!errors.number}
              helperText={errors.number}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "white" },
                  "&:hover fieldset": { borderColor: "white" },
                  "&.Mui-focused fieldset": { borderColor: "white" },
                },
                "& .MuiInputBase-input": { color: "white" },
                "& .MuiFormLabel-root": { color: "white" },
                "& .MuiFormHelperText-root": { color: "white" },
              }}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              label="Email Address"
              variant="outlined"
              fullWidth
              name="email"
              value={formData.email}
              onChange={updateEmpData}
              error={!!errors.email}
              helperText={errors.email}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "white" },
                  "&:hover fieldset": { borderColor: "white" },
                  "&.Mui-focused fieldset": { borderColor: "white" },
                },
                "& .MuiInputBase-input": { color: "white" },
                "& .MuiFormLabel-root": { color: "white" },
                "& .MuiFormHelperText-root": { color: "white" },
              }}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              name="pwd"
              value={formData.pwd}
              onChange={updateEmpData}
              error={!!errors.pwd}
              helperText={errors.pwd}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "white" },
                  "&:hover fieldset": { borderColor: "white" },
                  "&.Mui-focused fieldset": { borderColor: "white" },
                },
                "& .MuiInputBase-input": { color: "white" },
                "& .MuiFormLabel-root": { color: "white" },
                "& .MuiFormHelperText-root": { color: "white" },
              }}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              label="Confirm Password"
              type="password"
              variant="outlined"
              fullWidth
              name="cPwd"
              value={formData.cPwd}
              onChange={updateEmpData}
              error={!!errors.cPwd}
              helperText={errors.cPwd}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "white" },
                  "&:hover fieldset": { borderColor: "white" },
                  "&.Mui-focused fieldset": { borderColor: "white" },
                },
                "& .MuiInputBase-input": { color: "white" },
                "& .MuiFormLabel-root": { color: "white" },
                "& .MuiFormHelperText-root": { color: "white" },
              }}
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mb: 2,
              bgcolor: "green",
              color: "white",
              "&:hover": {
                bgcolor: "darkgreen",
              },
            }}
          >
            Register Now
          </Button>
          <Box textAlign="center">
            <Typography variant="body2" gutterBottom>
              Have already an account? <Link to="/">Login here</Link>
            </Typography>
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
      </Box>
    </Grid>
  );
};

export default SignUp;
