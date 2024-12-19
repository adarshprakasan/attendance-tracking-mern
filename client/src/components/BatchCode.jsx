import { Typography, Box, Button, Divider, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const BatchCode = () => {
  const navigate = useNavigate();

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
          sx={{ color: "white", marginBottom: "20px", fontSize: "20px" }} // Updated to match the green theme
        >
          Please select any one of the options
        </Typography>

        <Button
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "#4caf50",
            color: "white",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
          onClick={() => navigate("/addbatchcode")}
        >
          Join Batch
        </Button>

        <Divider
          sx={{
            margin: "10px 0",
            color: "white",
            "&::before, &::after": {
              borderColor: "white",
            },
          }}
        >
          OR
        </Divider>

        <Button
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "#388e3c",
            color: "white",
            fontWeight: "bold",
          }}
        >
          Pay
        </Button>
      </Paper>
    </Box>
  );
};

export default BatchCode;
