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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import countryCodes from "../files/countryCodes";

const OtherDetails = () => {
  const [formData, setFormData] = useState({
    relocate: "",
    relocation: [],
    guardian: "",
    number: "",
    relation: "",
    refername: "",
    referno: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const updateEmpData = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
      await axios.post("http://localhost:5000/api/auth/signup", formData);
      toast.success("Success! Account created successfully.");
      setTimeout(() => navigate("/"), 3000);
      setFormData({
        relocate: "",
        relocation: [],
        guardian: "",
        number: "",
        relation: "",
        refername: "",
        referno: "",
      });
      setErrors({});
    } catch (error) {
      toast.error("Error! Unable to create an account.");
    } finally {
      setLoading(false);
    }
  };

  const [contacts, setContacts] = useState([
    { guardian: "", relation: "", countryCode: "", number: "" },
  ]);

  const handleInputChange = (index, field, value) => {
    const updatedContacts = [...contacts];
    updatedContacts[index][field] = value;
    setContacts(updatedContacts);
  };

  const addContact = () => {
    setContacts([
      ...contacts,
      { guardian: "", relation: "", countryCode: "", number: "" },
    ]);
  };

  const [referral, setReferral] = useState([
    { refername: "", countryCode: "", referno: "" },
  ]);

  const handleInputChanges = (index, field, value) => {
    const updatedReferral = [...referral];
    updatedReferral[index][field] = value;
    setReferral(updatedReferral);
  };

  const addReferral = () => {
    setReferral([...referral, { refername: "", countryCode: "", referno: "" }]);
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
              Ready to relocate?
            </FormLabel>
            <RadioGroup
              name="relocate"
              value={formData.relocate}
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
            {errors.relocate && (
              <FormHelperText sx={{ color: "white" }}>
                {errors.relocate}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl error={!!errors.relocation} sx={{ width: "100%" }}>
            <InputLabel
              sx={{
                color: "white",
                "&.Mui-focused": { color: "#4caf50" },
              }}
            >
              Relocation
            </InputLabel>
            <Select
              label="Relocation"
              name="relocation"
              multiple
              value={formData.relocation}
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
              <MenuItem value="bengaluru">Bengaluru</MenuItem>
              <MenuItem value="chennai">Chennai</MenuItem>
              <MenuItem value="kochi">Kochi</MenuItem>
              <MenuItem value="hyderabad">Hyderabad</MenuItem>
            </Select>
            {errors.relocation && (
              <FormHelperText>{errors.relocation}</FormHelperText>
            )}
          </FormControl>
          <div>
            <Typography
              variant="h5"
              sx={{ color: "white", textAlign: "center", marginBottom: "10px" }}
            >
              Parents/Guardian contact for Emergency
            </Typography>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {contacts.map((contact, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    marginBottom: "30px",
                    width: "100%",
                    maxWidth: "500px",
                  }}
                >
                  <TextField
                    label="Name"
                    name="guardian"
                    value={contact.guardian}
                    onChange={(e) =>
                      handleInputChange(index, "guardian", e.target.value)
                    }
                    error={!!errors.guardian}
                    helperText={errors.guardian}
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
                  />
                  <TextField
                    label="Relation"
                    name="relation"
                    value={contact.relation}
                    onChange={(e) =>
                      handleInputChange(index, "relation", e.target.value)
                    }
                    error={!!errors.relation}
                    helperText={errors.relation}
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
                  />
                  <TextField
                    select
                    label="Country Code"
                    name="countryCode"
                    value={contact.countryCode}
                    onChange={(e) =>
                      handleInputChange(index, "countryCode", e.target.value)
                    }
                    error={!!errors.countryCode}
                    helperText={errors.countryCode}
                    sx={{
                      width: "223px",
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
                    {countryCodes.countries.map((country) => (
                      <MenuItem key={country.code} value={country.code}>
                        {`${country.name} (${country.code})`}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    label="Number"
                    name="number"
                    value={contact.number}
                    onChange={(e) =>
                      handleInputChange(index, "number", e.target.value)
                    }
                    error={!!errors.number}
                    helperText={errors.number}
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
                  />
                </div>
              ))}
              <Button
                variant="contained"
                color="primary"
                onClick={addContact}
                sx={{
                  // position: "fixed",
                  bottom: "20px",
                  width: "300px",
                  height: "50px",
                }}
              >
                Add Emergency Contact
              </Button>
            </div>
          </div>
          <div>
            <Typography
              variant="h5"
              sx={{ color: "white", textAlign: "center", marginBottom: "10px" }}
            >
              Refer friend
            </Typography>

            <div></div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {referral.map((referral, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    marginBottom: "30px",
                    width: "100%",
                    maxWidth: "500px",
                  }}
                >
                  <TextField
                    label="Name"
                    name="refername"
                    value={referral.refername}
                    onChange={(e) =>
                      handleInputChanges(index, "refername", e.target.value)
                    }
                    error={!!errors.refername}
                    helperText={errors.refername}
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
                  />

                  <TextField
                    select
                    label="Country Code"
                    name="countryCode"
                    value={referral.countryCode}
                    onChange={(e) =>
                      handleInputChanges(index, "countryCode", e.target.value)
                    }
                    error={!!errors.countryCode}
                    helperText={errors.countryCode}
                    sx={{
                      width: "223px",
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
                    {countryCodes.countries.map((country) => (
                      <MenuItem key={country.code} value={country.code}>
                        {`${country.name} (${country.code})`}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    label="Number"
                    name="referno"
                    value={referral.referno}
                    onChange={(e) =>
                      handleInputChanges(index, "referno", e.target.value)
                    }
                    error={!!errors.referno}
                    helperText={errors.referno}
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
                  />
                </div>
              ))}
              <Button
                variant="contained"
                color="primary"
                onClick={addReferral}
                sx={{
                  // position: "fixed",
                  bottom: "20px",
                  width: "300px",
                  height: "50px",
                }}
              >
                Add another referral
              </Button>
            </div>
          </div>
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
            {loading ? <CircularProgress size={24} /> : "Submit"}
          </Button>
        </form>
      </Box>
      <ToastContainer position="top-right" autoClose={5000} />
    </Box>
  );
};

export default OtherDetails;
