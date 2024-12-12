import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const AppointmentsContext = createContext();

// Provide the context
export const AppointmentsProvider = ({ children }) => {
  const [appointments, setAppointments] = useState(() => {
    const storedAppointments = localStorage.getItem('appointments');
    return storedAppointments ? JSON.parse(storedAppointments) : [];
  });

  // Save appointments to localStorage
  useEffect(() => {
    localStorage.setItem('appointments', JSON.stringify(appointments));
  }, [appointments]);

  // Context value
  const value = {
    appointments,
    setAppointments,
  };

  return (
    <AppointmentsContext.Provider value={value}>
      {children}
    </AppointmentsContext.Provider>
  );
};

// Hook to use the context
export const useAppointments = () => {
  return useContext(AppointmentsContext);
};
