import React from "react";
import InfoIcon from "@mui/icons-material/Info";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonOffIcon from "@mui/icons-material/PersonOff";

export const SidebarData = [
  {
    title: "My Details",
    icon: <InfoIcon />,
    link: "/MyDetails",
  },
  {
    title: "Dowloaded Images",
    icon: <ImageSearchIcon />,
    link: "/DownloadedImages",
  },
  {
    title: "SignOut",
    icon: <LogoutIcon />,
    link: "/SignOut",
  },
  {
    title: "Delete Account",
    icon: <PersonOffIcon />,
    link: "/DeleteAccount",
  },
];
