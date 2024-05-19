import { FormControl, MenuItem, Select } from "@mui/material";
import React from "react";

const Sort = ({ selectedValue, handleChange }) => {
  const data = ["Name", "Average", "Rating", "Location"];
  return (
    <div>
      <FormControl fullWidth>
        <Select
          value={selectedValue}
          onChange={(e) => handleChange(e.target.value)}
        >
          {data.map((data) => (
            <MenuItem value={data}>{data}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default Sort;
