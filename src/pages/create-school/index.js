import Head from "next/head";
import { Box, Container } from "@mui/material";
import { DashboardLayout } from "../../components/dashboard-layout";
import { HotelListResults } from "../../components/hotels/hotel-list";
import { HotelListToolbar } from "../../components/hotels/hotel-list-toolbar";

import { MatchCreateToolbar } from "../../components/create-school/school-create-toolbar";
import { MtchCreateResults } from "../../components/create-school/school-create";

import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
//Autherize this page

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
          <Head>
            <title>Match Create</title>
          </Head>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              py: 8,
            }}
          >
            <Container maxWidth={false}>
              <MatchCreateToolbar />
              <Box sx={{ mt: 3 }}>
                <MtchCreateResults />
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
