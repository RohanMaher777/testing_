import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Details from "./components/Details";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:companyID" element={<Details />} />
        {/* <Home /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
