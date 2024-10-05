import { useState,useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './login'
import Otp from './Otp';
import Home from './Home';
import Changepass from './Changepass';
function App() {
  return(
    <Router>
      <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/otp/:verifyuserid" element={<Otp/>}/>
      <Route path="/home" element={<Home/>}></Route>
      <Route path="/changepassword" element={<Changepass></Changepass>}></Route>
     </Routes>
    </Router>
  )
}

export default App
