const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");

const corsOption = {
  credentials: true,
  origin: ["http://localhost:3000"],
};
app.use(cors(corsOption));

app.use(express.json());

app.get("/companies", (req, res) => {
  const filePath = path.join(__dirname, "compData", "companies.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      res.status(500).json({ error: "Error reading file" });
      return;
    }
    res.json(JSON.parse(data));
  });
});

app.get("/companies/:id", (req, res) => {
  const companyId = req.params.id;
  const filePath = path.join(__dirname, "compData", "companies.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      res.status(500).json({ error: "Error reading file" });
      return;
    }

    try {
      const jsonData = JSON.parse(data);
      const companies = jsonData.companies;

      const company = companies.find(
        (company) => company.id === parseInt(companyId)
      );

      if (!company) {
        res.status(404).json({ error: "Company not found" });
        return;
      }

      res.json(company);
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
      res.status(500).json({ error: "Error parsing JSON" });
    }
  });
});

app.post("/companies", (req, res) => {
  const newCompany = req.body;
  const filePath = path.join(__dirname, "compData", "companies.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      res.status(500).json({ error: "Error reading file" });
      return;
    }

    const companies = JSON.parse(data);
    companies.companies.push(newCompany);

    fs.writeFile(filePath, JSON.stringify(companies, null, 2), (err) => {
      if (err) {
        console.error("Error writing file:", err);
        res.status(500).json({ error: "Error writing file" });
        return;
      }
      res.json(newCompany);
    });
  });
});

app.post("/companies/:id/reviews", (req, res) => {
  const companyId = parseInt(req.params.id);
  const newReview = req.body;
  const filePath = path.join(__dirname, "compData", "companies.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      res.status(500).json({ error: "Error reading file" });
      return;
    }

    try {
      const jsonData = JSON.parse(data);
      const companies = jsonData.companies;

      const company = companies.find((company) => company.id === companyId);

      if (!company) {
        res.status(404).json({ error: "Company not found" });
        return;
      }

      newReview.userId = company.reviews.length + 1; // Generate new userId
      newReview.reviewDate = new Date().toISOString().split("T")[0]; // Set current date

      company.reviews.push(newReview);

      fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
        if (err) {
          console.error("Error writing file:", err);
          res.status(500).json({ error: "Error writing file" });
          return;
        }
        res.json(newReview);
      });
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
      res.status(500).json({ error: "Error parsing JSON" });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
