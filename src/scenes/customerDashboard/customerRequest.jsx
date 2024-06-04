import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import CustomAlert from "../../components/CustomAlert";
import CustomerReq from "./custprojects";

const CustomerRequest = () => {
  const [submitted, setSubmitted] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationSeverity, setNotificationSeverity] = useState("success");
  const [notificationMessage, setNotificationMessage] = useState("");
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [selectedFile, setSelectedFile] = useState(null); 

  const initialValues = {
    dv: "",
    dft: "",
    pd: "",
    info: "",
  };

  const checkoutSchema = yup.object().shape({});

  const handleFormSubmit = async (values) => {
    const { dv, dft, pd, info } = values;
    try {
      const user_id = sessionStorage.getItem('user_id');
      const formData = new FormData();
      formData.append("user_id", user_id);
      formData.append("dv", dv);
      formData.append("dft", dft);
      formData.append("pd", pd);
      formData.append("info", info);
      formData.append("file", selectedFile); // Append the selected file to the form data
      await axios.post(`http://localhost:3000/customerRequirements`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set content type for form data
        },
      });
      setNotificationSeverity("success");
      setNotificationMessage("Request Raised");
      setSubmitted(true);
    } catch (error) {
      console.error("Error accepting request:", error);
      setNotificationSeverity("error");
      setNotificationMessage("Error accepting request");
    }
    setNotificationOpen(true);
  };

  const handleNotificationClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNotificationOpen(false);
  };

  return (
    <Box m="20px">
      <Header
        title="Raise Request"
        subtitle="If you do not require assistance with any specific category, please enter 0"
      />

      <Formik
        initialValues={initialValues}
        validationSchema={checkoutSchema}
        onSubmit={handleFormSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="No. Of IC Designers"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.dv}
                name="dv"
                error={!!touched.dv && !!errors.dv}
                helperText={touched.dv && errors.dv}
                sx={{ gridColumn: "span 2" }}
                required
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="No. of Domain Leaders Required"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.dft}
                name="dft"
                error={!!touched.dft && !!errors.dft}
                helperText={touched.dft && errors.dft}
                sx={{ gridColumn: "span 2" }}
                required
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Number of Engineers Required"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.pd}
                name="pd"
                error={!!touched.pd && !!errors.pd}
                helperText={touched.pd && errors.pd}
                sx={{ gridColumn: "span 2" }}
                required
              />
              <input
                id="file-upload"
                type="file"
                style={{ display: 'none' }}
                required
                onChange={(event) => {
                  setSelectedFile(event.target.files[0]);
                  setFieldValue("fileName", event.target.files[0].name); // Set the filename in the form field
                }}
              />
              <label htmlFor="file-upload">
                <Button
                  variant="outlined"
                  component="span"
                  color="secondary"
                >
                  Upload File
                </Button>
              </label>
              {values.fileName && (
                <div>
                  <Typography variant="body1">{values.fileName}</Typography>
                  <Button
                    variant="text"
                    color="warning"
                    onClick={() => {
                      setSelectedFile(null);
                      setFieldValue("fileName", ""); // Clear the filename in the form field
                    }}
                  >
                    Remove
                  </Button>
                </div>
              )}
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Additional Information"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.info}
                name="info"
                error={!!touched.info && !!errors.info}
                helperText={touched.info && errors.info}
                sx={{ gridColumn: "span 4" }}
                required
              />
            </Box>

            
            <Box display="flex" justifyContent="end" mt="20px">
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                disabled={submitted}
              >
                Submit
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      <CustomerReq/>

      <CustomAlert
        open={notificationOpen}
        onClose={handleNotificationClose}
        severity={notificationSeverity}
        message={notificationMessage}
      />
    </Box>
  );
};

export default CustomerRequest;
