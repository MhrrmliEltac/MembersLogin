import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Pages/Home";
import Events from "./components/Pages/Events";
import { Toaster } from "react-hot-toast";
import LoginMembers from "./components/auth/LoginMembers";
import Members from "./components/Pages/Members";
import UserDetail from "./components/Pages/UserDetail";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/login" element={<LoginMembers />} />
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/members" element={<Members />} />
        <Route path="/members/:id" element={<UserDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
