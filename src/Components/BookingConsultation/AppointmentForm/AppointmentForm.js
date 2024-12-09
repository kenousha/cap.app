import React from 'react'

const AppointmentForm = ({ doctorName, doctorSpeciality, onSubmit, name, phone, date, time }) => {

   
    const handleFormSubmit = (e) => {
      e.preventDefault();
      onSubmit({ doctorName, doctorSpeciality, name, phone, date, time });
      console.log('Reserving with:', {  name, phone, date, time });
      const appointmentData = {
        "name": name,
        "phone": phone,
        "date": date,
        "time": time,
        "doctorName": doctorName,
        "doctorSpeciality": doctorSpeciality,
      }
      sessionStorage.setItem('appointmentData', JSON.stringify(appointmentData));
    };
  
    return (
      <form onSubmit={handleFormSubmit} className="bc-appointment-form">
        <div className="bc-form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={name} onChange={(e) => (name= e.target.value)} required/>
        </div>
        <div className="bc-form-group">
          <label htmlFor="phone">Phone Number:</label>
          <input type="tel" id="phone" value={phone} onChange={(e) => (phone= e.target.value)} required/>
        </div>
        <div className="bc-form-group">
          <label htmlFor="date">Appointment Date:</label>
          <input type="date" id="date" value={date} onChange={(e) => (date= e.target.value)} required/>
        </div>
        <div className="bc-form-group">
          <label htmlFor="time">Appointment Time:</label>
                <select type="time" id="time" value={time} onChange={(e) => (time= e.target.value)} required>
                    <option value="" aria-describedby="Select a time slot">-Select a time slot-</option>
                    <option value="10:00 AM" aria-describedby="10:00 AM">10:00AM</option>
                    <option value="12:00PM" aria-describedby="12:00PM">12:00PM</option>
                </select>
        </div>
        <button className='bc-booking-btn' type="submit">Book Now</button>
      </form>
    );
  };

export default AppointmentForm