import Head from "next/head";
import { Box, Container } from "@mui/material";
import { ReviewListToolbar } from "../../components/reviews/review-list-toolbar";
import { ReviewListResults } from "../../components/reviews/review-list";
import { DashboardLayout } from "../../components/dashboard-layout";

const Page = () => (
  <>
    <Head>
      <title>Reviews | Pharmacy Rome</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <ReviewListToolbar />
        <Box sx={{ mt: 3 }}>
          <ReviewListResults />
        </Box>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
