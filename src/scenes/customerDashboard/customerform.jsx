import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

const Customerform = () => {
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
                type="text"
                label="Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.companyName}
                name="companyName"
                error={!!touched.companyName && !!errors.companyName}
                helperText={touched.companyName && errors.companyName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Total Number Of Employees"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.cemployees}
                name="cemployees"
                error={!!touched.cemployees && !!errors.cemployees}
                helperText={touched.cemployees && errors.cemployees}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Projects Delivered"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.cprojects}
                name="cprojects"
                error={!!touched.cprojects && !!errors.cprojects}
                helperText={touched.cprojects && errors.cprojects}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Existing Clients"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.cclients}
                name="cclients"
                error={!!touched.cclients && !!errors.cclients}
                helperText={touched.cclients && errors.cclients}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Location"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.clocation}
                name="clocation"
                error={!!touched.clocation && !!errors.clocation}
                helperText={touched.clocation && errors.clocation}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  companyName: yup.string().required("Required"),
  cemployees: yup.number().required("Required"),
  cprojects: yup.number().required("Required"),
  cclients: yup.number().required("Required"),
  clocation: yup.string().required("Required"),
});
const initialValues = {
  companyName: "",
  cemployees: "",
  cprojects: "",
  cclients: "",
  clocation: "",
};

export default Customerform;
