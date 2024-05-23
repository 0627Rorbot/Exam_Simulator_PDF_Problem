import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css'
import './main.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './pages/Home';

import RegisterUser from './pages/RegisterUser'
import RegisterEvidence from './pages/RegisterEvidence'
import RegisterCase from './pages/RegisterCase'
import ShowEvidence from './pages/ShowEvidence'

import Navbar from './components/Navbar';

import NotFound from './libs/NotFound';
 
import { Provider } from 'react-redux';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <div>
      <div>
        {/* <Navbar /> */}
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}  />
          <Route path="/register" element={<RegisterUser/>} />
          <Route path="/registerEvidence" element={<RegisterEvidence />}  />
          <Route path="/registerCase" element={<RegisterCase />}  />
          <Route path="/showEvidence" element={<ShowEvidence />}  />
          <Route component={NotFound} />
        </Routes>
      </BrowserRouter>
    </div>
  </Provider>
  , document.getElementById('root')
);
