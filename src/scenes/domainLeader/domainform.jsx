import React from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import CustomAlert from "../../components/CustomAlert";
import axios from "axios";
import { useState } from "react";

const Domainform = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [submitted, setSubmitted] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationSeverity, setNotificationSeverity] = useState("success");
  const [notificationMessage, setNotificationMessage] = useState("");

  const handleFormSubmit = async (values) => {
    const { names, years, tapeouts, projects, clients } = values;
    try {
      const user_id = sessionStorage.getItem('user_id');
      await axios.post(`http://localhost:3000/domainInprogress`, {
        names, 
        years,
        tapeouts,
        projects,
        clients,
        user_id: user_id,
      });
      setNotificationSeverity("success");
      setNotificationMessage("Domain Leader Registered");
      setSubmitted(true);
    } catch (error) {
      console.error('Error accepting request:', error);
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
      <Header title="Register Domain Leader" subtitle="Create a New Domain Leader" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
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
                label="Domain Leader Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.names}
                name="names"
                error={!!touched.names && !!errors.names}
                helperText={touched.names && errors.names}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Total Experience (in Years)"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.years}
                name="years"
                error={!!touched.years && !!errors.years}
                helperText={touched.years && errors.years}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Number of Tapeouts Handled"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.tapeouts}
                name="tapeouts"
                error={!!touched.tapeouts && !!errors.tapeouts}
                helperText={touched.tapeouts && errors.tapeouts}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Details of Past Projects"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.projects}
                name="projects"
                error={!!touched.projects && !!errors.projects}
                helperText={touched.projects && errors.projects}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Clients Served in the Past"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.clients}
                name="clients"
                error={!!touched.clients && !!errors.clients}
                helperText={touched.clients && errors.clients}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained" disabled={submitted}>
                Register Leader
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      <CustomAlert
        open={notificationOpen}
        onClose={handleNotificationClose}
        severity={notificationSeverity}
        message={notificationMessage}
      />
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  names: yup.string().required("Required"),
  years: yup.number().required("Required").positive("Must be positive").integer("Must be an integer"),
  tapeouts: yup.number().required("Required").positive("Must be positive").integer("Must be an integer"),
  projects: yup.string().required("Required"),
  clients: yup.number().required("Required").positive("Must be positive").integer("Must be an integer"),
});

const initialValues = {
  names: "",
  years: "",
  tapeouts: "",
  projects: "",
  clients: "",
};

export default Domainform;
