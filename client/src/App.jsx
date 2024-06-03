import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import Register from './Pages/Auth/Register';
import Login from './Pages/Auth/Login';
import Problem from './Pages/Admin/Problem'
import NotFound from './libs/NotFound'
import Test from './Pages/Exam/Test';
import History from './Pages/Exam/History';
import Test_Home from './Pages/Exam/Test/Test_Home';
import Test_Main from './Pages/Exam/Test/Test_Main';

const App = () => {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/admin/problem" element={<Problem/>} />     
        <Route path="/exam/test" element={<Test/>} />     
        <Route path="/exam/history" element={<History/>} />
        <Route path='/exam/test/home' element={<Test_Home />} />
        <Route path='/exam/test/main' element={<Test_Main />} />
        <Route component={NotFound} />
      </Routes>
    </div>
  )
}

export default App