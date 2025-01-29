import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  FormHelperText,
  Radio,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Education = () => {
  const [formData, setFormData] = useState({
    highestdegree: "",
    tencorp: "",
    tencgpa: "",
    tenyop: "",
    puc: "",
    puccorp: "",
    puccgpa: "",
    pucyop: "",
    pucgap: "",
    degreecorp: "",
    degreecgpa: "",
    degree: "",
    degreeyop: "",
    degreestream: "",
    university: "",
    college: "",
    collegegap: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const updateEmpData = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = (formData) => {
    const errors = {};
    const numberRegex = /^\d{10}$/;

    if (!formData.name) errors.name = "Name is required.";
    if (!formData.number) {
      errors.number = "Mobile number is required.";
    } else if (!numberRegex.test(formData.number)) {
      errors.number = "Number must be 10 digits.";
    }
    return errors;
  };

  //^=====================================================================
  //! FETCHING ADMNO FROM DATABASE
  useEffect(() => {
    const fetchAdmno = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/update",
          {},
          {
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("admno:", response.data.admno);
        // setAdmno(response.data.admno);
        setFormData((prevData) => ({
          ...prevData,
          admno: response.data.admno,
        }));
      } catch (error) {
        console.error(
          "Error fetching admno",
          error.response?.data?.message || error.message
        );
      }
    };

    if (token) {
      fetchAdmno();
    } else {
      // navigate("/");
      console.error("Token is missing!");
    }
  }, [token]);

  //^=====================================================================
  //! FORM SUBMISSION

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
        "http://localhost:5000/api/auth/placementform",
        formData
      );
      toast.success("Success! Account created successfully.");
      setTimeout(() => navigate("/courselist"), 2000);
      setFormData({
        highestdegree: "",
        tencorp: "",
        tencgpa: "",
        tenyop: "",
        puc: "",
        puccorp: "",
        puccgpa: "",
        pucyop: "",
        pucgap: "",
        degreecorp: "",
        degreecgpa: "",
        degree: "",
        degreeyop: "",
        degreestream: "",
        university: "",
        college: "",
        collegegap: "",
      });
      setErrors({});
    } catch (error) {
      toast.error("Error! Unable to create an account.");
    } finally {
      setLoading(false);
    }
  };

  const radiostyles = {
    color: "white",
    "&.Mui-checked": {
      color: "#4caf50",
    },
    "& .MuiSvgIcon-root": {
      border: "1px solid white",
      borderRadius: "50%",
    },
    "&:hover .MuiSvgIcon-root": {
      borderColor: "#4caf50",
    },
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
          height: "90vh",
          width: "80%",
          maxWidth: "1200px",
          backgroundColor: "#1A202C",
          borderRadius: "10px",
          padding: "30px",
          border: "1px solid #151b23",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
        }}
      >
        <Typography
          variant="h5"
          sx={{ color: "white", textAlign: "center", marginBottom: "20px" }}
        >
          Placement Form
        </Typography>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "30px",
          }}
        >
          <div></div>
          <div></div>
          <FormControl error={!!errors.highestdegree} sx={{ width: "100%" }}>
            <InputLabel
              sx={{
                color: "white",
                "&.Mui-focused": { color: "#4caf50" },
              }}
            >
              Highest Degree
            </InputLabel>
            <Select
              label="Highest Degree"
              name="highestdegree"
              value={formData.highestdegree}
              onChange={updateEmpData}
              sx={{
                color: "white",
                ".MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#4caf50",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#4caf50",
                },
              }}
            >
              <MenuItem value="bachelors">Bachelor&apos;s</MenuItem>
              <MenuItem value="masters">Master&apos;s</MenuItem>
              <MenuItem value="polytechnic">Polytechnic</MenuItem>
            </Select>
            {errors.highestdegree && (
              <FormHelperText>{errors.highestdegree}</FormHelperText>
            )}
          </FormControl>

          <div></div>
          <div></div>
          <div></div>

          <Typography
            variant="h5"
            sx={{ color: "white", textAlign: "left", marginBottom: "10px" }}
          >
            10th Information
          </Typography>

          <div></div>

          <FormControl
            component="fieldset"
            error={!!errors.tencorp}
            sx={{
              marginBottom: "20px",
              marginLeft: "10px",
              color: "white",
            }}
          >
            <FormLabel
              sx={{
                color: "white",
                "&.Mui-focused": { color: "#4caf50" },
              }}
            >
              CGPA or Percentage?
            </FormLabel>
            <RadioGroup
              name="tencorp"
              value={formData.tencorp}
              onChange={(e) => {
                updateEmpData(e); // Update the form data
                setFormData((prev) => ({
                  ...prev,
                  tencgpa: "", // Reset the input value when switching
                }));
              }}
              row
              sx={{ "& .MuiFormControlLabel-label": { color: "white" } }}
            >
              <FormControlLabel
                value="cgpa"
                control={<Radio sx={radiostyles} />}
                label="CGPA"
              />
              <FormControlLabel
                value="percentage"
                control={<Radio sx={radiostyles} />}
                label="Percentage"
              />
            </RadioGroup>
            {errors.tencorp && (
              <FormHelperText sx={{ color: "white" }}>
                {errors.tencorp}
              </FormHelperText>
            )}
          </FormControl>

          <TextField
            label={
              formData.tencorp === "cgpa" ? "10th CGPA" : "10th Percentage"
            }
            name="tencgpa"
            value={formData.tencgpa}
            onChange={(e) => {
              const value = e.target.value;
              const isValid =
                formData.tencorp === "cgpa"
                  ? value >= 0 && value <= 10
                  : value >= 1 && value <= 100;

              if (isValid || value === "") {
                updateEmpData(e); // Update the form data only for valid input
              }
            }}
            error={!!errors.tencgpa}
            helperText={errors.tencgpa}
            type="number"
            inputProps={{
              min: formData.tencorp === "cgpa" ? 0 : 1,
              max: formData.tencorp === "cgpa" ? 10 : 100,
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
            label="10th Year of Pass Out"
            name="tenyop"
            value={formData.tenyop}
            onChange={updateEmpData}
            error={!!errors.tenyop}
            helperText={errors.tenyop}
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

          <div></div>

          <FormControl
            component="fieldset"
            error={!!errors.puc}
            sx={{
              marginBottom: "20px",
              marginLeft: "10px",
              color: "white",
            }}
          >
            <FormLabel
              sx={{
                color: "white",
                "&.Mui-focused": { color: "#4caf50" },
              }}
            >
              Please choose the below option
            </FormLabel>
            <RadioGroup
              name="puc"
              value={formData.puc}
              onChange={(e) => {
                const value = e.target.value;
                updateEmpData(e);
                setFormData((prev) => ({
                  ...prev,
                  puccorp: "", // Reset CGPA/Percentage selection
                  puccgpa: "", // Reset CGPA/Percentage value
                  pucyop: "", // Reset Year of Passout
                }));
              }}
              row
              sx={{ "& .MuiFormControlLabel-label": { color: "white" } }}
            >
              <FormControlLabel
                value="puc"
                control={<Radio sx={radiostyles} />}
                label="12th/PUC"
              />
              <FormControlLabel
                value="iti"
                control={<Radio sx={radiostyles} />}
                label="ITI"
              />
              <FormControlLabel
                value="diploma"
                control={<Radio sx={radiostyles} />}
                label="Diploma"
              />
            </RadioGroup>
            {errors.puc && (
              <FormHelperText sx={{ color: "white" }}>
                {errors.puc}
              </FormHelperText>
            )}
          </FormControl>
          <div></div>
          <div></div>
          <div></div>

          <Typography
            variant="h5"
            sx={{ color: "white", textAlign: "left", marginBottom: "10px" }}
          >
            {formData.puc === "puc"
              ? "12th Information"
              : formData.puc === "iti"
              ? "ITI Information"
              : "Diploma Information"}
          </Typography>
          <div></div>

          <FormControl
            component="fieldset"
            error={!!errors.puccorp}
            sx={{
              marginBottom: "20px",
              marginLeft: "10px",
              color: "white",
            }}
          >
            <FormLabel
              sx={{
                color: "white",
                "&.Mui-focused": { color: "#4caf50" },
              }}
            >
              CGPA or Percentage?
            </FormLabel>
            <RadioGroup
              name="puccorp"
              value={formData.puccorp}
              onChange={updateEmpData}
              row
              sx={{ "& .MuiFormControlLabel-label": { color: "white" } }}
            >
              <FormControlLabel
                value="cgpa"
                control={<Radio sx={radiostyles} />}
                label="CGPA"
              />
              <FormControlLabel
                value="percentage"
                control={<Radio sx={radiostyles} />}
                label="Percentage"
              />
            </RadioGroup>
            {errors.puccorp && (
              <FormHelperText sx={{ color: "white" }}>
                {errors.puccorp}
              </FormHelperText>
            )}
          </FormControl>

          <TextField
            label={
              formData.puc === "iti"
                ? "ITI Percentage"
                : formData.puccorp === "cgpa"
                ? "CGPA"
                : "Percentage"
            }
            name="puccgpa"
            value={formData.puccgpa}
            onChange={(e) => {
              const value = e.target.value;
              const isValid =
                formData.puccorp === "cgpa"
                  ? value >= 0 && value <= 10
                  : value >= 1 && value <= 100;

              if (isValid || value === "") {
                updateEmpData(e);
              }
            }}
            error={!!errors.puccgpa}
            helperText={errors.puccgpa}
            type="number"
            inputProps={{
              min: formData.puccorp === "cgpa" ? 0 : 1,
              max: formData.puccorp === "cgpa" ? 10 : 100,
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
            label={
              formData.puc === "iti"
                ? "ITI Year of Pass Out"
                : formData.puc === "diploma"
                ? "Diploma Year of Pass Out"
                : "12th Year of Pass Out"
            }
            name="pucyop"
            value={formData.pucyop}
            onChange={updateEmpData}
            error={!!errors.pucyop}
            helperText={errors.pucyop}
            type="number"
            inputProps={{
              min: 1900,
              max: new Date().getFullYear(),
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

          <FormControl
            component="fieldset"
            error={!!errors.pucgap}
            sx={{
              marginBottom: "20px",
              marginLeft: "10px",
              color: "white",
            }}
          >
            <FormLabel
              sx={{
                color: "white",
                "&.Mui-focused": { color: "#4caf50" },
              }}
            >
              Do you have academic gap upto 12th?
            </FormLabel>
            <RadioGroup
              name="pucgap"
              value={formData.pucgap}
              onChange={updateEmpData}
              row
              sx={{ "& .MuiFormControlLabel-label": { color: "white" } }}
            >
              <FormControlLabel
                value="yes"
                control={<Radio sx={radiostyles} />}
                label="Yes"
              />
              <FormControlLabel
                value="No"
                control={<Radio sx={radiostyles} />}
                label="No"
              />
            </RadioGroup>
            {errors.pucgap && (
              <FormHelperText sx={{ color: "white" }}>
                {errors.pucgap}
              </FormHelperText>
            )}
          </FormControl>

          <div></div>
          <div></div>
          <Typography
            variant="h5"
            sx={{ color: "white", textAlign: "left", marginBottom: "10px" }}
          >
            Degree Information
          </Typography>

          <div></div>

          <FormControl
            component="fieldset"
            error={!!errors.degreecorp}
            sx={{
              marginBottom: "20px",
              marginLeft: "10px",
              color: "white",
            }}
          >
            <FormLabel
              sx={{
                color: "white",
                "&.Mui-focused": { color: "#4caf50" },
              }}
            >
              CGPA or Percentage?
            </FormLabel>
            <RadioGroup
              name="degreecorp"
              value={formData.degreecorp}
              onChange={(e) => {
                const value = e.target.value;
                updateEmpData(e);
                setFormData((prev) => ({
                  ...prev,
                  degreeValue: "", // Reset the input value when switching between CGPA and Percentage
                }));
              }}
              row
              sx={{ "& .MuiFormControlLabel-label": { color: "white" } }}
            >
              <FormControlLabel
                value="cgpa"
                control={<Radio sx={radiostyles} />}
                label="CGPA"
              />
              <FormControlLabel
                value="percentage"
                control={<Radio sx={radiostyles} />}
                label="Percentage"
              />
            </RadioGroup>
            {errors.degreecorp && (
              <FormHelperText sx={{ color: "white" }}>
                {errors.degreecorp}
              </FormHelperText>
            )}
          </FormControl>

          <TextField
            label={formData.degreecorp === "cgpa" ? "CGPA" : "Percentage"}
            name="degreeValue"
            value={formData.degreeValue}
            onChange={(e) => {
              const value = e.target.value;
              const isValid =
                formData.degreecorp === "cgpa"
                  ? value >= 0 && value <= 10
                  : value >= 1 && value <= 100;

              if (isValid || value === "") {
                updateEmpData(e);
              }
            }}
            error={!!errors.degreeValue}
            helperText={errors.degreeValue}
            type="number"
            inputProps={{
              min: formData.degreecorp === "cgpa" ? 0 : 1,
              max: formData.degreecorp === "cgpa" ? 10 : 100,
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
            label="Degree"
            name="degree"
            value={formData.degree}
            onChange={updateEmpData}
            error={!!errors.degree}
            helperText={errors.degree}
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
            label="Year of pass out"
            name="degreeyop"
            value={formData.degreeyop}
            onChange={updateEmpData}
            error={!!errors.degreeyop}
            helperText={errors.degreeyop}
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
            label="Stream"
            name="degreestream"
            value={formData.degreestream}
            onChange={updateEmpData}
            error={!!errors.degreestream}
            helperText={errors.degreestream}
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
            label="University"
            name="university"
            value={formData.university}
            onChange={updateEmpData}
            error={!!errors.university}
            helperText={errors.university}
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
            label="College"
            name="college"
            value={formData.college}
            onChange={updateEmpData}
            error={!!errors.colleg}
            helperText={errors.colleg}
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

          <FormControl
            component="fieldset"
            error={!!errors.collegegap}
            sx={{
              marginBottom: "20px",
              marginLeft: "10px",
              color: "white",
            }}
          >
            <FormLabel
              sx={{
                color: "white",
                "&.Mui-focused": { color: "#4caf50" },
              }}
            >
              Do you have academic gap upto college?
            </FormLabel>
            <RadioGroup
              name="collegegap"
              value={formData.collegegap}
              onChange={updateEmpData}
              row
              sx={{ "& .MuiFormControlLabel-label": { color: "white" } }}
            >
              <FormControlLabel
                value="yes"
                control={<Radio sx={radiostyles} />}
                label="Yes"
              />
              <FormControlLabel
                value="No"
                control={<Radio sx={radiostyles} />}
                label="No"
              />
            </RadioGroup>
            {errors.collegegap && (
              <FormHelperText sx={{ color: "white" }}>
                {errors.collegegap}
              </FormHelperText>
            )}
          </FormControl>
          <div></div>
          <div style={{ display: "flex", justifyContent: "end" }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                width: "200px",
                mb: 2,
                bgcolor: "green",
                "&:hover": {
                  bgcolor: "#004600",
                  color: "white",
                },
              }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Save and Proceed"}
            </Button>
          </div>
        </form>
      </Box>
      <ToastContainer position="top-right" autoClose={5000} />
    </Box>
  );
};

export default Education;
