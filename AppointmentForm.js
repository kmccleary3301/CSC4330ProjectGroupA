import React, { useState } from "react";
import {useAuthValue} from './AuthContext';
import { auth, db } from "./firebase"; // Import your Firebase instance
import {doc, setDoc, updateDoc, getDoc} from 'firebase/firestore';

function AppointmentForm() {
  //const {currentUser} = useAuthValue();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    db.collection("appointments").add({
      date: date,
      time: time,
      reason: reason,
    });
    setDate("");
    setTime("");
    setReason("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Date:
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </label>
      <label>
        Time:
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </label>
      <label>
        Reason:
        <input
          type="text"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
      </label>
      <button type="submit">Add Appointment</button>
    </form>
  );
}

export default AppointmentForm;
