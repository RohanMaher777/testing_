import { Search, StarPurple500Outlined } from "@mui/icons-material";
import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import React from "react";

const Head = styled(Box)({
  "& .outer": {
    height: "70px",
    boxShadow: "0 1px 8px 1px rgba(0, 0, 0, 0.2)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  "& .rightSection": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 6%",
  },
  "& .reviewRate": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0 10%",
  },
  "& .logo": {
    fontSize: "larger",
  },
  "& .review": {
    color: "#656161",
    marginLeft: "8px",
  },
  "& .and": {
    color: "#8100c8",
  },
  "& .rate": {
    fontWeight: 700,
  },
  "& .starBox": {
    width: "40px",
    height: "40px",
    background: "linear-gradient(-35deg, #1300d7, #e73ce7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
  },
});

const Header = () => {
  return (
    <Head>
      <Grid container className="outer">
        <Grid item xs={6} className="rightSection">
          <Box className="reviewRate">
            <Box className="starBox">
              <StarPurple500Outlined style={{ color: "white" }} />
            </Box>
            <Typography className="logo review">Review</Typography>
            <Typography className="logo and">&</Typography>
            <Typography className="logo rate">RATE</Typography>
          </Box>
        </Grid>
        <Grid item xs={6} className="rightSection">
          <TextField
            size="small"
            label="Search..."
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <Search className="and" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Typography>SignUp</Typography>
          <Typography>Login</Typography>
        </Grid>
      </Grid>
    </Head>
  );
};

export default Header;
