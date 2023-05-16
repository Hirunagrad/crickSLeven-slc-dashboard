import Head from "next/head";
import Router from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Container, Grid, LinearProgress, TextField, Typography } from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

const Login = () => {
  const [loading, setLoading] = useState(false);

  const logins = (values) => {
    console.log("value=>", values);
    axios
      .post("http://localhost:5000/api/v1/slc/login", values)
      .then((res) => {
        if (res.data && res.data.token) {
          console.log("token", res.data.token);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("slcid", res.data.data._id);
          toast.success("Login Successfuly as Tmanager", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            //theme: "colored",
          });
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
      password: "",
    },
    validationSchema: Yup.object({
      //email: Yup.string().trim("Must be a valid email").max(255).required("username is required"),
      password: Yup.string().max(255).required("password is required"),
    }),
    onSubmit: async (values, action) => {
      setLoading(true);
      // const credentials = { username, password };
      // const user = await axios.post("", credentials);
      console.log({ values });
      logins(values);
      setTimeout(() => {
        Router.push("/tmanager-list");
        setLoading(false);
      }, 2000);
    },
  });

  return (
    <>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="sm" sx={{ position: "relative", height: "300px" }}>
          <ToastContainer />
          <form onSubmit={formik.handleSubmit}>
            <Box
              sx={{
                pb: 1,
                pt: 3,
              }}
            >
              <Typography align="center" color="textSecondary" variant="body1">
                Login TManager
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.username && formik.errors.username)}
              fullWidth
              helperText={formik.touched.username && formik.errors.username}
              label="username"
              margin="normal"
              name="name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.name}
              variant="outlined"
              placeholder="Username"
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
              placeholder="Password"
            />

            <Button sx={{marginTop:"30px"}} fullWidth color="primary" size="large" type="submit" variant="contained">
              Sign In Now
            </Button>

            {loading && (
              <Box mt={3} sx={{ width: "100%" }}>
                <LinearProgress />
              </Box>
            )}
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Login;
