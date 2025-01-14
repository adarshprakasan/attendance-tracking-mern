import { useState, useEffect } from "react";
import { Box, Paper, Typography, Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const UploadImage = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [admno, setAdmno] = useState(null);

  const token = localStorage.getItem("token");

  //^=====================================================================
  //! FETCHING ADMNO FROM DATABASE
  useEffect(() => {
    const fetchAdmno = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/photoupload",
          {},
          {
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log("admno:", response.data.admno);
        setAdmno(response.data.admno);
      } catch (error) {
        console.error(
          "Error fetching admno:",
          error.response?.data?.message || error.message
        );
      }
    };

    if (token) {
      fetchAdmno();
    } else {
      console.error("Token is missing!");
    }
  }, [token]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  //^=====================================================================
  //! PHOTO UPLOAD
  const handleSubmit = async () => {
    if (!file) {
      toast.error("Please upload a photo before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET);
    formData.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);
    // formData.append("public_id", `students/${admno}`);

    try {
      const uploadResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/image/upload`,
        formData
      );

      const imageUrl = uploadResponse.data.secure_url;
      await axios.post(
        `http://localhost:5000/api/auth/photoupload/`,
        {
          photoUploaded: true,
          photoUrl: imageUrl,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Photo uploaded successfully!");
      setTimeout(() => navigate("/courselist"), 2000);
    } catch (error) {
      console.error("Error uploading photo:", error.message);
      toast.error("Error uploading photo. Please try again.");
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
        justifyContent: "center",
        color: "white",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          padding: "20px",
          borderRadius: "10px",
          textAlign: "center",
          bgcolor: "#151b23",
          width: "400px",
        }}
      >
        <Typography
          variant="h6"
          sx={{ color: "white", marginBottom: "10px", fontSize: "20px" }}
        >
          Passport Size Photo Upload
        </Typography>

        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <label htmlFor="upload-button">
              <input
                id="upload-button"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <Button
                variant="contained"
                component="span"
                sx={{
                  backgroundColor: "#388e3c",
                  color: "white",
                  textTransform: "none",
                  padding: "10px 20px",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "white",
                    color: "#388e3c",
                  },
                }}
              >
                Choose File
              </Button>
            </label>
          </Box>

          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              backgroundColor: "#4caf50",
              color: "white",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "white",
                color: "#4caf50",
              },
            }}
          >
            Submit
          </Button>
        </>

        <ol
          style={{
            color: "#c0c0c0",
            fontSize: "14px",
            textAlign: "left",
            paddingLeft: "20px",
            marginBottom: "20px",
            marginTop: "20px",
          }}
        >
          <li>Please upload only passport size photos.</li>
          <li>Upload photo only with face.</li>
          <li>Don&apos;t upload a photo with a full body.</li>
          <li>Please avoid selfies.</li>
        </ol>
      </Paper>
      <ToastContainer position="top-right" autoClose={5000} />
    </Box>
  );
};

export default UploadImage;
