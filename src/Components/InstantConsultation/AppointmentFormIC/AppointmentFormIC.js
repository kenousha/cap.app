import React from 'react'

const AppointmentFormIC = ({ doctorName, doctorSpeciality, onSubmit, name, phone}) => {

   
    const handleFormSubmit = (e) => {
      e.preventDefault();
      onSubmit({ doctorName, doctorSpeciality, name, phone});
      console.log('Reserving with:', { name, phone});
      const appointmentData = {
        "name": name,
        "phone": phone,
        "doctorName": doctorName,
        "doctorSpeciality": doctorSpeciality,
      }
      localStorage.setItem('appointmentData', JSON.stringify(appointmentData));
    };
  
    return (
      <form onSubmit={handleFormSubmit} className="appointment-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={name} onChange={(e) => (name= e.target.value)} required/>
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number:</label>
          <input type="tel" id="phone" value={phone} onChange={(e) => (phone= e.target.value)} required/>
        </div>
        <button className='booking-btn'type="submit">Book Now</button>
      </form>
    );
  };

export default AppointmentFormIC