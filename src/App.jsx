import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./pages/Home";
import JobsDescription from "./pages/JobsDescription";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);
  useEffect(() => {
    console.log("Currrrrrrrrrrr", currentUser);
    if (Object.keys(currentUser).length > 1) {
      setLoggedIn(true);
    }
  }, [currentUser]);
  return (
    <Router>
      <div className="flex flex-col justify-between min-h-screen gap-3 sm:gap-8">
        <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            exact
            index
            path="/home"
            element={loggedIn ? <Home /> : <Navigate replace to="/login" />}
          />
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route
            path="/job_description"
            element={
              loggedIn ? <JobsDescription /> : <Navigate replace to="/login" />
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
