import React from 'react';
import 'reactjs-popup/dist/index.css';
import './Reports.css';
import Report1 from './/Reports/Report1.pdf'; import Report2 from './/Reports/Report2.pdf';
import Report3 from './/Reports/Report3.pdf'; import Report4 from './/Reports/Report4.pdf';

const Reports = () => {
 const getDoctorReport = (name) => {
     switch (name) {
       case 'Dr. John Doe': return Report1;    
       case 'Dr. Michael Brown': return Report3;
       case 'Dr. Emily Johnson': return Report2;    
       case 'Dr. Sarah Davis': return Report4;
             default:
     return null;
     }
  };
    
 const doctors = [
     { number: 1, name: 'Dr. John Doe', speciality: 'Cardiology'},
     { number: 2, name: 'Dr. Emily Johnson', speciality: 'Neurology'},
     { number: 3, name: 'Dr. Michael Brown', speciality: 'Pediatrics'},
     { number: 4, name: 'Dr. Sarah Davis', speciality: 'Oncology'}
     ];

return (
 <div className="container" style={{overflow:'hidden'}}>
  <div className="reports-container">
        <div> <h1 style={{textAlign:'left'}}>Reports</h1></div>
    <table cellSpacing="0" cellPadding="10">       
     <thead style={{textAlign:'center'}}>
        <tr>
         <th>Serial Number</th>
         <th>Doctor Name</th>
         <th>Doctor Speciality</th>
         <th>View Report</th>
         <th>Download Report</th>
        </tr>
     </thead>               
     <tbody> 
      {doctors.map((doctor) => (
        <tr key={doctor.number}>           
         <td>{doctor.number}</td>
         <td> {doctor.name} </td>
         <td>{doctor.speciality}</td>
         <td>
          <a target='_blank' href={getDoctorReport(doctor.name)} className='report-btn' rel="noreferrer">
            View Report </a> </td>
         <td>
          <a href={getDoctorReport(doctor.name)} download={getDoctorReport(doctor.name)} className='report-btn' rel="noreferrer">
            Download Report </a> </td>
        </tr>
      ))}
     </tbody>
    </table>
  </div>
 </div>
 );
};
export default Reports;