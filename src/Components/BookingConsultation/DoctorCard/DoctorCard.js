import React, { useEffect, useState } from 'react';
import './DoctorCard.css';
import svg from './/images/0.svg'; import svg1 from './/images/1.svg'; import svg2 from './/images/2.svg';
import svg3 from './/images/3.svg'; import svg4 from './/images/4.svg'; import svg5 from './/images/5.svg';
import svg6 from './/images/6.svg'; import svg7 from './/images/7.svg'; import svg8 from './/images/8.svg';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import AppointmentForm from '../AppointmentForm/AppointmentForm'
import '../../Notification/Notification.css';
import { v4 as uuidv4 } from 'uuid';

const DoctorCard = ({ name, speciality, experience, ratings }) => {
    const [username, setUsername] = useState("");
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
    const storedUsername = sessionStorage.getItem('email');
    if (storedUsername) {setUsername(storedUsername.split('@')[0])}
    }, []); 
    const [appointments, setAppointments] = useState(() => {
      const storedAppointments = localStorage.getItem('appointments');
      return storedAppointments ? JSON.parse(storedAppointments) : [];
    });
    const handleCancel = (appointmentId) => {
        localStorage.removeItem('appointmentData');
        setAppointments((prev) => prev.filter((appt) => appt.id !== appointmentId));
      };
  
    const handleFormSubmit = (appointmentData) => {
        const newAppointment = { 
            id: uuidv4(), 
            ...appointmentData,
            doctorName: name,
         };
        const updatedAppointments = [...appointments, newAppointment];
        setAppointments(updatedAppointments);
        setShowModal(false); 
      };

      const handlePopupClose = () => {
        setShowModal(false);
      };

    useEffect(() => { 
        localStorage.setItem('appointments', JSON.stringify(appointments));
      }, [appointments]);

      const doctorAppointments = appointments?.filter((appt) => appt.doctorName === name) || [];

    const getDoctorImage = (name) => {
        switch (name) {
          case 'Dr. Jiao Yang': return svg1;    case 'Dr. Michael Smith': return svg1;
          case 'Dr. Denis Raj': return svg2;    case 'Dr. Mark D. Okusa': return svg2;
          case 'Dr. Lyn Christie': return svg3;     case 'Dr. Rachel Parker': return svg3;
          case 'Dr. Elizabeth Clark': return svg4;      case 'Dr. Laura Taylor': return svg4;
          case 'Dr. Jessica White': return svg5;     case 'Dr. Emily Clark': return svg5;
          case 'Dr. Alan Dalkin': return svg6;      case 'Dr. Richard Pearson,': return svg6;
          case 'Dr. Sarah Johnson': return svg7;         case 'Dr. Samantha Turner': return svg7;
          case 'Dr. Eugene J. Turner': return svg8;     case 'Dr. Kevin Miller': return svg8;
          default:
            return svg;  // Default image if name is not found
        }
    };
  return (
    <div className="bc-dr-card-container">
      <div className="bc-dr-card-details-container">
        <div className="bc-dr-card-profile-image-container">
        <img src={getDoctorImage(name)} alt=""/>        
        </div>
        <div className="bc-dr-card-details">
          <div className="bc-dr-card-detail-name">{name}</div>
          <div className="bc-dr-card-detail-speciality">{speciality}</div>
          <div className="bc-dr-card-detail-experience">{experience} years experience</div>
          <div className="bc-dr-card-detail-ratings">Ratings: {ratings}</div>
        </div>
      </div>
      <div>
        {doctorAppointments.length > 0 ?(<>
            {doctorAppointments.map((appointment) => (
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
                <p style={{fontSize:'1px', fontStyle:'italic'}}>Appointment booked by {username}</p>
                </small>
              </p>
            </div>
          </div>
        ))}

        </>
      ):(<></>)}
      </div>
      <div className="bc-dr-card-options-container">
       <Popup
          style={{ backgroundColor: '#FFFFFF' }} modal open={showModal}
          trigger={
            <button key={name} className={` ${doctorAppointments.length > 0 ? 'bc-cancel-appointment-btn' : 'bc-book-appointment-btn'}`}>
              {doctorAppointments.length > 0 ? (
                <div>Cancel Appointment</div>
              ) : (
                <div>Book Appointment</div>
              )}
            </button>
          }
          onClose= {handlePopupClose}
        >
          {() => (
            <div className="bc-doctorbg" style={{height:'fit-content'}}>
             <div style={{display: 'grid', placeItems: 'center'}}>
             <img style={{width:'200px', height:'200px'}} src={getDoctorImage(name)} alt="" />
              <div style={{textAlign:'center'}}>
                <div style={{fontWeight:'bold'}}>{name}</div>
                <div>{speciality}</div>
                <div style={{fontWeight:'bold', color:'#888'}}>{experience} years experience</div>
                <div style={{fontWeight:'bold', marginBottom:'5px'}}>Ratings: {ratings}</div>
              </div>
             </div>
              {doctorAppointments.length > 0 ? (
                <>
                  <h3 style={{ textAlign: 'center'}}>Appointment Booked!</h3>
                  {doctorAppointments.map((appointment) => (
                    <div className="bc-bookedInfo" key={appointment.id}>
                      <p>Name:<span style={{fontWeight:'normal'}}>{appointment.name}</span> </p>
                      <p>Phone Number: <span style={{fontWeight:'normal'}}>{appointment.phone}</span></p>
                      <button className='bc-cancel-appointment-btn' onClick={() => handleCancel(appointment.id)}>Cancel Appointment</button>
                    </div>
                  ))}
                </>
              ) : (
                <AppointmentForm doctorName={name} doctorSpeciality={speciality} onSubmit={handleFormSubmit}/>
              )}
            </div>
          )}
        </Popup> 
      </div>
    </div>
  );
};

export default DoctorCard;