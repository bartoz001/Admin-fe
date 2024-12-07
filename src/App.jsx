import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Request from "./components/Request";
import Admin from "./components/Admin";
import { Toaster } from "react-hot-toast";
import Adminlayout from "./layouts/Admin";
import User from "./layouts/User";
import Public from "./layouts/Public";
import Editprofile from "./components/Editprofile";
import RequestTable from "./components/RequestTable";

function App() {
  return (
    <>
      <Router>
        <Toaster />
        <Navbar />
        <Routes>
          <Route path="/Admin" element={<Adminlayout />}>
            <Route index element={<Admin />} />
          </Route>
          <Route path="/" element={<User />}>
            <Route index element={<Home />} />
            <Route path="/profile" element={<Editprofile/>} />
          </Route>
          <Route path="/" element={<Public />}>
            <Route path="/Login" element={<Login />} />
            <Route path="/Request" element={<Request />} />
          </Route>
          <Route path="/RequestUser" element={<RequestTable/>} />
      
        </Routes>
      </Router>
    </>
  );
}

export default App;
