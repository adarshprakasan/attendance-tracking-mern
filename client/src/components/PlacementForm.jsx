import { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
  Checkbox,
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
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import india from "../files/stateAndDistricts";

const PlacementForm = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    dob: "",
    gender: "",
    aadhar: "",
    passport: "",
    pancard: "",
    linkedin: "",
    twitter: "",
    instagram: "",
    facebook: "",
    state: "",
    district: "",
    address: "",
    pincode: "",
    pstate: "",
    pdistrict: "",
    paddress: "",
    ppincode: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const updateEmpData = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = (formData) => {
    const errors = {};
    const linkedInRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\/.*$/i;
    const twitterRegex =
      /^(https?:\/\/)?(www\.)?twitter\.com\/[A-Za-z0-9_]{1,15}$/i;
    const facebookRegex =
      /^(https?:\/\/)?(www\.)?facebook\.com\/[A-Za-z0-9.]{5,}$/i;
    const instagramRegex =
      /^(https?:\/\/)?(www\.)?instagram\.com\/[A-Za-z0-9_.]+$/i;

    if (!formData.fullname) errors.fullname = "Name is required.";
    if (!formData.linkedin) {
      errors.linkedin = "This field is required.";
    } else if (!linkedInRegex.test(formData.linkedin)) {
      errors.linkedin = "Enter a Valid URL.";
    }
    if (!formData.twitter) {
      errors.twitter = "This field is required.";
    } else if (!twitterRegex.test(formData.twitter)) {
      errors.twitter = "Enter a Valid URL.";
    }
    if (!formData.facebook) {
      errors.facebook = "This field is required.";
    } else if (!facebookRegex.test(formData.facebook)) {
      errors.facebook = "Enter a Valid URL.";
    }
    if (!formData.instagram) {
      errors.instagram = "This field is required.";
    } else if (!instagramRegex.test(formData.instagram)) {
      errors.instagram = "Enter a Valid URL.";
    }

    return errors;
  };

  const handleStateChange = (event, type) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(type === "current" ? { district: "" } : { pdistrict: "" }),
    }));
  };

  const handleDistrictChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = () => {
    setFormData((prev) => {
      if (!prev.sameAsCurrent) {
        return {
          ...prev,
          sameAsCurrent: true,
          pstate: prev.state,
          pdistrict: prev.district,
          paddress: prev.address,
          ppincode: prev.pincode,
        };
      } else {
        return {
          ...prev,
          sameAsCurrent: false,
          pstate: "",
          pdistrict: "",
          paddress: "",
          ppincode: "",
        };
      }
    });
  };

  const getDistricts = (state) =>
    india.states.find((s) => s.state === state)?.districts || [];

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
      await axios.post("http://localhost:5000/api/auth/signup", formData);
      toast.success("Success! Account created successfully.");
      setTimeout(() => navigate("/"), 3000);
      setFormData({
        fullname: "",
        dob: "",
        gender: "",
        aadhar: "",
        passport: "",
        pancard: "",
        linkedin: "",
        twitter: "",
        instagram: "",
        facebook: "",
        state: "",
        district: "",
        address: "",
        pincode: "",
        pstate: "",
        pdistrict: "",
        paddress: "",
        ppincode: "",
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

  const textFieldStyles = {
    marginBottom: "20px",
    input: { color: "white" },
    label: {
      color: "white",
      "&.Mui-disabled": {
        color: "rgba(255, 255, 255, 0.5)",
      },
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "#4caf50",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#4caf50",
      },
      "&.Mui-disabled": {
        "& fieldset": {
          borderColor: "rgba(255, 255, 255, 0.5)",
        },
        input: {
          color: "rgba(255, 255, 255, 0.7)",
        },
      },
    },
    "& .MuiSelect-select": {
      color: "white",
    },
    "& .MuiSelect-icon": {
      color: "white",
    },
    "& .Mui-disabled .MuiSelect-select": {
      color: "rgba(255, 255, 255, 0.5)",
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
          <TextField
            label="Name"
            name="name"
            value={formData.fullname}
            onChange={updateEmpData}
            error={!!errors.fullname}
            helperText={errors.fullname}
            sx={{
              // paddingTop: "8px",
              input: { color: "white" },
              label: { color: "white" },
              "& .MuiOutlinedInput-root": {
                paddingTop: "8px",
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "#4caf50",
                },
              },
            }}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="Date of Birth"
                name="dob"
                value={formData.dob}
                onChange={updateEmpData}
                error={!!errors.dob}
                helperText={errors.dob}
                sx={{
                  height: "60px",
                  width: "100%",
                  marginBottom: "20px",
                  paddingTop: 0,
                  "& .MuiInputBase-root": {
                    color: "white",
                    borderColor: "white",
                    paddingTop: 0,
                    "& fieldset": {
                      borderColor: "white",
                    },
                    "&:hover fieldset": {
                      borderColor: "#4caf50",
                    },
                  },
                  "& .MuiSvgIcon-root": {
                    color: "white",
                  },
                  "& .MuiFormLabel-root": {
                    color: "white",
                  },
                }}
              />
            </DemoContainer>
          </LocalizationProvider>

          {/* <TextField
            label="Date of Birth"
            name="dob"
            value={formData.dob}
            onChange={updateEmpData}
            error={!!errors.dob}
            helperText={errors.dob}
            sx={{
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
          /> */}
          <FormControl error={!!errors.gender} sx={{ width: "100%" }}>
            <InputLabel
              sx={{
                color: "white",
                "&.Mui-focused": { color: "#4caf50" },
              }}
            >
              Gender
            </InputLabel>
            <Select
              label="Gender"
              name="gender"
              value={formData.gender}
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
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
            {errors.gender && <FormHelperText>{errors.gender}</FormHelperText>}
          </FormControl>
          <FormControl
            component="fieldset"
            error={!!errors.aadhar}
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
              Do you have Aadhar card?
            </FormLabel>
            <RadioGroup
              name="aadhar"
              value={formData.aadhar}
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
                value="no"
                control={<Radio sx={radiostyles} />}
                label="No"
              />
            </RadioGroup>
            {errors.aadhar && (
              <FormHelperText sx={{ color: "white" }}>
                {errors.aadhar}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl
            component="fieldset"
            sx={{
              marginBottom: "20px",
              marginLeft: "10px",
              color: "white",
            }}
            error={!!errors.passport}
          >
            <FormLabel
              component="legend"
              sx={{
                color: "white",
                "&.Mui-focused": {
                  color: "#4caf50",
                },
              }}
            >
              Do you have Passport?
            </FormLabel>
            <RadioGroup
              name="passport"
              value={formData.passport}
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
                value="no"
                control={<Radio sx={radiostyles} />}
                label="No"
              />
            </RadioGroup>
            {errors.passport && (
              <FormHelperText sx={{ color: "white" }}>
                {errors.passport}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl
            component="fieldset"
            sx={{
              marginBottom: "20px",
              marginLeft: "10px",
              color: "white",
            }}
            error={!!errors.pancard}
          >
            <FormLabel
              component="legend"
              sx={{
                color: "white",
                "&.Mui-focused": {
                  color: "#4caf50",
                },
              }}
            >
              Do you have Pan card?
            </FormLabel>
            <RadioGroup
              name="pancard"
              value={formData.pancard}
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
                value="no"
                control={<Radio sx={radiostyles} />}
                label="No"
              />
            </RadioGroup>
            {errors.pancard && (
              <FormHelperText sx={{ color: "white" }}>
                {errors.pancard}
              </FormHelperText>
            )}
          </FormControl>
          <TextField
            label="Your Linkedin URL"
            name="linkedin"
            value={formData.linkedin}
            onChange={updateEmpData}
            error={!!errors.linkedin}
            helperText={errors.linkedin}
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
            label="Your Twitter URL"
            name="twitter"
            value={formData.twitter}
            onChange={updateEmpData}
            error={!!errors.twitter}
            helperText={errors.twitter}
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
            label="Your Instagram URL"
            name="instagram"
            value={formData.instagram}
            onChange={updateEmpData}
            error={!!errors.instagram}
            helperText={errors.instagram}
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
            label="Your Facebook URL"
            name="facebook"
            value={formData.facebook}
            onChange={updateEmpData}
            error={!!errors.facebook}
            helperText={errors.facebook}
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
          <Typography
            variant="h5"
            sx={{ color: "white", textAlign: "center", marginBottom: "10px" }}
          >
            Current Address
          </Typography>
          <Typography
            variant="h5"
            sx={{ color: "white", textAlign: "center", marginBottom: "15px" }}
          >
            Permanent/Native Place Address
          </Typography>
          <TextField
            select
            label="State"
            name="state"
            value={formData.state}
            onChange={(e) => handleStateChange(e, "current")}
            error={!!errors.state}
            helperText={errors.state}
            sx={textFieldStyles}
            fullWidth
          >
            {india.states.map((stateObj) => (
              <MenuItem key={stateObj.state} value={stateObj.state}>
                {stateObj.state}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="State"
            name="pstate"
            value={formData.pstate}
            onChange={(e) => handleStateChange(e, "permanent")}
            error={!!errors.pstate}
            helperText={errors.pstate}
            disabled={formData.sameAsCurrent}
            sx={textFieldStyles}
            fullWidth
          >
            {india.states.map((stateObj) => (
              <MenuItem key={stateObj.state} value={stateObj.state}>
                {stateObj.state}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="District"
            name="district"
            value={formData.district}
            onChange={handleDistrictChange}
            error={!!errors.district}
            helperText={errors.district}
            disabled={!formData.state}
            sx={textFieldStyles}
            fullWidth
          >
            {getDistricts(formData.state).map((district) => (
              <MenuItem key={district} value={district}>
                {district}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="District"
            name="pdistrict"
            value={formData.pdistrict}
            onChange={handleDistrictChange}
            error={!!errors.pdistrict}
            helperText={errors.pdistrict}
            disabled={!formData.pstate || formData.sameAsCurrent}
            sx={textFieldStyles}
            fullWidth
          >
            {getDistricts(formData.pstate).map((district) => (
              <MenuItem key={district} value={district}>
                {district}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Address"
            name="address"
            value={formData.address}
            onChange={updateEmpData}
            error={!!errors.address}
            helperText={errors.address}
            sx={textFieldStyles}
          />
          <TextField
            label="Address"
            name="paddress"
            value={formData.paddress}
            onChange={updateEmpData}
            error={!!errors.paddress}
            helperText={errors.paddress}
            disabled={formData.sameAsCurrent}
            sx={textFieldStyles}
          />
          <TextField
            label="Pincode"
            name="pincode"
            value={formData.pincode}
            onChange={updateEmpData}
            error={!!errors.pincode}
            helperText={errors.pincode}
            sx={textFieldStyles}
          />
          <TextField
            label="Pincode"
            name="ppincode"
            value={formData.ppincode}
            onChange={updateEmpData}
            error={!!errors.ppincode}
            helperText={errors.ppincode}
            disabled={formData.sameAsCurrent}
            sx={textFieldStyles}
          />
          <FormControlLabel
            sx={{ color: "white" }}
            control={
              <Checkbox
                checked={formData.sameAsCurrent}
                onChange={handleCheckboxChange}
                sx={{
                  color: "white",
                  textAlign: "center",
                  marginBottom: "10px",
                }}
              />
            }
            label="Same as Current Address"
          />
          <div style={{ display: "flex", justifyContent: "end" }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                width: "180px",
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

export default PlacementForm;
