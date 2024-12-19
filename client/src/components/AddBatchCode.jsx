import { useState } from "react";
import { Typography, Box, Button, Paper, TextField } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const AddBatchCode = () => {
  const [batchCode, setBatchCode] = useState("");
  const navigate = useNavigate();

  const handleBatchCodeChange = (e) => {
    setBatchCode(e.target.value);
  };

  const handleAddBatchCode = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/auth/signup",
        { batchCode },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Batchcode added successfully.");
      //   setTimeout(() => navigate("/"), 3000);
    } catch (error) {
      console.error(error);
      toast.error("Error while entering batchcode");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#0d1117",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "white",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          marginTop: "50px",
          padding: "20px",
          borderRadius: "10px",
          textAlign: "center",
          bgcolor: "#151b23",
          width: "380px",
        }}
      >
        <Typography
          variant="h6"
          sx={{ color: "white", marginBottom: "20px", fontSize: "20px" }}
        >
          Please enter the batch code
        </Typography>

        <TextField
          label="Batch Code"
          variant="outlined"
          fullWidth
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
          value={batchCode}
          onChange={handleBatchCodeChange}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "#388e3c",
            color: "white",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
          onClick={handleAddBatchCode}
        >
          Add BatchCode
        </Button>
      </Paper>
      <ToastContainer position="top-right" autoClose={5000} />
    </Box>
  );
};

export default AddBatchCode;
