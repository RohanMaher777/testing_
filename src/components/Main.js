import React, { useEffect, useState } from "react";
import { Close, LocationOnOutlined, Star } from "@mui/icons-material";
import {
  Box,
  Container,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import Sort from "./Sort";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  MainContent,
  ReviewButton,
  SaveButton,
  StyledButton,
  StyledDialog,
  images,
} from "./Common";

const Main = () => {
  const [data, setData] = useState([]);
  const [selectedValue, setSelectedValue] = useState("Name");
  const [addCompany, setAddCompany] = useState(false);
  const [newCompany, setNewCompany] = useState({
    Name: "",
    logo: "",
    address: "",
    date: "",
    rating: 0,
    reviews: [],
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/companies")
      .then((response) => {
        setData(response.data.companies);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);
  const handleOpenAddCompany = () => {
    setAddCompany(true);
  };
  const handleCloseAddCompany = () => {
    setAddCompany(false);
  };
  const handleValueChange = (val) => {
    setSelectedValue(val);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCompany({ ...newCompany, [name]: value });
  };
  const handleSaveCompany = () => {
    axios
      .post("http://localhost:5000/companies", {
        ...newCompany,
        id: data.length + 1,
        // logo: graffersid,
      })
      .then((response) => {
        setData([...data, response.data]);
        handleCloseAddCompany();
      })
      .catch((error) => {
        console.error("There was an error saving the company!", error);
      });
  };

  return (
    <Container>
      <MainContent>
        <Grid container className="topBox">
          <Grid item xs={6} className="items">
            <Box>
              <Typography className="label">Select City</Typography>
              <TextField
                size="small"
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <LocationOnOutlined className="icon" />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <StyledButton variant="contained">Find Company</StyledButton>
          </Grid>
          <Grid item xs={6} className="items">
            <StyledButton onClick={handleOpenAddCompany} variant="contained">
              + Add Company
            </StyledButton>
            <Box style={{ width: "40%" }}>
              <Typography className="label">Sort:</Typography>
              <Sort
                selectedValue={selectedValue}
                handleChange={handleValueChange}
              />
            </Box>
          </Grid>
        </Grid>
        <Box className="allcompanies">
          <Typography className="label">Result Found</Typography>
          {data.map((data) => (
            <Box key={data.id} className="companyBox">
              <Grid container>
                <Grid
                  item
                  xs={2}
                  style={{
                    display: "flex",
                    justifyContent: "start",
                    padding: "1%",
                  }}
                >
                  <img
                    style={{ borderRadius: "5px", width: "120px" }}
                    src={images[data.id]}
                    alt="logo"
                  />
                </Grid>
                <Grid
                  item
                  xs={8}
                  style={{
                    textAlign: "left",
                    padding: "1% 0",
                  }}
                >
                  <Typography
                    style={{ fontWeight: "bold", marginBottom: "5px" }}
                  >
                    {data.Name}
                  </Typography>
                  <Typography className="label">
                    <LocationOnOutlined style={{ fontSize: "12px" }} />{" "}
                    {data.address}
                  </Typography>
                  <Box className="rateBox">
                    <Typography className="rating">{data.rating}</Typography>
                    <Rating
                      name="read-only"
                      value={data.rating}
                      precision={0.5}
                      emptyIcon={<Star />}
                      readOnly
                    />
                  </Box>
                </Grid>
                <Grid item xs={2} style={{ position: "relative" }}>
                  <Typography className="label" style={{ textAlign: "right" }}>
                    Founded on {data.date}
                  </Typography>
                  <Link to={{ pathname: `/details/${data.id}` }}>
                    <ReviewButton variant="contained">
                      Detail Review
                    </ReviewButton>
                  </Link>
                </Grid>
              </Grid>
            </Box>
          ))}
        </Box>
      </MainContent>
      <StyledDialog open={addCompany} onClose={handleCloseAddCompany}>
        <Box className="starBox2" />
        <Box className="starBox" />
        <DialogActions onClick={handleCloseAddCompany}>
          <Close fontSize="small" className="close" />
        </DialogActions>
        <DialogTitle fontWeight="bold">Add Company</DialogTitle>
        <DialogContent>
          <Grid item xs={12}>
            <Typography className="label">Company name</Typography>
            <TextField
              name="Name"
              value={newCompany.Name}
              onChange={handleInputChange}
              className="textfield"
              fullWidth
              placeholder="Enter..."
            />
          </Grid>
          <Grid item xs={12}>
            <Typography className="label">Location</Typography>
            <TextField
              className="textfield"
              fullWidth
              name="address"
              value={newCompany.address}
              onChange={handleInputChange}
              placeholder="Select Location"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <LocationOnOutlined />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography className="label">Founded on</Typography>
            <TextField
              type="date"
              className="textfield"
              fullWidth
              name="date"
              value={newCompany.date}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography className="label">Rating</Typography>
            <TextField
              className="textfield"
              fullWidth
              name="rating"
              value={newCompany.rating}
              onChange={handleInputChange}
              placeholder="Rating"
            />
          </Grid>
          <Grid item xs={12}>
            <Typography className="label">Upload Logo</Typography>
            <input type="file" accept="image/*" />
          </Grid>
          <SaveButton variant="contained" onClick={handleSaveCompany}>
            Save
          </SaveButton>
        </DialogContent>
      </StyledDialog>
    </Container>
  );
};

export default Main;
