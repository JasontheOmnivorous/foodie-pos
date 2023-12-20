import {
  AddReactionSharp,
  Category,
  ChromeReaderModeSharp,
  LocationOnSharp,
  RestaurantMenu,
  Settings,
  TableBarSharp,
} from "@mui/icons-material";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

interface SideBar {
  id: number;
  name: string;
  icon: ReactNode;
}

const sidebarData: SideBar[] = [
  {
    id: 1,
    name: "Orders",
    icon: <LocalMallIcon sx={{ fontSize: 50, m: 2 }} />,
  },
  {
    id: 2,
    name: "MenuCategories",
    icon: <Category sx={{ fontSize: 50, m: 2 }} />,
  },
  {
    id: 3,
    name: "Menus",
    icon: <RestaurantMenu sx={{ fontSize: 50, m: 2 }} />,
  },
  {
    id: 4,
    name: "Addon Categories",
    icon: <ChromeReaderModeSharp sx={{ fontSize: 50, m: 2 }} />,
  },
  {
    id: 5,
    name: "Addons",
    icon: <AddReactionSharp sx={{ fontSize: 50, m: 2 }} />,
  },
  {
    id: 6,
    name: "Tables",
    icon: <TableBarSharp sx={{ fontSize: 50, m: 2 }} />,
  },
  {
    id: 7,
    name: "Locations",
    icon: <LocationOnSharp sx={{ fontSize: 50, m: 2 }} />,
  },
  {
    id: 8,
    name: "Settings",
    icon: <Settings sx={{ fontSize: 50, m: 2 }} />,
  },
];

const Sidebar = () => {
  return (
    <Box
      sx={{
        width: 300,
        height: "100vlh",
        boxShadow: 5,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        borderTopRightRadius: 20,
      }}
    >
      {sidebarData.map((item) =>
        item.name === "Settings" ? (
          <Box
            key={item.id}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: 2,
              borderTop: "1px solid grey",
              m: 2,
              width: "70%",
            }}
          >
            {item.icon}
            <Typography>{item.name}</Typography>
          </Box>
        ) : (
          <Box
            key={item.id}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: 2,
              m: 2,
            }}
          >
            {item.icon}
            <Typography>{item.name}</Typography>
          </Box>
        )
      )}
    </Box>
  );
};

export default Sidebar;
