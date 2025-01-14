import { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  //   InputAdornment,
  //   IconButton,
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
// import {
//   AddCommentOutlined,
//   Visibility,
//   VisibilityOff,
// } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const PlacementForm = () => {
  const [formData, setFormData] = useState({
    nm: "",
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
    address: "",
    pstate: "",
    district: "",
    pincode: "",
    paddress: "",
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
    const passwordRegex = /^(?=.\d)(?=.[a-z])(?=.*[A-Z]).{8,32}$/;
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
        nm: "",
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
        address: "",
        pstate: "",
        district: "",
        pincode: "",
        paddress: "",
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
          Placement Form
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
            label="Name"
            name="name"
            value={formData.name}
            onChange={updateEmpData}
            error={!!errors.name}
            helperText={errors.name}
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
            label="Date of Birth"
            name="dob"
            value={formData.dob}
            onChange={updateEmpData}
            error={!!errors.dob}
            helperText={errors.dob}
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
            sx={{
              marginBottom: "20px",
              width: "100%",
            }}
            error={!!errors.gender}
          >
            <InputLabel
              sx={{
                color: "white",
                "&.Mui-focused": {
                  color: "#4caf50", // Green color for focused label
                },
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
                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: "white", // White border
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#4caf50", // Green border on hover
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#4caf50", // Green border when focused
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
            sx={{
              marginBottom: "20px",
              marginLeft: "10px",
              color: "white",
            }}
            error={!!errors.aadhar}
          >
            <FormLabel
              component="legend"
              sx={{
                color: "white",
                "&.Mui-focused": {
                  color: "#4caf50", // Green label color when focused
                },
              }}
            >
              Do you have Aadhar card?
            </FormLabel>
            <RadioGroup
              name="aadhar"
              value={formData.aadhar}
              onChange={updateEmpData}
              row // Displays radio buttons in a row
              sx={{
                "& .MuiFormControlLabel-label": {
                  color: "white",
                },
              }}
            >
              <FormControlLabel
                value="yes"
                control={
                  <Radio
                    sx={{
                      color: "white", // Unselected radio color
                      "&.Mui-checked": {
                        color: "#4caf50", // Green color when checked
                      },
                      "& .MuiSvgIcon-root": {
                        border: "1px solid white", // White border for unselected radio
                        borderRadius: "50%", // Circular border
                      },
                      "&:hover .MuiSvgIcon-root": {
                        borderColor: "#4caf50", // Green border on hover
                      },
                    }}
                  />
                }
                label="Yes"
              />
              <FormControlLabel
                value="no"
                control={
                  <Radio
                    sx={{
                      color: "white", // Unselected radio color
                      "&.Mui-checked": {
                        color: "#4caf50", // Green color when checked
                      },
                      "& .MuiSvgIcon-root": {
                        border: "1px solid white", // White border for unselected radio
                        borderRadius: "50%", // Circular border
                      },
                      "&:hover .MuiSvgIcon-root": {
                        borderColor: "#4caf50", // Green border on hover
                      },
                    }}
                  />
                }
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
                  color: "#4caf50", // Green label color when focused
                },
              }}
            >
              Do you have Passport?
            </FormLabel>
            <RadioGroup
              name="passport"
              value={formData.passport}
              onChange={updateEmpData}
              row // Displays radio buttons in a row
              sx={{
                "& .MuiFormControlLabel-label": {
                  color: "white",
                },
              }}
            >
              <FormControlLabel
                value="yes"
                control={
                  <Radio
                    sx={{
                      color: "white", // Unselected radio color
                      "&.Mui-checked": {
                        color: "#4caf50", // Green color when checked
                      },
                      "& .MuiSvgIcon-root": {
                        border: "1px solid white", // White border for unselected radio
                        borderRadius: "50%", // Circular border
                      },
                      "&:hover .MuiSvgIcon-root": {
                        borderColor: "#4caf50", // Green border on hover
                      },
                    }}
                  />
                }
                label="Yes"
              />
              <FormControlLabel
                value="no"
                control={
                  <Radio
                    sx={{
                      color: "white", // Unselected radio color
                      "&.Mui-checked": {
                        color: "#4caf50", // Green color when checked
                      },
                      "& .MuiSvgIcon-root": {
                        border: "1px solid white", // White border for unselected radio
                        borderRadius: "50%", // Circular border
                      },
                      "&:hover .MuiSvgIcon-root": {
                        borderColor: "#4caf50", // Green border on hover
                      },
                    }}
                  />
                }
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
                  color: "#4caf50", // Green label color when focused
                },
              }}
            >
              Do you have Pan card?
            </FormLabel>
            <RadioGroup
              name="pancard"
              value={formData.pancard}
              onChange={updateEmpData}
              row // Displays radio buttons in a row
              sx={{
                "& .MuiFormControlLabel-label": {
                  color: "white",
                },
              }}
            >
              <FormControlLabel
                value="yes"
                control={
                  <Radio
                    sx={{
                      color: "white", // Unselected radio color
                      "&.Mui-checked": {
                        color: "#4caf50", // Green color when checked
                      },
                      "& .MuiSvgIcon-root": {
                        border: "1px solid white", // White border for unselected radio
                        borderRadius: "50%", // Circular border
                      },
                      "&:hover .MuiSvgIcon-root": {
                        borderColor: "#4caf50", // Green border on hover
                      },
                    }}
                  />
                }
                label="Yes"
              />
              <FormControlLabel
                value="no"
                control={
                  <Radio
                    sx={{
                      color: "white", // Unselected radio color
                      "&.Mui-checked": {
                        color: "#4caf50", // Green color when checked
                      },
                      "& .MuiSvgIcon-root": {
                        border: "1px solid white", // White border for unselected radio
                        borderRadius: "50%", // Circular border
                      },
                      "&:hover .MuiSvgIcon-root": {
                        borderColor: "#4caf50", // Green border on hover
                      },
                    }}
                  />
                }
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

          <TextField
            label="State"
            name="state"
            value={formData.state}
            onChange={updateEmpData}
            error={!!errors.state}
            helperText={errors.state}
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
            label="Address"
            name="add"
            value={formData.add}
            onChange={updateEmpData}
            error={!!errors.add}
            helperText={errors.add}
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
            sx={{ color: "white", textAlign: "center", marginBottom: "15px" }}
          >
            Permenent Address/Native Place Address
          </Typography>

          <TextField
            label="state"
            name="pstate"
            value={formData.pstate}
            onChange={updateEmpData}
            error={!!errors.pstate}
            helperText={errors.pstate}
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
            label="District"
            name="district"
            value={formData.district}
            onChange={updateEmpData}
            error={!!errors.district}
            helperText={errors.district}
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
            label="Pincode"
            name="pincode"
            value={formData.pincode}
            onChange={updateEmpData}
            error={!!errors.pincode}
            helperText={errors.pincode}
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
            label="Address"
            name="paddress"
            value={formData.paddress}
            onChange={updateEmpData}
            error={!!errors.paddress}
            helperText={errors.paddress}
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
            {loading ? <CircularProgress size={24} /> : "Save and Proceed"}
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

export default PlacementForm;
