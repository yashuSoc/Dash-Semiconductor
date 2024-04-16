import React from "react";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

const Domainform = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  return (
    <Box m="20px">
      <Header title="Create User" subtitle="Create a New User Profile" />

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
                label="Clients Served in the past "
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
              <Button type="submit" color="secondary" variant="contained">
                Register Engineer
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};


const checkoutSchema = yup.object().shape({
  years: yup.number().required("Required"),
  pastprojects: yup.number().required("Required"),
  location: yup.string().required("Required"),
  owork:yup.string().required("Required"),

});

const initialValues = {
  specialization: "",
  years: "",
  projects: "",
  pastprojects: "",
  location: "",
};

export default Domainform;
