import React from "react";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

const Engineerform = () => {
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
              <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 2" }}>
                <InputLabel id="specialization-label">Specialization</InputLabel>
                <Select
                  labelId="specialization-label"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.specialization}
                  name="specialization"
                >
                  <MenuItem value="DV">DV (Design Verifivation)</MenuItem>
                  <MenuItem value="DFT">DFT (Design For Test)</MenuItem>
                  <MenuItem value="PD">PD (Physical Design)</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Total Exp.(in years)"
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
                label="Past Projects"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.pastprojects}
                name="pastprojects"
                error={!!touched.pastprojects && !!errors.pastprojects}
                helperText={touched.pastprojects && errors.pastprojects}
                sx={{ gridColumn: "span 2" }}
              />
              <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 2" }}>
                <InputLabel id="owork-label">Open To Work</InputLabel>
                <Select
                  labelId="owork-label"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.owork}
                  name="owork"
                >
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Preferred Location"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.location}
                name="location"
                error={!!touched.location && !!errors.location}
                helperText={touched.location && errors.location}
                sx={{ gridColumn: "span 4" }}
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
  specialization: yup.string().required("Required"),
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

export default Engineerform;
