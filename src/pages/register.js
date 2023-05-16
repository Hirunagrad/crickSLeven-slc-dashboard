import Head from "next/head";
import NextLink from "next/link";
import Router from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const signup = (values) => {
    console.log("newvalue=>", values);
    axios
      .post("http://localhost:5000/api/v1/pharmacy/create", values)
      .then((res) => {
        if (res.data) {
          console.log("succe");
          //localStorage.setItem("token", res.data.token);
          toast.success("SignUp Successfuly", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          setTimeout(() => {
            Router.push("/");
          }, 2000);
        } else {
          console.log("error=>", res.data);
        }
      })
      .catch((err) => {
        console.log("error=>", err);
      });
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      address: "",
      contact: "",
      password: "",
      district:"colombo",
      pharmacy_license_number: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().max(255).required("Hotel name is required"),
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      // address: Yup.string().max(255).required("Address is required"),
      // password: Yup.string().max(255).required("Password is required"),
      //contact: Yup.number().min(10).required("Contact number is required"),
      // ownerName: Yup.number().min(10).required("Owner name is required"),
      // ownerNic: Yup.number().min(10).required("ownerNic is required"),
      // maplink: Yup.number().min(10).required("Owner name is required"),
      // location: Yup.number().min(10).required("Location name is required"),
      //Pharmacy_license_number: Yup.number().min(10).required("Pharmacy_license_number is required"),
    }),
    onSubmit: (values, action) => {
      //Router.push("/");
      signup(values);
      console.log("val", values);
    },
  });

  return (
    <>
      <Head>
        <title>Admin Register | Pharmacy</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="sm" style={{ marginTop: "50px", marginBottom: "50px" }}>
          <NextLink href="/" passHref>
            <Button component="a" startIcon={<ArrowBackIcon fontSize="small" />}>
              Admin Dashboard
            </Button>
          </NextLink>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h4">
                Create a new account
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Use your hotel email to create a new Pharmacy account
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.name && formik.errors.name)}
              fullWidth
              helperText={formik.touched.name && formik.errors.name}
              label="Pharmacy Name"
              margin="normal"
              name="name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Email Address"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
              variant="outlined"
            />{" "}
            <TextField
              error={Boolean(formik.touched.location && formik.errors.location)}
              fullWidth
              helperText={formik.touched.location && formik.errors.location}
              label="Address"
              margin="normal"
              name="address"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.location}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.contact && formik.errors.contact)}
              fullWidth
              helperText={formik.touched.contact && formik.errors.contact}
              type="number"
              label="Contact"
              margin="normal"
              name="contact"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.contact}
              variant="outlined"
            />
            <TextField
              error={Boolean(
                formik.touched.pharmacy_license_number && formik.errors.pharmacy_license_number
              )}
              fullWidth
              helperText={
                formik.touched.pharmacy_license_number && formik.errors.pharmacy_license_number
              }
              label="pharmacy license number"
              margin="normal"
              name="pharmacy_license_number"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.pharmacy_license_number}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />
            <TextField
              //error={Boolean(formik.touched.ownerName && formik.errors.ownerName)}
              fullWidth
              //helperText={formik.touched.ownerName && formik.errors.ownerName}
              label="Re-enter password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.ownerName}
              variant="outlined"
            />
            {Boolean(formik.touched.policy && formik.errors.policy) && (
              <FormHelperText error>{formik.errors.policy}</FormHelperText>
            )}
            <Box sx={{ py: 2 }}>
              <Button color="primary" fullWidth size="large" type="submit" variant="contained">
                Sign Up Now
              </Button>
            </Box>
            <Typography color="textSecondary" variant="body2">
              Have an account?{" "}
              <NextLink href="/login" passHref>
                <Link variant="subtitle2" underline="hover">
                  Sign In
                </Link>
              </NextLink>
            </Typography>
          </form>
        </Container>
        <ToastContainer />
      </Box>
    </>
  );
};

export default Register;
