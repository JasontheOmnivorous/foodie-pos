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
import Link from "next/link";
import { ReactNode } from "react";

interface SideBar {
  id: number;
  name: string;
  icon: ReactNode;
  route: string;
}

const sidebarData: SideBar[] = [
  {
    id: 1,
    name: "Orders",
    icon: <LocalMallIcon sx={{ fontSize: 50, m: 2, color: "black" }} />,
    route: "/backoffice/orders",
  },
  {
    id: 2,
    name: "MenuCategories",
    icon: <Category sx={{ fontSize: 50, m: 2, color: "black" }} />,
    route: "/backoffice/menu-categories",
  },
  {
    id: 3,
    name: "Menus",
    icon: <RestaurantMenu sx={{ fontSize: 50, m: 2, color: "black" }} />,
    route: "/backoffice/menus",
  },
  {
    id: 4,
    name: "Addon Categories",
    icon: <ChromeReaderModeSharp sx={{ fontSize: 50, m: 2, color: "black" }} />,
    route: "/backoffice/addon-categories",
  },
  {
    id: 5,
    name: "Addons",
    icon: <AddReactionSharp sx={{ fontSize: 50, m: 2, color: "black" }} />,
    route: "/backoffice/addons",
  },
  {
    id: 6,
    name: "Tables",
    icon: <TableBarSharp sx={{ fontSize: 50, m: 2, color: "black" }} />,
    route: "/backoffice/tables",
  },
  {
    id: 7,
    name: "Locations",
    icon: <LocationOnSharp sx={{ fontSize: 50, m: 2, color: "black" }} />,
    route: "/backoffice/locations",
  },
  {
    id: 8,
    name: "Settings",
    icon: <Settings sx={{ fontSize: 50, m: 2, color: "black" }} />,
    route: "/backoffice/settings",
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
          <Link style={{ textDecoration: "none" }} href={item.route}>
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
              <Typography sx={{ color: "black" }}>{item.name}</Typography>
            </Box>
          </Link>
        ) : (
          <Link style={{ textDecoration: "none" }} href={item.route}>
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
              <Typography sx={{ color: "black" }}>{item.name}</Typography>
            </Box>
          </Link>
        )
      )}
    </Box>
  );
};

export default Sidebar;
