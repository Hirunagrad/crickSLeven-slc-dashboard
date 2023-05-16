import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  LinearProgress,
  TextField,
} from "@mui/material";
import { useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

import {
  DatePicker,
  DateTimePicker,
  DesktopDatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import dayjs from "dayjs";

const states = [
  {
    value: "alabama",
    label: "Alabama",
  },
  {
    value: "new-york",
    label: "New York",
  },
  {
    value: "san-francisco",
    label: "San Francisco",
  },
];

export const MtchCreateResults = (props) => {
  const [loading, setLoading] = useState(false);

  const [value, setValue] = useState(dayjs(new Date()));
  const formattedValue = dayjs(value).format("YYYY-MM-DD");
  console.log({ formattedValue });

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const [school, setSchool] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/school/");
        console.log("dt", response.data);
        setSchool(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const matchCreate = (values) => {
    console.log("log data", values);
    const data = axios
      .post("http://localhost:5000/api/v1/school", values, {
        // headers: {
        //   Authorization: `Bearer ${localStorage.getItem("token")}`,
        // },
      })
      .then((res) => {
        console.log(res);
        toast.success("School create succesful !!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        //Router.push("/verified.html");
        //Router.push("/").catch(console.error);
        //ocalStorage.setItem("token", res.data.token);
      });
  };

  const matchTypes = [
    {
      name: "t20",
    },
    {
      name: "odi",
    },
    {
      name: "t10",
    },
  ];

  const formik = useFormik({
    initialValues: {
      name: "",

      email: "",

      address: "",
      passoword: "",
      district: "",

      //tmanagerid: localStorage.getItem("tmanagerid"),
    },
    validationSchema: Yup.object({
      // name: Yup.string().max(255).required("Hotel name is required"),
      // email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      // //address: Yup.string().max(255).required("Address is required"),
      // //contact: Yup.number().min(10).required("Contact number is required"),
      // //vat: Yup.string().max(255).required("Contact is required"),
      // //businessRegNumber: Yup.string().max(255).required("Business Registration Number is required"),
      // password: Yup.string().max(255).required("Password is required"),
      // //policy: Yup.boolean().oneOf([true], "This field must be checked"),
    }),
    onSubmit: (values) => {
      setLoading(true);
      matchCreate(values);
      console.log(values);
      setTimeout(() => {
        //Router.push("/");
        setLoading(false);
      }, 2000);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Card>
        <ToastContainer />
        <CardHeader subheader="The information can be created" title="School" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="name"
                name="name"
                required
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.name}
                //defaultValue={"Ananda College"}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="email"
                type="email"
                name="email"
                required
                InputLabelProps={{ shrink: true }}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.email}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                InputLabelProps={{ shrink: true }}
                required
                variant="outlined"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.address}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="password"
                name="password"
                type="passowrd"
                required
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.passoword}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="district"
                name="district"
                required
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.district}
              />
            </Grid>

            {loading && (
              <>
                <Box mx={4} mt={3} sx={{ width: "100%" }}>
                  <LinearProgress />
                </Box>
              </>
            )}
          </Grid>
        </CardContent>
        <Divider />

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button
            color="primary"
            //disabled={formik.isSubmitting}

            size="large"
            type="submit"
            variant="contained"
          >
            create school
          </Button>
        </Box>
      </Card>
    </form>
  );
};
