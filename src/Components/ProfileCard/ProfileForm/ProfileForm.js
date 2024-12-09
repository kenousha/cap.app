import React, { useCallback, useEffect, useState } from "react";
import { API_URL } from "./../../../config";
import { useNavigate } from "react-router-dom";

const ProfileForm = (name, email, phone) => {
  const [userDetails, setUserDetails] = useState([{name, email, phone}]);
  const [updatedDetails, setUpdatedDetails] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [errorPhone, setErrorPhone] = useState('');
  const [errorName, setErrorName] = useState(''); 


  
  const navigate = useNavigate();

  const fetchUserProfile = useCallback( async () => {
    try {
      const authtoken = sessionStorage.getItem("auth-token");
      const email = sessionStorage.getItem("email"); // Get the email from session storage

      if (!authtoken) {
        navigate("/login");
      } else {
        const response = await fetch(`${API_URL}/api/auth/user`, {
          headers: {
            "Authorization": `Bearer ${authtoken}`,
            "Email": email, // Add the email to the headers
          },
        });
        if (response.ok) {
          const user = await response.json();
          setUserDetails(user);
          setUpdatedDetails(user);
        } else {
          throw new Error("Failed to fetch user profile");
        }
      }
    } catch (error) {
      console.error(error);
    }
  }, [navigate]);

  useEffect(() => {
    const authtoken = sessionStorage.getItem("auth-token");
    if (!authtoken) {
      navigate("/login");
    } else {
      fetchUserProfile();
    }
  }, [fetchUserProfile, navigate]);

const handleEdit = () => {
    setEditMode(true);
  };

const phoneRegex = /^[0-9]+$/;
const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s\-']+$/;

 const handlePhoneChange = (e) => {
    const value = e.target.value;
    setUpdatedDetails({
      ...updatedDetails,
      [e.target.name]: e.target.value,
    });
    if (phoneRegex.test(value) && value.length === 10) {
          setErrorPhone(''); 
        } else {
          setErrorPhone('Phone number must contain only numbers and have 10 characters'); 
        }
  };
const handleNameChange = (e) => {
    const value = e.target.value;
    setUpdatedDetails({
      ...updatedDetails,
      [e.target.name]: e.target.value,
    });
   if (nameRegex.test(value)&& value.length >= 2) {
              setErrorName(''); 
            } else {
              setErrorName('Please enter a valid name'); 
            }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const authtoken = sessionStorage.getItem("auth-token");
      const email = sessionStorage.getItem("email"); // Get the email from session storage

      if (!authtoken || !email) {
        navigate("/login");
        return;
      }

      const payload = { ...updatedDetails };
      const response = await fetch(`${API_URL}/api/auth/user`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${authtoken}`,
          "Content-Type": "application/json",
          "Email": email,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        sessionStorage.setItem("name", updatedDetails.name);
        sessionStorage.setItem("phone", updatedDetails.phone);

        setUserDetails(updatedDetails);
        setEditMode(false);
        alert(`Profile Updated Successfully!`);
        navigate("/");
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="profile-container">
     {editMode ? (
        <form onSubmit={handleSubmit}>
         <label>
         Email
          <input type="email" name="email" value={userDetails.email} disabled/>
         </label>
         <label>
         Name
          <input type="text" name="name" value={updatedDetails.name} onChange={handleNameChange}/>
           {errorName && <div className="err" style={{ color: 'red' }}>{errorName}</div>}
         </label>
         <label>
         Phone
          <input name="phone" value={updatedDetails.phone} onChange={handlePhoneChange}  type="tel" id="phone" required className="form-control" minlength="10" maxlength="10" aria-describedby="Phone number input box" />
          {errorPhone && <div className="err" style={{ color: 'red', textAlign: 'center'}}>{errorPhone}</div>}
         </label>
          <button type="submit">Save</button>
        </form>
    ) : (
    <div className="profile-details">
          <h1>Welcome, {userDetails.name}</h1>
          <p> <b>Email:</b> {userDetails.email}</p>
          <p><b>Phone:</b> {userDetails.phone}</p>
          <button onClick={handleEdit}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default ProfileForm;
