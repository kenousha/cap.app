import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Components/Login/Login';
import SignUp from './Components/SignUp/SignUp';
import LandingPage from './Components/LandingPage/LandingPage';
import InstantConsultation from './Components/InstantConsultation/InstantConsultation';
import BookingConsultation from './Components/BookingConsultation/BookingConsultation';
import Notification from './Components/Notification/Notification';
import ReviewForm from './Components/ReviewForm/ReviewForm';
import ProfileForm from './Components/ProfileCard/ProfileForm/ProfileForm'
import Reports from './Components/ReportsLayout/Reports';
import './App.css';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
            <Notification>
                <Routes>
                    <Route path="/" element={<LandingPage/>}/>
                    <Route path="/Login" element={<Login/>}/>
                    <Route path="/SignUp" element={<SignUp/>}/>
                    <Route path="/InstantConsultation" element={<InstantConsultation />} />
                    <Route path="/BookingConsultation" element={<BookingConsultation/>}/>
                    <Route path="/Reviews" element={<ReviewForm/>}/>
                    <Route path='/Profile' element={<ProfileForm/>}/>
                    <Route path='/Reports' element={<Reports/>}/>
                </Routes>
            </Notification>
        </BrowserRouter>
    </div>
  );
};

export default App;

