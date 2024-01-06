import { Paper, Typography } from "@mui/material";
import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  title: string;
  href?: string;
  subtitle?: string;
}

const ItemCard = ({ icon, href, title, subtitle }: Props) => {
  if (href) {
    return (
      <Link href={href} style={{ textDecoration: "none" }}>
        <Paper
          elevation={3}
          sx={{
            width: 170,
            height: 170,
            p: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            m: 2,
          }}
        >
          {icon}
          <Typography>{title}</Typography>
          {subtitle && <Typography>{subtitle}</Typography>}
        </Paper>
      </Link>
    );
  }

  return (
    <Paper
      elevation={3}
      sx={{
        width: 170,
        height: 170,
        p: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        m: 2,
      }}
    >
      {icon}
      <Typography variant="h4">{title}</Typography>
      {subtitle && <Typography>{subtitle}</Typography>}
    </Paper>
  );
};

export default ItemCard;
