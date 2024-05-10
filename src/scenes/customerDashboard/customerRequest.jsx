import React from "react";
import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import CustomAlert from "../../components/CustomAlert";
import CustomerReq from "./custprojects";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const CustomerRequest = () => {
  const [submitted, setSubmitted] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationSeverity, setNotificationSeverity] = useState("success");
  const [notificationMessage, setNotificationMessage] = useState("");
  const isNonMobile = useMediaQuery("(min-width:600px)");

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
      await axios.post(`http://localhost:3000/customerRequirements`, {
        dv,
        dft,
        pd,
        info,
        user_id: user_id,
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

<TextField
                fullWidth
                variant="filled"
                type="string"
                label="Additonal Information"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.info}
                name="info"
                error={!!touched.info && !!errors.info}
                helperText={touched.info && errors.info}
                sx={{ gridColumn: "span 2" }}
                required
              />

              {/* <label htmlFor="file-upload">
                <Button
                  variant="outlined"
                  component="span"
                  color="secondary"
                  startIcon={<CloudUploadIcon />}
                >
                  Upload File
                </Button>
                {values.info && (
                  <div>
                    <Typography variant="body1">{values.info.name}</Typography>
                    <Button
                      variant="text"
                      component="span"
                      color="warning"
                      onClick={() => {
                        handleChange({
                          target: {
                            name: "info",
                            value: null,
                          },
                        });
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                )}
              </label> */}
              
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

      {/* Custom alert component */}
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
