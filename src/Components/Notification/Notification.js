// Following code has been commented with appropriate comments for your reference.
import React, { useEffect, useState } from 'react';
import './Notification.css'
import { useAppointments } from '../../Components/AppointmentsContext';
// Function component Notification to display user notifications
const Notification = () => {
    const { appointments } = useAppointments();
    const [isLoggedIn, setIsLoggedIn] = useState("");
    const [username, setUsername] = useState("");
  
    useEffect(() => {
        const storedUsername = sessionStorage.getItem('email');
        if (storedUsername) {
            setIsLoggedIn(true);
            setUsername(storedUsername.split('@')[0]);
          }
        }, []);
  return (
    <div>
      {isLoggedIn && appointments.length > 0 &&(<>
            {appointments.map((appointment) => (
          <div className="appointment-card-container" style={{ zIndex:'10', position:'fixed', left:'0', bottom:'0'}}>
            <div className="appointment-card-content">
              <p className="app-details">
                <small>
               <h3 className="appointment-card__title">Appointment Details</h3>
                <strong>Doctor:</strong> {appointment.doctorName}<br></br>
                <strong>Speciality:</strong> {appointment.doctorSpeciality}<br></br>
                <strong>Date:</strong> {appointment.date}<br></br>
                <strong>Time Slot:</strong> {appointment.time}<br></br>
                <strong> Patient Name:</strong> {appointment.name}<br></br>
                <strong>Phone Number:</strong> {appointment.phone}<br></br>
                <p style={{fontSize:'1px', fontStyle:'italic'}}>Reserved by: {username}</p>
                </small>
              </p>
            </div>
          </div>
        ))}
        </>
      )}
    </div>
  );
};

// Export Notification component for use in other parts of the application
export default Notification;