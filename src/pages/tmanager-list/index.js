import Head from "next/head";
import { Backdrop, Box, CircularProgress, Container } from "@mui/material";
import { DashboardLayout } from "../../components/dashboard-layout";
import { TManagerListResults } from "../../components/tmanager-list/tmanager-list";
import { TManagerListToolbar } from "../../components/tmanager-list/tmanager-list-toolbar";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const Page = () => {
  const router = useRouter();

  const slcid = {
    slcid: localStorage.getItem("slcid"),
  };

  const [autherisedornot, setAutherizedorNot] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setTimeout(() => {
      setOpen(false);
    }, 1000);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  //Autherize this page

  const authfun = async () => {
    handleToggle();
    const data = axios
      .post("http://localhost:5000/api/v1/TManager/veryfy", slcid, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log("You Are Autherized !!");
        console.log("gg", res.data);
        // if (res.data !== "you are verified") {
        //   router.push("/login");
        // }
        setAutherizedorNot(true);

        //Router.push("/verified.html");
        //Router.push("/").catch(console.error);
        //ocalStorage.setItem("token", res.data.token);
        //handleClose();
      })
      .catch((error) => {
        // console.log("You Are Not Autherized !!")

        router.push("/login");
        setAutherizedorNot(false);
      });

    handleClose();
  };

  useEffect(() => {
    authfun();
  }, []);

  return (
    <>
      {autherisedornot && (
        <>
          <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
            <CircularProgress color="inherit" />
          </Backdrop>
          <Head>
            <title>Home</title>
          </Head>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              py: 8,
            }}
          >
            <Container maxWidth={false}>
              <TManagerListToolbar />
              <Box sx={{ mt: 3 }}>
                <TManagerListResults />
              </Box>
            </Container>
          </Box>
        </>
      )}
    </>
  );
};
Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
