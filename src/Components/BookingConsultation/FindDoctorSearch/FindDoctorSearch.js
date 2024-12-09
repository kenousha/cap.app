import doctor from './doc.svg';
import React, { useState } from 'react';
import './FindDoctorSearch.css';
import { useNavigate } from 'react-router-dom';


const initSpeciality = [
    'Dentist', 'Gynecologist/obstetrician', 'General Physician', 'Dermatologist', 'Ear-nose-throat (ent) Specialist', 'Homeopath', 'Bone'
]

const FindDoctorSearch = () => {
    const [doctorResultHidden, setDoctorResultHidden] = useState(true);
    const [searchDoctor, setSearchDoctor] = useState('');
    const [specialities] = useState(initSpeciality);
    const navigate = useNavigate();
    const handleDoctorSelect = (speciality) => {
        setSearchDoctor(speciality);
        setDoctorResultHidden(true);
        navigate(`/BookingConsultation?speciality=${speciality}`);
        window.location.reload();
    }
       const handleSearchInputChange = (text) => {
        setSearchDoctor(text); 
        setDoctorResultHidden(false);
    };

    const filteredSpecialities = specialities.filter(speciality =>
        speciality.toLowerCase().includes(searchDoctor.toLowerCase())
    );
    
    const handlesearch = () => {
    if (filteredSpecialities.length > 0) {
    handleSearchInputChange(filteredSpecialities[0]); // Set the first filtered result as the input value
    }
  };
    return (
        <div className='finddoctor'>
            <center>
                <h1>Find a doctor and book an appointment</h1>
        <img className='docimg'src={doctor} alt="" />  
                <div className="home-search-container">
                         
                       
                    {/* doctor-search-box as a div and not form to prevent the page reloading after search button is clicked */}
                    <div className="doctor-search-box">
                     
                       {/* input box filters through specialities as user is typing */}
                       <input type="text" className="search-doctor-input-box" placeholder="Search doctor by speciality." 
                        onFocus={() => setDoctorResultHidden(false) } onBlur={() => setDoctorResultHidden(true)} 
                        value={searchDoctor} onChange={(e) => handleSearchInputChange(e.target.value)} />
                        
                        {/* search button shows first filtered result in inputbox */} 
                        <button className="findiconimg" onClick={handlesearch}><i className="fa fa-search"/></button>
                        
                        {/* hides results that dont match filter */} 
                        <div className="search-doctor-input-results" hidden={doctorResultHidden}>
                            
                            {/* output of filtered results */}
                            {filteredSpecialities.map(speciality => 
                                <div className="search-doctor-result-item" key={speciality} onMouseDown={() => handleDoctorSelect(speciality)}>
                                    <span> <i style={{color:'#000000',fontSize:'20px'}} className="fa fa-user-md"></i></span>
                                    <span>{speciality}</span>
                                    <span>SPECIALITY</span>
                                </div>)
                            }
                        </div>
                    </div>
                </div>
            </center>
        </div>
    )
}

export default FindDoctorSearch