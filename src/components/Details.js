import { Close, LocationOnOutlined, Star } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Container,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Rating,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import avatar from "../assets/avatar.jpeg";
import {
  MainContent,
  SaveButton,
  images,
  StyledDialog,
  StyledButton,
} from "./Common";

const Details = () => {
  const { companyID } = useParams();
  const [addReview, setAddReview] = useState(false);
  const [reqData, setReqData] = useState(null);
  const [newReview, setNewReview] = useState({
    userName: "",
    comment: "",
    rating: 0,
  });

  const handleOpenAddReview = () => {
    setAddReview(true);
  };
  const handleCloseAddReview = () => {
    setAddReview(false);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (event, newValue) => {
    setNewReview((prev) => ({ ...prev, rating: newValue }));
  };

  const handleSaveReview = () => {
    axios
      .post(`http://localhost:5000/companies/${companyID}/reviews`, newReview)
      .then((response) => {
        setReqData((prev) => ({
          ...prev,
          reviews: [...prev.reviews, response.data],
        }));
        handleCloseAddReview();
      })
      .catch((error) => {
        console.error("There was an error saving the review!", error);
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/companies/${companyID}`)
      .then((response) => {
        setReqData(response.data);
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the company detailed data!",
          error
        );
      });
  }, [companyID]);

  if (!reqData)
    return (
      <div>
        <h1>LOADING....</h1>
      </div>
    );

  return (
    <Container>
      <MainContent>
        <Box className="companyBox">
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
                src={images[companyID]}
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
              <Typography style={{ fontWeight: "bold", marginBottom: "5px" }}>
                {reqData.Name}
              </Typography>
              <Typography className="label">
                <LocationOnOutlined style={{ fontSize: "12px" }} />{" "}
                {reqData.address}
              </Typography>
              <Box className="rateBox">
                <Typography className="rating">{reqData.rating}</Typography>
                <Rating
                  name="read-only"
                  value={reqData.rating}
                  precision={0.5}
                  emptyIcon={<Star />}
                  readOnly
                />
              </Box>
            </Grid>
            <Grid item xs={2} style={{ position: "relative" }}>
              <Typography className="label" style={{ textAlign: "right" }}>
                Founded on {reqData.date}
              </Typography>
              <Link to={{ pathname: `/details/${reqData.id}` }}>
                <StyledButton
                  style={{ position: "absolute", bottom: "5%", right: "5%" }}
                  variant="contained"
                  onClick={handleOpenAddReview}
                >
                  + Add Review
                </StyledButton>
              </Link>
            </Grid>
          </Grid>
          <Typography className="label">Result Found</Typography>
          {reqData.reviews.map((rev) => (
            <Grid key={rev.userId} container className="reviewContainer">
              <Grid item xs={1}>
                <Avatar alt="Remy Sharp" src={avatar} />
              </Grid>
              <Grid item xs={11}>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography
                      style={{ fontWeight: "bold", marginBottom: "5px" }}
                    >
                      {rev.userName}
                    </Typography>
                    <Typography className="label">{rev.reviewDate}</Typography>
                  </Grid>
                  <Grid
                    xs={6}
                    style={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <Rating
                      name="read-only"
                      value={rev.rating}
                      precision={0.5}
                      emptyIcon={<Star />}
                      readOnly
                    />
                  </Grid>
                </Grid>
                <Box style={{ width: "100%" }}>{rev.comment}</Box>
              </Grid>
            </Grid>
          ))}
        </Box>
      </MainContent>
      <StyledDialog open={addReview} onClose={handleCloseAddReview}>
        <Box className="starBox2" />
        <Box className="starBox" />
        <DialogActions>
          <Close fontSize="small" className="close" />
        </DialogActions>
        <DialogTitle fontWeight="bold">Add Review</DialogTitle>
        <DialogContent>
          <Grid item xs={12}>
            <Typography className="label">Full Name</Typography>
            <TextField
              name="userName"
              className="textfield"
              fullWidth
              placeholder="Enter"
              value={newReview.userName}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography className="label">Subject</Typography>
            <TextField
              className="textfield"
              fullWidth
              name="address"
              placeholder="Enter"
            />
          </Grid>
          <Grid item xs={12}>
            <Typography className="label">Enter Your Review</Typography>
            <TextareaAutosize
              cols={40}
              minRows={5}
              className="textfield"
              fullWidth
              name="comment"
              placeholder="Description"
              value={newReview.comment}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography style={{ fontWeight: "bold" }}>Rating</Typography>
            <Rating
              name="rating"
              value={newReview.rating}
              precision={0.5}
              emptyIcon={<Star />}
              onChange={handleRatingChange}
            />
          </Grid>
          <SaveButton variant="contained" onClick={handleSaveReview}>
            Save
          </SaveButton>
        </DialogContent>
      </StyledDialog>
    </Container>
  );
};

export default Details;
