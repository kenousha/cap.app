// Following code has been commented with appropriate comments for your reference.
import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './Notification.css'

// Function component Notification to display user notifications
const Notification = ({ children }) => {
  // State variables to manage user authentication, username, doctor data, and appointment data
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [appointmentData, setAppointmentData] = useState(null);


  // useEffect hook to perform side effects in the component
  useEffect(() => {
    // Retrieve stored username, doctor data, and appointment data from sessionStorage and sessionStorage
    const storedUsername = sessionStorage.getItem('email');
    const storedAppointmentData = JSON.parse(localStorage.getItem('appointmentData'));


    // Set isLoggedIn state to true and update username if storedUsername exists
    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername.split('@')[0]);
    }

    if (storedAppointmentData) {
        setAppointmentData(storedAppointmentData);
      }
    }, []); // Empty dependency array ensures useEffect runs only once after initial render

  // Return JSX elements to display Navbar, children components, and appointment details if user is logged in
  return (
    <div>
      <Navbar/>
      {children}
      {isLoggedIn && appointmentData  && (<>
          <div className="appointment-card-container" style={{ zIndex:'-10', position:'fixed', left:'0', bottom:'0'}}>
            <div className="appointment-card-content">
              <p className="app-details">
               <h3 className="appointment-card__title">Appointment Details</h3>
                <strong>Doctor:</strong> {appointmentData.doctorName}<br></br>
                <strong>Speciality:</strong> {appointmentData.doctorSpeciality}<br></br>
                <strong>Appointment Date:</strong> {appointmentData.date}<br></br>
                <strong>Time Slot:</strong> {appointmentData.time}<br></br>
                <strong> Patient Name:</strong> {appointmentData.name}<br></br>
                <strong>Phone Number:</strong> {appointmentData.phone}<br></br>
                <small>Appointment booked by {username}</small>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Export Notification component for use in other parts of the application
export default Notification;