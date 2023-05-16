import { useEffect } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { Box, Button, Divider, Drawer, Typography, useMediaQuery } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { ChartBar as ChartBarIcon } from "../icons/chart-bar";
import { Cog as CogIcon } from "../icons/cog";
import { Lock as LockIcon } from "../icons/lock";
import { Selector as SelectorIcon } from "../icons/selector";
import { ShoppingBag as ShoppingBagIcon } from "../icons/shopping-bag";
import { User as UserIcon } from "../icons/user";
import { UserAdd as UserAddIcon } from "../icons/user-add";
import { Users as UsersIcon } from "../icons/users";
import { XCircle as XCircleIcon } from "../icons/x-circle";
import { Logo } from "./logo";
import { NavItem } from "./nav-item";
import BedroomChildIcon from "@mui/icons-material/BedroomChild";
import ReviewsIcon from "@mui/icons-material/Reviews";
import CollectionsIcon from "@mui/icons-material/Collections";
import Person2Icon from "@mui/icons-material/Person2";
import ListAltIcon from "@mui/icons-material/ListAlt";
import LoginIcon from '@mui/icons-material/Login';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

const items = [

  {
    href: "/tmanager-list",
    icon: <FormatListBulletedIcon fontSize="small" />,
    title: "TManager List",
  },


  {
    href: "/create-school",
    icon: <AddCircleOutlineIcon fontSize="small" />,
    title: "Create School",
  },

  

  // {
  //   href: "/account",
  //   icon: <Person2Icon fontSize="small" />,
  //   title: "Self Employee",
  // },
  {
    href: "/login",
    icon: <LoginIcon fontSize="small" />,
    title: "Login",
  },


  // {
  //   href: "/account",
  //   icon: <Person2Icon fontSize="small" />,
  //   title: "Hotel profile",
  // },
  // {
  //   href: "/settings",
  //   icon: <CollectionsIcon fontSize="small" />,
  //   title: "Gallery",
  // },
  // {
  //   href: "/login",
  //   icon: <LockIcon fontSize="small" />,
  //   title: "Login",
  // },
  // {
  //   href: "/features",
  //   icon: <ListAltIcon fontSize="small" />,
  //   title: "facility",
  // },
  // {
  //   href: "/register",
  //   icon: <UserAddIcon fontSize="small" />,
  //   title: "Register",
  // },
  // {
  //   href: "/404",
  //   icon: <XCircleIcon fontSize="small" />,
  //   title: "Error",
  // },
];

export const DashboardSidebar = (props) => {
  const { open, onClose } = props;
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );

  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div>
          <Box sx={{ p: 3 }}>
            {/* <NextLink href="/" passHref>
              <a>
                <Logo
                  sx={{
                    height: 42,
                    width: 42,
                  }}
                />

              </a>
            </NextLink> */}
            <h3>SLC Dashboard</h3>
          </Box>
          <Box sx={{ px: 2 }}>
            <Box
              sx={{
                alignItems: "center",
                backgroundColor: "rgba(255, 255, 255, 0.04)",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                px: 3,
                py: "11px",
                borderRadius: 1,
              }}
            >
              <div>
                <Typography color="inherit" variant="subtitle1">
                  CrickSLeven
                </Typography>
                {/* <Typography color="neutral.400" variant="body2">
                  Username
                </Typography> */}
              </div>
            </Box>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: "#2D3748",
            my: 3,
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => (
            <NavItem key={item.title} icon={item.icon} href={item.href} title={item.title} />
          ))}
        </Box>
        <Divider sx={{ borderColor: "#2D3748" }} />
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.900",
            color: "#FFFFFF",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
