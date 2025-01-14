import { useState, useEffect } from "react";
import { Box, Paper, Typography, Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const UploadImage = () => {
  const [admno, setAdmno] = useState(null);
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [file, setFile] = useState(null);

  // Fetch admno on component mount
  useEffect(() => {
    const fetchAdmno = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/auth/signup"
        );
        setAdmno(response.admno);
      } catch (error) {
        console.error(error);
        toast.error("Error fetching admission number.");
      }
    };

    fetchAdmno();
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      toast.error("Please upload a photo before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "your_upload_preset"); // Replace with your unsigned preset
    formData.append("cloud_name", "your_cloud_name"); // Replace with your Cloudinary cloud name

    try {
      // Upload photo to Cloudinary
      const uploadResponse = await axios.post(
        `https://upload-request.cloudinary.com/dxnxtjpl3/8f0377acf93ee6e125bd51ee310c77ee`, // Replace with your Cloudinary URL
        formData
      );

      const imageUrl = uploadResponse.data.secure_url;

      // Update the database with `photoUploaded` and the image URL
      await axios.patch(`http://localhost:5000/api/users/${admno}`, {
        photoUploaded: true,
        photoUrl: imageUrl, // Save the Cloudinary image URL to the database
      });

      toast.success("Photo uploaded and status updated successfully!");
      setPhotoUploaded(true);
    } catch (error) {
      console.error(error);
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
