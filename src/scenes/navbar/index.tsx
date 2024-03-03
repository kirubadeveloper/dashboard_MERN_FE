import { useState } from "react";
import { Link } from "react-router-dom";
// import PixIcon from "@mui/icons-material/Pix";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import { Box, Typography } from "@mui/material";
import FlexBetween from "@/components/FlexBetween";

type Props = {};

// green - "#5BB381" // orange - "#E3834C"
const Navbar = (props: Props) => {
  const [selected, setSelected] = useState("dashboard");
  return (
    <FlexBetween mb="0.25rem" p="0.5rem 0rem" color="white">
      {/* LEFT SIDE */}
      <FlexBetween gap="0.75rem">
        <GraphicEqIcon sx={{ fontSize: "35px", color: "#E3834C" }} />
        <Typography variant="h4" fontSize="25px" color="#5BB381">
          <span style={{ color: "white" }}>Smart</span>Finance
        </Typography>
      </FlexBetween>

      {/* RIGHT SIDE */}
      <FlexBetween gap="2rem">
        <Box sx={{ "&:hover": { color: "#f0f0f3" } }}>
          <Link
            to="/"
            onClick={() => setSelected("dashboard")}
            style={{
              color: selected === "dashboard" ? "inherit" : "#6b6d74",
              textDecoration: "inherit",
              fontSize: "20px",
            }}
          >
            Dashboard
          </Link>
        </Box>
        <Box sx={{ "&:hover": { color: "#f0f0f3" } }}>
          <Link
            to="/predictions"
            onClick={() => setSelected("predictions")}
            style={{
              color: selected === "predictions" ? "inherit" : "#6b6d74",
              textDecoration: "inherit",
              fontSize: "20px",
            }}
          >
            Predictions
          </Link>
        </Box>
      </FlexBetween>
    </FlexBetween>
  );
};

export default Navbar;
