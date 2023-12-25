import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './Components/Sidebar';
import Home from './Pages/Home';
import Leader from './Pages/Leader';
import Profile from './Pages/Profile';
import Quiz from './Pages/Quiz';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import About from './Pages/About';
import QuizInstruction from './Pages/QuizInstruction';
import NotFoundPage from './Pages/NotFoundPage';
import ExamPage from './Pages/Exampage';
import Result from './Pages/Result';
import { DataProvider } from './Context/DataContext';

function App() {
  return (
    <>
      <DataProvider>
        <div className="App overflow-y-auto scroll-m-0">
          <Sidebar />
          {/* Conditionally render ToastContainer if needed */}
          {true && (
            <ToastContainer
              position="bottom-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          )}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/leaderboard" element={<Leader />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/exam/:subject/:difficulty" element={<ExamPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/result" element={<Result />} />
            <Route path="/about" element={<About />} />
            <Route path="/exam/instruction" element={<QuizInstruction />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </DataProvider>
    </>
  );
}

export default App;
