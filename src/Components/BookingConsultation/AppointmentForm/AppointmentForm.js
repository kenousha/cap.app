import React, {useState} from 'react'

const AppointmentForm = ({ doctorName, doctorSpeciality, onSubmit, date, time }) => {
    const [phone, setPhone] = useState('');
    const [errorPhone, setErrorPhone] = useState('');
    const [errorPhoneChar, setErrorPhoneChar] = useState(''); 
    const [name, setName] = useState('');
    const [errorName, setErrorName] = useState(''); 
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s\-']+$/;
    const phoneRegex =/^[0-9']+$/;

    const handlePhoneChange = (e) => {
        const value = e.target.value;
        e.preventDefault();
        const input=e.target;
        setPhone(value);
        if (phoneRegex.test(value)&&(value.length === 10)){input.setCustomValidity('')}
        else {input.setCustomValidity('Please enter a valid phone number')};
        if (phoneRegex.test(value)){setErrorPhoneChar('')}
        else {setErrorPhoneChar('Invalid character')};
        if (value.length === 10){setErrorPhone('')}
        else {setErrorPhone('Must contain 10 digits')};
    };
      const handleNameChange = (e) => {
        const value = e.target.value;
        e.preventDefault();
        setName(value);
        const input=e.target
        if (nameRegex.test(value)) {
              setErrorName('');
              input.setCustomValidity('')
            } else {
                input.setCustomValidity('Please enter a valid name')
              setErrorName('Enter a valid name'); 
            }
      };

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
      localStorage.setItem('appointmentData', JSON.stringify(appointmentData));
    };
  
    return (
      <form onSubmit={handleFormSubmit} className="bc-appointment-form">
        <div className="bc-form-group">
          <label htmlFor="name">Patient Name:</label>
          <input type="text" id="name" value={name} onChange={handleNameChange} required
          placeholder="Enter name" aria-describedby="Enter name" />
           <div style={{color:'red', fontSize:'1px', textAlign:'center'}}>
             {errorName}
            </div>
        </div>
        <div className="bc-form-group">
         <label for="phone">Phone Number:</label>
          <input value={phone} onChange={handlePhoneChange} type="tel" name="phone" id="phone" required 
          placeholder="Enter phone number" aria-describedby="Enter phone number"/>
            <div style={{color:'red', fontSize:'1px', textAlign:'center'}}>
                {errorPhone}
            </div>
            <div style={{color:'red', fontSize:'1px', textAlign:'center'}}>
                {errorPhoneChar}
            </div>
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