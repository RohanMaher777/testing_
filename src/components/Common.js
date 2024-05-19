import { Box, Button, Dialog, styled } from "@mui/material";
import graffersid from "../assets/graffersid.png";
import codeTech from "../assets/codeTech.png";
import innogent from "../assets/innogent.jpeg";

export const images = [
  graffersid,
  graffersid,
  innogent,
  codeTech,
  graffersid,
  innogent,
  codeTech,
];

export const MainContent = styled(Box)({
  "& .topBox": {
    height: "120px",
    alignItems: "center",
    borderBottom: "1px solid gainsboro",
  },
  "& .items": {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "end",
  },
  "& .label": {
    textAlign: "left",
    fontSize: "small",
    color: "#8e8e8e",
  },
  "& .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root": {
    height: "30px",
    width: "125%",
  },
  "& .icon": {
    color: "#8100c8",
  },
  "& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select":
    {
      padding: "5.5px 14px",
      minHeight: "unset",
    },
  "& .allcompanies": {
    padding: "7% 4%",
  },
  "& .companyBox": {
    boxShadow: "0 1px 8px 1px rgba(0, 0, 0, 0.2)",
    padding: "1%",
    borderRadius: "5px",
    margin: "2% 0",
  },
  "& .rateBox": {
    display: "flex",
    marginTop: "7%",
  },
  "& .rating": {
    fontWeight: "bold",
    marginRight: "2%",
  },
  "& .reviewContainer": {
    padding: "1%",
  },
});

export const StyledButton = styled(Button)({
  width: "150px",
  height: "30px",
  background: "linear-gradient(-10deg, #1300d7, #e73ce7)",
  textTransform: "capitalize",
});

export const ReviewButton = styled(Button)({
  width: "150px",
  height: "30px",
  background: "black",
  textTransform: "capitalize",
  position: "absolute",
  bottom: "5%",
  right: "5%",
  ":hover": {
    background: "black",
  },
});

export const SaveButton = styled(Button)({
  width: "100px",
  height: "30px",
  background: "linear-gradient(-10deg, #1300d7, #e73ce7)",
  textTransform: "capitalize",
  position: "absolute",
  bottom: "20px",
  left: "34%",
});

export const StyledDialog = styled(Dialog)({
  "& .MuiDialog-paper": {
    width: 350,
    height: 450,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    padding: 20,
  },
  "& .close": {
    position: "absolute",
    top: 10,
    right: "5px",
  },
  "& .starBox": {
    width: "90px",
    height: "90px",
    background: "linear-gradient(-35deg, #1300d7, #e73ce7)",
    borderRadius: "50%",
    position: "absolute",
    left: "-30px",
    top: 0,
  },
  "& .starBox2": {
    width: "90px",
    height: "90px",
    background: "#e9b2ff",
    borderRadius: "50%",
    position: "absolute",
    left: "15px",
    top: "-40px",
  },
  "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": {
    padding: "5.5px 14px",
  },
  "& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input": {
    padding: "5.5px 14px",
  },
  "& .css-154xyx0-MuiInputBase-root-MuiOutlinedInput-root": {
    padding: 0,
  },
  "& .label": {
    textAlign: "left",
    fontSize: "small",
    color: "#8e8e8e",
    marginBottom: "4px",
  },
  "& .textfield": {
    marginBottom: "5%",
  },
});
