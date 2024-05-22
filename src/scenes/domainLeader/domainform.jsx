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
    const { years, tapeouts, projects, clients } = values;
    try {
      await axios.post(`http://localhost:3000/domainInprogress`, {
        years,
        tapeouts,
        projects,
        clients,
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
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
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
                label="Number of Tapeouts Handeled"
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
  years: yup.number().required("Required"),
  projects: yup.string().required("Required"),
  tapeouts: yup.string().required("Required"),
  clients:yup.string().required("Required"),

});

const initialValues = {
  name:"",
  years: "",
  projects: "",
  tapeouts:"",
  clients:"",
};

export default Domainform;
