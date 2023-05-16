import { Doughnut } from "react-chartjs-2";
import { Box, Card, CardContent, CardHeader, Divider, Typography, useTheme } from "@mui/material";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import GroupIcon from "@mui/icons-material/Group";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PersonIcon from "@mui/icons-material/Person";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import SchoolIcon from "@mui/icons-material/School";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import EmojiFlagsIcon from "@mui/icons-material/EmojiFlags";

export const TrafficByDevice = (props) => {
  const theme = useTheme();

  const data = {
    datasets: [
      {
        data: [63, 15, 23, 10, 7, 5, 8, 4, 2],
        backgroundColor: [
          "#3F51B5",
          "#E53935",
          "#FB8C00",
          "#4CAF50",
          "#9C27B0",
          "#03A9F4",
          "#F44336",
          "#FFEB3B",
          "#9E9E9E",
        ],
        borderWidth: 2,
        borderColor: "#FFFFFF",
        hoverBorderColor: "#FFFFFF",
      },
    ],
    labels: [
      "Leisure travelers",
      "Business travelers",
      "Group travelers",
      "Family travelers",
      "Solo travelers",
      "Senior travelers",
      "Student travelers",
      "Medical travelers",
      "Religious travelers",
    ],
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false,
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: "index",
      titleFontColor: theme.palette.text.primary,
    },
  };

  const hotel_visitor_categories = [
    {
      title: "Leisure travelers",
      value: 63,
      icon: BeachAccessIcon,
      color: "#3F51B5",
    },
    {
      title: "Business travelers",
      value: 15,
      icon: BusinessCenterIcon,
      color: "#E53935",
    },
    {
      title: "Group travelers",
      value: 23,
      icon: GroupIcon,
      color: "#FB8C00",
    },
    {
      title: "Family travelers",
      value: 10,
      icon: PeopleAltIcon,
      color: "#4CAF50",
    },
    {
      title: "Solo travelers",
      value: 7,
      icon: PersonIcon,
      color: "#9C27B0",
    },
    {
      title: "Senior travelers",
      value: 5,
      icon: AccessibilityNewIcon,
      color: "#03A9F4",
    },
    {
      title: "Student travelers",
      value: 8,
      icon: SchoolIcon,
      color: "#F44336",
    },
    {
      title: "Medical travelers",
      value: 4,
      icon: LocalHospitalIcon,
      color: "#FFEB3B",
    },
    {
      title: "Religious travelers",
      value: 2,
      icon: EmojiFlagsIcon,
      color: "#9E9E9E",
    },
  ];

  return (
    <Card {...props}>
      <CardHeader title="Hotel Visitors Categories" />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 300,
            position: "relative",
          }}
        >
          <Doughnut data={data} options={options} />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pt: 2,
          }}
        >
          {hotel_visitor_categories.map(({ color, icon: Icon, title, value }) => (
            <Box
              key={title}
              sx={{
                p: 1,
                textAlign: "center",
              }}
            >
              <Icon color="action" />
              <Typography color="textPrimary" variant="body1">
                {title}
              </Typography>
              <Typography style={{ color }} variant="h4">
                {value}%
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};
