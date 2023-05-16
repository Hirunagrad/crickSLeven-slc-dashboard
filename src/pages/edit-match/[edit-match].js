import Head from "next/head";
import { Box, Container } from "@mui/material";
import { DashboardLayout } from "../../components/dashboard-layout";
import { HotelListResults } from "../../components/hotels/hotel-list";
import { HotelListToolbar } from "../../components/hotels/hotel-list-toolbar";

import { MatchCreateToolbar } from "../../components/create-match/match-create-toolbar";
import { MtchCreateResults } from "../../components/create-match/match-create";
import { MatchListResults } from "../../components/match-list/match-list";
import { MatchListToolbar } from "../../components/match-list/match-list-toolbar";
import { MtchEditResults } from "../../components/match-edit/match-edit";
import { MatchEditToolbar } from "../../components/match-edit/match-edit-toolbar";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const Page = () => {
  const router = useRouter();
  const tmanid = {
    tmanagerid: localStorage.getItem("tmanagerid"),
  };
  const [autherisedornot, setAutherizedorNot] = useState(false);

  const authfun = async () => {
    const data = axios
      .post("http://localhost:5000/api/v1/match/veryfyTmanager", tmanid, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log("You Are Autherized !!");
        console.log("gg", res.data);
        if (res.data !== "you are verified") {
          router.push("/login");
        }
        setAutherizedorNot(true);

        //Router.push("/verified.html");
        //Router.push("/").catch(console.error);
        //ocalStorage.setItem("token", res.data.token);
        //handleClose();
      })
      .catch((error) => {
        // console.log("You Are Not Autherized !!")
        //newauthvar = console.log(error);
        router.push("/login");
        setAutherizedorNot(false);
      });
  };

  useEffect(() => {
    authfun();
  }, []);

  return (
    <>
      {autherisedornot && (
        <>
          <Head>
            <title>Match Edit</title>
          </Head>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              py: 8,
            }}
          >
            <Container maxWidth={false}>
              <MatchEditToolbar />
              <Box sx={{ mt: 3 }}>
                <MtchEditResults />
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
