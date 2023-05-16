import Head from "next/head";
import {
  Box,
  Button,
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { Sales } from "../components/dashboard/sales";
import { CheckIn } from "../components/dashboard/check-in";
import { ScheduleRooms } from "../components/dashboard/schedule-rooms";
import { CheckOuts } from "../components/dashboard/check-outs";
import { TrafficByDevice } from "../components/dashboard/traffic-by-device";
import { DashboardLayout } from "../components/dashboard-layout";
import { NewBooking } from "../components/dashboard/new-booking";
import { useEffect } from "react";
import Router from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  // useEffect(() => {
  //   if (!localStorage.getItem("token")) {
  //     Router.push("/login");
  //   }
  // }, [localStorage.getItem("token")]);

  const logins = (values) => {
    console.log("value=>", values);
    axios
      .post("http://localhost:5000/api/v1/pharmacy/login", values)
      .then((res) => {
        if (res.data) {
          console.log("succe");
          localStorage.setItem("token", res.data.token);
          toast.success("Login Successfuly", {
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
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      //email: Yup.string().trim("Must be a valid email").max(255).required("username is required"),
      password: Yup.string().max(255).required("password is required"),
    }),
    onSubmit: async (values, action) => {
      // const credentials = { username, password };
      // const user = await axios.post("", credentials);
      logins(values);
    },
  });

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 90,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params) => `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
  ];

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];

  const [allPharmacies, setAllPharmacies] = useState([]);

  console.log("dt", allPharmacies);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/pharmacy/all")
      .then((res) => {
        if (res.data) {
          console.log("succe", res.data);
          setAllPharmacies(res.data);
        } else {
          console.log("error=>", res.data);
        }
      })
      .catch((err) => {
        console.log("error=>", err);
      });
  }, []);

  // const veryByAdmin = (id) => {
  //   console.log("id",id);
  // };

  function veryByAdmin(id) {
    axios
      .post(`http://localhost:5000/api/v1/pharmacy/verify/${id}`)
      .then((res) => {
        if (res.data) {
          console.log("succe");

          toast.success("Admin veryfy Successfuly", {
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
  }

  return (
    <>
      <Head>
        <title>Admin Dashboard | Pharmacy Rome</title>
      </Head>
      {/* <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={3} ml={1} mb={5}>
            Admin Verified Table
          </Grid>
          <Grid container spacing={1}>
            <Grid>
              <TableContainer component={Paper}>
                <Table sx={{ width: "100%" }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>id</TableCell>
                      <TableCell align="right">Pharmacy name</TableCell>
                      <TableCell align="right">Pharmacy Email</TableCell>
                      <TableCell align="right">Owner name</TableCell>
                      <TableCell align="right">Verification Status</TableCell>
                      <TableCell align="right">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {allPharmacies.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {row._id}
                        </TableCell>
                        <TableCell align="right">{row.name}</TableCell>
                        <TableCell align="right">{row.email}</TableCell>
                        <TableCell align="right">{row.isVerify}</TableCell>
                        <TableCell align="right">
                          {row.isVerify === true ? "true" : "false"}
                        </TableCell>
                        <TableCell align="right">
                          <Button onClick={() => veryByAdmin(row._id)}>Verify</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Container>
        <ToastContainer />
      </Box> */}
      <Grid container ml={5}>
      <h1>Still Development...</h1>
      </Grid>
      
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
