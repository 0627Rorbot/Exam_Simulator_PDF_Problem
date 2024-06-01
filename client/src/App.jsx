import React from 'react'
import { Routes, Route } from "react-router-dom";
import CreateListing from './Pages/Problem';
import Home from './Pages/Home';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Exam from './Pages/Exam'
import Problem from './Pages/Problem'
import NotFound from './libs/NotFound'
import Test from './Pages/Test';
import History from './Pages/History';

const App = () => {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/createlisting" element={<CreateListing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/exam" element={<Exam/>} />
        <Route path="/problem" element={<Problem/>} />     
        <Route path="/test" element={<Test/>} />     
        <Route path="/history" element={<History/>} />     
        <Route component={NotFound} />
      </Routes>
    </div>
  )
}

export default App