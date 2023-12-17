import "./App.css";
import Sidebar from "./Components/Sidebar";
import Home from "./Pages/Home";
import { Routes, Route } from "react-router-dom";
import Leader from "./Pages/Leader";
import Profile from "./Pages/Profile";
import Quiz from "./Pages/Quiz";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import { ToastContainer } from 'react-toastify';
import About from "./Pages/About";

function App() {
  return (
    <div className="App">
    <Sidebar/>
    <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/leaderboard" element={<Leader />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/quiz" element={<Quiz/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/about" element={<About/>} />
      </Routes>
    </div>
  );
}

export default App;
