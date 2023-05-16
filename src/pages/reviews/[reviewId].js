import Head from "next/head";
import { Box, Breadcrumbs, Container, Link, Typography } from "@mui/material";

import { useRouter } from "next/router";
import { DashboardLayout } from "../../components/dashboard-layout";

const Page = () => {
  const route = useRouter();
  const reviewId = route.query.reviewIdEdit;

  return (
    <>
      <Head>
        <title>Edit Room | Pharmacy</title>
      </Head>
      <Box
        component="main"
        A
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
        <Breadcrumbs aria-label="breadcrumb">
           
           <Link
             underline="hover"
             color="inherit"
             href="/reviews"
           >
             Reviews
           </Link>
           <Typography color="text.primary">{reviewId}</Typography>
         </Breadcrumbs>
          <Box sx={{ mt: 3 }}>
            <h1>Reply for review - {reviewId}</h1>
          </Box>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
