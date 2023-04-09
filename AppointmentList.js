import React, { useState, useEffect } from "react";
import { db } from "./firebase"; // Import your Firebase instance

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Use the Firebase Firestore API to retrieve the list of appointments
    const unsubscribe = db.collection("appointments").onSnapshot((snapshot) => {
      const appointmentsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAppointments(appointmentsData);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h2>Appointments</h2>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.id}>
            <p>Date: {appointment.date}</p>
            <p>Time: {appointment.time}</p>
            <p>Reason: {appointment.reason}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AppointmentList;
